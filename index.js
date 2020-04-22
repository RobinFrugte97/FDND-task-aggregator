'use strict'

require('dotenv').config()

const { graphql } = require('@octokit/graphql')
const fm = require('front-matter')

const taskList = []
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  }
})

graphqlWithAuth(`{
  organization(login: "fdnd-task") {
    repositories(first: 100, orderBy: {field: NAME, direction: ASC}) {
      nodes {
        name
        url
        description:object(expression: "master:.description") {
          ... on Blob {
            text
          }
        }
      }
    }
  }
}`)
  .then(result => {
    result.organization.repositories.nodes.map(task => {
      taskList.push({
        ...fm(task.description.text).attributes,
        repository: task.name,
        url: task.url
      })
    })
  })
  .catch(error => {
    console.log('GitHub API Request failed: ', error.request, '\n', error.message)
  })
  .finally(() => {
    console.log(taskList)
  })

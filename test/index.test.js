const { Application } = require('probot')
const plugin = require('..')
const statusFailurePayload = require('../fixtures/status.failure.json')

let app
let github

beforeEach(() => {
  app = new Application()
  app.load(plugin)
  github = {
    issues: {
      createComment: jest.fn().mockReturnValue(Promise.resolve({
        // Whatever the GitHub API should return
      }))
    }
  }
  app.auth = () => Promise.resolve(github)
})

test('creates a comment on a status failure event', async () => {
  await app.receive({ event: 'status', payload: statusFailurePayload.body })
  expect(github.issues.createComment).toHaveBeenCalled()
})

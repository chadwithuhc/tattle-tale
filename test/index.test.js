const { Application } = require('probot')
const plugin = require('..')
const statusFailurePayload = require('../fixtures/status.failure.json')
const commentFixture = require('../fixtures/github.comment.json')

let app
let github

describe('app webhook events', () => {
  beforeEach(() => {
    app = new Application()
    app.load(plugin)
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    app.auth = () => Promise.resolve(github)
  })

  test('ignores non-failure events', async () => {
    await app.receive({
      event: 'status',
      payload: {
        ...statusFailurePayload.body,
        state: 'pending'
      }
    })
    expect(github.issues.createComment).not.toHaveBeenCalled()
  })

  test('creates a comment on a status failure event', async () => {
    await app.receive({ event: 'status', payload: statusFailurePayload.body })
    expect(github.issues.createComment).toHaveBeenCalledWith(commentFixture)
  })
})

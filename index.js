/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('pull_request.opened', async context => {
    // app.log('opened', context)
    console.log('opened', context)

    // pull_request.statuses_url
    // https://api.github.com/repos/chadwithuhc/json-parser-code-challenge/statuses/7c698a7be5e60f93045e1151fd443265f4f9dd41

    // GET https://api.github.com/repos/chadwithuhc/json-parser-code-challenge/statuses/f942ac6a0aa8a5c3b19ca7faae81fa79792b45b2

    // Response -> response[0].target_url
    // https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification

    // Extract ID -> 398496342 + 1
    // GET https://api.travis-ci.org/v3/job/398496343/log.txt

    // Remove node terminal formatting

  })
  app.on('pull_request.synchronize', async context => {
    // app.log('synchronize', context)
    console.log('synchronize', context)
  })

  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({ body: 'Hello World!' })

    // Post a comment on the issue
    return context.github.pullRequests.createComment(params)
  })
}

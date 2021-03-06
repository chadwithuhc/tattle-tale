const extract = require('./lib/extract')
const fetchers = require('./lib/fetchers')

/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('status', async context => {
    if (context.payload.state === 'failure') {
      // context.payload.target_url ->
      // https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification
      const buildId = extract.buildIdFromUrl(context.payload.target_url)

      return fetchers.buildLog(buildId + 1)
        .then(log => {
          const { commit, repository } = context.payload

          return fetchers.findPullBySha(repository.pulls_url, commit.sha)
            .then(pull => {
              const comment = context.issue({
                number: pull.number,
                body: [
                  `@${commit.author.login} broke the build!`,
                  `<pre><code>${log}</code></pre>`
                ].join(`\n\n`)
              })

              return context.github.issues.createComment(comment)
            })
        })
    }
  })
}

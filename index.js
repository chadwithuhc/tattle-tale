const logParser = require('./lib/logParser')

const fetch = require('node-fetch')

/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('status', async context => {
    if (context.payload.state === 'failure') {
      console.log('FAIL!')

      // https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification
      const buildId = +(new URL(context.payload.target_url)).pathname.split(`/`).pop()

      logParser(`https://api.travis-ci.org/v3/job/${buildId + 1}/log.txt`)
        .then(log => {
          const { commit, repository } = context.payload

          // GET pulls
          // match where pull.head.sha === commit.sha
          fetch(repository.pulls_url.replace(`{/number}`, ``))
            .then(res => res.json())
            .then(pulls => {
              const pull = pulls.find(pull => pull.head.sha === commit.sha)

              if (!pull) {
                console.log('ERR: Pull not found')
                return
              }

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

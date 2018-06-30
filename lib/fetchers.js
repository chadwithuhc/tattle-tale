const fetch = require('node-fetch')
const extract = require('./extract')

module.exports = {

  pulls (url) {
    return fetch(url.replace(`{/number}`, ``))
      .then(res => res.json())
      .catch(console.error)
  },

  findPullBySha (url, sha) {
    return this.pulls(url)
      .then(pulls => {
        const pull = pulls.find(pull => pull.head.sha === sha)

        if (!pull) {
          throw new Error(`Pull with sha ${sha} not found`)
        }

        return pull
      })
  },

  buildLog (buildId) {
    if (!buildId) {
      return Promise.reject(new Error(`No buildId provided`))
    }

    return fetch(`https://api.travis-ci.org/v3/job/${buildId}/log.txt`)
      .then(res => res.text())
      .then(extract.errorLog)
      .catch(console.error)
  }
}

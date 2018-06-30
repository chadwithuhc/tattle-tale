const fetch = require('node-fetch')

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
  }
}

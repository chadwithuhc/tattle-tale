const stripAnsi = require('strip-ansi')

module.exports = {
  buildIdFromUrl (url = '') {
    // Example url: https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification
    const matches = url.match(/[0-9]+/)

    return matches ? +matches[0] : null
  },

  errorLog (rawContents) {
    const contents = stripAnsi(rawContents)

    const result = contents.slice(
      contents.lastIndexOf(`$ npm test`),
      contents.lastIndexOf(`travis_time:end`)
    )

    return result.trim()
  }
}

const stripAnsi = require('strip-ansi')
const fetch = require('node-fetch')

module.exports = function logParser (url) {
  if (!url) {
    return Promise.reject(new Error({
      error: {
        message: `No URL provided`
      }
    }))
  }

  return fetch(url)
    .then(res => res.text())
    .then(rawContents => {
      const contents = stripAnsi(rawContents)

      const result = contents.slice(
        contents.lastIndexOf(`$ npm test`),
        contents.lastIndexOf(`travis_time:end`)
      )

      return result.trim()
    })
    .catch(console.error)
}

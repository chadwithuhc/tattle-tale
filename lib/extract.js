module.exports = function (url = '') {
  // Example url: https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification
  const matches = url.match(/[0-9]+/)

  return matches ? +matches[0] : null
}

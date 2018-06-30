const logParser = require('../lib/logParser')
const dummyLogUrl = `https://api.travis-ci.org/v3/job/398495386/log.txt`

const logResult = logParser(dummyLogUrl)

test('logParser is a function', () => {
  expect(typeof logParser).toBe(`function`)
})

test('logParser returns a promise', () => {
  expect(logResult instanceof Promise).toBe(true)
})

test('logParser returns a successful GET request', (done) => {
  logResult
    .then(result => {
      expect(result).toMatchSnapshot()
      done()
    })
})

test('logParser rejects on missing URL', () => {
  expect(logParser()).rejects.toThrow(new Error({
    error: {
      message: `No URL provided`
    }
  }))
})

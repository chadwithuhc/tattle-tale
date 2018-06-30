// const fs = require('fs')
// const path = require('path')
const fetchers = require('../lib/fetchers')
const pullsFixture = require('../fixtures/github.pulls.json')
// const buildLogResultFixture = fs.readFileSync(path.resolve('fixtures/extracted.errorLog.txt'), 'utf8')

// Mock the API calls
fetchers.pulls = jest.fn().mockReturnValue(Promise.resolve(pullsFixture))
// fetchers.buildLog = jest.fn().mockReturnValue(Promise.resolve(buildLogResultFixture))

describe('fetchers', () => {
  const dummyPullsUrl = `https://api.github.com/repos/chadwithuhc/json-parser-code-challenge/pulls{/number}`
  const dummySha = pullsFixture[0].head.sha
  const badSha = dummySha.substr(3)
  const failedResult = fetchers.findPullBySha(dummyPullsUrl, badSha)
  const resolvedResult = fetchers.findPullBySha(dummyPullsUrl, dummySha)

  describe('.pulls()', () => {
    test('is a function', () => {
      expect(typeof fetchers.pulls).toBe(`function`)
    })

    test('returns a Promise', () => {
      expect(fetchers.pulls(dummyPullsUrl) instanceof Promise).toBe(true)
    })
  })

  describe('.findPullBySha()', () => {
    test('is a function', () => {
      expect(typeof fetchers.findPullBySha).toBe(`function`)
    })

    test('returns a Promise', () => {
      expect(resolvedResult instanceof Promise).toBe(true)
    })

    test('resolves with matching pull', (done) => {
      resolvedResult
        .then(pull => {
          expect(pull).toMatchSnapshot()
          done()
        })
    })

    test('rejects on no matching pull', () => {
      expect(failedResult).rejects.toThrow(new Error(`Pull with sha ${badSha} not found`))
    })
  })

  describe('.buildLog()', () => {
    const dummyBuildId = 398656241
    const logResult = fetchers.buildLog(dummyBuildId)

    test('is a function', () => {
      expect(typeof fetchers.buildLog).toBe(`function`)
    })

    test('returns a promise', () => {
      expect(logResult instanceof Promise).toBe(true)
    })

    test('returns a successful GET request', (done) => {
      logResult
        .then(result => {
          expect(result).toMatchSnapshot()
          done()
        })
    })

    test('rejects on missing buildId', () => {
      expect(fetchers.buildLog()).rejects.toThrow(new Error(`No buildId provided`))
    })
  })
})

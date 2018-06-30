const fetchers = require('../lib/fetchers')
const pullsFixture = require('../fixtures/github.pulls.json')

// Mock the github pulls
fetchers.pulls = jest.fn().mockReturnValue(Promise.resolve(pullsFixture))

const dummyPullsUrl = `https://api.github.com/repos/chadwithuhc/json-parser-code-challenge/pulls{/number}`
const dummySha = `83d6439d3c48b53beaf38edaaedc70a5155b7c06`
const badSha = dummySha.substr(3)
const failedResult = fetchers.findPullBySha(dummyPullsUrl, badSha)
const resolvedResult = fetchers.findPullBySha(dummyPullsUrl, dummySha)

test('fetchers has a pulls method', () => {
  expect(typeof fetchers.pulls).toBe(`function`)
})

test('fetchers.pulls() returns a Promise', () => {
  expect(fetchers.pulls(dummyPullsUrl) instanceof Promise).toBe(true)
})

test('fetchers has a findPullBySha method', () => {
  expect(typeof fetchers.findPullBySha).toBe(`function`)
})

test('fetchers.findPullBySha() returns a Promise', () => {
  expect(resolvedResult instanceof Promise).toBe(true)
})

test('fetchers.findPullBySha() resolves with matching pull', (done) => {
  resolvedResult
    .then(pull => {
      expect(pull).toMatchSnapshot()
      done()
    })
})

test('fetchers.findPullBySha() rejects on no matching pull', () => {
  expect(failedResult).rejects.toThrow(new Error(`Pull with sha ${badSha} not found`))
})

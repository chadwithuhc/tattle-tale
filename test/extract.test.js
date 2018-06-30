const extractBuildId = require('../lib/extract')
const dummyUrl = `https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification`

test('extract is a function', () => {
  expect(typeof extractBuildId).toBe(`function`)
})

test('extract correctly grabs the build id', () => {
  expect(extractBuildId(dummyUrl)).toBe(398496342)
})

test('extract returns null when no URL provided', () => {
  expect(extractBuildId()).toBe(null)
})

test('extract returns null when URL does not contain number', () => {
  expect(extractBuildId(`https://google.com`)).toBe(null)
})

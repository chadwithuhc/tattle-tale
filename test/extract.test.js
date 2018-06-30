const extract = require('../lib/extract')
const dummyUrl = `https://travis-ci.org/chadwithuhc/json-parser-code-challenge/builds/398496342?utm_source=github_status&utm_medium=notification`

describe('extract', () => {
  describe('.buildIdFromUrl()', () => {
    test('is a function', () => {
      expect(typeof extract.buildIdFromUrl).toBe(`function`)
    })

    test('correctly grabs the build id', () => {
      expect(extract.buildIdFromUrl(dummyUrl)).toBe(398496342)
    })

    test('returns null when no URL provided', () => {
      expect(extract.buildIdFromUrl()).toBe(null)
    })

    test('returns null when URL does not contain number', () => {
      expect(extract.buildIdFromUrl(`https://google.com`)).toBe(null)
    })
  })
})

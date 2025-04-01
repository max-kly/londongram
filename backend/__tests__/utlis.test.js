const { createSlug } = require('../utils/seed.util')

describe('createSlug() tests:', () => {
    test('Returns an empty string, when empty string passed', () => {
        expect(createSlug('')).toBe('')
    })
    test('Returns "Invalid data type, string is expected", when passed anything but string', () => {
        expect(createSlug([])).toBe('Invalid data type, string is expected')
        expect(createSlug(3)).toBe('Invalid data type, string is expected')
        expect(createSlug(true)).toBe('Invalid data type, string is expected')
    })
    test('Returns a valid slug from 1 word in lower case', () => {
        expect(createSlug('Soho')).toBe('soho')
    })
    test('Returns a valid slug from multiple words in lower case', () => {
        expect(createSlug('Canary Wharf')).toBe('canarywharf')
        expect(createSlug('Kingston Upon Themes')).toBe('kingstonuponthemes')
    })
})
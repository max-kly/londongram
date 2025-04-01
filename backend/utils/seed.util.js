const createSlug = (string) => {
    return typeof string === 'string' ? string.toLowerCase().replace(/\s+/g, '') : 'Invalid data type, string is expected'
}
module.exports = { createSlug }
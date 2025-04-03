const { createSlug } = require('../../../utils/seed.util')
const areas = require('./areas')
const communities = areas.map((area) => {
    return {
        name: area.area,
        description: `Everything about our lovely ${area.area}: activities, news, events and much more ❤️`,
        slug: createSlug(area.area),
        status: 'verified'
    }
})
module.exports = communities
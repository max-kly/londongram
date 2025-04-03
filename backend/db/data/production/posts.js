const communities = require('./communities')
const posts = communities.map(({ name }, index) => {
    return {
        user_id: 1,
        community_id: index + 1,
        post_content: `Welcome to ${name} community! 🥰 \n Stay in touch with ${name} and its latest news, events and discussions around our lovely area! ❤️`,
        dateCreated: new Date(),
        likes: 1
    }
})
module.exports = posts
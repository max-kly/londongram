const communities = require("./communities")
const moderators = communities.map((community, index) => {
    return {
        user_id: 1,
        community_id: index + 1
    }
})
module.exports = moderators
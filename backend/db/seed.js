const format = require('pg-format')
const db = require('./connection')
const dataLocal = require('./data/local/index')
const dataProduction = require('./data/production/index')
const { hashPassword } = require('../utils/seed.util')
const data = process.env.NODE_ENV === 'test' ? dataLocal : dataProduction
const messages = require('./data/messages')
const seed = ({ users, areas, communities, moderators, posts, postImages, likes, comments }) => {
    console.log(messages.start)
    return db.query('DROP TABLE IF EXISTS post_images')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS likes')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS comments')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS posts')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS moderators')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS communities')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS areas')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS users')
        })
        .then(() => {
            return db.query(`CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                full_name VARCHAR NOT NULL,
                avatar VARCHAR,
                date_of_birth DATE NOT NULL,
                postcode VARCHAR NOT NULL,
                status VARCHAR NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE areas (
                id SERIAL PRIMARY KEY,
                area VARCHAR NOT NULL,
                borough VARCHAR NOT NULL,
                town VARCHAR NOT NULL,
                postcode VARCHAR NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE communities (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                slug VARCHAR NOT NULL,
                status VARCHAR NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE moderators (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) NOT NULL,
                community_id INT REFERENCES communities(id) NOT NULL
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) NOT NULL,
                community_id INT REFERENCES communities(id),
                post_content VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE comments (
                id SERIAL PRIMARY KEY,
                post_id INT REFERENCES posts(id) NOT NULL,
                user_id INT REFERENCES users(id) NOT NULL,
                comment_content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE likes (
                id SERIAL PRIMARY KEY,
                post_id INT REFERENCES posts(id),
                comment_id INT REFERENCES comments(id),
                user_id INT REFERENCES users(id) NOT NULL,
                CHECK (
                    (post_id IS NOT NULL AND comment_id IS NULL) OR 
                    (post_id IS NULL AND comment_id IS NOT NULL)
                )
            )`)
        })
        .then(() => {
            return db.query(`CREATE TABLE post_images (
                id SERIAL PRIMARY KEY,
                post_id INT REFERENCES posts(id) NOT NULL,
                image_url VARCHAR NOT NULL
            )`)
        })
        .then(() => {
            const seedUsers = format('INSERT INTO users (username, password, full_name, avatar, date_of_birth, postcode, status) VALUES %L',
                users.map(({ username, password, fullName, avatar, dateOfBirth, postcode, status }) => [
                    username,
                    hashPassword(password),
                    fullName,
                    avatar,
                    dateOfBirth,
                    postcode,
                    status
                ]))
            return db.query(seedUsers)
        })
        .then(() => {
            const seedAreas = format('INSERT INTO areas (area, borough, town, postcode) VALUES %L',
                areas.map(({ area, borough, town, postcode }) => [
                    area,
                    borough,
                    town,
                    postcode
                ]))
            const areasPromise = db.query(seedAreas)
            const seedCommunities = format('INSERT INTO communities (name, description, slug, status) VALUES %L',
                communities.map(({ name, description, slug, status }) => [
                    name,
                    description,
                    slug,
                    status
                ]))
            const communitiesPromise = db.query(seedCommunities)
            return Promise.all([areasPromise, communitiesPromise])
        })
        .then(() => {
            const seedModerators = format('INSERT INTO moderators (user_id, community_id) VALUES %L',
                moderators.map(({ user_id, community_id }) => [
                    user_id,
                    community_id
                ]))
            const moderatorsPromise = db.query(seedModerators)
            const seedPosts = format('INSERT INTO posts (user_id, community_id, post_content, created_at) VALUES %L',
                posts.map(({ user_id, community_id, post_content, dateCreated }) => [
                    user_id,
                    community_id,
                    post_content,
                    dateCreated
                ]))
            const postsPromise = db.query(seedPosts)
            return Promise.all([moderatorsPromise, postsPromise])
        })
        .then(() => {
            if (!process.env.NODE_ENV) return
            const seedPostImages = format('INSERT INTO post_images (post_id, image_url) VALUES %L',
                postImages.map(({ post_id, image_url }) => [
                    post_id,
                    image_url
                ]))
            const postImagesPromise = db.query(seedPostImages)
            const seedLikes = format('INSERT INTO likes (post_id, comment_id, user_id) VALUES %L',
                likes.map(({ post_id, comment_id, user_id }) => [
                    post_id,
                    comment_id,
                    user_id
                ]))
            const seedComments = format('INSERT INTO comments (post_id, user_id, comment_content) VALUES %L',
                comments.map(({ post_id, user_id, comment_content }) => [
                    post_id, user_id, comment_content
                ])
            )
            const commentsPromise = db.query(seedComments)
            return Promise.all([postImagesPromise, commentsPromise])
                .then(() => {
                    return db.query(seedLikes)
                })
        })
        .then(() => {
            console.log(process.env.NODE_ENV === 'test' ? messages.successLocal : messages.successProduction)
            db.end()
        })
}
seed(data)
module.exports = { seed }
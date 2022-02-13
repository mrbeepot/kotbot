require("dotenv").config();
const axios = require("axios");
const isNotVisited = require("./db").isNotVisited;
const markAsVisited = require("./db").markAsVisited
const getUnvisitedPost = require("./db").getUnvisitedPost;
const reddit = require("./reddit");
const telegram = require("./telegram")
const subreddits = require("./config").subreddits;



// const subreddits = process.env.subreddits.split(",")
let counter = 0;
const timeoutInterval = parseInt(process.env.interval)
console.log(timeoutInterval)

const runner = async () => {
    const currentSubreddit = subreddits[counter];
    counter = (counter + 1) % subreddits.length;
    console.log(`current subreddit = ${currentSubreddit}`)
    axios.get(
        reddit.getJsonUrlForSubreddit(currentSubreddit), 
        reddit.getRedditApiRequestOptions()
    )
    .then(reddit.extractSubredditData)
    .then(data => {
        getUnvisitedPost(data)
        .then(post => telegram.sendPost(post))
        .then(post => markAsVisited(post))
        .catch(error => {
            console.log(`Could not post kot because tg server returned ${error}`);
        });
    })
}

// runner();
setInterval(runner, timeoutInterval);
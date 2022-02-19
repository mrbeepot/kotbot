const getUrlForSubreddit = (subreddit) => `https://reddit.com/r/${subreddit}`
const getJsonUrlForSubreddit = (subreddit) => `${getUrlForSubreddit(subreddit)}/.json`

const getRedditApiRequestOptions = () =>({
    headers: {
        'Host': 'www.reddit.com'
    }
});

const extractSubredditData =  (resp) => {
    console.log(`Resp status = ${resp.status}`);
    const children = resp.data.data.children;
    return children
    .map(child => child.data)
    .filter(child => !!!child.stickied)
    .filter(child => {
        console.log(`post hint = ${child.post_hint} domain = ${child.domain}`)
        if(child.post_hint === "image") {
            return true;

        } else if(child.post_hint === "link" && child.domain === "imgur.com") {
            console.log("Imgur link spotted.")
            return true;
        }
        else {
            console.log("Post hint is not an image. Skipping this one.");
            return false;
        }
    })
    .map(child => ({
        id: child.id,
        subreddit: child.subreddit,
        title: child.title,
        mediaLink: child.url_overridden_by_dest,
        permalink: 'https://reddit.com' + child.permalink
    }));
}

module.exports = {
    getUrlForSubreddit,
    getJsonUrlForSubreddit,
    getRedditApiRequestOptions,
    extractSubredditData
}
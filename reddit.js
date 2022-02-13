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
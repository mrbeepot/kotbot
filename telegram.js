const axios = require("axios");

const botKey = process.env.bot_api_key;
const chatIDs = process.env.chat_id.split(",");

const baseUrl = `https://api.telegram.org/bot${botKey}`;
const sendMessageUrl = `${baseUrl}/sendMessage`;
const sendPhotoUrl = `${baseUrl}/sendPhoto`;

const sendPost = async (post) => {

    return Promise.all(chatIDs.map(id => {
        return axios.get(sendMessageUrl, {
            params: {
                chat_id: id,
                text: post.permalink
            }
            })
            .then(resp => post);
        })
    ).then(allVals => post)

};

const sendCustomPhoto = async (post) => {
    return Promise.all(chatIDs.map(id => {
        return axios.get(sendPhotoUrl, {
            params: {
                chat_id: id,
                caption: getHTMLCaption(post),
                parse_mode: "HTML",
                photo: post.mediaLink,
                reply_markup: getInlineData(post)
            }
            })
            .then(resp => post);
        })
    ).then(allVals => post)
};

const getHTMLCaption = (post) => {
    return [
        `${post.title}`,
        `Posted on: <b>r/${post.subreddit}</b>`
    ].join("\n\n");
};


const getInlineData = (post) => ({
    "inline_keyboard": [
        [
            {
                "text": "Open Reddit Link",
                "url": post.permalink
            }
        ]
    ]
});

module.exports = {
    sendPost,
    sendCustomPhoto
}
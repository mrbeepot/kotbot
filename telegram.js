const axios = require("axios");

const botKey = process.env.bot_api_key;
const chatID = process.env.chat_id;

const baseUrl = `https://api.telegram.org/bot${botKey}`;
const sendMessageUrl = `${baseUrl}/sendMessage`;

const sendPost = async (post) => {

    return axios.get(sendMessageUrl, {
        params: {
            chat_id: chatID,
            text: post.permalink
        }
    }).then(resp => post);

};

module.exports = {
    sendPost
}
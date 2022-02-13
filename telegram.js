const axios = require("axios");

const botKey = process.env.bot_api_key;
const chatIDs = process.env.chat_id.split(",");

const baseUrl = `https://api.telegram.org/bot${botKey}`;
const sendMessageUrl = `${baseUrl}/sendMessage`;

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

module.exports = {
    sendPost
}
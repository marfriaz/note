const { DATABASE_ID, GET_URL, POST_URL, AUTH_TOKEN } = require("./config");

const axios = require("axios");

// Service object to handle database interactions.
// API request will return a promise
const PageService = {
  getPageInfo() {
    return axios.get(GET_URL, {
      headers: {
        "content-type": "application/json",
        authorization: AUTH_TOKEN,
      },
    });
  },

  postPage(properties) {
    return axios.post(
      POST_URL,
      {
        parent: { database_id: DATABASE_ID },
        properties: properties,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: AUTH_TOKEN,
        },
      }
    );
  },

  // Return needed attributes in HTTP Response
  // Could expand to return more attributes such as column data type
  standardizeResponse(res) {
    return {
      title: res.data.title[0].plain_text,
      columns: Object.keys(res.data.properties),
    };
  },
};

module.exports = PageService;

// AUTH_TOKEN would normally go in .env

const database_id = "f280759fc83b4bb9be3cf22b7c34c310";

module.exports = {
  PORT: process.env.PORT || 8000,
  DATABASE_ID: database_id,
  GET_URL: `https://api.notion.com/v1/databases/${database_id}`,
  POST_URL: "https://api.notion.com/v1/pages",
  AUTH_TOKEN: "Bearer secret_FAR7usaNgx0mbb92yWLAD1eLOp5nS7z28mrE4C4FUiq",
};

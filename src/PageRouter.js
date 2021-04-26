const express = require("express");
const PageService = require("./PageService");
const PageRouter = express.Router();
const jsonBodyParser = express.json();

// Express Router to handle HTTP requests.
PageRouter.route("/")

  // GET request returns database title and columns, or Error
  // Edge case considered: Message for databases that have no columns
  .get((req, res, next) => {
    PageService.getPageInfo()
      .then((data) => {
        res.status(data.status).json(PageService.standardizeResponse(data));
      })
      .catch(next);
  })

  // POST request returns success message
  // Edge case considered: could define character count limits as defined by Notion's Request limits
  // Edge case considered: could define input type based on GET response
  .post(jsonBodyParser, (req, res, next) => {
    const { properties } = req.body;
    let standardizedProperties = standardizeProperties(properties);

    PageService.postPage(standardizedProperties)
      .then((data) => {
        res.status(data.status).json("Page Created");
      })
      .catch(next);
  });

// Standardizes Request Body to match Notion's api /pages requirements
// Could be updated to consider other data types, or additional attributes
function standardizeProperties(properties) {
  let standardizedProperties = {};
  let keys = Object.keys(properties);

  keys.forEach(
    (key) =>
      (standardizedProperties[key] = [
        { text: { content: `${properties[key]}` } },
      ])
  );

  return standardizedProperties;
}

module.exports = PageRouter;

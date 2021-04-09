const CurrentDate = require("./CurrentDate");
const https = require("https");
const stdin = process.openStdin();
const { appToken, limit } = require("./Constants");

const FoodTruckFinder = {
  // This method makes GET request to Socrata SF Food Trucks API
  getFoodTrucks(offset) {
    // Query parameters with Socrata-API SQL queries
    const queryParams = {
      dayofweekstr: `${CurrentDate.getDay()}`,
      $where: `start24<='${CurrentDate.getTime()}'%20and%20end24>'${CurrentDate.getTime()}'`,
      $select: "applicant,location",
      $order: "applicant",
      $limit: `${limit}`,
      $offset: `${offset}`,
    };

    const formatParams = (params) => {
      const queryItems = Object.keys(params).map(
        (key) => `${key}=${params[key]}`
      );
      return "?" + queryItems.join("&");
    };

    const queriedPath = `/resource/jjew-r69b.json${formatParams(queryParams)}`;

    const options = {
      hostname: "data.sfgov.org",
      path: queriedPath,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": appToken,
      },
    };
    // Makes GET request to Food Truck API, prints results and checks next page
    const req = https.request(options, function (res) {
      res.on("data", function (responseData) {
        const foodTruckData = JSON.parse(responseData);
        const foodTruckCount = foodTruckData.length;

        if (foodTruckData.error) {
          console.log(foodTruckData.code + ": " + foodTruckData.message);
          process.exit();
        } else {
          FoodTruckFinder.displayToTerminal(foodTruckData, foodTruckCount);
          FoodTruckFinder.checkNextPage(foodTruckCount, offset);
        }
      });
    });
    // Connection error
    req.on("error", (error) => {
      console.log(error.message);
    });
    req.end();
  },

  // This method prints foodtrucks to terminal
  displayToTerminal(foodTrucks, count) {
    for (let i = 0; i < count; i++) {
      console.log(foodTrucks[i].applicant.padEnd(75) + foodTrucks[i].location);
    }
  },

  // This method checks if there is a next page and enables user input
  checkNextPage(currCount, offset) {
    if (currCount === limit) {
      console.log("PRESS ENTER TO VIEW MORE");

      // Enable user input on console
      stdin.addListener("data", function () {
        stdin.removeAllListeners("data");
        FoodTruckFinder.getFoodTrucks(offset + limit);
      });
    } else {
      console.log("NO MORE OPEN FOOD TRUCKS");
      process.exit();
    }
  },
};

module.exports = FoodTruckFinder;

#!/usr/bin/env node
const FoodTruckFinder = require("./FoodTruckFinder");
const CurrentDate = require("./CurrentDate");

console.log(
  `VIEWING OPEN SF FOOD TRUCKS FOR ${CurrentDate.getDay()} AT ${CurrentDate.getTime()}. ENJOY!!!!`,
  "\n"
);

console.log("NAME".padEnd(75) + "ADDRESS");

FoodTruckFinder.getFoodTrucks(0);

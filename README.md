# Food-truck-finder

## Prereqs

Please ensure you have the latest version of Node downloaded.

- To check if already downloaded, from terminal: node -v
- To install, visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Setup

1. From terminal, cd into food-truck-finder directory
2. Install dependencies (npm install)
3. Run program

- If you have admin priveldges:

  1. Within project directory, run 'npm link'
  2. From terminal run 'show-open-food-trucks'. Click enter to continue. Press 'ctrl + c' to quit
  3. When finished, from project directory, run 'npm unlink'

- If you have do not have admin priveldges:
  1. Within directory, run 'npm start'. Click enter to continue. Press 'ctrl + c' to quit

## Write Up

I would take this command line app and convert it to a fully featured web app by adding:

New Features:

- A frontend UI, that supports an an infinite scroll feature where users are fed more content until the end of open food trucks is met. Once the frontend detects the user is nearing the bottom of the page, an asynchronous request is made to the server to load more food trucks and the response data is inserted into the DOM when made available.
- Support ability to change day of the week and time of the day, instead of depending on system date. These parameters would be selected from the frontend UI, and the server would modify the queryParams object in the FoodTruckFinder.js file.
- Add Google Maps feature to frontend UI. The Socrates API has longitude and longitude data for each food truck which could be used in the Google Maps API to give the user a visualization of food trucks in SF or even around the user, if we used the user’s location data.
- Add types of food the trucks serve using the Optionaltext column. User can also be given the option to filter by types of food.
- Add better error handling messages that provide actionable insight to the user.

To Scale:

- Add caching such a Redis Cache to support quicker lookups.
- Add load balancers to distribute requests to multiple servers.
- For frontend, use external CSS and Javascript files instead of inline in our HTML documents so browser could cache static files.

const connectToHueAPI = require("./connectToHueApi");
const getAllLights = require("./getAllLights");
const { USERNAME } = require("../config");

async function listLightNames() {
  const api = await connectToHueAPI(USERNAME);
  const allLights = await getAllLights(api);
  console.log("All lights found:");
  allLights.forEach((thisLight) => {
    console.log(`* ${thisLight.data.name}`);
  });
}

module.exports = listLightNames;

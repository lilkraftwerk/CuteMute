const v3 = require("node-hue-api").v3;

async function connectToHueAPI(username) {
  const searchResults = await v3.discovery.nupnpSearch();
  const host = searchResults[0].ipaddress;
  const api = await v3.api.createLocal(host).connect(username);
  if (api) {
    return Promise.resolve(api);
  } else {
    return Promise.reject();
  }
}

module.exports = connectToHueAPI;

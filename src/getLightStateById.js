async function getLightStateById(lightID, api) {
  const lightState = await api.lights.getLightState(lightID);
  if (lightState !== null) {
    return Promise.resolve(lightState);
  } else {
    return Promise.reject();
  }
}

module.exports = getLightStateById;

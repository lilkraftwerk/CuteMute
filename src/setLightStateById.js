async function setLightStateById(lightID, lightState, api) {
  const result = await api.lights.setLightState(lightID, lightState);
  return result;
}

module.exports = { setLightStateById };

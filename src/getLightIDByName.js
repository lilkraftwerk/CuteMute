async function getLightIDByName(lightToFind, api) {
  const allLights = await api.lights.getAll();
  let lightID;
  allLights.forEach((light) => {
    if (light.name === lightToFind) {
      lightID = light.data.id;
    }
  });

  if (lightID !== null) {
    return Promise.resolve(lightID);
  } else {
    return Promise.reject();
  }
}

module.exports = getLightIDByName;

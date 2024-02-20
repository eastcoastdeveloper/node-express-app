function processCountryClick(index, results) {
  const currentHost = `${window.location.protocol}//${window.location.hostname}/details`;
  console.log(`host: ${currentHost}`);
  const countryData = {
    name: results[index].name.common,
    region: results[index].region,
    capital: results[index].capital,
    population: results[index].population,
    unMember: results[index].unMember,
    landlocked: results[index].landlocked,
    flag: results[index].flag,
    flags: results[index].flags.png,
  };
  fetch(`${currentHost}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ countryData: countryData, payload: results }),
    cache: 'default',
  }).then(() => {
    // NAVIGATE TO /DETAILS/COUNTRY-NAME
    const countryName = countryData.name.replace(/ /g, '');
    window.location.assign(`/details/${countryName}`);
  });
}

export { processCountryClick };

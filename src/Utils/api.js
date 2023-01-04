export const fetchCountries = () =>
  fetch("https://restcountries.com/v2/region/americas").then((response) =>
    response.json()
  );

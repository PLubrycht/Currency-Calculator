const form = document.querySelector("#currency-form");
const input = document.querySelector("#enterValue");
const listOfCurrencies = document.querySelector("#currenciesList");
const calculatedValue = document.querySelector("#calculatedValue");
const loader = document.querySelector(".loader");

const fetchingData = (event) => {
  event.preventDefault();

  const selectedCurrency = listOfCurrencies.value;

  if (!selectedCurrency) {
    alert("Please select a Currency.");
    return;
  }
  loader.style.display = "inline-block";
  fetch("https://api.nbp.pl/api/exchangerates/tables/a")
    .then((response) => response.json())
    .then((data) => {
      const rates = data?.[0]?.rates;

      if (!rates) {
        alert(`Failed getting currency rates`);
        return;
      }

      const selectedRate = rates.find((rate) => rate.code === selectedCurrency);

      if (!selectedRate) {
        alert("Failed to find selected currency.");
        return;
      }

      const rate = selectedRate.mid;
      const result = (Number(input.value) * rate).toFixed(2) + " PLN";
      calculatedValue.textContent = result;
    })
    .catch((e) => alert("Error, cannot communicate with server."))
    .finally(() => {
      loader.style.display = "none";
    });
};

form.addEventListener("submit", fetchingData);

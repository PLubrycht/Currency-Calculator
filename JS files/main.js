const btn = document.querySelector("#calculateButton");
const input = document.querySelector("#enterValue");
const listOfCurrencies = document.querySelector("#currenciesList");
let currencyRate = {};
let calculatedValue = document.querySelector("#calculatedValue");

const fetchingData = () => {
  btn.disabled = true;
  fetch("http://api.nbp.pl/api/exchangerates/tables/a")
    .then((response) => response.json())
    .then((data) => {
      if (!data[0].rates) {
        alert(`Failed getting currency rates`);
        return;
      }
      const neededCurrencies = [
        data[0].rates[1],
        data[0].rates[7],
        data[0].rates[9],
      ];
      neededCurrencies.forEach((neededCurrency) => {
        const option = document.createElement("option");
        option.textContent = neededCurrency.code;
        option.value = neededCurrency.mid;
        listOfCurrencies.appendChild(option);
        const calculation = () => {
          calculatedValue.textContent = calculatedValue.value;
          calculatedValue.value =
            Number(input.value * listOfCurrencies.value).toFixed(2) + " PLN";
        };

        btn.addEventListener("click", calculation);
      });
    })
    .catch((e) => alert(`Error, cannot comunicate with server`))
    .finally(() => {
      btn.disabled = false;
    });
};
fetchingData();

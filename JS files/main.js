const btn = document.querySelector("#calculateButton");
const input = document.querySelector("#enterValue");
const listOfCurrencies = document.querySelector("#currenciesList");
let currencyRate = {};
let calculatedValue = document.querySelector("#calculatedValue");

const fetchingData = () => {
  btn.disabled = true;

  fetch("https://api.nbp.pl/api/exchangerates/tables/a")
    .then((response) => response.json())
    .then((data) => {
      const rates = data[0].rates;
      console.log(typeof rates);
      console.log(rates);
      if (!rates) {
        alert(`Failed getting currency rates`);
        return;
      }

      const ratesCodes = ["USD", "EUR", "CHF"];

      const neededCurencies = rates.filter((rate) =>
        ratesCodes.includes(rate.code)
      );

      neededCurencies.forEach((neededCurrency) => {
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

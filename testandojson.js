const Cryptooos = require("./cryptoruntest.json");
const allCoins = Cryptooos.data.map((element) => {
  return { nome_da_moeda: element.name, valor_moeda: element.quote.USD.price };
});
const filtrandoCoin = allCoins.filter((element) => {
  return element.nome_da_moeda === "Tether";
});

const htmlCoing = Cryptooos.data.map((element) => {
  return `<option value="${element.name}"> ${element.name}</option>`;
});
console.log(htmlCoing);

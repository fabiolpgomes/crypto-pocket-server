const Cryptooos = require("./cryptoruntest.json");
const allCoins = Cryptooos.data.map((element) => {
  return { nome_da_moeda: element.name, valor_moeda: element.quote.USD.price };
});
console.log(allCoins);

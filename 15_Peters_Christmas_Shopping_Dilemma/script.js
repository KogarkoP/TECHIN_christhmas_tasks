const input = prompt(
  "Enter the prices of book, CD, and USB separated by spaces:"
);

const prices = input
  .trim()
  .split(/\s+/)
  .map(Number)
  .filter((n) => !isNaN(n));

while (prices.length < 3) {
  let more = prompt(
    `You entered ${prices.length} price(s). Please enter the remaining ${
      3 - prices.length
    } price(s):`
  );
  prices.push(
    ...more
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter((n) => !isNaN(n))
  );
}

const minPrice = Math.min(...prices);

document.getElementById(
  "result"
).innerHTML = `Peter will spend ${minPrice.toFixed(2)} &#8364`;

const juiceAmounts = [45, 92, 33];

const results = juiceAmounts.map((litersOfJuice) => {
  const amountOf5lBarrels = Math.floor(litersOfJuice / 5);
  const leftoverAfter5l = litersOfJuice % 5;

  const amountOf2lJugs = Math.floor(leftoverAfter5l / 2);
  const leftoverAfter2l = leftoverAfter5l % 2;

  const amountOf1lFlasks = leftoverAfter2l;

  return [amountOf5lBarrels, amountOf2lJugs, amountOf1lFlasks];
});

for (let i = 0; i < results.length; i++) {
  console.log(results[i].join(" "));
}

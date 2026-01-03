const boughtItemsInStores = [
  [1.07, 2.92, 3.45, 1.09, 0.89],
  [1.08, 2.35, 3.75, 1.12, 0.69],
  [0.98, 2.48, 3.62, 1.1, 0.72],
];

const calculateSantaExpenses = (stores) => {
  let totalSpent = 0;
  let totalItems = 0;
  for (let i = 0; i < stores.length; i++) {
    let storeTotal = 0;

    for (let j = 0; j < stores[i].length; j++) {
      storeTotal += stores[i][j];
    }

    console.log(
      `In store ${i + 1}, ${
        stores[i].length
      } items were bought and Santa spent ${storeTotal.toFixed(2)}€`
    );
    totalItems += stores[i].length;
    totalSpent += storeTotal;
  }

  console.log(
    `Santa totally spent ${totalSpent.toFixed(2)}€ in ${
      stores.length
    } stores and bought ${totalItems} items`
  );
};

calculateSantaExpenses(boughtItemsInStores);

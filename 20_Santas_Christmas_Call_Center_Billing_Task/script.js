import { elves, priceList } from "./src/Data/dataMockup.js";

const calculateCallCosts = (elves, priceList) => {
  const sortedElves = [...elves].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  let totalCollected = 0;

  const tableData = sortedElves.map((elf) => {
    const total = elf.calls.reduce((sum, call) => {
      const price = priceList[call.city];
      return sum + call.minutes * price;
    }, 0);

    totalCollected += total;

    return {
      FirstName: elf.firstName,
      LastName: elf.lastName,
      TotalCost: total.toFixed(2),
    };
  });

  console.table(tableData);

  console.log(`Total: ${totalCollected.toFixed(2)}`);
};

calculateCallCosts(elves, priceList);

// PLEASE GO LIVE TO SEA THE RESULT!!!
// You will see the result in console

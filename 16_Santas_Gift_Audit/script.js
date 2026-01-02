const workshopsData = [
  [5, 7, 3],
  [6, 4, 4, 5],
  [10, 2],
];

const workshopsResultCalculation = () => {
  let total = 0;

  for (let i = 0; i < workshopsData.length; i++) {
    let sum = 0;
    for (let j = 0; j < workshopsData[i].length; j++) {
      sum += workshopsData[i][j];
    }

    console.log(`Workshop ${i + 1} made ${sum} gifts`);
    total += sum;
  }

  console.log(`Santa’s total gift count is ${total}`);
};

workshopsResultCalculation();

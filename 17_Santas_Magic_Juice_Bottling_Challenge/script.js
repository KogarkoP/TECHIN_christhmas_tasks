const elves = [
  { name: "Sparkle", liters: 45 },
  { name: "Twinkle", liters: 92 },
  { name: "Jingle", liters: 33 },
];

elves.forEach((elf) => {
  const amountOf5lBarrels = Math.floor(elf.liters / 5);
  const leftoverAfter5l = elf.liters % 5;

  const amountOf2lJugs = Math.floor(leftoverAfter5l / 2);
  const leftoverAfter2l = leftoverAfter5l % 2;

  const amountOf1lFlasks = leftoverAfter2l;

  console.log(
    `${elf.name}: ${amountOf5lBarrels} ${amountOf2lJugs} ${amountOf1lFlasks}`
  );
});

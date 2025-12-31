import { words } from "./mockupData.js";

const groupAnagrams = (words) => {
  const groups = {};

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    const sortedWord = word.split("").sort().join("");

    if (!groups[sortedWord]) {
      groups[sortedWord] = [];
    }

    groups[sortedWord].push(word);
  }

  const result = Object.values(groups);

  for (let i = 0; i < result.length; i++) {
    result[i].sort();
  }

  result.sort((a, b) => {
    return a.length < b.length ? 1 : -1;
  });

  return result;
};

const startButton = document.getElementById("start_button");
startButton.addEventListener("click", () => {
  console.log(groupAnagrams(words));
});

// PLEASE GO LIVE TO SEA THE RESULT!!!
// By pressing button "Press Me" you will see the result in console

const btn = document.querySelector("#generate");
const input = document.querySelector("#generated");

// you can find config variable in `config.js` file within the source code
const { length, rounds, _saltLength, $_salt, chars, numbers } = config;

// onload
document.addEventListener("DOMContentLoaded", () => {
  const generated = process();

  input.value = generated;
});

// attach click listener on the generate button
btn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent browser defaults

  const generated = process();

  input.value = generated;
});

function process() {
  const salt = new Array(rounds);
  let generatedPassword = null;

  for (let i = rounds; i > 0; i--) {
    const random$SaltIndex = generateRandomIndex($_salt.length);
    salt.push($_salt[random$SaltIndex]);

    generatedPassword = generate();
  }

  generatedPassword = [...generatedPassword, ...salt];

  for (let i = 0; i < rounds; i++) {
    generatedPassword = randomizeArray(generatedPassword);
  }

  generatedPassword = generatedPassword.join("");
  generatedPassword = generatedPassword.split("");

  generatedPassword.splice(
    generatedPassword.length - rounds,
    generatedPassword.length
  );

  generatedPassword = generatedPassword.join("");

  return generatedPassword;
}

function generate() {
  let array = [];

  for (let i = 1; i < length + 1; i++) {
    const randomCharIndex = generateRandomIndex(chars.length);
    const randomNumberIndex1 = generateRandomIndex(numbers.length);
    const randomNumberIndex2 = generateRandomIndex(numbers.length);

    array.push(
      numbers[randomNumberIndex1],
      chars[randomCharIndex],
      numbers[randomNumberIndex2]
    );
  }

  array.splice(length, array.length);

  array = randomizeArray(array);

  return array;
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function randomizeArray(array) {
  const randomized = array;

  for (let i = 0; i < randomized.length; i++) {
    const j = Math.floor(Math.random() * randomized.length);
    let temp = randomized[i];
    randomized[i] = randomized[j];
    randomized[j] = temp;
  }

  return randomized;
}

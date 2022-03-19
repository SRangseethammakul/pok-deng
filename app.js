const cards = require("./cards");
let _playerBet = 0;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commandQuestion = (qa) => {
  return new Promise((resolve) => {
    readline.question(qa, (bet) => {
      readline.close();
      resolve(bet);
    });
  });
};

const clearCard = () => {
  return new Promise((resolve) => {
    for (const card of cards) {
      card.isUsed = false;
    }
  });
};
const calPoint = (playerFirst, playerSecond, ownFirsrt, ownSecond, bet) => {
  return new Promise((resolve) => {
    let playerPoint = playerFirst + playerSecond;
    let ownPoint = ownFirsrt + ownSecond;
    if (playerPoint > ownPoint) {
      resolve(`You won!!!, received ${bet} chips`);
    } else if (playerPoint < ownPoint) {
      resolve(`You lose!!!, loss ${bet} chips`);
    } else {
      resolve(`equal !!!`);
    }
  });
};
const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let numRan = Math.floor(Math.random() * (max - min) + min);
  return numRan; //The maximum is exclusive
};
const getCard = () => {
  let num = getRandomArbitrary(0, 52);
  cards[num].isUsed = true;
  return cards[num];
};
let round = 0;
let cardPlayer = [];
let cardOwn = [];
const run = async () => {
  let bet = await commandQuestion("Please put your bet ");
  while (true) {
    round++;
    cardPlayer.push(getCard());
    cardOwn.push(getCard());
    if (round === 2) {
      console.log(
        `You got ${cardPlayer[0].cardName},  ${cardPlayer[1].cardName}`
      );
      console.log(
        `The dealer got ${cardOwn[0].cardName},  ${cardOwn[1].cardName}`
      );
      let finalScoring = await calPoint(
        cardPlayer[0].point,
        cardPlayer[1].point,
        cardOwn[0].point,
        cardOwn[1].point,
        bet
      );
      console.log(finalScoring);
      let newRound = await commandQuestion("Wanna play more (Yes/No)? ");
      if (newRound === "no" || newRound === "n" || newRound === "No") {
        break;
      }

      // clear for new round
      await clearCard();
      round = 0;
      cardPlayer = [];
      cardOwn = [];
    }
  }
  console.log(`You got total ${bet} chips`);
};
run();

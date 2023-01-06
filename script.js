"use strict";
const option_btns = document.querySelectorAll("[op]");
const options = document.querySelector(".options");
const game_result = document.querySelector(".game-result");
const your_pick = document.querySelector(".you-picked");
const they_picked = document.querySelector(".they-picked");
const before_picking = document.querySelector(".before-picking");
const score = document.querySelector(".score-digit");
const result_text = document.querySelector(".result-text");
const you = document.querySelector(".you");
const they = document.querySelector(".they");
const play_Again = document.querySelector(".again");
const result = document.querySelector(".result");
const rules_btn = document.querySelector(".rules");
const rules_page = document.querySelector(".rules-page");
const ruels_wrapper = document.querySelector(".rules-wrapper");
const x = document.querySelector(".x");

const game_state = {
  myMove: null,
  theirMove: null,
  result: null,
  score: 0,
};
//create a template which matches each option with its
//background image , box shadow, border
const optionsDesigns = {
  rock: {
    background_image: 'url("images/icon-rock.svg")',
    border: "30px solid rgb(191, 89, 89)",
    box_shadow:
      "0px 8px 0px rgb(154, 64, 64), 0px 8px 5px inset rgb(170, 159, 159)",
  },
  paper: {
    background_image: 'url("images/icon-paper.svg")',
    border: "30px solid rgb(104, 104, 226)",
    box_shadow:
      "0px 8px 0px rgb(55, 55, 143), 0px 8px 5px inset rgb(170, 159, 159)",
  },
  scissors: {
    background_image: 'url("images/icon-scissors.svg")',
    border: "25px solid rgb(218, 167, 73)",
    box_shadow:
      "0px 8px 0px rgb(150, 114, 46),0px 8px 5px inset rgb(170, 159, 159)",
  },
};
//write all the winning combinations
const winningCombos = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
//losing combos
const losingCombos = {
  rock: "paper",
  scissors: "rock",
  paper: "scissors",
};

const game = function () {
  option_btns.forEach((op) =>
    op.addEventListener("click", (e) => {
      game_state.myMove = e.target.classList.value;
      transition();
    })
  );
  play_Again.addEventListener("click", playAgain);
  rules_btn.addEventListener("click", showRules);
};
const showRules = function () {
  rules_page.classList.remove("hidden");
  ruels_wrapper.classList.add("overlay");
  ruels_wrapper.classList.remove("hidden");
  x.addEventListener("click", () => {
    rules_page.classList.add("hidden");
    ruels_wrapper.classList.remove("overlay");
    ruels_wrapper.classList.add("hidden");
  });
};
const playAgain = function () {
  game_result.classList.add("hidden");
  options.classList.remove("hidden");
  you.classList.remove("winner");
  they.classList.remove("winner");
  they.classList.add("hidden");
  result.classList.add("hidden");
  before_picking.classList.remove("hidden");
};
//transition from the first page to the result page
const transition = function () {
  options.classList.add("hidden");
  game_result.classList.remove("hidden");
  display(true);
  theirPick();
  findWinner();
  setTimeout(() => display(false), 1100);
};
//display the right designs
const display = function (bool) {
  const pick = bool ? your_pick : they_picked;
  const move = bool ? game_state.myMove : game_state.theirMove;
  pick.style.border = optionsDesigns[move]["border"];
  pick.style["background-image"] = optionsDesigns[move]["background_image"];
  pick.style["box-shadow"] = optionsDesigns[move]["box_shadow"];
  if (!bool) {
    //make all the changes to the dom
    they.classList.remove("hidden");
    before_picking.classList.add("hidden");
    //change the score
    score.textContent = game_state.score;
    //change the result text
    result_text.textContent = game_state.result;
    result.classList.remove("hidden");
  }
};
//randomly makes and sets a move for the opponent
const theirPick = function () {
  const possibilities = ["rock", "paper", "scissors"];
  //random index between 0 and 2
  game_state.theirMove = possibilities[Math.floor(Math.random() * 3)];
};
//based on your pick and their pick finds the winner of two
const findWinner = function () {
  if (winningCombos[game_state.myMove] === game_state.theirMove) {
    game_state.result = "YOU WIN";
    game_state.score++;
    //add the winner shadow
    setTimeout(() => you.classList.add("winner"), 1100);
    //z-index
    they.style["z-index"] = 1;
  } else if (losingCombos[game_state.myMove] === game_state.theirMove) {
    game_state.result = "YOU LOSE";
    game_state.score--;
    //add the winner shadow
    they.classList.add("winner");
    //z-index
    they.style["z-index"] = -1;
  } else {
    game_state.result = "DRAW";
  }
};
game();

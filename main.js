`use strict`;

import { getElements, initialState } from "./modules/var.js";
import {
  createModalController,
  playRound,
  createPick,
} from "./modules/modal.js";

let modalState = { visible: false };
let gameState = initialState; // immutable game state (separate from modal state)

const { rulesModal, openRulesBtn, closeRulesBtn } = getElements();

const modal = createModalController(rulesModal);

const choiceButtons = document.querySelectorAll(`.choice`);

const openHandler = () => {
  modalState = modal.open(); // pure-ish (returns state)
  modal.apply(modalState);
  document.querySelector(`.rules-btn`).style.visibility = `hidden`;
};
const closeHandler = () => {
  modalState = modal.close();
  modal.apply(modalState);
  document.querySelector(`.rules-btn`).style.visibility = `visible`;
};

openRulesBtn?.addEventListener(`click`, openHandler);
closeRulesBtn?.addEventListener(`click`, closeHandler);

// handling user choice click

// gameState is initialized above (keeps game and modal state separate).

choiceButtons.forEach((button) => {
  button.addEventListener(`click`, (event) => {
    const playerChoice = event.currentTarget.dataset.choice;

    gameState = playRound(gameState, playerChoice);
    render(gameState);
    // game.style.display = `none`;
  });
});

function render(gameState) {
  if (!gameState.playerChoice) return;

  renderPlayerPick(gameState.playerChoice);
  hideHousePick();
  hideOutcome();

  setTimeout(() => {
    renderHousePick(gameState.houseChoice);

    setTimeout(() => {
      renderOutcome(gameState.result);
      updateScore(gameState.score);
    }, 500);
  }, 800);

  // renderPicks(gameState);
  // updateScore(gameState.score);
  // renderOutcome(gameState.result);
}

function renderPlayerPick(choice) {
  const game = document.querySelector(`.game`);
  const result = document.querySelector(`.result`);
  const playerContainer = document.querySelector(`.player-pick`);

  playerContainer.textContent = ``;
  playerContainer.appendChild(createPick(choice));

  game.classList.add(`preserve-layout-hidden`);
  result.classList.remove(`hidden`);
}

function hideHousePick() {
  const houseContainer = document.querySelector(`.house-pick`);
  houseContainer.textContent = ``;
  houseContainer.classList.add(`placeholder`);
}

function renderHousePick(choice) {
  const houseContainer = document.querySelector(`.house-pick`);

  houseContainer.classList.remove(`placeholder`);
  houseContainer.appendChild(createPick(choice));
}

function hideOutcome() {
  document.querySelector(`.outcome`).classList.add(`hidden`);
}

function updateScore(score) {
  const scoreEl = document.querySelector(".score-box .score");
  if (!scoreEl) return;
  scoreEl.textContent = String(score);
}

function getResultText(result) {
  if (result === `win`) return `YOU WIN`;
  if (result === `lose`) return `YOU LOSE`;
  return `DRAW`;
}

function renderOutcome(result) {
  const outcome = document.querySelector(`.outcome`);
  const text = document.querySelector(`.outcome-text`);

  text.textContent = getResultText(result);
  outcome.classList.remove(`hidden`);
}

function resetUI() {
  document.querySelector(`.game`).classList.remove(`preserve-layout-hidden`);
  document.querySelector(`.result`).classList.add(`hidden`);
  document.querySelector(`.outcome`).classList.add(`hidden`);
}

document.querySelector(`.play-again`).addEventListener(`click`, () => {
  gameState = initialState;
  resetUI();
});

window.addEventListener("resize", () => {
  if (rulesModal && !rulesModal.classList.contains("hidden")) {
    if (window.innerWidth >= 1024) {
      centerModal(rulesModal);
    }
  }
});

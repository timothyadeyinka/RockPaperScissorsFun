import { CHOICES, RULES } from "./var.js";

// pure: returns handler functions that operate on a passed-in modal element
export const createModalController = (modalEl) => {
  const open = () => ({ visible: true });
  const close = () => ({ visible: false });

  const apply = (state) => {
    // impure: minimal DOM effect, centralized
    if (!modalEl) return;
    modalEl.classList.toggle(`hidden`, !state.visible);
  };

  // returns pure reducers + an apply function
  return { open, close, apply };
};

// determine winner
export const getResult = (player, house) => {
  if (player === house) return `draw`;
  if (RULES[player] === house) return `win`;
  return `lose`;
};

export const getHouseChoice = () => {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
};

export const playRound = (state, playerChoice) => {
  const houseChoice = getHouseChoice();
  const result = getResult(playerChoice, houseChoice);

  return Object.freeze({
    ...state,
    playerChoice,
    houseChoice,
    result,
    score:
      result === `win`
        ? state.score + 1
        : result === `lose`
          ? state.score - 1
          : state.score,
  });
};

// DOM helper: create a pick node for use inside the result `.picked` containers.
// IMPORTANT: do NOT use the `.choice` class here — that class is for the
// absolute-positioned buttons in the game area and will break layout when
// appended into a different container.
export function createPick(choice) {
  const wrapper = document.createElement("div");
  // use a result-specific class (no absolute positioning)
  wrapper.className = `picked-choice ${choice || ""}`.trim();

  const inner = document.createElement("span");
  inner.className = "inner";

  const img = document.createElement("img");
  img.src = choice ? `images/icon-${choice}.svg` : "";
  img.alt = choice || "";

  inner.appendChild(img);
  wrapper.appendChild(inner);

  return wrapper;
}

export const renderPicks = ({ playerChoice, houseChoice }) => {
  const game = document.querySelector(`.game`);
  const result = document.querySelector(`.result`);

  const playerContainer = document.querySelector(`.player-pick`);
  const houseContainer = document.querySelector(`.house-pick`);

  // Clear previous
  playerContainer.textContent = ``;
  houseContainer.textContent = ``;

  // Insert picks
  playerContainer.appendChild(createPick(playerChoice));
  houseContainer.appendChild(createPick(houseChoice));

  // Toggle screens
  game.classList.add(`preserve-layout-hidden`);
  result.classList.remove(`hidden`);
};

function renderPlayerPick(choice) {
  const game = document.querySelector(`.game`);
  const result = document.querySelector(`.result`);
  const playerContainer = document.querySelector(`.player-pick`);

  playerContainer.textContent = ``;
  playerContainer.appendChild(createPick(choice));

  game.classList.add(`hidden`);
  result.classList.remove(`hidden`);
}

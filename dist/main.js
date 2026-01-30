`use strict`;

import { getElements } from "./modules/var.js";
import { createModalController } from "./modules/modal.js";

const { rulesModal, openRulesBtn, closeRulesBtn } = getElements();

const modal = createModalController(rulesModal);
let state = { visible: false };

const openHandler = () => {
  state = modal.open(); // pure-ish (returns state)
  modal.apply(state);
};
const closeHandler = () => {
  state = modal.close();
  modal.apply(state);
};

openRulesBtn?.addEventListener(`click`, openHandler);
closeRulesBtn?.addEventListener(`click`, closeHandler);

// handling user choice click
function updateState(state, updates) {
  return Object.freeze({
    ...state,
    ...updates,
  });
}

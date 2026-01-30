// named exports (preferred for tree shaking & clarity)
export const SELECTORS = Object.freeze({
  rulesModal: `.rules-modal`,
  openRulesBtn: `.rules-btn`,
  closeRulesBtn: `.rules-close`,
});

export const CSS = Object.freeze({
  bgRadial: `var(--bg-radial)`,
  colorPrimary: `var(--color-gold-500)`,
});

// small helper to resolve DOM elements (impure but minimal)
export const getElements = (doc = document, selectors = SELECTORS) => ({
  rulesModal: doc.querySelector(selectors.rulesModal),
  openRulesBtn: doc.querySelector(selectors.openRulesBtn),
  closeRulesBtn: doc.querySelector(selectors.closeRulesBtn),
});

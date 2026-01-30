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

// export const toggle = (state) => ({ ...state, visible: !state.visible });

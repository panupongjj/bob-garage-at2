// LocalStorage utilities for token, theme, and UI state

const TOKEN_KEY = 'bobs_garage_token';
const THEME_KEY = 'bobs_garage_theme';
const UI_STATE_KEY = 'bobs_garage_ui_state';

// Token management
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Theme management
export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

// UI State management (sidebar, etc.)
export const getUIState = () => {
  const state = localStorage.getItem(UI_STATE_KEY);
  return state ? JSON.parse(state) : { sidebarOpen: false };
};

export const setUIState = (state) => {
  localStorage.setItem(UI_STATE_KEY, JSON.stringify(state));
};


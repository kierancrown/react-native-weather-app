import {createSlice} from '@reduxjs/toolkit';

export interface SettingsState {
  onboarded: boolean;
}

const initialState: SettingsState = {
  onboarded: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    completeOnboarding: state => {
      state.onboarded = true;
    },
    resetSettings: state => {
      state.onboarded = false;
    },
  },
});

export const {completeOnboarding, resetSettings} = settingsSlice.actions;

export default settingsSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export interface IOnboardingState {
  onboarded: boolean;
}

const initialState: IOnboardingState = {
  onboarded: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
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

export const {completeOnboarding, resetSettings} = onboardingSlice.actions;

export default onboardingSlice.reducer;

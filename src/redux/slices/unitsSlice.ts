import {createSlice} from '@reduxjs/toolkit';

export interface UnitsState {
  tempUnit: 'C' | 'F';
  speedUnit: 'km/h' | 'mph';
  distanceUnit: 'km' | 'mi';
}

const initialState: UnitsState = {
  tempUnit: 'C',
  speedUnit: 'mph',
  distanceUnit: 'mi',
};

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setTempUnit: (
      state,
      action: {
        payload: 'C' | 'F';
      },
    ) => {
      state.tempUnit = action.payload;
    },
    setSpeedUnit: (
      state,
      action: {
        payload: 'km/h' | 'mph';
      },
    ) => {
      state.speedUnit = action.payload;
    },
    setDistanceUnit: (
      state,
      action: {
        payload: 'km' | 'mi';
      },
    ) => {
      state.distanceUnit = action.payload;
    },
    resetSettings: state => {
      state.distanceUnit = initialState.distanceUnit;
      state.speedUnit = initialState.speedUnit;
      state.tempUnit = initialState.tempUnit;
    },
  },
});

export const {setTempUnit, setSpeedUnit, setDistanceUnit, resetSettings} =
  unitsSlice.actions;

export default unitsSlice.reducer;

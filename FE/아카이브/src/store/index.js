import { configureStore } from "@reduxjs/toolkit";
import gpsSlice from "./gps";
import careerSlice from "./career";
import matSlice from "./matzip";

const store = configureStore({
  reducer: { career: careerSlice, gps: gpsSlice, mat: matSlice },
});

export default store;

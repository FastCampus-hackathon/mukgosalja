import { createSlice } from "@reduxjs/toolkit";

const initialCareerState = {
  career: "",
  period: false,
  state: 0,
  field: "",
  job: "",
  corporateType: "",
  workType: "",
};

const careerSlice = createSlice({
  name: "career",
  initialState: initialCareerState,
  reducers: {
    CAREER(state, action) {
      state.career = action.payload;
    },
    PERIOD(state, action) {
      state.period = action.payload;
    },
    STATE(state, action) {
      state.state = action.payload;
    },
    JOB(state, action) {
      state.job = action.payload;
    },
    FIELD(state, action) {
      state.field = action.payload;
    },
    CORPORATETYPE(state, action) {
      state.corporateType = action.payload;
    },
    WORKTYPE(state, action) {
      state.workType = action.payload;
    },
    RESET(state) {
      state.career = "";
      state.period = false;
      state.state = 0;
      state.job = "";
      state.field = "";
      state.corporateType = "";
      state.workType = "";
    },
  },
});

export const careerActions = careerSlice.actions;

export default careerSlice.reducer;

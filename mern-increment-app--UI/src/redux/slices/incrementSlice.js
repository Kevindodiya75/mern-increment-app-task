import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const incrementValue = createAsyncThunk(
  "increment/incrementValue",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/increment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error incrementing value:", error);
      return rejectWithValue("Error incrementing value");
    }
  }
);

export const getIncrementValue = createAsyncThunk(
  "increment/getIncrementValue",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/Getincrement`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching increment value:", error);
      return rejectWithValue("Error fetching increment value");
    }
  }
);

const incrementSlice = createSlice({
  name: "increment",
  initialState: {
    value: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementValue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload.incrementValue;
      })
      .addCase(incrementValue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getIncrementValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIncrementValue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload.incrementValue;
      })
      .addCase(getIncrementValue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default incrementSlice.reducer;

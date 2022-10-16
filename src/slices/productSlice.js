import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: null,
    data: null,
  },

  reducers: {
    setData: (state, action) => {
      state.data = action.payload
      state.loading = null
    },
  },
})

export const { setData } = productSlice.actions

export default productSlice.reducer

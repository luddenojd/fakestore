import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: null,
    items: null,
  },

  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
      state.loading = null
    },
  },
})

export const { setItems } = cartSlice.actions

export default cartSlice.reducer

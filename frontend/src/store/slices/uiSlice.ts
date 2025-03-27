import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobile: boolean;
  isSearchOpen: boolean;
}

const initialState: UIState = {
  isMobile: window.innerWidth < 768,
  isSearchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setIsMobile, setIsSearchOpen } = uiSlice.actions;
export default uiSlice.reducer; 
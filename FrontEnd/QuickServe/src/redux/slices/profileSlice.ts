import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  address: string;
}

const initialState: ProfileState = {
  name: 'Guest User',
  email: 'guest@example.com',
  phone: '+1 000 000 0000',
  profileImage: null,
  address: '123 Main Street, New York',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setProfile, setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;

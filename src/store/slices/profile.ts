import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/profile';
import { RootState } from '@/store';

interface ProfileState {
  profile: UserProfile | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state: ProfileState, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;

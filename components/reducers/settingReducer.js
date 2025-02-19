import { createSlice } from '@reduxjs/toolkit';


export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    loading: false,
    alert: [],
    selected: null,
    isLogin: false,
    isChatbotOpen: false,
    userInputLatest: '',
    fromForum: '',
    username: '',
    bgImageUrl: '/images/1.png',
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setSelected: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    setIsLogin: (state, action) => ({
      ...state,
      isLogin: action.payload,
    }),
    setIsChatbotOpen: (state, action) => ({
      ...state,
      isChatbotOpen: action.payload,
    }),
    setUserInputLatest: (state, action) => ({
      ...state,
      userInputLatest: action.payload,
    }),
    setFromForum: (state, action) => ({
      ...state,
      fromForum: action.payload,
    }),
    setAlert: (state, action) => ({
      ...state,
      alert: action.payload,
    }),
    setUsername: (state, action) => ({
      ...state,
      username: action.payload,
    }),
    setBgImageUrl: (state, action) => ({
      ...state,
      bgImageUrl: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
const { reducer: setting, actions } = settingSlice;
export const { setLoading,setSelected, setIsChatbotOpen, setSelectedConfig } = settingSlice.actions;
export const SettingActions = actions;
export default setting;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
		complexity: 4,
		pwdLength: 12,
		pwdAmount: 1,
		pwdUppercase: true,
		pwdLowercase: true,
		pwdNumbers: true,
		pwdSymbols: true,
		excludeSimilar: true,
		excludeDublicate: true
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
		setPwdLength: (state, action) => {
			state.pwdLength = action.payload.pwdLength;
			state.complexity = 0;
		},
		setPwdAmount: (state, action) => {
			state.pwdAmount = action.payload.pwdAmount;
		},
		setPwdUppercase: (state, action) => {
			state.pwdUppercase = action.payload.pwdUppercase;
			state.complexity = 0;
		},
		setPwdLowercase: (state, action) => {
			state.pwdLowercase = action.payload.pwdLowercase;
			state.complexity = 0;
		},
		setPwdNumbers: (state, action) => {
			state.pwdNumbers = action.payload.pwdNumbers;
			state.complexity = 0;
		},
		setPwdSymbols: (state, action) => {
			state.pwdSymbols = action.payload.pwdSymbols;
			state.complexity = 0;
		},
		setExcludeSimilar: (state, action) => {
			state.excludeSimilar = action.payload.excludeSimilar;
			state.complexity = 0;
		},
		setExcludeDublicate: (state, action) => {
			state.excludeDublicate = action.payload.excludeDublicate;
			state.complexity = 0;
		},
    setComplexity: (state, action) => {
      state.complexity = action.payload.complexity;
			switch (state.complexity) {
				case 1:
					state.pwdLength = 6;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = false;
					state.pwdSymbols = false;
					state.excludeDublicate = true;
					state.excludeSimilar = true;
					break;
				case 2:
					state.pwdLength = 8;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = true;
					state.pwdSymbols = false;
					state.excludeDublicate = true;
					state.excludeSimilar = true;
					break;
				case 3:
					state.pwdLength = 10;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = true;
					state.pwdSymbols = true;
					state.excludeDublicate = true;
					state.excludeSimilar = true;
					break;
				case 4:
					state.pwdLength = 12;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = true;
					state.pwdSymbols = true;
					state.excludeDublicate = true;
					state.excludeSimilar = true;
					break;
				case 5:
					state.pwdLength = 36;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = true;
					state.pwdSymbols = true;
					state.excludeDublicate = false;
					state.excludeSimilar = false;
					break;
				default:
					state.pwdLength = 8;
					state.pwdUppercase = true;
					state.pwdLowercase = true;
					state.pwdNumbers = true;
					state.pwdSymbols = true;
					state.excludeDublicate = true;
					state.excludeSimilar = true;
			}
    },
  },
});

// Action creators are generated for each case reducer function
export const { setComplexity,
							setPwdAmount,
							setPwdLength,
							setPwdUppercase,
							setPwdLowercase,
							setPwdNumbers,
							setPwdSymbols,
							setExcludeSimilar,
							setExcludeDublicate } = appSlice.actions;

export default appSlice.reducer;
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPwdUppercase,
				setPwdLowercase,
				setPwdNumbers,
				setPwdSymbols,
				setExcludeSimilar,
				setExcludeDublicate } from './../store/AppSlice';

export const PwdSettings = () => {
	const dispatch = useDispatch();
	const { pwdUppercase,
					pwdLowercase,
					pwdNumbers,
					pwdSymbols,
					excludeSimilar,
					excludeDublicate } = useSelector((state) => state.app);

	return (
		<>
			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Uppercase (ABC)</span>
						<input type="checkbox"
							disabled={true}
							checked={pwdUppercase}
							onChange={() => dispatch(setPwdUppercase({ pwdUppercase: !pwdUppercase }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Lowercase (abc)</span>
						<input type="checkbox"
							checked={pwdLowercase}
							onChange={() => dispatch(setPwdLowercase({ pwdLowercase: !pwdLowercase }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Numbers (0-9)</span>
						<input type="checkbox"
							checked={pwdNumbers}
							onChange={() => dispatch(setPwdNumbers({ pwdNumbers: !pwdNumbers }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Symbols (!@#$%^&*()+)</span>
						<input type="checkbox"
							checked={pwdSymbols}
							onChange={() => dispatch(setPwdSymbols({ pwdSymbols: !pwdSymbols }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Exclude Similar (iI1loO0)</span>
						<input type="checkbox"
							checked={excludeSimilar}
							onChange={() => dispatch(setExcludeSimilar({ excludeSimilar: !excludeSimilar }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Exclude Duplicate Characters (pp)</span>
						<input type="checkbox"
							checked={excludeDublicate}
							onChange={() => dispatch(setExcludeDublicate({ excludeDublicate: !excludeDublicate }))}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
			</div>
		</>
	);
};

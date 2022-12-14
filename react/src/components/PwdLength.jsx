import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPwdLength } from './../store/AppSlice';


export const PwdLength = () => {
	const dispatch = useDispatch();
	const checkLength = (e) => {
		if (Number(e.target.value) <= 4) {
			e.target.value = 4;
		} else if (Number(e.target.value) >= 50) {
			e.target.value = 50;
		}
		dispatch(setPwdLength({pwdLength: Number(e.target.value)}));
	};

	const pwdLength = useSelector((state) => state.app.pwdLength);

	return (
		<div className="flex whitespace-nowrap justify-center mb-4 sm:mb-0">
			<label className="input-group">
				<span>Password length</span>
				<input type="number"
					className="input w-20 input-bordered"
					value={pwdLength}
					onChange={checkLength}
				/>
			</label>
		</div>
	);
};

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPwdAmount } from './../store/AppSlice';

export const PwdAmount = () => {
	const dispatch = useDispatch();
	const checkAmount = (e) => {
		if (Number(e.target.value) <= 0) {
			e.target.value = 1;
		} else if (Number(e.target.value) > 100) {
			e.target.value = 100;
		}
		dispatch(setPwdAmount({pwdAmount: Number(e.target.value)}));
	};

	const pwdAmount = useSelector((state) => state.app.pwdAmount);

	return (
		<div className="flex whitespace-nowrap justify-center">
			<label className="input-group">
				<span>Passwords amount</span>
				<input type="number"
					className="input w-20 input-bordered"
					value={ pwdAmount }
					onChange={ checkAmount }
				/>
			</label>
		</div>
	);
};

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPwdLength } from './../store/AppSlice';


export const PwdLength = () => {
	const dispatch = useDispatch();
	const checkLength = (e) => {
		if (e.target.value <= 4) {
			e.target.value = 4;
		} else if (e.target.value >= 65) {
			e.target.value = 64;
		}
		dispatch(setPwdLength({pwdLength: Number(e.target.value)}));
	};

	const pwdLength = useSelector((state) => state.app.pwdLength);

	return (
		<div className="form-control flex whitespace-nowrap justify-center">
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

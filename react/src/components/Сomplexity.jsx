import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setComplexity } from './../store/AppSlice';

export const Сomplexity = () => {
	const complexity = useSelector((state) => state.app.complexity);
	const dispatch = useDispatch();

	let color = '';
	if (complexity === 0) {
		color = 'range range-md';
	} else if (complexity <= 2) {
		color = 'range range-md range-error';
	} else if (complexity === 3) {
		color = 'range range-md range-warning';
	} else {
		color = 'range range-md range-success';
	}
	return (
		<>
			<input type="range"
				min="0"
				max="5"
				value={complexity}
				className={ color }
				step="1"
				onChange={(e) => dispatch(setComplexity({complexity: Number(e.target.value)}))}
			/>
			<div className="w-full flex justify-between text-xs sm:text-sm px-2">
				<span className="mr-1 sm:mr-4">Custom</span>
				<span className="mx-1 sm:mx-4">Very simple</span>
				<span className="mx-1 sm:mx-4">Simple</span>
				<span className="mx-1 sm:mx-4">Normal</span>
				<span className="mx-1 sm:mx-4">Complex</span>
				<span className="mx-1 sm:mx-4">Insane</span>
			</div>
		</>
	);
};

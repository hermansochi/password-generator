import React from "react";
import { useSelector } from 'react-redux';

export const PwdSettings = () => {
	const { complexity,
					pwdUppercase,
					pwdLowercase,
					pwdNumbers,
					pwdSymbols,
					excludeSimilar,
					excludeDublicate } = useSelector((state) => state.app);

	let isEnabled = false;

	if (complexity !== 0) {
		isEnabled = true;
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Uppercase (ABC)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={pwdUppercase}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Lowercase (abc)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={pwdLowercase}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Numbers (0-9)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={pwdNumbers}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Allow Symbols (!@#$%^&*()+)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={pwdSymbols}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Exclude Similar (iI1loO0)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={excludeSimilar}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
				<div>
					<label className="cursor-pointer label">
						<span className="label-text text-base w-full">Exclude Duplicate Characters (pp)</span>
						<input type="checkbox"
							disabled={isEnabled}
							checked={excludeDublicate}
							className={`checkbox checkbox-success ml-2`}
						/>
					</label>
				</div>
			</div>
		</>
	);
};

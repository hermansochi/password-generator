import React from "react";
import { useSelector } from 'react-redux';

export const PwdGenerator = () => {
	const options = useSelector((state) => state.app);

	let pwdList = [];
	let alphabet = '';

	const numbers = '0123456789';
	const numbersExcludeSimilar = '23456789';
	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const uppercaseExcludeSimilar = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const lowercaseExcludeSimilar = 'abcdefghjkmnpqrstuvwxyz';
	//const symbols = '!@#$%^&*()+,-./:;<=>?[]^_{|}~'; 
	const symbols = '!@#$%^&*()+';

	if (options.pwdUppercase) {
		if (options.excludeSimilar) {
			alphabet += uppercaseExcludeSimilar;
		} else {
			alphabet += uppercase;
		}
	}
	if (options.pwdLowercase) {
		if (options.excludeSimilar) {
			alphabet += lowercaseExcludeSimilar;
		} else {
			alphabet += lowercase;
		}
	}
	if (options.pwdSymbols) {
		alphabet += symbols;
	}
	if (options.pwdNumbers) {
		if (options.excludeSimilar) {
			alphabet += numbersExcludeSimilar;
		} else {
			alphabet += numbers;
		}
	}

	while (pwdList.length < options.pwdAmount) {
		let password = '';
		let symbolsCounter = 0;
		while (password.length <= options.pwdLength - 1) {
			let randomNumber = Math.floor(Math.random() * alphabet.length);
			let nextSymbol = alphabet.substring(randomNumber, randomNumber + 1);
			if (options.pwdSymbols && symbols.indexOf(nextSymbol) !== -1) {
				if (symbolsCounter < 3) {
					symbolsCounter += 1;
				} else {
					nextSymbol = '';
					while (symbols.indexOf(nextSymbol) !== -1) {
						randomNumber = Math.floor(Math.random() * alphabet.length);
						nextSymbol = alphabet.substring(randomNumber, randomNumber + 1);
					}
				}
			}
			password += nextSymbol;
		}
		if (!options.excludeDublicate || !(/(.)\1+/.test(password))) {
			pwdList.push(password);
		}
	}

	return (
		<>
			<div className="flex flex-col font-mono text-lg textarea textarea-bordered w-full">
				{
					pwdList.map((item) => <div key={item}>{item}</div>)
				}
			</div>
		</>
	);
};

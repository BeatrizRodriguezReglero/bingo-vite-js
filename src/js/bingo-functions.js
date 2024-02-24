import { numbersBoard, pcBoard, playerBoard } from './constants';
import {
	bingoBoardElement,
	bingoButtonElement,
	bingoWinnerElement,
	buttonPlayAgainElement,
	pcBoardElement,
	playerBoardElement
} from './dom';

let numberRandom;
let intervalId;

const allNumbers = Array(99)
	.fill()
	.map((_, index) => index + 1);
console.log(allNumbers);

const generateRandomNumber = max => {
	const randomNumber = Math.floor(Math.random() * max);
	return randomNumber;
};

const printBingoNumbers = () => {
	const fragment = document.createDocumentFragment();
	allNumbers.forEach(number => {
		const newNumber = document.createElement('span');
		newNumber.classList.add('bingo-span');

		newNumber.dataset.number = number;
		newNumber.textContent = number;
		fragment.append(newNumber);
	});
	bingoBoardElement.append(fragment);
};

const printBoard = (board, element) => {
	const fragment = document.createDocumentFragment();

	board.forEach(number => {
		const newNumber = document.createElement('span');
		newNumber.classList.add('player-span');
		newNumber.dataset.number = number;
		newNumber.textContent = number;
		fragment.append(newNumber);
	});
	element.append(fragment);
};

const getRandomNumbers = array => {
	while (array.length < numbersBoard) {
		const randomNumber = generateRandomNumber(99) + 1;
		if (!array.includes(randomNumber)) {
			array.push(randomNumber);
		}
	}
};

const deleteNumberFromBingo = index => {
	allNumbers.splice(index, 1);
};

const checkWinner = () => {
	const playerNumbersChecked = document.querySelectorAll(
		'.player-number-marked'
	).length;
	const pcNumbersChecked =
		document.querySelectorAll('.pc-number-marked').length;

	if (playerNumbersChecked === numbersBoard) {
		console.log('PLAYER WIN');
		bingoWinnerElement.classList.add('player-win');
		bingoWinnerElement.textContent = 'PLAYER WIN';
		buttonPlayAgainElement.classList.remove('hide');
		bingoButtonElement.classList.add('hide');

		clearInterval(intervalId);
	}

	if (pcNumbersChecked === numbersBoard) {
		console.log('PC WIN');
		bingoWinnerElement.textContent = 'PC WIN';
		bingoWinnerElement.classList.add('pc-win');
		buttonPlayAgainElement.classList.remove('hide');
		bingoButtonElement.classList.add('hide');
		clearInterval(intervalId);
	}
};

const checkBingoNumber = number => {
	const numberToCheck = document.querySelector(`[data-number="${number}"]`);
	numberToCheck.classList.add('bingo-marked');
	const playerNumberToCheck = playerBoardElement.querySelector(
		`[data-number="${number}"]`
	);
	if (playerNumberToCheck) {
		playerNumberToCheck.classList.add('player-number-marked');
	}

	const pcNumberToCheck = pcBoardElement.querySelector(
		`[data-number="${number}"]`
	);
	if (pcNumberToCheck) {
		pcNumberToCheck.classList.add('pc-number-marked');
	}
};

const extractNumberFromBingo = () => {
	checkWinner();
	const index = generateRandomNumber(allNumbers.length);
	const number = allNumbers[index];
	deleteNumberFromBingo(index);
	checkBingoNumber(number);
	if (allNumbers.length <= 0) {
		clearInterval(intervalId);
	}
};

const startGame = () => {
	getRandomNumbers(playerBoard);
	printBoard(playerBoard, playerBoardElement);

	getRandomNumbers(pcBoard);

	printBoard(pcBoard, pcBoardElement);

	intervalId = setInterval(extractNumberFromBingo, 10);
};

printBingoNumbers();

const restartTheGame = () => {
	playerBoard.length = 0;
	pcBoard.length = 0;
	allNumbers.length = 0;

	for (let i = 1; i <= 99; i++) {
		allNumbers.push(i);
	}

	bingoBoardElement.innerHTML = '';
	playerBoardElement.innerHTML = '';
	pcBoardElement.innerHTML = '';
	bingoWinnerElement.textContent = '';
	bingoWinnerElement.classList.remove('player-win', 'pc-win');
	buttonPlayAgainElement.classList.add('hide');
	bingoButtonElement.classList.remove('hide');
	bingoButtonElement.disabled = false;

	clearInterval(intervalId);
};
const play = () => {
	startGame();

	bingoButtonElement.disabled = true;
};

const newGameBoard = () => {
	restartTheGame();
	printBingoNumbers();
};

export {
	numberRandom,
	intervalId,
	allNumbers,
	generateRandomNumber,
	printBingoNumbers,
	printBoard,
	getRandomNumbers,
	deleteNumberFromBingo,
	checkWinner,
	checkBingoNumber,
	extractNumberFromBingo,
	startGame,
	restartTheGame,
	play,
	newGameBoard
};

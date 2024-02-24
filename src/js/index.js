import { newGameBoard, play } from './bingo-functions';
import { bingoButtonElement, buttonPlayAgainElement } from './dom';

bingoButtonElement.addEventListener('click', play);
buttonPlayAgainElement.addEventListener('click', newGameBoard);

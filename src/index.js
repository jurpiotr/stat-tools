import './sass/index.scss';
import { Wave } from './js/Wave';

const waveElem = document.querySelector('.wave');
const WaveHeader = new Wave(waveElem, 200, 100, 40);

window.addEventListener('scroll', () => {
   WaveHeader.scrollToTop()
})

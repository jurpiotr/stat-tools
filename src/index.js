import './sass/index.scss';
import { Wave } from './js/Wave';


function builder () {
   const waveElem = document.querySelector('.wave');
   const content = document.querySelector('#ST');
   const WaveHeader = new Wave(waveElem, 200, 100, 40);



   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop()
   });



}

document.addEventListener('DOMContentLoaded', builder);
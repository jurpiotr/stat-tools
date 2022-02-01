import './sass/index.scss';
import { Wave } from './js/Wave';

function builder () {
   const svgElem = document.querySelector('.svg-bg');
   const content = document.querySelector('#ST');
   const WaveHeader = new Wave(svgElem, 200, 100, 200);

   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop()
   });



}

document.addEventListener('DOMContentLoaded', builder);
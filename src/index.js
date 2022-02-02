import './sass/index.scss';
import { Wave } from './js/Wave';
import { Table } from './js/Table';

function builder () {
   const svgElem = document.querySelector('.svg-bg');
   const tableElem = document.querySelector('#tableElem');
   const WaveHeader = new Wave(svgElem, 200, 100, 200);
   const tableST = new Table(tableElem);

   tableST.show();
   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop()
   });

   tableElem.addEventListener('mousedown', (e) => {
      if(!e.target.classList.contains('table__row')){ return}
 
      tableST.start(e.target);
   });

   tableElem.addEventListener('mousemove', (e) => {

 
      tableST.move(e.target);
   });

   tableElem.addEventListener('mouseup', (e) => {
      if(!e.target.classList.contains('table__row')){ return}
 
      tableST.end(e.target);
   });



}

document.addEventListener('DOMContentLoaded', builder);
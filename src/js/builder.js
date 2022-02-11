import { Wave } from './Wave';
import { Table } from './Table';

export function builder () {
   const svgElem = document.querySelector('.svg-bg');
   const tableElem = document.querySelector('#tableElem');
   const WaveHeader = new Wave(svgElem, 200, 100, 200);
   const tableST = new Table(tableElem);

   const move = (e) => {
      if(!tableST.isStart) { return }
      tableST.move(e.target);
   }
   const leave = (e) => {
      if(!tableST.isStart) { return }
      tableST.end(e.target);
   }

   tableST.show();
   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop();
   });
   tableElem.addEventListener('mousedown', (e) => {
      if(e.target.classList.contains('table__row')){ 
         tableST.start(e.target);
         tableElem.addEventListener('mousemove', move);
      }
   });
   tableElem.addEventListener('mouseup', leave);
   tableElem.addEventListener('mouseleave', leave);
}
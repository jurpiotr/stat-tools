import { Wave } from './Wave';
import { Table } from './Table';
import { getScheduleTV } from './controller';

export function builder () {
   const svgElem = document.querySelector('.svg-bg');
   const STContainer = document.getElementById('ST_container');
   const searchRandomTV_btn = document.getElementById('search_randomTV_btn');
   const watchlist_btn = document.getElementById('watchlist_btn');
   const WaveHeader = new Wave(svgElem, 200, 100, 200);
   const tableST = new Table();
   
   searchRandomTV_btn.addEventListener('click', () => {
      getScheduleTV();
      searchRandomTV_btn.style.display = 'none';
      watchlist_btn.style.display = 'block';
   });
   watchlist_btn.addEventListener('click', () => {
      tableST.show(STContainer);
      searchRandomTV_btn.style.display = 'block';
      watchlist_btn.style.display = 'none';
   });
   
   const move = (e) => {
      if(!tableST.isStart) { return }
      tableST.move(e.target);
   }
   const leave = (e) => {
      if(!tableST.isStart) { return }
      tableST.end(e.target);
   }

   (function initTableST() {
      tableST.show(STContainer);
      const tableElem = document.querySelector('#tableElem');

      tableElem.addEventListener('mousedown', (e) => {
         if(e.target.classList.contains('table__row')){ 
            tableST.start(e.target);
            tableElem.addEventListener('mousemove', move);
         }
      });
      tableElem.addEventListener('mouseup', leave);
      tableElem.addEventListener('mouseleave', leave);


   })();

   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop();
   });
}

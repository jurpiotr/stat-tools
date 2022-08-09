import { Wave } from './Wave';
import { Watchlist } from './Watchlist';
import { Table } from './Table';
import { VideolistFromApi } from './VideolistFromApi';

export function builder () {
   const svgElem = document.querySelector('.svg-bg');
   const STContainer = document.getElementById('ST_container');
   const searchRandomTV_btn = document.getElementById('search_randomTV_btn');
   const watchlist_btn = document.getElementById('watchlist_btn');
   const iconSearch_btn = document.getElementById('icon-search');
   const inputSearch_btn = document.getElementById('input-search');
   const WaveHeader = new Wave(svgElem, 200, 100, 200);
   const watchlist = new Watchlist;
   const tableST = new Table(watchlist);
   const videolistFromApi = new VideolistFromApi(watchlist);

   searchRandomTV_btn.addEventListener('click', () => {
      videolistFromApi.fetchShows(STContainer, 'schedule');
      searchRandomTV_btn.style.display = 'none';
      watchlist_btn.style.display = 'block';
   });
   watchlist_btn.addEventListener('click', () => {
      tableST.show(STContainer);
      searchRandomTV_btn.style.display = 'block';
      watchlist_btn.style.display = 'none';
   });
   iconSearch_btn.addEventListener('click', () => {
      videolistFromApi.fetchShows(STContainer, 'search', inputSearch_btn.value);
   });
   STContainer.addEventListener('click', (e) => {
      if(e.target.classList.contains('videos__btn-add-card')){
         if(e.target.classList.contains('videos__btn-add-card--on-watchlist')){
            watchlist.delete(e,videolistFromApi.clearCard(e));
         } else {
            videolistFromApi.importantData.forEach((data) => {
               if(data.id === Number(e.target.id)){
                  watchlist.add(data)
                  e.target.classList.add('videos__btn-add-card--on-watchlist')
                  e.target.textContent = '-Watchlist';
               }
            });
         }
      }
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

   })();
   STContainer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if(e.target.classList.contains('table__row')){ 
         tableST.start(e.target);

      } else if(e.target.parentElement.classList.contains('table__row')){
         tableST.start(e.target.parentElement);
      }
      STContainer.addEventListener('mousemove', move);
   });
   STContainer.addEventListener('mouseup', leave);
   STContainer.addEventListener('mouseleave', leave);
   // STContainer.addEventListener('click', (e) => {
   //    if(e.target.classList.contains('table__deleter')){ 
   //       const idRow = e.target.parentElement.getAttribute('id');
   //       tableST.deleteRow(e,STContainer);
   //       console.log(idRow);
   //    }
   // });

   window.addEventListener('scroll', () => {
      WaveHeader.scrollToTop();
   });
}

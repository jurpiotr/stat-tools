import { Watchlist } from './Watchlist';
import axios from "axios";
const watchList = new Watchlist();

const render = (videoList) => {
   const ST_container = document.getElementById('ST_container');
   const videosElem = document.createElement('div');
   videosElem.setAttribute('id', 'video-cards');
   videosElem.classList.add('videos');

   videoList.map((video) => {
      const newClass = watchList?.contains(video.id, 'videos__btn-add-card--on-watchlist') || '';
      const sign = newClass === '' ? '+' : '-';
      videosElem.innerHTML += `
      <div class="videos__video-card">
      <button class="videos__btn-add-card ${newClass}" name="${video.id}">${sign}Watchlist</button>
      <img class="videos__img-card"src="${video.image||''}" alt="${video.name}">
         <p class="videos__title-card">${video.name}</p>
      </div>
      `
   });
   ST_container.innerHTML = '';
   ST_container.appendChild(videosElem);
   return ST_container;
}

export const getScheduleTV = async () => {
   let importantData = [];

   const values = await axios({
      url: `https://api.tvmaze.com/schedule`,
      method: "GET",
      headers: {
         Accept: 'application/json',
      }
   })
   .then((response) => {
      response.data.forEach((data) => {
         if(data.show.image?.medium) {   
            const video = watchList.createItem(data.id, data.show.image?.medium, data.show.name);
            importantData.push(video);
         }
      })
   })
   .then(() => {
      render(importantData);
   })
   .then(() => {
      document.addEventListener('click', (e) => {
         if(e.target.classList.contains('videos__btn-add-card')){
            if(e.target.classList.contains('videos__btn-add-card--on-watchlist')){
               watchList.currentList.forEach((item, index, object) => {
                  // Deleting the film from Watchlist
                  if(item.id === Number(e.target.name)){
                     object.splice(index, 1);
                     watchList.add();
                     e.target.classList.remove('videos__btn-add-card--on-watchlist');
                     e.target.textContent = '+Watchlist';
                     
                     return;
                  }
               })
            } else {
               importantData.forEach((data) => {
                  if(data.id === Number(e.target.name)){
                     watchList.add(data)
                     e.target.classList.add('videos__btn-add-card--on-watchlist')
                     e.target.textContent = '-Watchlist';
                  }
               });
            }
         }
      })
   });

   return values;
}

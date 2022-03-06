import { Watchlist } from './Watchlist';
import axios from "axios";
const watchList = new Watchlist();

const render = (videoList) => {
   const videoCards = document.getElementById('video-cards');
   videoCards.innerHTML = '';
      videoList.map((video) => {
         const newClass = watchList.contains(video.id, 'videos__btn-add-card--on-watchlist');
        console.log(newClass)
         videoCards.innerHTML += `
         <div class="videos__video-card">
         <button class="videos__btn-add-card ${newClass}" name="${video.id}">+Watchlist</button>
         <img class="videos__img-card"src="${video.image||''}" alt="${video.name}">
            <p class="videos__title-card">${video.name}</p>
      </div>
         `
   });
   return videoCards;
}

export const tv = async () => {
   let importantData = [];

   const values = await axios({
      url: `https://api.tvmaze.com/schedule`,
      method: "GET",
      headers: {
         Accept: 'application/json',
      }
   })
   .then((response) => {
      importantData = response.data.map((data) => {
         if (!data.show.image){ return }
         const video = watchList.createItem(data.id, data.show.image?.medium, data.show.name);
         return video;
      });
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
                     e.target.classList.remove('videos__btn-add-card--on-watchlist');
                     watchList.add();
                     return;
                  }
               })
            } else {
               importantData.forEach((data) => {
                  if(data.id === Number(e.target.name)){
                     watchList.add(data)
                     e.target.classList.add('videos__btn-add-card--on-watchlist')
                  }
               });
            }
         }
      })
   });

   return values;
}

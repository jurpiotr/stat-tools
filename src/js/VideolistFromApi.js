import { getScheduleTV } from './controller';

export class VideolistFromApi {
   constructor(watchlist){
      this.watchlist = watchlist;
      this.importantData = [];
   }

   render = (videoList, STContainer) => {
      
      const videosElem = document.createElement('div');
      videosElem.setAttribute('id', 'video-cards');
      videosElem.classList.add('videos');
   
      videoList.map((video) => {
         const newClass = this.watchlist?.contains(video.id, 'videos__btn-add-card--on-watchlist') || '';
         const sign = newClass === '' ? '+' : '-';
         videosElem.innerHTML += `
         <div class="videos__video-card">
         <button class="videos__btn-add-card ${newClass}" id="${video.id}">${sign}Watchlist</button>
         <img class="videos__img-card" src="${video.image||''}" alt="${video.name}">
            <p class="videos__title-card">${video.name}</p>
         </div>
         `
      });
      STContainer.innerHTML = '';
      STContainer.appendChild(videosElem);
      return ST_container;
   }

   clearCard = (e) => {
      e.target.classList.remove('videos__btn-add-card--on-watchlist');
      e.target.textContent = '+Watchlist';
   }

   scheduleTV = async (STContainer) => {

      return await getScheduleTV
      .then((response) => {
         response.data.forEach((data) => {
            if(data.show.image?.medium) {   
               const video = this.watchlist.createItem(data.id, data.show.image?.medium, data.show.name);
               this.importantData.push(video);
            }
         })
      })
      .then(() => {
         this.render(this.importantData, STContainer);
         return this.importantData;
      })
   }
}
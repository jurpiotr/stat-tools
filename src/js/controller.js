import axios from "axios";

const render = (videoList) => {
   const videoCards = document.getElementById('video-cards');
   videoCards.innerHTML = '';
      videoList.map((video) => {
         videoCards.innerHTML += `
         <div class="videos__video-card">
         <button class="videos__btn-add-card name="${video.id}">+Watchlist</button>
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
      console.log(response.data)
      importantData = response.data.map((data) => {
         if (!data.show.image){ return }
         const obj = {
            id: data.id,
            image: data.show.image?.medium,
            name: data.show.name
         }
         return obj;
      });
      console.log(importantData);
   })
   .then(() => {
      render(importantData);
   });

   return values;
}

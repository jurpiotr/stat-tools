import axios from "axios";

const render = (videoList) => {
   const videoCards = document.getElementById('video-cards');
   videoCards.innerHTML = '';
      videoList.map((video) => {
         videoCards.innerHTML += `
         <div class="videos__video-card">
         <button class="videos__btn-add-card name="${video.id}">+Watchlist</button>
         <img class="videos__img-card"src="${video.show.image.medium}" alt="${video.show.name}">
            <p class="videos__title-card">${video.show.name}</p>
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
      return response.data;
   })
   .then((data) => {
      render(data);
   })

   return values;
}

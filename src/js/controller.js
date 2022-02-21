import axios from "axios";

const render = () => {
   filmList.forEach(film => {
      
   });
}

export const tv = async () => {

      const values = await axios({
         url: `https://api.tvmaze.com/schedule`,
         method: "GET",
         headers: {
            Accept: 'application/json',
         }
      })
         .then((response) => {
            const filmList = response.data;
            return filmList;
         })
         .then((dataJSON) => {
            
            console.log(dataJSON)
            
         });
      return values;

}

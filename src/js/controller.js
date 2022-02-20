import axios from "axios";

export const tv = async () => {

      const values = await axios({
         url: `https://api.tvmaze.com/search/shows?q=it`,
         method: "GET",
         headers: {
            Accept: 'application/json',
         }
      })
         .then((response) => {
            const dataJSON = response.data;
            return dataJSON;
         })
         .then((dataJSON) => {
            
            console.log(dataJSON)
            
         });
      return values;

}

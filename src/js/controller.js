import axios from "axios";
const queries = {
   query : '',
   schedule : 'schedule',
   search : 'search/shows?q=:'
}
export const getTV = (param, query) => {
   console.log(param + query)
   if (query) { queries.query = query}
   const response = axios({
         url: `https://api.tvmaze.com/${queries[param]+queries.query}`,
         method: "GET",
         headers: {
            Accept: 'application/json',
         }
      })
   return response;

}

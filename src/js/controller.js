import axios from "axios";

export const getScheduleTV = axios({
      url: `https://api.tvmaze.com/schedule`,
      method: "GET",
      headers: {
         Accept: 'application/json',
      }
   })

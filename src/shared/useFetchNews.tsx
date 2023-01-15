import axios from "axios";
import { Moment } from "moment";
import { useState, useEffect } from "react";
export type newsFeed = {
  author: string
  description: string
  publishedAt: Moment
  title: string
  url: string
  urlToImage: string
}
// const useFetchNews = (keyword: string) => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     let apiKey = "97d0b51383b64470b342ca5627de81dd"
//     let url = `https://newsapi.org/v2/top-headlines?country=th&apiKey=${apiKey}`
//     if(keyword) {
//       url += `&q=${keyword}`
//     }
//     axios.get<any>(url)
//       .then((res) =>{
//         console.log(res.data)
//         setNews(res.data.articles)
//         })
//   }, []);

//   return news;
// };

// export default useFetchNews;

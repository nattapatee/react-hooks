import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { Breadcrumb, Divider, Layout, Menu, Spin, theme } from 'antd';
import { Moment } from 'moment';
import FeedBox from './components/FeedBox/FeedBox';
import HeaderBar from './components/HeaderBar/HeaderBar';
import axios from 'axios';
import { newsFeed } from './shared/useFetchNews';
import InfiniteScroll from "react-infinite-scroll-component";

const { Header, Content, Footer } = Layout;

// const useFetchNews = (keyword: string) => {
//   const [news, setNews] = useState([]);
//   const [pageSize, setPageSize] = useState(20);
//   const [page, setPage] = useState(1);





//   return news;
// };

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [spin, setSpin] = useState(true);
  const [news, setNews] = useState<newsFeed[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataLength, setDataLenght] = useState(0);
  // const news: newsFeed[] = useFetchNews(keyword)
  useEffect(() => {
    fetchData();
  }, [keyword]);

  const fetchData = async () => {
    try {
      // let apiKey = "97d0b51383b64470b342ca5627de81dd"
      // use when api limit reached
      let apiKey = "0930b2d151df4756903f31425b72141f"

      const result = await axios(
        `https://newsapi.org/v2/everything?sources=bbc-news&from=2023-01-14&to=2022-01-01&sortBy=publishedAt&q=${keyword}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`
      );
      await setNews(prevNews => [...prevNews, ...result.data.articles]);
      await setDataLenght(result.data.totalResults)
      // setNews(result.data.articles);
      setPage(prevPage => prevPage + 1);
      setSpin(false)
      if (result.data.articles.length >= result.data.totalResults) {
        console.log("reached")
        setHasMore(false);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (keyword: string) => {
    console.log(keyword)
    setKeyword(keyword);
    setPage(1);
    setHasMore(true);
    setNews([]);
  };

  return (
    <Layout className="layout">
      <HeaderBar onSearch={handleSearch} />
      <Spin spinning={spin}>

        <Content className="content-box">
        <InfiniteScroll
              dataLength={news.length}
              next={fetchData}
              hasMore={true}
              loader={
                <FeedBox feedData={null} />
              }
            >
          <div className="site-layout-content">
              {news && news.map((item, index) => (
                <FeedBox key={index} feedData={item} />
              ))}
          </div>
          </InfiniteScroll>
        </Content>
      </Spin>
    </Layout>
  );
}

export default App;

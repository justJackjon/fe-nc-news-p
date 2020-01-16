import axios from 'axios';

const api = axios.create({
  baseURL: 'https://justjackjon-nc-news.herokuapp.com/api'
});

export const getArticles = async () => {
  const { data } = await api.get('/articles');
  return data.articles;
};

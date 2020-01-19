import axios from 'axios';

const api = axios.create({
  baseURL: 'https://justjackjon-nc-news.herokuapp.com/api'
});

export const getData = async (dataType, params) => {
  const { data } = await api.get(`${dataType}`, { params });
  return data[dataType];
};

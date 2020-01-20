import axios from 'axios';

const api = axios.create({
  baseURL: 'https://justjackjon-nc-news.herokuapp.com/api/'
});

export const getData = async (endPoint, dataType, params) => {
  const { data } = await api.get(`${endPoint}`, {
    ...params
  });
  return data[dataType || endPoint];
};

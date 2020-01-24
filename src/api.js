import axios from 'axios';

const api = axios.create({
  baseURL: 'https://justjackjon-nc-news.herokuapp.com/api/'
});

export const postData = async (endPoint, dataType, body) => {
  const { data } = await api.post(`${endPoint}`, {
    ...body
  });
  return data[dataType || endPoint];
};

export const getData = async (endPoint, dataType, params) => {
  const { data } = await api.get(`${endPoint}`, {
    ...params
  });
  return data[dataType || endPoint];
};

export const patchData = async (endPoint, dataType, body) => {
  const { data } = await api.patch(`${endPoint}`, {
    ...body
  });
  return data[dataType || endPoint];
};

export const deleteData = async endPoint => {
  const { data } = await api.delete(`${endPoint}`);
  return data;
};

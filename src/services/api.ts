import axios from 'axios';

const url = 'https://www.breakingbadapi.com/api/';

export const getAllCharacters = () => {
    return axios.get(`${url}characters`).then(resp => {
        return resp.data;
      })
};

export const getRandomQuoteByAuthor = (author: string) => {
  const adaptedAuthor = author.replace(' ', '+');
  return axios.get(`${url}quote/random?author=${adaptedAuthor}`).then(resp => {
      return resp.data;
    }).catch(err => {
      const error = {
        error: err
      }
      return error;
    })
};

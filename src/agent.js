import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let token = null; 

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) => 
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`)
};

const Auth = {
  current: () => 
  	requests.get('/user'),
  login: (email, password) => 
	requests.post('/users/login', { user: { email, password } })
}; 

export default {
  Articles, 
  Auth,
  setToken: _token => { token = _token }
};

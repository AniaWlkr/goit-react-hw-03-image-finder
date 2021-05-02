import axios from 'axios';
const API_KEY = '?key=20668572-c55967f2cfb5248074fb94654';
axios.defaults.baseURL = 'https://pixabay.com/api/';

function fetchImg(query = '', currentPage = 1, imgPerPage = 12) {
  const pageUrl = `${API_KEY}&image_type=photo&orientation=horizontal&q=${query}&page=${currentPage}&per_page=${imgPerPage}`;
  return axios.get(pageUrl).then(response => response.data.hits);
}

export default { fetchImg };

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const MY_KEY = '38626503-0c946b31d6d08b2c506c34012';

export const getImg = async () => {
  const { data } = await axios(
    `?q=cat&page=1&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

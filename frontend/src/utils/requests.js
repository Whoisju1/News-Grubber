import axios from 'axios';

export const getScrappedArticles = async () => {
  const { data: { articles } } = await axios.get('/api/articles/scrapped');
  return articles;
};

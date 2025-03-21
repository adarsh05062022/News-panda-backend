import express from 'express';
import { getNews, fetchNews } from '../controllers/newsControllers.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to the News API');
  });

router.get('/fetch-news', fetchNews);
router.get('/news', getNews);

export default router;

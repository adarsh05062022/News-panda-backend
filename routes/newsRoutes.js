import express from 'express';
import { getNews, fetchNews } from '../controllers/newsControllers.js';

const router = express.Router();

router.get('/fetch-news', fetchNews);
router.get('/news', getNews);

export default router;

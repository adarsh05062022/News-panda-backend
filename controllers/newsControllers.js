import News from '../models/news.js';
import fetchAndSaveNews from '../utils/fetchNews.js';


export const getNews =async (req,res)=>{
    try {
        const news = await News.find().sort({publishedAt:-1});
        res.json;
    } catch (error) {
        res.status(500).send('Error fetching news from database');
    }
}


export const fetchNews = async(req,res)=>{
    await fetchAndSaveNews();
    res.status(200).send("News fetched and saved");
}
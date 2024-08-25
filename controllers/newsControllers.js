import News from '../models/news.js';
import fetchAndSaveNews from '../utils/fetchNews.js';
import ExecutionTime from '../models/ExecutionTime.js';


export const getNews =async (req,res)=>{
    try {
        const news = await News.find().sort({publishedAt:-1});
        res.json(news);
    } catch (error) {
        res.status(500).json({message:'Error fetching news'});
    }
}


export const fetchNews = async(req,res)=>{
    try {
        const executionTime = await ExecutionTime.findOne({});
        const now = new Date();
    
        if (executionTime) {
          const timeDifference = now - executionTime.lastExecutionTime;
          const threshold = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    
          if (timeDifference < threshold) {
            return res.status(200).json({message:"News was recently fetched, skipping new fetch."});
          }
        }
    
        await fetchAndSaveNews();
        res.status(200).json({message:"News fetched and saved"});
    
      } catch (error) {
        res.status(500).json({message:'Error fetching news'});
      }
}
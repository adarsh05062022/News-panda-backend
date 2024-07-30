import axios from 'axios';
import News from '../models/news.js';

const fetchAndSaveNews = async () => {
  try {
    let allNewsData = [];
    let nextPageId = null;
    // const apiKey = 'pub_1465821e4d28de818dcc83e40efdc9a7070a9';
    const apiKey = 'pub_49467cdfcf00ddbd524c03f9b2beed7416d3c';
    const maxPages = 8;

    for (let i = 0; i < maxPages; i++) {
      // if(i==2) break;
      const response = await axios.get('https://newsdata.io/api/1/latest', {
        params: {
          apiKey: apiKey,
          country: 'in',
          page: nextPageId,
        },
      });

      // console.log(response.data); // Log the entire response to inspect its structure

      const transformedResponse = transformApiResponse(response.data);
      allNewsData = allNewsData.concat(transformedResponse.results);

      if (transformedResponse.nextPage) {
        nextPageId = transformedResponse.nextPage;
      } else {
        break;
      }

      if (allNewsData.length >= 100) {
        break;
      }
    }

    // Save news data to the database
    for (const article of allNewsData) {
      const news = new News({
        title: article.title,
        image: article.image,
        publisher: article.publisher,
        publishedAt: article.publishedAt,
        url: article.url,
      });
      await news.save();
    }

    // Ensure the collection size does not exceed 200 items
    const totalNews = await News.countDocuments();
    if (totalNews > 300) {
      const excessNews = totalNews - 300;
      await News.find({}).sort({ publishedAt: 1 }).limit(excessNews).deleteMany();
    }

    console.log('News fetched and saved');
  } catch (error) {
    console.error('Error fetching news', error);
  }
};

const transformApiResponse = (apiResponse) => {
  return {
    status: apiResponse.status || 'Unknown status',
    totalResults: apiResponse.totalResults || 0,
    results: (apiResponse.results || []).map(article => ({
      title: article.title || "No Title Provided",
      image: article.image_url || "https://nenow.in/wp-content/uploads/2022/06/Wordle-answer-today.jpg", // Default image URL
      url: article.link || "http://news-panda.netlify.app",
      publisher: article.source_id || "Unknown",
      publishedAt: article.pubDate || new Date().toISOString(), // Default to current date if not provided
    })),
    nextPage: apiResponse.nextPage || null
  };
};

export default fetchAndSaveNews;

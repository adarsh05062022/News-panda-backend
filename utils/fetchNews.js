import axios from 'axios';
import News from '../models/news.js';

const dummyNewsData = [
    {
      title: "News Title 1",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 1",
      publishedAt: new Date(),
      url: "https://example.com/news1"
    },
    {
      title: "News Title 2",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 2",
      publishedAt: new Date(),
      url: "https://example.com/news2"
    },
    {
      title: "News Title 3",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 3",
      publishedAt: new Date(),
      url: "https://example.com/news3"
    },
    {
      title: "News Title 4",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 4",
      publishedAt: new Date(),
      url: "https://example.com/news4"
    },
    {
      title: "News Title 5",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 5",
      publishedAt: new Date(),
      url: "https://example.com/news5"
    },
    {
      title: "News Title 6",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 6",
      publishedAt: new Date(),
      url: "https://example.com/news6"
    },
    {
      title: "News Title 7",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 7",
      publishedAt: new Date(),
      url: "https://example.com/news7"
    },
    {
      title: "News Title 8",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 8",
      publishedAt: new Date(),
      url: "https://example.com/news8"
    },
    {
      title: "News Title 9",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 9",
      publishedAt: new Date(),
      url: "https://example.com/news9"
    },
    {
      title: "News Title 10",
      image: "https://via.placeholder.com/150",
      publisher: "Publisher 10",
      publishedAt: new Date(),
      url: "https://example.com/news10"
    }
  ];

const fetchAndSaveNews = async () => {
  try {
    // const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    //   params: {
    //     apiKey: 'YOUR_NEWS_API_KEY',
    //     country: 'us',
    //   },
    // });

    // const newsData = response.data.articles;


    const newsData = dummyNewsData;   // remove after that


    newsData.forEach(async (article) => {
        const news = new News({
            title: article.title,
            image: article.image,
            publisher: article.publisher,
            publishedAt: article.publishedAt,
            url: article.url,
          });
      await news.save();
    });

     // Ensure the collection size does not exceed 200 items
     const totalNews = await News.countDocuments();
     if (totalNews > 200) {
       const excessNews = totalNews - 200;
       await News.find({}).sort({ publishedAt: 1 }).limit(excessNews).deleteMany();
     }

    console.log('News fetched and saved');
  } catch (error) {
    console.error('Error fetching news', error);
  }
};

export default fetchAndSaveNews;

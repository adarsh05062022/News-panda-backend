import mongoose from "mongoose";


const newsSchema =  new mongoose.Schema({
    title:String,
    image:String,
    publisher: String,
  publishedAt: Date,
  url: String,
    

})


const News = mongoose.model("News",newsSchema);

export default News;
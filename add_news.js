const client = require("./client");

client.AddNews(
    {
        title: "Title news 3",
        body: "Body content 3",
        image: "Image URL here",
    },
    (error, news) => {
        if (error) throw error;
        console.log(news);
    }
)
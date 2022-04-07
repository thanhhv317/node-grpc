const client = require("./client")

client.GetNews({id: process.argv[2]}, (error, news) => {
    if (error) throw error;
    console.log(news);
})
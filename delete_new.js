const client = require("./client")

client.DeleteNews(
    {
        id: process.argv[2]
    },
    (error, news) => {
        if (error) throw error;
        console.log("Success deleted");
    }
)
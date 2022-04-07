const grpc = require("@grpc/grpc-js")
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let news = [
    {id: "1", title: "Note 1", body: "Content 1", image: "Post image 1"},
    {id: "2", title: "Note 2", body: "Content 2", image: "Post image 2"},
];

server.addService(newsProto.NewsService.service, {
    GetAllNews: (_, callback) => {
        callback(null, {news});
    },
    AddNews: (call ,callback) => {
        const _news = { ...call.request,id: Date.now() };
        news.push(_news);
        callback(null, _news);
    },
    DeleteNews: (call, callback) => {
        const newsId = call.request.id;
        news = news.filter(({id}) => id !== newsId);
        callback(null, {});
    },
    EditNews: (call, callback) => {
        const newsId = call.request.id;
        const newsItems = news.find(({id}) => id === newsId);
        newsItems.body = call.request.body;
        newsItems.image = call.request.image;
        newsItems.title = call.request.title;
        callback(null, newsItems);
    },
    GetNews: (call, callback) => {
        const newsId = call.request.id;
        const newsItem = news.find(({id}) => id === newsId);
        callback(null, newsItem);
    }
})

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
})
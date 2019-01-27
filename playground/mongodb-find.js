// Experimenting with Mongodb - Finding in Collections

//const MongoClient = require('mongodb').MongoClient; // Connect to the mongo db server using a mongo client. This can also be written as:
const {MongoClient, ObjectID} = require('mongodb'); // This is object destructuring. requiring mongodb makes an object that has many properties that were defined when mongodb was made. Now 2 of these inbuilt properties are MongoClient and ObjectID that we use in our system. To extract them, we use this es6 feature. This can be visualized with the following example

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => { // 'mongo://localhost:3000' is the url where our database lives, where mongodb: is the protocol. Mongo connects to server even if /TodoApp is not present in the database. Callback func fires after either the connec has succeeded or failed. err argument is used to check for error and client arg is used to actually read and write data. { useNewUrlParser: true } has been added for as newer versions of mongodb will be unable to connect if it is not used. In previous versions, below v3, client is db
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return so that if err then nothing below this runs
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    }); // find() gets us ALL the documents in this collection. It actually returns a pointer to that collection and not the whole giant data. Now we can chain functions to manipulate this. toArray() converts your data into an array of documents and it is a promise so we can use then() on it, to manipulate particular documents

    //client.close(); // Closes the connection with the mongodb server. REMEMBER TO INCLUDE
});

// Experimenting with Mongodb - Manipulating collections

const MongoClient = require('mongodb').MongoClient; // Connect to the mongo db server using a mongo client

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => { // 'mongo://localhost:3000' is the url where our database lives, where mongodb: is the protocol. Mongo connects to server even if /TodoApp is not present in the database. Callback func fires after either the connec has succeeded or failed. err argument is used to check for error and client arg is used to actually read and write data. { useNewUrlParser: true } has been added for as newer versions of mongodb will be unable to connect if it is not used. In previous versions, below v3, client is db
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return so that if err then nothing below this runs
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp'); // To use functionalities of client

    // db.collection('Todos').insertOne({ // insert one object. We can insert into db.collection('Todos') even if Todos is not yet present
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2)); // Pretty printing the data saved. ops stores all the documents that were inserted
    // });

    db.collection('Users').insertOne({ // insert one object. 
        name: 'Clark Kent',
        age: 40,
        location: 'Metropolis'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2)); // Pretty printing the data saved. ops stores all the documents that were inserted
    });

    client.close(); // Closes the connection with the mongodb server. REMEMBER TO INCLUDE
});

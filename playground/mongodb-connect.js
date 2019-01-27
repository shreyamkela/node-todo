// Experimenting with Mongodb - Inserting into collections

//const MongoClient = require('mongodb').MongoClient; // Connect to the mongo db server using a mongo client. This can also be written as:
const {MongoClient, ObjectID} = require('mongodb'); // This is object destructuring. requiring mongodb makes an object that has many properties that were defined when mongodb was made. Now 2 of these inbuilt properties are MongoClient and ObjectID that we use in our system. To extract them, we use this es6 feature. This can be visualized with the following example
// var user = { name: 'bruce', age: 42}; // This is an example
// var {name} = user; // bruce gets store in name variable. This is object destructuring, a feature of es6
// console.log(name); // prints bruce

// We have made an ObjectID variable with the help of object destructuring. Now we can create ObjectIDs even if we are not inserting any object. There might be atime when you need unique ids for your tasks and you can use mongodb object ids to create unique ids for each task
// var obj = new ObjectID(); // By this we can create a new Object id, everytime we use this
// console.log(obj);


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
        //_id: '123', // If we want, we can assign an arbitrary id to this object, otherwise MongoDB itself makes a random object id if no id is specified here. Now, the object id in mongodb is of 12 bytes. First 4 bytes are the time stamp, next 3 bytes are the computer id, next byte is the process id, and rest are counter for the record. THus using ObjectId to create new id with this feature of mongodb can be useful when we need unquie ids for some task
        name: 'Bruce Wayne',
        age: 42,
        location: 'Gotham'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2)); // Pretty printing the data saved. ops stores all the documents that were inserted
        console.log(result.ops[0]._id); // Array of all the documents that got inserted. Only one inserted therefore [0]. Here we access the id property of the object
        console.log(result.ops[0]._id.getTimestamp()); // Time stamp of this id
    });

    client.close(); // Closes the connection with the mongodb server. REMEMBER TO INCLUDE
});

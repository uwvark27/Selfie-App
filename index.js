const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('HEY MAN! Listening at Port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


app.get('/api', (request, response) => {
    database.find({}, (err,data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
    //response.json({test: 123});
});

//old way using an array
// const allData = [];

// app.post('/api', (request, response) => {
//   const data = request.body;
//   allData.push(data);
//   response.json(allData);
//   console.log(allData);
// });

//new way: use the nedb database
const database = new Datastore('database.db');
database.loadDatabase();

// app.post('/api', (request, response) => {
//   const data = request.body;
//   const timestamp = Date.now();
//   data.timestamp = timestamp;
//   database.insert(data);
//   response.json({
//       status: 'success',
//       timestamp: timestamp,
//       latitude: data.lat,
//       longitude: data.lon
//     });
// });


//and NEW WAY: Refactored
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});


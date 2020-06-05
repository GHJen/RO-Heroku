const db = require('./server/db/db.js');
const app = require('./server');
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync({force: true})  // sync our database
  .then(function(){
    app.listen(port) // then start listening with our express server once we have synced
  })

app.listen(port, function () {
  console.log(`I took a trip to the port ${port}, this port had gone multiplatinum`);
});

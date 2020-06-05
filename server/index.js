const express = require('express');
const app = express();
// require('../ROsecrets');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const db = require('./db')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({db})
const passport = require('passport');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

sessionStore.sync();
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../bundle.js'))
});


app.use(function (req, res, next) {
  const err = new Error(`Ceci n'est pas un page `);
  err.status = 404;
  //eventually res.render a component from react
  res.send(`<div>
    <h1>404 Not Found</h1>
    <h3>Ceci n'est pas un page!</h3>
    <img src='https://tommcfarlin.com/post-is-paginated/' />
    </div>`)
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(`<div>
    <h1>500 Internal Error</h1>
    <h3>Uh oh, something has gone awry!</h3>
    <img src='https://www.success.com/wp-content/uploads/legacy/sites/default/files/15_0.jpg' />
    <audio src="./public/Tubthumbing500.mp4" autoplay />
  </div>`)
  // .send(err.message || 'Internal server error.');
});

module.exports = app

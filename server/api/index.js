const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/entries', require('./entries'))
router.use('/prompts', require('./prompts'))

router.use(function (req, res, next) {
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

module.exports = router;

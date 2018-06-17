const express = require('express');

require('./config');
const router = require('./routes');


const app = express();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  global.console.log(`Started at port ${port}`);
});


module.exports = app;

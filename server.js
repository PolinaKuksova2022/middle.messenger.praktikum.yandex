const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.use((req, res) => {
  res.status(404).send('./dist');
});

app.listen(PORT, function () {
  console.log('running');
});

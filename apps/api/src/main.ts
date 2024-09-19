import * as path from 'path';
import express from 'express';

import router from './router';

const port = 3333;
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use((__, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

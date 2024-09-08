import express from 'express';
import * as path from 'path';
import { ResponseService } from './services';

const app = express();
const port = process.env.PORT || 3333;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/:version?/:environment?/:model?/:type?/:mod1?/:mod2?/:mod3?', (req, res) => {
  const { params, query } = req;

  res.send(ResponseService({ params, query }));
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

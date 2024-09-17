import express from 'express';
import * as path from 'path';

import router from './router';

const port = 3333;
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

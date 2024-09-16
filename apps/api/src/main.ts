import express from 'express';
import * as path from 'path';

import router from './router';

const port = 3333;
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app
//   .route('/api/:version?/:environment?/:model?/:type?/:mod1?/:mod2?/:mod3?')
//   .put((req, res) => {
//     const { body, params, query } = req;
//
//     // res.send(ResponseService({ params, query }));
//     res.send({
//       message: 'PUT method',
//       body,
//       params,
//       query,
//     });
//   })
//   .patch((req, res) => {
//     const { body, params, query } = req;
//
//     // res.send(ResponseService({ params, query }));
//     res.send({
//       message: 'PATCH method',
//       body,
//       params,
//       query,
//     });
//   })
//   .delete((req, res) => {
//     const { body, params, query } = req;
//
//     // res.send(ResponseService({ params, query }));
//     res.send({
//       message: 'DELETE method',
//       body,
//       params,
//       query,
//     });
//   })
//   .post((req, res, next) => {
//     const { body, params, query } = req;
//
//     // res.send(ResponseService({ params, query }));
//     res.send({
//       message: 'POST method',
//       body,
//       params,
//       query,
//     });
//   })
//   .get((req, res) => {
//     const { params, query } = req;
//
//     res.send(ResponseService({ params, query }));
//   });
//
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
//
// server.on('error', console.error);

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

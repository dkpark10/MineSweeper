import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import sanitize from 'sanitize-html';
import apiroute from './routes/api';
import secretKey from './config/secretkey';
import cookieParser from 'cookie-parser'
import shortid from 'shortid';
import cors from 'cors';

const app: express.Application = express();
const port: string = process.env.PORT || '8080';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(compression());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.set('secret-key', secretKey);
app.use(cookieParser(app.get('secret-key').cookieKey));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// post body 인풋 세탁
app.use((request: Request, response: Response, next: NextFunction) => {

  const dirtyUserInfo = request.body;
  Object.entries(dirtyUserInfo).map(([key, value]) => {
    dirtyUserInfo[key] = sanitize(value as string, {
      allowedTags: []
    });
  });

  next();
});

app.use('/api', apiroute);

app.get('/', async (request: Request, response: Response, next: NextFunction) => {

  var dirtylist = [
    '<h1>rere</h1>',
    '<script>reer</script>',
    '<p>fdfd</p>',
    '<div>fdff</div>',
    '<section>ffef</section>'
  ];

  var cleanList = dirtylist.map((ele) => sanitize(ele, { allowedTags: [] }));
  response.status(200).send(cleanList);
});

app.post('/', async (request: Request, response: Response, next: NextFunction) => {

  const idid = shortid.generate();
  response.cookie('accessToken', idid);

  response.status(200).send(idid);
});


app.listen(port, () => {
  console.log(`start server port ${port}`);
});

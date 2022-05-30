process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import sanitize from 'sanitize-html';
import apiroute from './routes/api/index';
import secretKey from './config/secretkey';
import address from './config/address';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import path from 'path';
import { expressCspHeader, INLINE, NONE, SELF } from 'express-csp-header';
const app: express.Application = express();
const port: string = process.env.PORT || '8080';

// 서버단 최적화 
// 조회수 업데이트 데드락 최적화(캐시?)
// 페이지네이션 전체count(*) 최적화
// 뒤 페이지 포스트 limit 최적화(삭제 요소때문에 limit)
// 랭킹 쿼리 최적화(???)

app.use(compression());
app.use(helmet());
app.use(expressCspHeader({
  directives: {
    'script-src': [SELF, INLINE],
    'img-src': [SELF]
  }
}));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:80',
    address
  ],
  credentials: true
}));

app.use(express.static(path.join(__dirname, '../../client/build')));
app.set('secret-key', secretKey);
app.set('itemCountPerPage', 20);
app.use(cookieParser(app.get('secret-key').cookieKey));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sanitizeInput = (arg: any) => {
  Object.entries({ ...arg }).map(([key, value]) => {
    arg[key] = sanitize(value as string, {
      allowedTags: [
        "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
        "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
        "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
        "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
        "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
        "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
      ],
    })
  })
}

// 모든 get 쿼리스트링 세탁한다.
app.get('*', async (request: Request, _: Response, next: NextFunction) => {
  sanitizeInput(request.params);
  sanitizeInput(request.query);
  next();
});

// post body 인풋 세탁
app.post('*', async (request: Request, _: Response, next: NextFunction) => {
  sanitizeInput(request.body);
  next();
});

app.use('/api', apiroute);

app.get('/', async (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// 서버에서 url 넘겨줄 때 헤당 엔드포인트가 없으므로
app.get('*', async (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`start server port ${port}`);
});
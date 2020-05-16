import Koa from 'koa';
import logger from './utils/logger';
import DB from './database';

const app = new Koa();

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(3003, () => {
    DB.save('User', { email: '1233', name: '23333', password: 212212 });
    logger.done('服务运行在localhost:3003 ...');
});

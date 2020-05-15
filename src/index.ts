import Koa from 'koa';

const app = new Koa();

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(3003, () => {
    console.log('服务运行在localhost:3003 ...');
});

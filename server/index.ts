import { Elysia, file } from "elysia";
import { openapi } from '@elysiajs/openapi';
import { staticPlugin } from '@elysiajs/static';

const app = new Elysia()
  .use(openapi({
    documentation: {
      info: {
        title: 'Soyware Engineer Fumblementals',
        version: 'IN-DEV'
      },
      tags: [
        { name: 'Landing', description: 'Clientside Route' },
        { name: 'API', description: 'Actual Backend Stuff' }
      ]
    }
  }))
  .use(staticPlugin({
    assets: 'dist',
    prefix: 'dist',
    indexHTML: true,
  }))
  .get('/', (c) => c.redirect('html', 301), {
    detail: {
      summary: 'Landing page for frontend',
      tags: ['Landing']
    }
  })
  .get('/html', file('dist/index.html'), {
    detail: {
      summary: 'Landing page for frontend',
      tags: ['Landing']
    }
  })
  .get('/html/*', file('dist/index.html'), {
    detail: {
      summary: 'Landing page for frontend',
      tags: ['Landing']
    }
  })
  // BACKEND START HERE
  .get('/api', 'BACKEND API', {
    detail: {
      summary: 'API',
      tags: ['API']
    }
  })

  .onError((c) => {
    if (c.code === 'NOT_FOUND') return file('dist/index.html');
  })
  .listen(3000);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

import page from 'page';
import { initFirebase } from './firebase';

initFirebase();

page('/', (ctx) => {
  ctx.name = 'list';
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
  import('./views/fire-list.js');
});

page('/:roomId', (ctx) => {
  ctx.name = 'room';
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
  import('./views/fire-room.js');
});

page();


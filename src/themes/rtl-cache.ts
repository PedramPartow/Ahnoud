import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

const rtlCache: EmotionCache = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

export default rtlCache;
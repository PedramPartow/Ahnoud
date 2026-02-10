'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';

export default function EmotionCacheProvider({
  children,
  direction = 'ltr',
}: {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}) {
  const [cache] = useState(() => {
    const c = createCache({
      key: direction === 'rtl' ? 'mui-rtl' : 'mui',
      stylisPlugins: direction === 'rtl' ? [rtlPlugin] : [],
      prepend: true,
    });
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted);
    if (entries.length === 0) return null;

    let styles = '';
    const dataEmotionAttribute = cache.key;
    const names: string[] = [];

    for (const [name, value] of entries) {
      if (typeof value === 'string') {
        names.push(name);
        styles += value;
      }
    }

    return (
      <style
        key={dataEmotionAttribute}
        data-emotion={`${dataEmotionAttribute} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

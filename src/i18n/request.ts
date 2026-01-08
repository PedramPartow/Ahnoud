import {getRequestConfig} from 'next-intl/server';
import { env } from "process";

export default getRequestConfig(async () => {
  let locale = env.LANG || 'en';

  // const store = await cookies();
  // const locale = store.get('locale')?.value || 'en';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
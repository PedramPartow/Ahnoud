import { Button } from '@/components/general/Button';
import { useTranslations } from 'next-intl';
import { GoogleColorIcon } from '../components/icons/GoogleColorIcon';
import { LogoutIcon } from '../components/icons/LogoutIcon';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <span className="headline-01">{t('title')}</span>
        <span className="headline-02">{t('description')}</span>
        <span className="body-01 text-zinc-600">description</span>
        <div className="divider my-8"></div>
        <Button className="btn sm primary block"><GoogleColorIcon size={24} /> Button</Button>
        <Button className="btn md primary block my-2">Button <GoogleColorIcon size={24} /></Button>
        <Button className="btn lg primary block disabled"><GoogleColorIcon size={24} /> Button <GoogleColorIcon size={24} /></Button>

        <Button className="btn sm dark block mt-10"><GoogleColorIcon size={24} /> Button</Button>
        <Button className="btn md dark block my-2">Button <GoogleColorIcon size={24} /></Button>
        <Button className="btn lg dark block disabled"><GoogleColorIcon size={24} /> Button <GoogleColorIcon size={24} /></Button>

        <Button className="btn sm blur-gray block mt-10"><GoogleColorIcon size={24} /> Button</Button>
        <Button className="btn md blur-gray block my-2">Button <GoogleColorIcon size={24} /></Button>
        <Button className="btn lg blur-gray block disabled"><GoogleColorIcon size={24} /> Button <GoogleColorIcon size={24} /></Button>

        <Button className="sm outline-gray block mt-10"><LogoutIcon size={24} /> Buttonn</Button>
        <Button className="md outline-gray block my-2">Button <LogoutIcon size={24} /></Button>
        <Button className="lg outline-gray block disabled"><LogoutIcon size={24} /> Button <LogoutIcon size={24} /></Button>
      </main>
    </div>
  );
}

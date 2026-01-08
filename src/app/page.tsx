import { Sample } from '../components/icons/Sample';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <span className="headline-01">{t('title')}</span>
        <span className="headline-02">{t('description')}</span>
        <span className="body-01 text-zinc-600">description</span>
        <Sample size={48} color="#111827" />
      </main>
    </div>
  );
}

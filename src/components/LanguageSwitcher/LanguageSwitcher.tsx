import { useLanguage } from 'contexts/LanguageContext';
import s from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={s.switcher}>
      <button
        className={`${s.option} ${locale === 'ru' ? s.active : ''}`}
        onClick={() => setLocale('ru')}
      >
        RU
      </button>
      <button
        className={`${s.option} ${locale === 'en' ? s.active : ''}`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;

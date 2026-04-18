import Text from 'components/Text';
import s from './HomePage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { locale, t } = useLanguage();
    const navigate = useNavigate();

    return (
        <section>
            <header className={s.header}>
                <span className={s.line}></span>
                <Text weight='medium' view='title-small' color='secondary'>{locale === 'ru' ? 'РАЗДЕЛЫ' : 'SECTIONS'}</Text>
                <span className={s.line}></span>
            </header>

            <div className={s.links}>
                <article className={s.link} onClick={() => navigate('/news')}><Text color='primary' view='subtitle'>{t('nav.news')}</Text></article>
                <article className={s.link} onClick={() => navigate('/reviews')}><Text color='primary' view='subtitle'>{t('nav.reviews')}</Text></article>
                <article className={s.link} onClick={() => navigate('/analytics')}><Text color='primary' view='subtitle'>{t('nav.analytics')}</Text></article>
                <article className={s.link} onClick={() => navigate('/articles')}><Text color='primary' view='subtitle'>{t('nav.articles')}</Text></article>
            </div>
        </section>
    );
}

export default HomePage;

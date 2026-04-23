import Text from 'components/Text';
import s from './HomePage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import { useNavigate } from 'react-router';
import EarthIcon from 'components/icons/EarthHoriz';
import Title from 'components/Title';
import DotIcon from 'components/ArticleWrapper/components/DotIcon';

const types = ["coordinates", "time", "geodynamics", "geodesy", "navigation", "positioning", "synchronization", "miscellaneous"]

const HomePage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <section>
            <div className={s.earth__wrapper}><EarthIcon className={s.earth}/></div>

            <Title title={'home'} className={s.home}/>

            <div className={s.types}>
                {
                    types.map(type => (
                        <div className={s.type}>
                            <DotIcon />
                            <Text onClick={() => navigate(`/content/${type}`)} className={s.borderEffect} weight='medium'>{t(`title.${type}`)}</Text>
                        </div>
                    )
                )
                }
            </div>

            <div className={s.links}>
                <article className={s.link} onClick={() => navigate('/content/news')}><Text color='primary' view='subtitle'>{t('nav.news')}</Text></article>
                <article className={s.link} onClick={() => navigate('/content/reviews')}><Text color='primary' view='subtitle'>{t('nav.reviews')}</Text></article>
                <article className={s.link} onClick={() => navigate('/content/analytics')}><Text color='primary' view='subtitle'>{t('nav.analytics')}</Text></article>
                <article className={s.link} onClick={() => navigate('/content/articles/vestnik')}><Text color='primary' view='subtitle'>{t('nav.articles')}</Text></article>
                <article className={s.link} onClick={() => navigate('/dictionary')}><Text color='primary' view='subtitle'>{t('nav.dict')}</Text></article>
            </div>
        </section>
    );
}

export default HomePage;

import Text from 'components/Text';
import s from './ArticlesPage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useArticles } from 'hooks/useArticles';
import EarthLeftIcon from 'components/icons/EarthLeft';
import LoadingScreen from 'components/LoadingScreen';

type ArticlesPageProps = {
    category: string;
    subcategory?: string;
}

const ArticlesPage = ({ category, subcategory }: ArticlesPageProps) => {
    const { locale, t } = useLanguage();
    const navigate = useNavigate();
    const isArticlesCategory = category === 'articles';

    const { data, isLoading } = useArticles({category: category, subcategory: subcategory})

    if (isLoading) return <LoadingScreen />

    return (
        <section>
            <EarthLeftIcon className={s.earh}/>
            
            <header className={s.header}>
                <span className={s.line}></span>
                <Text weight='bold' view='title-small' color='secondary' className={s.title}>{t(`nav.${category}`)}</Text>
                <span className={s.line}></span>
            </header>

            {isArticlesCategory && <div className={s.subcategories}>
                <Text view='p-16' 
                      className={cn(s.borderEffect, s.subcategory, subcategory === 'vestnik' && s.subcategory__active)} 
                      onClick={() => navigate('/articles/vestnik')}>
                        {t('subtitles.vestnik')}
                </Text>
                <Text view='p-16' 
                      className={cn(s.borderEffect, s.subcategory, subcategory === 'other' && s.subcategory__active)} 
                      onClick={() => navigate('/articles/other')}>
                        {t('subtitles.other')}
                </Text>
            </div>}

            <div className={cn(s.articles, s.page)}>
                {data && data.map(item => (
                    <article key={item.slug} 
                             onClick={() => navigate(`/${category}${subcategory ? `/${subcategory}` : ''}/${item.slug}`)}
                             className={s.article}>
                        {item.part && <span className={s.article__part}><Text color='primary'>{`${t('common.part')} ${item.part}`}</Text></span>}
                        <Text color='primary' className={s.title}>{locale === 'ru' ? `${item.name}` : `${item.name_en}`}</Text>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default ArticlesPage;

import Text from 'components/Text';
import s from './ArticlesPage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from 'hooks/useArticles';
import EarthLeftIcon from 'components/icons/EarthLeft';
import LoadingScreen from 'components/LoadingScreen';
import Title from 'components/Title';
import Input from 'components/Input';
import SearchIcon from 'components/icons/SearchIcon';
import TableOfContents from 'components/ContentRenderer/components/TableOfContents';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';

const ArticlesPage = () => {
    const { locale, t } = useLanguage();
    const navigate = useNavigate();
    const { type, subcategory } = useParams<{ type?: string; subcategory: string }>();
    const isArticlesCategory = !type;
    const category = type || 'articles';

    console.log(category, subcategory)

    if (!category) return;
    const { data, isLoading } = useArticles({category: category, subcategory: subcategory});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!searchQuery.trim()) return data;

        const query = searchQuery.toLowerCase().trim();
        
        return data.filter(item => {
            const searchField = locale === 'ru' ? item.name : item.name_en;
            return searchField?.toLowerCase().includes(query);
        });
    }, [data, searchQuery, locale]);

    const debouncedSetSearch = useCallback(
        debounce((value: string) => {
            setSearchQuery(value);
        }, 0),
        []
    );

    if (isLoading) return <LoadingScreen />

    return (
        <section className={s.page}>
            <EarthLeftIcon className={s.earh}/>
            
            <Title title={category} />
            {data && <TableOfContents headers={data}/>}

            <Text className={s.search__title} color='primary' view='subtitle'>{locale === 'ru' ? 'Поиск' : 'Searching'}</Text>
            <Input value={searchQuery} onChange={(e) => debouncedSetSearch(e)} className={s.search} theme='light' afterSlot={<SearchIcon className={s.search__icon}/>}/>

            <div>
                {isArticlesCategory && <div className={s.subcategories}>
                    <Text view='p-16'
                        className={cn(s.borderEffect, s.subcategory, subcategory === 'vestnik' && s.subcategory__active)} 
                        onClick={() => navigate('/content/articles/vestnik')}>
                            {t('subtitles.vestnik')}
                    </Text>
                    <Text view='p-16' 
                        className={cn(s.borderEffect, s.subcategory, subcategory === 'other' ? s.subcategory__active : '')} 
                        onClick={() => navigate('/content/articles/other')}>
                            {t('subtitles.other')}
                    </Text>
                </div>}

                <div className={s.articles}>
                    {filteredData.length > 0 && filteredData.map(item => (
                        <article key={item.slug} 
                                 id={item.slug}
                                 onClick={() => navigate(`/content/${category}${subcategory ? `/${subcategory}` : ''}/${item.slug}`)}
                                 className={s.article}>
                            {item.part && <span className={s.article__part}><Text color='primary'>{`${t('common.part')} ${item.part}`}</Text></span>}
                            <Text color='primary'>{locale === 'ru' ? `${item.name}` : `${item.name_en}`}</Text>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ArticlesPage;

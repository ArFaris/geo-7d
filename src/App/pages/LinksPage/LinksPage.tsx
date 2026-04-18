import Text from 'components/Text';
import s from './LinksPage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import cn from 'classnames';
import { type Link } from 'types/link';

type LinksPageProps = {
    links?: Link[];
}

const LinksPage = ({links}: LinksPageProps) => {
    const { locale, t } = useLanguage();

    return (
        <section>
            <header className={s.header}>
                <span className={s.line}></span>
                <Text view='title-small' color='secondary'>{t(title)}</Text>
                <span className={s.line}></span>
            </header>

            <div className={cn(s.articles, s.page)}>
                {articles.map(article => (
                    <article><Text>{article.name}</Text></article>
                ))}
            </div>
        </section>
    );
}

export default LinksPage;

import { useEffect } from 'react';
import { useLanguage } from 'contexts/LanguageContext';
import Text from 'components/Text';
import dictionaryData from 'locales/dictionary.json';
import Title from 'components/Title';
import s from './DictionaryPage.module.scss';
import cn from 'classnames';

const DictionaryPage = () => {
    const { locale } = useLanguage();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash && dictionaryData[hash as keyof typeof dictionaryData]) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const getHashLink = (term: string) => `#${term}`;

    const handleTermClick = (term: string) => {
        window.location.hash = term;
    };

    return (
        <section className={s.page}>
            <Title title={'dict'}/>

            <div className={s.terms}>
                {Object.entries(dictionaryData).map(([key, value]) => (
                    <div
                        key={key}
                        id={key}
                        className={s.term}
                        onClick={() => handleTermClick(key)}
                    >
                        <Text view="subtitle" weight='bold'>
                            <a href={getHashLink(key)} onClick={(e) => {
                                e.preventDefault();
                                handleTermClick(key);
                            }}>
                                {value[locale].title}
                            </a>
                        </Text>
                        <Text view="p-16">{value[locale].definition}</Text>
                        <ul>
                            {value[locale].examples.map((ex, i) => (
                                <li key={i}>{ex}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DictionaryPage;

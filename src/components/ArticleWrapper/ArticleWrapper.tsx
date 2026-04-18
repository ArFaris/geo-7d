import EmailIcon from 'components/icons/EmailIcon';
import MaksIcon from 'components/icons/MaksIcon';
import CopyIcon from 'components/icons/CopyIcon';
import DotIcon from './components/DotIcon';
import Text from 'components/Text';
import s from './ArticleWrapper.module.scss';
import cn from 'classnames';
import { useLanguage } from 'contexts/LanguageContext';

type ArticleWrapperProps = {
    image: string;
    category: string;
    title: string;
    author: string;
    createdAt: string;
    readingTime: number;
    views: number;
    likes: number;
}

const ArticleWrapper = ({image, category, title, author, createdAt, readingTime, views, likes}: ArticleWrapperProps) => {
    const { locale, t } = useLanguage();

    return (
        <section className={s.wrapper}>
            <img className={cn(s.img, s.img__desctop)} src={image} alt='Иллюстрация к статье'/>

            <div className={cn(s.page, s.main)}>
                <div>
                    <Text className={s.category} color='gray'>{category}</Text>
                    <Text weight='bold' view='title-small'>{title}</Text>
                </div>

                <img className={cn(s.img, s.img__mobile)} src={image} alt='Иллюстрация к статье'/>

                <div>
                    <Text className={s.author}>{locale === 'ru' ? `Автор: ${author}` : `Author: ${author}`}</Text>

                    <div className={s.group}>
                        <Text color='gray'>{createdAt}</Text>
                        <DotIcon />
                        <Text color='gray'>{locale === 'ru' ? `время чтения: ${readingTime} минут` : `Reading time: ${readingTime} minutes`}</Text>
                    </div>
                </div>

                <div className={s.group}>
                    <Text color='gray'>{locale === 'ru' ? `${views} просмотров` : `${views} views`}</Text>
                    <DotIcon />
                    <Text color='gray'>{`${likes}`}</Text>
                </div>

                <div className={s.links}>
                    <CopyIcon />
                    <EmailIcon />
                    <MaksIcon />
                </div>
            </div>
        </section>
    );
}

export default ArticleWrapper;

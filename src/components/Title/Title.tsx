import { useLanguage } from 'contexts/LanguageContext';
import s from './Title.module.scss';
import Text from 'components/Text';
import cn from 'classnames'

const Title = ({ title, className }: { title: string, className?: string }) => {
    const { t } = useLanguage();

    return (
        <header className={cn(s.header, className)}>
            <span className={s.line}></span>
            <Text weight='bold' view='title-small' className={s.title}>{t(`title.${title}`)}</Text>
            <span className={s.line}></span>
        </header>
    )
}

export default Title;

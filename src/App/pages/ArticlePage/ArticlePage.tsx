import Text from 'components/Text';
import s from './ArticlePage.module.scss';
import { useLanguage } from 'contexts/LanguageContext';
import cn from 'classnames';
import { useParams } from 'react-router';
import { useArticle } from 'hooks/useArticle';
import CopyIcon from 'components/icons/CopyIcon';
import EmailIcon from 'components/icons/EmailIcon';
import MaksIcon from 'components/icons/MaksIcon';
import PdfViewer from './components/PdfViewer';
import { useEffect, useState } from 'react';
import { getPdfUrl } from 'api/api';
import LoadingScreen from 'components/LoadingScreen';

const ArticlePage = () => {
    const { locale, t } = useLanguage();
    const { type, subcategory, id } = useParams<{ type?: string; subcategory?: string; id: string }>();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const category = type || 'articles';

    const { data, isLoading } = useArticle(id || '');

    console.log(category, subcategory, id)

    useEffect(() => {
        const getPdf = async () => {
            if (!data?.pdfPath) return;
            const url = await getPdfUrl(data.pdfPath); 
            setPdfUrl(url);
        }
        getPdf();
    }, [data]);

    if (!id || !data) {
        return null;
    }

    if (isLoading) return <LoadingScreen />

    return (
        <section className={cn(s.page, s.article)}>
            <PdfViewer pdfUrl={pdfUrl}/>
            
            <div className={s.main}>
                <div>
                    <Text className={s.category}>{t(`nav.${data.category}`)}</Text>
                    <Text weight='bold' view='title-small'>{locale === 'ru' ? `${data.name}` : `${data.name_en}`}</Text>
                </div>

                <div>
                    <Text color='accent'>{locale === 'ru' ? `время чтения: ${data.readingTime} минут` : `Reading time: ${data.readingTime} minutes`}</Text>
                    <div className={s.group}>
                        <Text>{locale === 'ru' ? `${data.views} просмотров` : `${data.views} views`}</Text>
                        {/* <DotIcon />
                        <Text>{`${data.likes}`}</Text> */}
                    </div>
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

export default ArticlePage;

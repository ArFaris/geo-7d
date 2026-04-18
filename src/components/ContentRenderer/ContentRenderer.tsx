import BlockRenderer from './components/BlockRenderer';
import s from './ContentRenderer.module.scss'
import Button from 'components/Button';
import TableOfContents from './components/TableOfContents';
import { useLanguage } from 'contexts/LanguageContext';

const ContentRenderer = ({ blocks, headers }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  const { locale } = useLanguage();
  
  return (
    <section className={s.content__section}>
      <TableOfContents headers={headers} blocks={blocks} />

      <div className={s.content}>
        {blocks.map((block, idx) => (
          <BlockRenderer key={idx} id={block.type === 'heading' ? block.id : undefined} block={block} />
        ))}
      </div>

      <Button className={s.pdf} view='dark'>{locale === 'ru' ? 'Скачать PDF' : 'Download PDF'}</Button>
    </section>
  );
};

export default ContentRenderer;

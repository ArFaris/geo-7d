import { useEffect, useState } from 'react';
import Text from 'components/Text';
import s from './TableOfContents.module.scss';
import { type ContentBlock, type Header } from 'types/content';
import Button from 'components/Button';
import cn from 'classnames';
import { useLanguage } from 'contexts/LanguageContext';

type TableOfContentsProps = {
    headers: Header[];
    blocks: ContentBlock[];
}

const TableOfContents = ({ headers, blocks }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState('');

  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 124;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const headings = headers
      .map(block => document.getElementById(block.id))
      .filter((el: HTMLElement | null) => el !== null);

    console.log(headings)
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      }
    );

    headings.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, [headers]);

  let firstLevelInd = 0;
  const renderHeaderItem = (header: Header, index: number) => {
    const isActive = activeId === header.id;
    const indent = (header.level - 1) * 48;
    const isFirstLevel = header.level === 1;
    firstLevelInd += Number(isFirstLevel); 
    console.log(header)
    return (
      <div
        key={header.id || index}
        style={{ paddingLeft: indent }}
        onClick={() => scrollToHeader(header.id)}
        className={cn(s.headers__item, !isFirstLevel && s.headers__subitem)}
      >
        {isFirstLevel && <Button view={isActive ? 'dark' : 'light'} className={s.headers__btn}>{firstLevelInd}</Button>}
        <Text className={cn(s.borderEffect, s.headers__text)}
              view={isFirstLevel ? 'p-16' : 'p-14'}
              color='primary'>
          {header.title}
        </Text>
      </div>
    );
  };

  if (!headers || headers.length === 0) return null;

  const { locale } = useLanguage();

  return (
    <div className={s.sidebar}>
        <Text className={s.sidebar__title} view='p-16' weight='bold' color='primary'>{locale === 'ru' ? 'СОДЕРЖАНИЕ' : 'TABLE OF CONTENTS'}</Text>
        <div className={s.headers}>
            {headers.map((header, idx) => renderHeaderItem(header, idx))}
        </div>
    </div>
  );
};

export default TableOfContents;

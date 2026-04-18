import DataTable from "components/Table";
import Text from "components/Text";
import { type ContentBlock } from "types/content";
import s from './BlockRenderer.module.scss';

const BlockRenderer = ({ block, id }: { block: ContentBlock, id: string | undefined }) => {
  switch (block.type) {
    case 'heading':
      return <Text id={id} className={s.text} view={block.level === 1 ? 'subtitle' : 'p-16'} weight='bold' color='primary'>{block.text}</Text>;
    
    case 'paragraph':
      return <Text className={s.text} view='p-16' color='primary'>{block.text}</Text>;
    
    case 'numbered_list':
      return (
        <div className={s.text}>
          {block.items.map((item, idx) => (
            <Text className={s.nums} key={idx} view='p-16' color='primary'>{`${idx + 1}. ${item}`}</Text>
          ))}
        </div>
      );
    
    case 'bulleted_list':
      return (
        <div className={s.text}>
          {block.items.map((item, idx) => (
            <Text className={s.list} key={idx} view='p-16' color='primary'>{`   • ${item}`}</Text>
          ))}
        </div>
      );
    
    case 'table':
      return (
        <div className={s.wrapper}>
          <DataTable 
            title={block.title} 
            subtitle={block?.subtitle} 
            rows={block.rows} 
            headers={block.headers}
          />
        </div>
      );
    
    default:
      return null;
  }
};

export default BlockRenderer;

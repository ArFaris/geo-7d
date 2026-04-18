import * as React from 'react';
import s from './DataTable.module.scss';
import TableUpIcon from './components/TableUpIcon';
import TableDownIcon from './components/TableDownIcon';
import cn from 'classnames';
import Text from 'components/Text';

type DataTableProps = {
    headers: string[];
    rows: string[][];
    title: string;
    subtitle?: string;
}

const DataTable = React.memo(({ headers, rows, title, subtitle }: DataTableProps) => {
    return (
        <div className={s.main}>
            <TableUpIcon className={cn(s.decoration, s['decoration-up'])} />

            <div className={cn(s.page, s.wrapper)}>
                <div className={s.title}>
                    <Text className={s['title-first']} view='subtitle' weight='bold'>
                        {title}
                    </Text>
                    {subtitle && 
                        <Text className={s['title-second']} color='gray' view='p-16'>
                            {subtitle}
                        </Text>
                    }
                </div>

                <div className={s.table__wrapper}>
                    <table className={s.table}>
                        <thead>
                            <tr>
                                {headers.map((h, i) => 
                                    <th key={i}>
                                        <Text view='p-16' weight='bold'>{h}</Text>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => 
                                <tr key={i}>
                                    {row.map((cell, j) => 
                                        <td key={j}>
                                            <Text color='gray' view='p-16'>{cell}</Text>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <TableDownIcon className={cn(s.decoration, s['decoration-down'])}/>
        </div>
    );
});

export default DataTable;

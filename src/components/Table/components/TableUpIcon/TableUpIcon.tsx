import { type IconProps } from 'components/icons/Icon';
import React from 'react';

const TableUpIcon: React.FC<IconProps> = ({
    ...props
}: IconProps) => {
    return (
        <svg
          data-testid="icon"
          width='100%'
          viewBox='0 0 1440 369'
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
            <g clip-path="url(#clip0_113_1898)">
            <path d="M1440.96 1479.11L1075 1419.47L1074.52 1419.39L1074.06 1419.54L723.833 1534.43L533.395 1504L532.758 1503.89L532.182 1504.18L335.892 1602.63L173.613 1469.91L173.011 1469.42L172.233 1469.46L-2 1479.34V209.129L71.5166 117.345L127.872 224.275L128.088 224.684L128.461 224.957L234.47 302.517L235.609 303.352L236.777 302.556L371.171 210.936L513.7 331.515L514.71 332.37L515.892 331.774L756.211 210.635L894.017 270.668L895.453 271.294L896.404 270.049L1014.03 116.163L1122.63 162.537L1122.8 162.611L1122.99 162.651L1236.03 187.263L1237.45 187.572L1238.18 186.314L1301.05 78.292L1377.26 115.511L1378.97 116.349L1379.89 114.674L1451.94 -17.0684L1440.96 1479.11Z" fill="#0D1A2A" stroke="#A1D1DA" stroke-width="4"/>
            </g>
            <defs>
            <clipPath id="clip0_113_1898">
            <rect width='100%' height='100%' fill="white"/>
            </clipPath>
            </defs>
        </svg>
    );
};

export default TableUpIcon;

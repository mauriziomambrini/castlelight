import type { CSSProperties, ReactNode } from 'react';

import s from './TinyTable.module.scss';

import Typo from '@/components/typography/Typo';
import type {
  Classnames,
  TypoColorType,
  TypoSizeType,
} from '@/types/compoentsTypes.ts';
import cx from 'classnames';

export interface IDataTinyTableData {
  key: string;
  label?: string;
  value?: string | number | ReactNode;
  onClick?: (args: any) => void;
  hidden?: boolean;
}

export interface ITinyTable {
  data: IDataTinyTableData[];
  size?: TypoSizeType[];
  color?: TypoColorType[];
  col?: string[];
  gap?: number[];
  classNames?: Classnames<'wrapper' | 'table' | 'label' | 'value'>;
}

const TinyTable = (props: ITinyTable) => {
  const {
    data,
    size = ['df'],
    color = ['grey-2', 'grey'],
    col = ['8rem', '1fr'],
    gap = [0.5],
    classNames,
  } = props;

  const renderLabel = (label?: string) => {
    if (!label) return null;
    return (
      <Typo
        className={cx(s.label, classNames?.label)}
        text={label}
        tag={'p'}
        size={size[0]}
        color={color[0]}
      />
    );
  };

  const renderValue = (value?: string | number | ReactNode) => {
    if (!value) return null;

    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <Typo
          className={cx(s.value, classNames?.value)}
          text={value}
          tag={'p'}
          size={size[1] || size[0]}
          color={color[1] || color[0]}
          weight={'semi'}
        />
      );
    }
    return value;
  };

  const renderTable = () => {
    return data
      .filter((info) => !info.hidden)
      .map((item) => {
        return (
          <div key={item.key} className={cx(s.table, classNames?.table)}>
            {renderLabel(item.label)}
            {renderValue(item.value)}
          </div>
        );
      });
  };

  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper)}
      style={
        {
          '--lcols': [col[0], col[1]].filter(Boolean).join(' '),
          '--lgap': `${[gap[0], gap[1]].filter(Boolean).join(' ')}rem`,
        } as CSSProperties
      }
    >
      {renderTable()}
    </div>
  );
};

export default TinyTable;

import type { IconColorType } from '@/types/compoentsTypes';
import type { FC, ReactElement } from 'react';
import Svg from 'react-inlinesvg';

export interface IIcon {
  name?: string;
  size?: number[];
  color?: IconColorType;
  onClick?: (...args: any[]) => void;
  className?: string;
}

const Icon: FC<IIcon> = (props: IIcon): ReactElement => {
  const { name, size = [1], color = 'accent', onClick, className } = props;

  const src = name || '';
  const width = `${size[0]}rem`;
  const height = `${size[1] || size[0]}rem`;
  const _color = `var(--c-${color})`;
  return (
    <Svg
      className={className}
      src={src}
      width={width}
      height={height}
      fill={_color}
      onClick={onClick}
    />
  );
};

export default Icon;

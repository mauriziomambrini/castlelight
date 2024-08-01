import type {
  Classnames,
  TypoColorType,
  TypoSizeType,
} from '@/types/compoentsTypes';
import cx from 'classnames';
import type { CSSProperties, FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import s from './MarkdownText.module.scss';

export interface IMarkdown {
  text?: string;
  baseSize?: TypoSizeType;
  color?: TypoColorType;
  classNames?: Classnames<
    | 'text'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'ul'
    | 'ol'
    | 'li'
    | 'a'
    | 'strong'
    | 'em'
    | 'img'
    | 'hr'
  >;
}

const MarkdownText: FC<IMarkdown> = (props: IMarkdown): ReactElement | null => {
  const { text, baseSize = 'df', color = 'default', classNames } = props;

  const renderComponents = (
    classNames: IMarkdown['classNames'],
    style: CSSProperties,
  ) => ({
    h1: ({ ...props }) => (
      <h2 className={cx(s.h1, classNames?.h1)} style={style} {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 className={cx(s.h2, classNames?.h2)} {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 className={cx(s.h3, classNames?.h3)} {...props} />
    ),
    h4: ({ ...props }) => (
      <h4 className={cx(s.h4, classNames?.h4)} {...props} />
    ),
    h5: ({ ...props }) => (
      <h5 className={cx(s.h5, classNames?.h5)} {...props} />
    ),
    h6: ({ ...props }) => (
      <h6 className={cx(s.h6, classNames?.h6)} {...props} />
    ),
    p: ({ ...props }) => <p className={cx(s.p, classNames?.p)} {...props} />,
    ul: ({ ...props }) => (
      <ul className={cx(s.ul, classNames?.ul)} {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className={cx(s.ol, classNames?.ol)} {...props} />
    ),
    li: ({ ...props }) => (
      <li className={cx(s.li, classNames?.li)}>{props.children}</li>
    ),
    a: ({ ...props }) => (
      <a
        target={'_blank'}
        rel={'noreferrer'}
        className={cx(s.a, classNames?.a)}
        {...props}
      />
    ),
    strong: ({ ...props }) => (
      <strong className={cx(s.strong, classNames?.strong)} {...props} />
    ),
    em: ({ ...props }) => (
      <em className={cx(s.em, classNames?.em)} {...props} />
    ),
    img: ({ ...props }) => (
      <img className={cx(s.img, classNames?.img)} alt={''} {...props} />
    ),
    hr: ({ ...props }) => (
      <hr className={cx(s.hr, classNames?.hr)} {...props} />
    ),
  });

  if (!text) return null;
  return (
    <div
      className={cx(s.text, classNames?.text)}
      style={
        {
          '--lc': `var(--c-${color})`,
          '--lfs': `var(--fs-${baseSize})`,
        } as CSSProperties
      }
    >
      <ReactMarkdown components={renderComponents(classNames, {})}>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownText;

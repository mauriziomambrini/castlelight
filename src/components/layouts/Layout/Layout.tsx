import Footer from '@/components/layouts/Footer';

import Header from '@/components/layouts/Header/Header.tsx';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';
import type { FC, ReactElement, ReactNode } from 'react';
import s from './Layout.module.scss';

export interface ILayout {
  children: ReactNode;
  classNames?: Classnames<'main' | 'content'>;
}

const Layout: FC<ILayout> = (props: ILayout): ReactElement => {
  const { children, classNames } = props;

  const renderHeader = () => {
    return <Header classNames={{ wrapper: s.header }} />;
  };

  const renderFooter = () => {
    return <Footer className={s.footer} />;
  };

  return (
    <main className={cx(s.main, classNames?.main)}>
      {renderHeader()}
      <div className={cx(s.content, classNames?.content)}>{children}</div>
      {renderFooter()}
    </main>
  );
};

export default Layout;

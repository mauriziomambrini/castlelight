import type { FC, ReactElement } from 'react';

import cx from 'classnames';
import s from './Footer.module.scss';

import MarkdownText from '@/components/typography/MarkdownText';
import { useTranslation } from 'react-i18next';

export interface IFooter {
  className?: string;
}

const Footer: FC<IFooter> = (props: IFooter): ReactElement => {
  const { className } = props;
  const { t } = useTranslation();

  const renderPoweredBy = () => {
    const year = new Date().getFullYear();
    const link = '[Pixelcutter.io](https://www.pixelcutter.io/)';
    return (
      <MarkdownText
        text={t('footer.label.powered_by', { year: year, link: link })}
        baseSize={'sm'}
        color={'grey-2'}
      />
    );
  };

  const renderGithub = () => {
    const link = '[Pixelcutter.io](https://www.pixelcutter.io/)';
    return (
      <MarkdownText
        text={t('footer.label.github', { link: link })}
        baseSize={'sm'}
        color={'grey-2'}
      />
    );
  };

  return (
    <footer className={cx(s.footer, className)}>
      {renderGithub()}
      {renderPoweredBy()}
    </footer>
  );
};

export default Footer;

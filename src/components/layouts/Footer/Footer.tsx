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
    const copyrightSymbol = '\u{000A9}';
    const year = new Date().getFullYear();
    const copyright = copyrightSymbol + year;
    const textPoweredBy = t('footer.label.powered_by');
    const linkPoweredBy = `[Pixelcutter.io](https://www.pixelcutter.io/)`;
    const text = [copyright, textPoweredBy, linkPoweredBy].join(' ');

    return <MarkdownText text={text} baseSize={'sm'} color={'grey-2'} />;
  };

  const renderGithub = () => {
    const textGithub = t('footer.label.github');
    const linkGithub = `[Pixelcutter.io](https://www.pixelcutter.io/)`;
    const text = [textGithub, linkGithub].join(' ');

    return <MarkdownText text={text} baseSize={'sm'} color={'grey-2'} />;
  };

  return (
    <footer className={cx(s.footer, className)}>
      {renderGithub()}
      {renderPoweredBy()}
    </footer>
  );
};

export default Footer;

import type { FC, ReactElement } from 'react';

import cx from 'classnames';
import s from './Footer.module.scss';

import Button from '@/components/buttons/Button';
import MarkdownText from '@/components/typography/MarkdownText';
import Divider from '@/components/utils/Divider';
import Flex from '@/components/utils/Flex';
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

  const renderCredits = () => {
    return (
      <Button
        classNames={{ button: s.credits }}
        label={'Credits'}
        to={'/credits'}
        theme={'text'}
      />
    );
  };

  const renderGithub = () => {
    const link =
      '[GitHub](https://github.com/mauriziomambrini/castlelight.git)';
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
      <Flex className={s.menu}>
        {renderPoweredBy()}
        <Divider theme={'vertical'} spacing={[0.25]} />
        {renderCredits()}
      </Flex>
    </footer>
  );
};

export default Footer;

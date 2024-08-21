import type { FC, ReactElement } from 'react';

import cx from 'classnames';
import s from './Footer.module.scss';

import Button from '@/components/buttons/Button';
import MarkdownText from '@/components/typography/MarkdownText';
import Divider from '@/components/utils/Divider';
import Flex from '@/components/utils/Flex';
import useMenu from '@/hooks/useMenu.ts';
import { useTranslation } from 'react-i18next';

export interface IFooter {
  className?: string;
}

const Footer: FC<IFooter> = (props: IFooter): ReactElement => {
  const { className } = props;
  const { t } = useTranslation();
  const main = useMenu();

  const renderMainMenu = () => {
    return (
      <ul className={s.mainMenu} role='list'>
        {main.map((item) => {
          return (
            <li key={item.key}>
              <Button
                classNames={{ button: s.itemMenu }}
                label={item.label}
                to={item.href}
                theme={'text'}
              />
            </li>
          );
        })}
      </ul>
    );
  };

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

  const renderCopyrightMenu = () => {
    return (
      <Flex className={s.copyrightMenu}>
        {renderGithub()}
        <Divider
          classNames={{ wrapper: s.divider }}
          theme={'vertical'}
          spacing={[0.5]}
        />
        {renderPoweredBy()}
      </Flex>
    );
  };

  return (
    <footer className={cx(s.footer, className)}>
      {renderMainMenu()}
      {renderCopyrightMenu()}
    </footer>
  );
};

export default Footer;

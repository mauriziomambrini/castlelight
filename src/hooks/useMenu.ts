import { useTranslation } from 'react-i18next';

export interface IMenu {
  key: string;
  label: string;
  href?: string;
  hidden?: boolean;
}

const useMenu = () => {
  const { t } = useTranslation();

  const entries: Record<string, IMenu> = {
    scores: {
      key: 'scores',
      label: t('menu.label.scores'),
      href: '/scores',
    },
    credits: {
      key: 'credits',
      label: t('menu.label.credits'),
      href: '/credits',
    },
    contacts: {
      key: 'contacts',
      label: t('menu.label.contacts'),
      href: '/contacts',
    },
  };

  const main: IMenu[] = [entries.scores, entries.credits, entries.contacts];

  return main;
};

export default useMenu;

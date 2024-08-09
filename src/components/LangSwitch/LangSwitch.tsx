import Tabs from '@/components/utils/Tabs';
import type { ITab } from '@/components/utils/Tabs/Tabs.tsx';
import useTranslation from '@/hooks/useTranslation';
import type { Classnames } from '@/types/compoentsTypes.ts';
import { useMemo } from 'react';

export interface ILangSwitch {
  classNames?: Classnames<'wrapper' | 'tab' | 'label'>;
}

const LangSwitch = (props: ILangSwitch) => {
  const { classNames } = props;
  const { supportedLocales, currentLocale, switchLanguage } = useTranslation();

  const tabs = useMemo(() => {
    return supportedLocales.map((locale) => ({
      key: locale,
      label: locale.toUpperCase(),
      value: locale,
      active: currentLocale === locale,
      disabled: false,
      hidden: false,
    }));
  }, [supportedLocales, currentLocale]);

  const handleTabClick = (tab: ITab<string>) => {
    switchLanguage(tab.value);
  };

  return <Tabs classNames={classNames} tabs={tabs} onClick={handleTabClick} />;
};

export default LangSwitch;

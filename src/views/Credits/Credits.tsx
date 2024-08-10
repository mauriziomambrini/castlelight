import Layout from '@/components/layouts/Layout';
import MarkdownText from '@/components/typography/MarkdownText';
import Flex from '@/components/utils/Flex';
import { useTranslation } from 'react-i18next';
import s from './Credits.module.scss';

const Credits = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Flex
        className={s.wrapper}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[3]}
      >
        <MarkdownText text={t('credits.title')} baseSize={'lg'} />
        <MarkdownText text={t('credits.text')} baseSize={'lg'} />
      </Flex>
    </Layout>
  );
};

export default Credits;

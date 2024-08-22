import Layout from '@/components/layouts/Layout';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import { useTranslation } from 'react-i18next';
import s from './Contacts.module.scss';

const Contacts = () => {
  const { t } = useTranslation();

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        tag={'h3'}
        text={t('contact.title')}
        size={'lg'}
        weight={'regular'}
        balancer={true}
      />
    );
  };

  const renderMail = () => {
    return (
      <a className={s.mail} href='mailto:info@pixelcutter.io'>
        info@pixelcutter.io
      </a>
    );
  };

  return (
    <Layout>
      <Flex direction={'column'} justify={'center'} align={'center'} gap={[1]}>
        {renderTitle()}
        {renderMail()}
      </Flex>
    </Layout>
  );
};

export default Contacts;

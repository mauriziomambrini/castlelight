import * as IMAGES from '@/assets/images';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Icon from '@/components/utils/Icon';
import { useTranslation } from 'react-i18next';
import s from './NotFound.module.scss';

const NotFound = () => {
  const { t } = useTranslation();

  const renderImg = () => {
    return <Icon className={s.img} name={IMAGES.notFound} />;
  };

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        text={t('not_found.title')}
        size={'db'}
        weight={'bold'}
        balancer={true}
      />
    );
  };

  const renderCta = () => {
    return (
      <Button
        classNames={{ button: s.btn }}
        label={t('action.back_home')}
        to={'/'}
        theme={'outline'}
      />
    );
  };

  return (
    <Layout>
      <Flex
        className={s.wrapper}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[2]}
      >
        {renderImg()}
        {renderTitle()}
        {renderCta()}
      </Flex>
    </Layout>
  );
};

export default NotFound;

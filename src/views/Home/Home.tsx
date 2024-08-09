import * as IMAGES from '@/assets/images';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Icon from '@/components/utils/Icon';
import Logo from '@/components/utils/Logo';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './Home.module.scss';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const TIME_ANIMATION = 12;

  useEffect(() => {
    // Set a timeout to navigate after TIME_ANIMATION seconds
    const timer = setTimeout(() => {
      navigate('/game');
    }, TIME_ANIMATION * 1000);

    // Cleanup the timeout if the component unmounts before time is up
    return () => clearTimeout(timer);
  }, [TIME_ANIMATION, navigate]);

  const handleClick = () => {
    navigate('/game');
  };

  const renderLogo = () => {
    return <Logo classNames={{ wrapper: s.logo }} name={IMAGES.logo} />;
  };

  const renderSubtitle = () => {
    return (
      <Typo
        className={s.subtitle}
        text={t('intro_subtitle')}
        size={'db'}
        weight={'regular'}
        color={'accent'}
      />
    );
  };

  const renderImage = () => {
    return <Icon className={s.img} name={IMAGES.charactersIntro} />;
  };

  return (
    <main
      className={s.main}
      style={{ '--lt-animation': `${TIME_ANIMATION}s` } as CSSProperties}
      onClick={handleClick}
    >
      <Flex
        className={s.wrapper}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[0.5]}
      >
        <div className={s.light} />
        <Flex
          className={s.content}
          direction={'column'}
          justify={'center'}
          align={'center'}
        >
          {renderLogo()}
          {renderSubtitle()}
          {renderImage()}
        </Flex>
      </Flex>
    </main>
  );
};

export default Home;

import Typo from '@/components/typography/Typo';
import { Fragment } from 'react';

export interface IHome {}

const Home = (props: IHome) => {
  const {} = props;

  return (
    <Fragment>
      <Typo text={'Home'} />
    </Fragment>
  );
};

export default Home;

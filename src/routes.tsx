import Credits from '@/views/Credits/Credits.tsx';
import Game from '@/views/Game';
import Home from '@/views/Home';
import NotFound from '@/views/NotFound';
import Recap from '@/views/Recap/Recap.tsx';
import { Outlet, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'recap',
        element: <Recap />,
      },
      {
        path: 'credits',
        element: <Credits />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

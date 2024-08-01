import Game from '@/views/Game';
import Home from '@/views/Home';
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
    ],
  },
]);

export default router;

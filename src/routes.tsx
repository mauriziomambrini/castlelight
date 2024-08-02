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
    ],
  },
]);

export default router;

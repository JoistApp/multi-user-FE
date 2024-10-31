import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Home from './routes/Home';
import Signup from './routes/Signup';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Roles from './routes/Roles';
import Users from './routes/Users';
import { store } from './store'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'roles', element: <Roles /> },
      { path: 'users', element: <Users /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

import "./App.css";
import Login from "./auth/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/resetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import AddMenu from "./admin/AddMenu";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import RestaurantDetail from "./components/RestaurantDetail";
import Orders from "./admin/Orders";
import Success from "./components/Success";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin/restaurant",
        element: <Restaurant />,
      },
      {
        path: "/admin/menu",
        element: <AddMenu />,
      },
      {
        path: "/admin/order",
        element: <Orders />,
      },
      {
        path: "/order",
        element: <Success />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;

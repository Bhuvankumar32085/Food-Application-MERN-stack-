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
import { useUserStore } from "./store/useUserStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated, user} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }
  if(!user?.isVerified){
    return <Navigate to='/verify-email' replace/>
  }
  return <>{children}</>;
}

const AuthenticatedUser=({children}: {children: React.ReactNode}) => {
  const {isAuthenticated,user} = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to='/' replace/>
  }
  return children;
}

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  if(!user?.admin){
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute> ,
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
        element: <AdminProtectedRoute><Restaurant/></AdminProtectedRoute>,
      },
      {
        path: "/admin/menu",
        element: <AdminProtectedRoute><AddMenu /></AdminProtectedRoute>,
      },
      {
        path: "/admin/order",
        element: <AdminProtectedRoute><Orders /></AdminProtectedRoute>,
      },
      {
        path: "/order",
        element: <Success />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser> ,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser> ,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>  ,
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
  const {checkAuntgentication,isCheckingAuth} = useUserStore();

  // Check authentication status on app load
  useEffect(() => {
    checkAuntgentication();
  }, [checkAuntgentication]);

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;

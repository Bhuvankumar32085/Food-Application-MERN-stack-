import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
        {/* navbar */}
        <header>
            <NavBar/>
        </header>
        {/* main content */}
        <div className="flex-1">
            <Outlet/>
        </div>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default MainLayout;
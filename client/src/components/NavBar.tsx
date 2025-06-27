import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "./ui/menubar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenubarMenu } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemStore";

const NavBar = () => {
  const {setTheme}=useThemeStore()
  const { cart } = useCartStore();
  const { user, loading, logout } = useUserStore();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">FoodHub</h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order">Order</Link>
            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/order">
                      <MenubarItem>Order</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=>setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>setTheme('dark')}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart className="" />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-700"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.profilePicture} className="w-12 h-12 object-cover rounded-full"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            {loading ? (
              <Button className="orange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={logout} className="orange">
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden lg:hidden ">
          {/* Mobile responsive */}
          <MobileNevbar />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

const MobileNevbar = () => {
    const {setTheme}=useThemeStore()
  const { user, logout } = useUserStore();
 
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 w-8 h-8" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex p-0 pl-3 pr-3 pt-3  flex-row items-center justify-between mt-9">
          <SheetTitle>FoodHub</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1 p-2">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
          >
            <ShoppingCart />
            <span>Cart(0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/order"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900"
              >
                <PackageCheck />
                <span>Restaurant Order</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2  p-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} className="w-14 h-14 object-cover rounded-full"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{user?.fullname}</h1>
          </div>

          <SheetClose asChild>
            <div className="w-full p-3">
              <Button onClick={logout} type="submit" className="orange w-full">
                Logout
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

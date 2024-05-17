import { Link, NavLink } from "react-router-dom";
import { CircleUser, Landmark, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div className="flex  w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-10 md:text-sm lg:gap-10">
            <NavLink
              to="/"
              className={
                "flex items-center gap-2 text-lg font-semibold md:text-base text-foreground"}
            >
              <Landmark className="h-10 w-10" />
              <span>Bengaluru Bank</span>
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground transition-colors"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground transition-colors"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Accounts
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground transition-colors"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Transactions
            </NavLink>

          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2  text-lg font-semibold md:text-base"
                >
                  <Landmark className="h-10 w-10" />
                  <span className="">Bengaluru Bank</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Transactions
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to="/user-profile"><DropdownMenuLabel>My Account</DropdownMenuLabel></Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-blue-600">Log in</Button>
                </Link>
                <Link to="/signUp">
                  <Button className="bg-blue-600">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
};
export default Navbar;

import { Button } from "@/components/ui/button"
import { CircleUser, MenuIcon, MinusIcon, MountainIcon,  PlusIcon, Search, ShoppingCartIcon } from "lucide-react"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { Cart } from "../cart"

export default function NavBar() {

    const context = useContext(GlobalContext)
    if (!context) throw Error("Context is not available")
    const { state } = context
  return (
    <header className=" fixed top-0 left-0 right-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b bg-white dark:bg-gray-950">
      <a className="flex items-center justify-center" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </a>
      <nav className=" ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <div className="sm:gap-10 flex  items-center   ">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/products">
            Products
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </a>
        </div>
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
            <Cart /> {/*Cart component */}
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/dashboard">Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="ml-auto flex items-center gap-2 lg:hidden">
        <Button className="rounded-full" size="icon" variant="ghost">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </div>
    </header>
  )
}

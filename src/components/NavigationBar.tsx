import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  CircleUser,
  Dumbbell,
  MenuIcon,
} from "lucide-react"
import { Cart } from "./Cart"



export default function NavBar() {
  
  return (
    <header className=" fixed top-0 left-0 right-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b bg-white dark:bg-gray-950">
      <a className="flex items-center justify-center" href="/">
        <Dumbbell className="h-12 w-12" />
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
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/NotFoundPage"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/NotFoundPage"
          >
            Contact
          </a>
        </div>
        <Cart /> {/*Cart component */}
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

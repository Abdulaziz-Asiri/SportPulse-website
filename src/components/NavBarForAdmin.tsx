import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Dumbbell } from "lucide-react"
import { Button } from "./ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/App";
import { useNavigate } from "react-router-dom";
export function NavBarForAdmin() {
  const navigation = useNavigate()

   const context = useContext(GlobalContext)
   if (!context) throw Error("Context is not available")

   const { handleRemoveUser } = context
   
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
    navigation("/")
  }
  
    return (
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap- text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Dumbbell className="h-12 w-12" />
          </a>
          <a href="/" className="text-foreground transition-colors hover:text-foreground">
            Home
          </a>
          <a href="/Dashboard" className="text-foreground transition-colors hover:text-foreground">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Orders
          </a>
          <a
            href="/users_managment"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Users Management
          </a>
          <a
            href="/Add_products"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products Management
          </a>
          <a
            href="/add_categories"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Category Management
          </a>
          <a
            href="/inventory_managment"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Inventory
          </a>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <a href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Dumbbell className="h-12 w-12" />
              </a>
              <a href="/Dashboard" className="hover:text-foreground">
                Dashboard
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Orders
              </a>
              <a href="/AddProducts" className="text-muted-foreground hover:text-foreground">
                Products Management
              </a>
              <a href="/usersmanagment" className="text-muted-foreground hover:text-foreground">
                Users Management
              </a>
              <a href="/addcategories" className="text-muted-foreground hover:text-foreground">
                Category Management
              </a>
              <a
                href="/inventory_managment"
                className="text-muted-foreground hover:text-foreground"
              >
                Inventory
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
}


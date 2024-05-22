import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from "@/components/ui/table"
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"

export default function UsersManagement() {

    const getUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/users", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
      } catch (error) {
        console.error(error)
        return Promise.reject(new Error("Something went wrong, We can't get the user"))
      }
    }

    const {
      data: getUsers,
      error,
      isPending
    } = useQuery<User[]>({
        queryKey: ["Users"],
        queryFn: getUser
    })
    
    console.log('AllUsers:', getUsers)

  return (
    <>
    <NavBarForAdmin/>
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input className="flex-1" placeholder="Search users..." type="search" />
        <Button>Search</Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[32px]">
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { getUsers?.map((user) =>{
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <TableRow>
                      <TableCell>
                        <Checkbox id="select-1" />
                      </TableCell>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoveHorizontalIcon className="h-5 w-5" />
                              <span className="sr-only">User actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Block</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                          <span className="sr-only">User actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Block</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button variant="destructive">Delete Selected</Button>
      </div>
    </div>
</>
  )
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}
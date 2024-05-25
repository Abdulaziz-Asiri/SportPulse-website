import api from "@/api"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import UpdateUserDialog from "@/components/UpdateUserDialog"
import UpdateUserRole from "@/components/UpdateUserRole"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function UsersManagement() {

  const queryClient = useQueryClient()

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
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
    queryKey: ["users"],
    queryFn: getUser
  })

  const deleteUsers = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token with request to check permissions
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong !! User you want to delete not found"))
    }
  }
  const handleDeleteUser = async (id: string) => {
    await deleteUsers(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  return (
    <>
      <NavBarForAdmin />;
      <div className="flex flex-col gap-8 p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Users Management</h1>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[32px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getUsers?.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell></TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-medium">{user.role}</TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">{user.phone}</TableCell>

                    <TableCell className="text-right">
                      <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                      <UpdateUserDialog user={user} />
                      <UpdateUserRole user={user} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
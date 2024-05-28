import { Button } from "@/components/ui/button"
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import api from "@/api"
import { toast } from "./ui/use-toast"
import { User } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { EditIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function UpdateUserRole({ user }: { user: User }) {
  const [updatedUserRole, setUpdatedUser] = useState(user)

  const queryClient = useQueryClient()

  const updateUser = async () => {
    const token = localStorage.getItem("token")
    try {
      const role = updatedUserRole.role
      console.log("role ", role)
      const res = await api.patch(`/users/updaterole?userId=${updatedUserRole.id}`, {
        role: role
      },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleUpdatedChange = (value: string) => {
    setUpdatedUser({
      ...updatedUserRole,
      role: value
    })
    console.log("value:", value)
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault()
    await updateUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
    toast({
      title: "Product Has Been Updated Successfully. ✅"
    })
    console.log("User is Updated:", handleSubmitUser)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update Role</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmitUser}>
            <DialogHeader>
              <DialogTitle>Edit the User Role</DialogTitle>
              <DialogDescription>
                Update the user Role and click save to apply the changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-9">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 ">
                <Label className="text-right md:col-span-1" htmlFor="name">
                  Role
                </Label>
                <Select
                  value={updatedUserRole.role}
                  onValueChange={handleUpdatedChange}
                  name="role"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={"1"} value={"Admin"}>
                      Admin
                    </SelectItem>
                    <SelectItem key={"0"} value={"Customer"}>
                      Customer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

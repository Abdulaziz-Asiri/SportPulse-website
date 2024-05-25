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

export default function UpdateUserDialog({ user }: { user: User }) {
  const [updatedUser, setUpdatedUser] = useState(user)
  const queryClient = useQueryClient()
  

  const updateUser = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.patch(`/users/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleUpdatedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    })
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault()
    await updateUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
    toast({
      title: "Product Has Been Updated Successfully. ✅"
    })
    console.log('User is Updated:', handleSubmitUser)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <EditIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmitUser}>
            <DialogHeader>
              <DialogTitle>Edit User Information</DialogTitle>
              <DialogDescription>
                Update the user info and click save to apply the changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label className="text-right md:col-span-1" htmlFor="name">
                  Name
                </Label>
                <Input
                  className="col-span-3 md:col-span-3"
                  defaultValue={updatedUser.name}
                  name="name"
                  onChange={handleUpdatedChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label className="text-right md:col-span-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="col-span-3 md:col-span-3"
                  defaultValue={updatedUser.password}
                  name="password"
                  onChange={handleUpdatedChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label className="text-right md:col-span-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="col-span-3 md:col-span-3"
                  defaultValue={updatedUser.email}
                  name="email"
                  onChange={handleUpdatedChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label className="text-right md:col-span-1" htmlFor="phone">
                  Phone
                </Label>
                <Input
                  className="col-span-3 md:col-span-3"
                  defaultValue={updatedUser.phone}
                  name="phone"
                  onChange={handleUpdatedChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose >
              <Button type="submit">Save changes</Button>
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


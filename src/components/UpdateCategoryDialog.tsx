import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { ChangeEvent, useState } from "react";
import api from "@/api";
import { Category } from "@/types";

export function UpdateCategory({ getCategories }: { getCategories: Category }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [updatedCategory, setUpdatedCategory] = useState(getCategories)

  console.log("updatedProduct:", updatedCategory)
  const updateCategory = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.patch(`/categorys/${updatedCategory.id}`, updatedCategory, {
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

  const handleUpdatedCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUpdatedCategory({
      ...updatedCategory,
      type: value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateCategory()
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
    toast({
      title: "Product Has Been Updated Successfully. ✅"
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-500 hover:bg-indigo-600 text-white font-medium ">Edit Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update the details for this category.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleUpdate}>
          <div className="grid gap-1">
            <Label htmlFor="type">Name</Label>
            <Input
              defaultValue={updatedCategory.type}
              name="type"
              type="text"
              onChange={handleUpdatedCategory}
            />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

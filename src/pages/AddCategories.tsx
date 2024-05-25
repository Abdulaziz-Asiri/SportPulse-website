import api from "@/api"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import { UpdateCategory } from "@/components/UpdateCategoryDialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Category } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function AddCategories() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [category, setCategory] = useState({
    type: ""
  })

  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: getCategoryData, error: getError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: getCategories
  })

  const AddCategory = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/categorys", category, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("You can't add a category, SOMTHING WENT WORNG!!"))
    }
  }

  const deleteCategory = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/categorys/${id}`, {
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

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
  }

  const handleCategory = (e) => {
    const { type, value } = e.target
    setCategory({
      ...category,
      type: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await AddCategory()
    queryClient.invalidateQueries({ queryKey: ["categorys"] }) //Invalidating queries will cause React Query to re-fetch the data from the server, ensuring that the user data is up-to-date in the application.
  }

  return (
    <>
      <NavBarForAdmin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Category Management</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <Label className="block font-medium mb-2" htmlFor="name">
                Category Name
              </Label>
              <Input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="type"
                placeholder="Enter category name"
                type="text"
                onChange={handleCategory}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                type="submit"
              >
                Add Category
              </Button>
            </div>
          </form>
        </div>
        <div className=" w-full table-auto">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCategoryData?.map((getCategories) => {
                  return (
                    <TableRow key={getCategories.id}>
                      <TableCell> {getCategories.type} </TableCell>
                      <TableCell className="text-right">
                        <UpdateCategory getCategories={getCategories} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Category</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this category? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => {
                                  handleDeleteCategory(getCategories.id)
                                  toast({
                                    variant: "contained",
                                    title: "Product Has Been Deleted Successfully.✅"
                                  })
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

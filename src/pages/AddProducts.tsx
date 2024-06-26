import api from "@/api"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import SearchBar from "@/components/SearchBar"
import UpdateProductDailog from "@/components/UpdateProductDailog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { Category, Product } from "@/types"
import { Label } from "@radix-ui/react-label"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useState } from "react"
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
import { useToast } from "@/components/ui/use-toast"

export function AddProducts() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: 0,
    image: "",
    description: ""
  })
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const {
    data: getProductData,
    error,
    isPending
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
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

  const postProducts = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("There is require input"))
    }
  }

  const deleteProducts = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/products/${id}`, {
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
  const handleDeleteProduct = async (id: string) => {
    await deleteProducts(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleCategory = (value: string) => {
    setProduct({
      ...product,
      categoryId: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("sdfsd")
    try {
      const res = await postProducts()
      queryClient.invalidateQueries({ queryKey: ["products"] })
      if (res.status === 201) {
        toast({
          variant: "success",
          title: "Product Has Been Added Successfully.✅"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Product Has Been Added Successfully.✅"
      })
    }
  }

  return (
    <>
      <NavBarForAdmin />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-12">
        Products Management
      </h1>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Add a New Product
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fill out the form below to add a new product to our supplement line.
              </p>
            </div>
            <div className="w-full max-w-md">
              <form action="POST" className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    name="name"
                    placeholder="Enter product name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleCategory} name="categoryId">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoryData?.map((getCategories) => {
                        return (
                          <SelectItem key={getCategories.id} value={getCategories.id}>
                            {getCategories.type}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    name="price"
                    placeholder="Enter price"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    name="Image"
                    type="text"
                    placeholder="Enter image URL"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Enter product description"
                    onChange={handleChange}
                  />
                </div>
                <Button size="lg" type="submit">
                  Add Product
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <SearchBar /> */}
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
        {getProductData?.map((product) => {
          return (
            <div key={product.id}>
              <Card className="w-[350px]">
                <img
                  src={product.image}
                  alt="Product Image"
                  className="aspect-square object-contain rounded-t-lg"
                />
                <CardContent className="p-4">
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-500 dark:text-gray-400">SR {product.price}</p>
                </CardContent>
                <CardFooter>
                  <UpdateProductDailog product={product} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Product</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this Product? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => {
                            handleDeleteProduct(product.id)
                            toast({
                              variant: "success",
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
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </section>
    </>
  )
}

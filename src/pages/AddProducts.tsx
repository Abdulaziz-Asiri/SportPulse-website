import { CircleUser, Link, Menu, Package2, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Category, Product } from "@/types"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import UpdateProductDailog from "@/components/UpdateProductDailog"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import SearchBar from "@/components/SearchBar"

export function AddProducts() {

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

  const { data: getProductData, error, isPending } = useQuery<Product[]>({
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
            headers:{
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
  const handleDeleteProduct = async (id: string) => {
    await deleteProducts(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
  
    e.preventDefault()
    await postProducts()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
console.log("product ", product)

  return (
    <>
      <NavBarForAdmin />
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
              <form className="grid gap-4" onSubmit={handleSubmit}>
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
        {/* {postError && <p className="text-red-500">{postError.message}</p>} */}
      </section>

      <SearchBar />
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
        {
          getProductData?.map((product) => {
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
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        handleDeleteProduct(product.id)
                        toast({
                          variant: "destructive",
                          title: "Product Has Been Deleted Successfully."
                        })
                      }}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )
          })}
      </section>
    </>
  )
}
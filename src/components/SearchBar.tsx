import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ErrorPage from "./ErrorPage"
import LoadingPage from "./LoadingPage"
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card"
import { FormEvent, useState } from "react"
import axios from "axios"

export default function SearchBar() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")

  const searchProducts = async (searchTerm: string) => {
    const response = await axios.get(
      `http://localhost:5125/api/v1/products/search?search=${searchTerm}`
    )
    return response.data
  }

  const {
    data: searchResults,
    isLoading,
    isError,
    error
  } = useQuery<Product[]>({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: Boolean(searchTerm)
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
    error: getError,
    isPending
  } = useQuery<Product[]>({ queryKey: ["products"], queryFn: getProducts })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
    console.log("searchTerm:", searchTerm)
  }
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <ErrorPage />
      </div>
    )
  }
  return (
    <>
      <div className="flex-1 right-0 top-full mt-24 w-80 rounded-lg border bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <form className="flex items-center gap-2 px-3 py-2">
          <Input
            className="flex-1"
            placeholder="Search products..."
            type="search"
            onChange={handleChange}
          />
          <Button size="sm" variant="outline" type="submit">
            Search
          </Button>
        </form>
        <div>
          {searchResults?.map((product) => (
            <Card key={product.id} className="w-[350px]">
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
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div>
          {searchResults?.map((product) => (
            <Card key={product.id} className="w-[350px]">
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
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}




import { GlobalContext } from "@/App"
import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import Home from "./Home"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import SearchBar from "@/components/SearchBar"

export function Products() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { state, handleAddToCart } = context
  
  // Talk to backend through HTTP request using api using axios library
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries
  const { data, error, isPending } = useQuery<Product[]>({
    // useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
    queryKey: ["products"],
    queryFn: getProducts // Query funciton
  })

  if (isPending) return <LoadingPage/>
  if (error) return  <ErrorPage/>
  
  return (
    <>
      <NavBar />
      <SearchBar />
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap  mt-24">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <img
              src={product.image}
              alt="Product Image"
              // aspect-square object-fit rounded-t-lg
              className="aspect-square object-contain rounded-t-lg"
              // height="200"
              // width="200"
            />
            <CardContent className="p-4">
              <CardTitle>{product.name}</CardTitle>
              <p className="text-gray-500 dark:text-gray-400">SR {product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
        <h3> Cart ({state.cart.length}) </h3>
        {/* {error && <p className="text-red-500">{error.message}</p>} */}
      </section>
    </>
  )
}

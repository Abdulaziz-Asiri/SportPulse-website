import api from "@/api"
import NavBar from "@/components/ui/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function Products() {
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
  const { data, error } = useQuery<Product[]>({
    // useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
    queryKey: ["products"],
    queryFn: getProducts // Query funciton
  })
    
    return (
      <>
        <NavBar />
        <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
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
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
          {error && <p className="text-red-500">{error.message}</p>}
        </section>
      </>
    )
}
import "./App.css"
// import { Home } from "./pages/Home"
import Component from "./pages/HomeAi"

function App() {
  // const getProducts = async () => {
  //   try {
  //     const res = await api.get("/products")
  //     return res.data
  //   } catch (error) {
  //     console.error(error)
  //     return Promise.reject(new Error("Something went wrong"))
  //   }
  // }

  // // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts
  // })

  return (
    <div className="App">
      {/* <Home/> */}
      <Component/>
    </div>
  )
}

export default App

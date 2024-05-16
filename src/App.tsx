// import { Home } from "lucide-react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { AddProducts } from "./pages/AddProducts.1"
import Home from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { SingUpForm } from "./pages/SingUp"
import { LoginForm } from "./pages/LogIn"
import NotFoundPage from "./pages/NotFoundPage"
import NavBar from "./components/ui/NavigationBar"
import { BMICalc } from "./pages/BMICalculator"
import { Products } from "./pages/Products"
import { createContext, useState } from "react"
import { Product } from "./types"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/Addproducts",
    element: <AddProducts />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/singup",
    element: <SingUpForm />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })
  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const DeleteItem = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: DeleteItem
    })
  }
  return (
    <>
      <div className="App">
        <GlobalContext.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App

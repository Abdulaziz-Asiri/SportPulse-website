// import { Home } from "lucide-react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { createContext, useState } from "react"
import { AddProducts } from "./pages/AddProducts"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import { Login } from "./pages/LogIn"
import NotFoundPage from "./pages/NotFoundPage"
import { Products } from "./pages/Products"
import { SingUp } from "./pages/SingUp"
import { Product } from "./types"
import Testpage from "./pages/Testpage"
import { Toaster } from "./components/ui/toaster"
import LoadingPage from "./components/LoadingPage"
import UsersManagement from "./pages/UsersManagement"


type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

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
    path: "/addproducts",
    element: <AddProducts />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/singup",
    element: <SingUp />
  },
  {
    path: "/testpage",
    element: <Testpage />
  },
  {
    path: "/usersmanagment",
    element: <UsersManagement />
  }
])

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
          <Toaster />
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App

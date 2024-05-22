import { ReactElement } from "react"
import jwt from "jwt-decode"
import { ROLE } from "@/types"
import NotFoundPage from "@/pages/NotFoundPage"
import { reshapeUser } from "@/lib/utils"

export function PrivateRoute({ children }: { children: ReactElement }) {
  console.log("It is working")
  const token = localStorage.getItem("token") || ""
    const decodedToken = jwt(token)
    const decodedUser= reshapeUser(decodedToken)
  

  console.log("decodedUser.Role:", decodedUser.Role)
  console.log("ROLE.Customer:", ROLE.Customer)

  return decodedUser.role === ROLE.Customer ? <NotFoundPage /> : children
}

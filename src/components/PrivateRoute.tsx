import { ReactElement } from "react"
import jwt from "jwt-decode"
import { ROLE } from "@/types"
import NotFoundPage from "@/pages/NotFoundPage"
import { reshapeUser } from "@/lib/utils"
import { Navigate } from "react-router-dom"

export function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token") || ""
  const decodedToken = jwt(token)
  const decodedUser = reshapeUser(decodedToken)
  return decodedUser.role === ROLE.Admin ? children : <Navigate to="/" />
}

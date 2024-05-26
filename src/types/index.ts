export type Product = {
  id: string
  name: string
  categoryId: string
  price: number
  image: string
  description: string
}
export type Category = {
   
    id: string
    type: string
  
}

export type  User = {
  id: string
  name: string
  role: string
  password: string
  email: string
  phone: string
}

export  const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  aud: string
  emiladdress: string
  exp: number
  iss: string
  name: string
  role: keyof typeof ROLE
}
export type Inventory = {
  id: string
  productId: string
  quantity: number
  flavor: string
  wight: string
}



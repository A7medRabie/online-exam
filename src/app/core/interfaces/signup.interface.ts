export interface SignupRequest {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  rePassword: string
  phone: string
}


export interface SignupResponse {
  message: string
  token: string
  user: User
}

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  isVerified: boolean
  _id: string
  createdAt: string
}

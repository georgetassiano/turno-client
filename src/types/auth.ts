export interface RequestLogin {
  email: string
  password: string
}

export interface RequestRegisterUser {
  name: string
  email: string
  password: string
  password_confirmation: string
}

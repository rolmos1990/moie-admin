import React from "react"
import { Redirect } from "react-router-dom"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Customer from "../pages/Customer/index"
import CustomerEdit from "../pages/CustomerEdit"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
// Profile
import UserProfile from "../pages/Authentication/user-profile"
import Product from "../pages/Product";
import ProductEdit from "../pages/ProductEdit";
//Estates
import States from "../pages/State";
import StateEdit from "../pages/StateEdit";
import Municipalities from "../pages/Municipality";
import MunicipalityEdit from "../pages/MunicipalityEdit";
import Categories from "../pages/Category";
import CategoryEdit from "../pages/CategoryEdit";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/customers", component: Customer },
  { path: "/products", component: Product },
  { path: "/customer/:id", component: CustomerEdit },
  { path: "/customer", component: CustomerEdit },
  { path: "/product", component: ProductEdit },
  { path: "/product/:id", component: ProductEdit },
  { path: "/categories", component: Categories },
  { path: "/category", component: CategoryEdit },
  { path: "/category/:id", component: CategoryEdit },
  { path: "/states", component: States },
  { path: "/state", component: StateEdit },
  { path: "/state/:id", component: StateEdit },
  { path: "/municipalities", component: Municipalities },
  { path: "/municipality", component: MunicipalityEdit },
  { path: "/municipality/:id", component: MunicipalityEdit },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

]

export { userRoutes, authRoutes }

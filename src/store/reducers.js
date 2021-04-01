import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

// Dashboard
import Customer from "./customer/reducer"
import Product from "./product/reducer"
import Location from "./location/reducer"
import Category from "./category/reducer"
import Sizes from "./sizes/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Customer,
  Product,
  Category,
  Sizes,
  Location,
  Account,
  ForgetPassword,
  Profile
})

export default rootReducer

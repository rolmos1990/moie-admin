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
import Location from "./location/reducer"

//Calendar
import calendar from "./calendar/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//chat
import chat from "./chat/reducer"

//invoices
import invoices from "./invoices/reducer"

//contacts
import contacts from "./contacts/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Customer,
  Location,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  ecommerce,
  invoices,
  contacts,
})

export default rootReducer

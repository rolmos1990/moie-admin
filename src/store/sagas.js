import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import CustomerSaga from "./customer/saga"
import ProductSaga from "./product/saga"
import CategorySaga from "./category/saga"
import SizeSaga from "./sizes/saga"
import CommentSaga from "./comment/saga"
import DeliveryLocalitySaga from "./deliveryLocality/saga"
import ProductImageSaga from "./productImages/saga"
import ProductSizeSaga from "./productSize/saga"
import LocationSaga from "./location/saga"
import FieldOptionSaga from "./fieldOptions/saga"
import OrderSaga from "./order/saga"
import UserSaga from "./user/saga"
import TemplateSaga from "./template/saga"
import OfficeSaga from "./office/saga"
import BillSaga from "./bill/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    CustomerSaga(),
    ProductSaga(),
    CategorySaga(),
    SizeSaga(),
    DeliveryLocalitySaga(),
    ProductImageSaga(),
    ProductSizeSaga(),
    LocationSaga(),
    FieldOptionSaga(),
    OrderSaga(),
    UserSaga(),
    TemplateSaga(),
    CommentSaga(),
    OfficeSaga(),
    BillSaga(),
    ForgetSaga(),
    fork(LayoutSaga)
  ])
}

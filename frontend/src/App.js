import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import OrderListScreen from "./pages/OrderListScreen";
import OrderScreen from "./pages/OrderScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductScreen from "./pages/ProductScreen";
import ProfileScreen from "./pages/ProfileScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SigninScreen from "./pages/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Amazoné
            </Link>
          </div>
          <div className="menu">
            <Link to="/cart">
              <span>
                <i
                  className="fa fa-shopping-cart cart-icon"
                  aria-hidden="true"
                ></i>
              </span>

              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <div className="welcome">
                  Hello,
                  <Link to="#">
                    {userInfo.name}
                    <i className="fa fa-caret-down arrow"></i>
                  </Link>
                </div>{" "}
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {/* Admin dashboard */}
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <main>
          {/* /cart/:id? -> ? is added so if user directly goto cart, it should show shopping cart without adding a new item to the cart */}
          <Route path="/cart/:id?" component={CartScreen}></Route>

          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>

          <AdminRoute path="/productlist"
            component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist"
            component={OrderListScreen}></AdminRoute>

          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer>Designed with ❤️ by Olakunle</footer>
      </div>
    </Router>
  );
}

export default App;

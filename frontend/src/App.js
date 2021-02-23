import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { listProductCategory } from "./actions/productActions";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import PrivateRoute from "./components/PrivateRoute";
import SearchBox from "./components/SearchBox";
import SellerRoute from "./components/SellerRoute";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import MapScreen from "./pages/MapScreen";
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
import SearchScreen from "./pages/SearchScreen";
import SellerScreen from "./pages/SellerScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SigninScreen from "./pages/SigninScreen";
import UserEditScreen from "./pages/UserEditScreen";
import UserListScreen from "./pages/UserListScreen";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategory());
  }, [dispatch]);

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              Amazoné
            </Link>
          </div>
          <div>
            {/* pass react-router-dom properties to the SearchBox component using render function */}
            <Route
              render={({ history }) => <SearchBox history={history} />}
            ></Route>
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
            {/* Seller Menu */}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {/* Admin dashboard */}
            {userInfo && userInfo.isAdmin && (
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
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                type="button"
                onClick={() => setSidebarIsOpen(false)}
                className="close-side"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
            <LoadingBox />
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((cat) => (
                <li className="category-list" key={cat}>
                  <Link onClick={() => setSidebarIsOpen(false)} to={`/search/category/${cat}`}>{cat}</Link>
                </li>
              ))
          )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          {/* /cart/:id? -> ? option is added so if user directly goto cart, it should show shopping cart without adding a new item to the cart */}
          <Route path="/cart/:id?" component={CartScreen}></Route>

          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>

          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>

          <PrivateRoute
            path="/map"
            component={MapScreen}
          ></PrivateRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <AdminRoute
            exact
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>

          <AdminRoute
            exact
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>

          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>

          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer>Designed with ❤️ by Olakunle</footer>
      </div>
    </Router>
  );
}

export default App;

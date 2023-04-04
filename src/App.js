import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminTable from "./views/Admin/AdminTable";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./config/axiosInit";
import { useEffect, useState } from "react";
import Home from "./views/home/home";
import UserTable from "./views/Admin/UserTable";
import ProductEdit from "./views/Admin/components/productEdit/ProductEdit";
import ProductCreate from "./views/Admin/components/productCreate/ProductCreate";
import UserEdit from "./views/Admin/components/UserEdit/UserEdit";
import Navigation from "./views/layouts/Navigation";
import Footer from "./views/layouts/Footer";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import ProductDetail from "./views/home/productDetail/ProductDetail";
import Error404 from "./views/layouts/Error404";
import OrderTable from "./views/Admin/OrderTable";
import OrderStatus from "./views/Admin/components/orderEdit/OrderStatus";
import { set } from "lodash";

function App() {
  const [products, setProducts] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const URL = process.env.REACT_APP_API_PIZZERIA;
  const UrlUser = process.env.REACT_APP_API_USARIOS;
  const UrlOrder = process.env.REACT_APP_API_ORDER;

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    getApiUser();
  }, []);

  useEffect(() => {
    isLoged();
  }, []);

  const isLoged = () => {
    if (!JSON.parse(localStorage.getItem("user-token"))) {
      setLoggedUser({});
    }
    setLoggedUser(JSON.parse(localStorage.getItem("user-token")));
  };

  const getApi = async () => {
    try {
      const res = await axios.get(URL);
      const productsApi = res.data;
      setProducts(productsApi);
    } catch (error) {
      console.log(error);
    }
  };

  const getApiUser = async () => {
    try {
      const res = await axios.get(UrlUser + "/table");
      const userApi = res.data;
      setUsers(userApi);
    } catch (error) {
      console.log(error);
    }
  };
  const getApiOrder = async () => {
    try {
      const res = await axios.get(UrlOrder + "/table");
      const ordersApi = res.data;
      setOrders(ordersApi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className="allBg">
          <Navigation loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home products={products} loggedUser={loggedUser} />}
            />
            <Route
              exact
              path="/product/table"
              element={
                <AdminTable products={products} getApi={getApi} URL={URL} />
              }
            />
            <Route
              exact
              path="/product/create"
              element={<ProductCreate URL={URL} getApi={getApi} />}
            />
            <Route
              exact
              path="/product/edit/:_id"
              element={<ProductEdit URL={URL} getApi={getApi} />}
            />
            <Route
              exact
              path="/product/buy/:_id"
              element={
                <ProductDetail
                  URL={URL}
                  products={products}
                  getApi={getApi}
                  UrlOrder={UrlOrder}
                  orders={orders}
                  getApiOrder={getApiOrder}
                />
              }
            />
            <Route
              exact
              path="/order/table"
              element={
                <OrderTable
                  UrlOrder={UrlOrder}
                  orders={orders}
                  getApiOrder={getApiOrder}
                />
              }
            />

            <Route
              exact
              path="/order/status/:_id"
              element={
                <OrderStatus UrlOrder={UrlOrder} getApiOrder={getApiOrder} />
              }
            />
            <Route
              exact
              path="/auth/login/"
              element={<Login setLoggedUser={setLoggedUser} />}
            />
            <Route
              exact
              path="/auth/register/"
              element={<Register setLoggedUser={setLoggedUser} />}
            />
            <Route
              exact
              path="/user/table"
              element={
                <UserTable
                  users={users}
                  getApiUser={getApiUser}
                  UrlUser={UrlUser}
                />
              }
            />
            <Route
              exact
              path="/user/edit/:_id"
              element={<UserEdit UrlUser={UrlUser} getApiUser={getApiUser} />}
            />

            <Route exact path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

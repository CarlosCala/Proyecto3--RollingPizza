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

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA;
  const UrlUser = process.env.REACT_APP_API_USARIOS;

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    getApiUser();
  }, []);

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
      const res = await axios.get(UrlUser);
      const userApi = res.data;
      setUsers(userApi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home products={products} />} />
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
            path="/product/edit/:id"
            element={<ProductEdit URL={URL} getApi={getApi} />}
          />

          <Route
            exact
            path="/user/register"
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
            path="/user/edit/:id"
            element={<UserEdit UrlUser={UrlUser} getApiUser={getApiUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

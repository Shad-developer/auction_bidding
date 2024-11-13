import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home/Home";
import HowWorks from "./pages/HowWorks";
import About from "./pages/About";
import { AddProduct } from "./pages/ProductDetails/AddProduct";
import { LoginAsSeller } from "./pages/auth/LoginAsSeller";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { UserProfile } from "./pages/auth/UserProfile";
import Layout from "./components/common/Layout";
import { ProductList } from "./pages/ProductDetails/productlist/ProductList";
import { LiveProducts } from "./components/Home/LiveProducts";
import { Products } from "./pages/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Catgeorylist } from "./admin/category/Catgeorylist";
import { CreateCategory } from "./admin/category/CreateCategory";
import { NotFound } from "./components/common/NotFound";
import { Unauthorized } from "./components/common/Unauthorized";
import { WinningProductList } from "./pages/ProductDetails/WinningProductList";
import { PlaceBiddingList } from "./pages/ProductDetails/PlaceBiddingList";
import { MyFavoriteProduct } from "./pages/ProductDetails/MyFavoriteProduct";
import { Income } from "./admin/Income";
import { ProductEdit } from "./pages/ProductDetails/ProductEdit";
import { AdminProductList } from "./admin/product/AdminProductList";
import { UpdateProductByAdmin } from "./admin/product/UpdateProductByAdmin";
import { UpdateCategory } from "./admin/category/UpdateCategory";
import { PrivateRoute } from "./router/PrivateRoute";
import { Dashboard } from "./pages/dashboard/Dashboard";
import DashboardLayout from "./components/common/DashboardLayout";
import { UserList } from "./admin/UserList";
import Contact from "./pages/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/features/authSlice";
import { getAllProduct } from "./redux/features/productSlice";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={1000}/>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/products"
            element={
              <Layout>
                <Products products={products} />
              </Layout>
            }
          />
          <Route
            path="/Contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/About"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/work"
            element={
              <Layout>
                <HowWorks />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/seller/login"
            element={
              <PrivateRoute>
                <Layout>
                  <LoginAsSeller />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />

          <Route
            path="/reset-password"
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <AddProduct />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/update/:id"
            element={
              <PrivateRoute >
                <Layout>
                  <DashboardLayout>
                    <ProductEdit />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/product-list"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <ProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/admin"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <AdminProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/admin/update/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UpdateProductByAdmin />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/userlist"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/winning-products"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <WinningProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
           <Route
            path="/my-biddings"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <PlaceBiddingList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
             <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <MyFavoriteProduct />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <Catgeorylist />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category/create"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <CreateCategory />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category/update/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UpdateCategory />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />

          <Route
            path="/not-authorized"
            element={
              <Layout>
                <Unauthorized />
              </Layout>
            }
          />  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

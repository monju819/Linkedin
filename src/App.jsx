import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/LogIn";
import { ToastContainer } from "react-toastify";
import Feed from "./pages/Feed";
import RootLayout from "./components/RootLayout";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/home" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

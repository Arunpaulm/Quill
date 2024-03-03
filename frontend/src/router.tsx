import { createBrowserRouter } from "react-router-dom";
import { Library } from "./pages/Library";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Upload } from "./pages/Upload";
import { FindBook } from "./pages/FindBook";

export const router = createBrowserRouter([
  {
    // element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/find",
        element: <FindBook bookKeywords="" />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

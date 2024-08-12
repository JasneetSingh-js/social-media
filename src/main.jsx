import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CreatePost from "./components/CreatePost.jsx";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import PostList from "./components/PostList";
const router=createBrowserRouter([
  {
    path:"/",
    element:< App/>,
    Children:[
      {path:"/",element:<PostList/>},
      {path:"/create-post",element:<CreatePost/>},
    ],
    // element:<PostList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

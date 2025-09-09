import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {ApiProvider} from "@/context/api.context";
import router from "@/router";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider>
        <RouterProvider router={router} />
    </ApiProvider>
)
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./layout";
import CreateTag from "./components/CreateTag";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: 'create-tag',
                element: <CreateTag />
            }
        ]
    },

], {
    future: {
        v7_startTransition: true, // Enable the future flag
    },
});

export default router
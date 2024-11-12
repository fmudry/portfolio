import {Suspense} from "react";
import "./App.css";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import Loading from "./components/base/Loading/Loading";
import {ThemeProvider} from "./components/theme-provider";
import AuthProvider from "./hooks/AuthProvider";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Suspense fallback=<Loading chance={20} />>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;

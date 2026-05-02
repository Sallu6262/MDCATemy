import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

const Layout = () => (
    <div className="app-shell">
        <Header />
        <Outlet />
    </div>
);

export default Layout;

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({children}:{children:ReactNode}) {
    return ( 
        <>
        <Header />
        {children}
        <Footer />
        </>
     );
}

export default Layout;
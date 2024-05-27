import React from "react";
import Header from "../route/Header";
import Footer from "../route/Footer";

const Page = (props) => {
    const { title, component } = props;
    if (document.title !== title) document.title = title;
    const PageComponent = component;

    return (
        <div className="main">
            <Header />
            <div className="container">
                <PageComponent />
            </div>
            <Footer />
        </div>
    )
}

export default Page;
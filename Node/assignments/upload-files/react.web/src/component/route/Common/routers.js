import Homepage from "../Homepage";
import Cakes from "../Cakes";
import CreateCategory from "../CreateCategory";
import CreateProduct from "../CreateProduct";

const USER_TYPE = {
    PRIVATE: "PRIVATE",
    PUBLIC: "PUBLIC"
};

const ROUTERS = [
    {
        path: '/',
        component: Homepage,
        title: "Home Page",
        include_nav: false
    },
    {
        path: '/create-category',
        component: CreateCategory,
        title: "Create Category",
        label: "Create Category",
        is_admin: true,
        include_nav: true
    },
    {
        path: '/create-product',
        component: CreateProduct,
        title: "Create Product",
        label: "Create Product",
        is_admin: true,
        include_nav: true
    },
    {
        path: '/cake',
        component: Cakes,
        title: "Cakes",
        label: "Cakes",
        is_admin: false,
        include_nav: true
    },
    {
        path: '/cart',
        component: Homepage,
        title: "Cart",
        label: "Cart",
        is_admin: false,
        include_nav: true
    }
];

const VALIDATE_AUTH = [
    '/my-account'
];

export {
    ROUTERS,
    USER_TYPE,
    VALIDATE_AUTH
};
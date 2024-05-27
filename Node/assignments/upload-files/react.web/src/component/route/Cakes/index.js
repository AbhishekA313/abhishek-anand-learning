import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import {API_URI} from "../Common/constants";

const Cakes = () => {
    const [products, setProducts] = useState([]);

    const getAllCakes = async () => {
        try {
            const response = await fetch(API_URI + '/product/get', {
                method: 'POST',
                body: JSON.stringify({
                    availability: 1,
                    category_name: 'Cake'
                }),
                headers: {
                    Accepts: "application/json",
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })
            const responseData = await response.json();

            responseData.status && setProducts(responseData.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCakes();
    }, []);

    return <>
        <div id="products">
            <ul class="product-list">
                {
                    products.length && products.map((product, idx) => {
                        return <>
                            <li class="item" key={idx}>
                                <div class="product-image">
                                    <img src={`data:image/jpeg;base64,${product.product_image.toString('base64')}`} width="250" height="250" alt={product.product_name} />
                                </div>

                                <div class="product-content">
                                    <NavLink to={`/product/view/${product._id}`}>{product.product_name}</NavLink>
                                    <span class="price">INR {product.price}</span>
                                </div>
                            </li>
                        </>
                    })
                }
            </ul>
        </div>
    </>
}

export default Cakes;
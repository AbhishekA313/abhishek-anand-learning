const account = document.querySelector('.profile-avatar');
const arrowUp = document.querySelector('.arrow-up');
const arrowDown = document.querySelector('.arrow-down');
const accountNav = document.querySelector('.account-nav');

const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('.logout');

const editEmail = document.getElementById('edit-email');
const addAddress = document.querySelector('.section-2__add-address');
const submitAddress = document.querySelector('#add-address-form');

const categoryForm = document.getElementById('category-form');
const productForm = document.querySelector('product-form');
const addToCartForm = document.getElementById('add-to-cart');

const decrement = document.getElementById('decrement');
const increment = document.getElementById('increment');
const placeOrderForm = document.getElementById('place-order-form');
const printInvoice = document.getElementById('print-invoice');

account.addEventListener('click', (e) => {
    e.preventDefault();

    const canShowArrowUp = arrowUp.getAttribute('data-visible') === 'true' ? 'false' : 'true';
    const canShowArrowDown = arrowDown.getAttribute('data-visible') === 'true' ? 'false' : 'true';

    arrowUp.setAttribute('data-visible', canShowArrowUp);
    arrowDown.setAttribute('data-visible', canShowArrowDown);
    accountNav.classList.toggle('visible');
})

loginForm && loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[name="email"]');
    const password = loginForm.querySelector('input[name="password"]');

    fetch("/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((user) => {
        if (!user) {
            return alert('User not found.');
        }

        location.href = `/my-account`;
    }).catch(e => {
        alert('Unable to login user.');
        console.log(e);
    });
})

addAddress && addAddress.addEventListener('click', () => {
    document.querySelector('.section-2__address-form').style.display = 'block';
})

submitAddress && submitAddress.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/users/address/add", {
        method: "POST",
        body: JSON.stringify({
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            address: formData.get('address'),
            country: formData.get('country'),
            state: formData.get('state'),
            city: formData.get('city')
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((address) => {
        if (!address) {
            return alert('Unable to add user address.');
        }
        location.href = '/my-account';
    }).catch(e => {
        alert('Unable to add user address.');
        console.log(e);
    });
})

logout && logout.addEventListener('click', () => {
    fetch("/users/logoutAll", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(() => location.href = `/login`)
    .catch(e => {
        alert('Unable to find user.');
        console.log(e);
    });
})

editEmail && editEmail.addEventListener('click', (e) => {
    if ( editEmail.dataset.editing === 'false' ) {
        document.querySelector('.static-email').style.display = 'none';
        document.querySelector('.input-email').style.display = 'inline';
        editEmail.dataset.editing = "true";
    } else {
        const email = document.getElementById('input-email').value;
        fetch("/users/update", {
            method: "PATCH",
            body: JSON.stringify({email}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(() => location.href = `/my-account`)
        .catch(e => {
            alert('Unable to find user.');
            console.log(e);
        });
    }
})

categoryForm && categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/create-category/add", {
        method: "POST",
        body: JSON.stringify({
            category_name: formData.get('category_name'),
            include_in_menu: formData.get('include_in_menu'),
            is_active: formData.get('is_active')
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((category) => {
        if (!category) {
            return alert('Unable to add category.');
        }
        location.href = '/create-category';
    }).catch(e => {
        alert('Unable to add category.');
        console.log(e);
    });
})

window.onload = () => {
    const productId = document.getElementById('product_id')?.value || undefined;
    const orderId = document.getElementById('order_id')?.value || undefined;

    if (['/', '/cake', `/product/view/${productId}`].includes(window.location.pathname)) {
        let payload = {
            availability: 1
        };
        if (window.location.pathname === '/cake') {
            payload = {
                ...payload,
                category_name: 'Cake'
            }
        }

        if (window.location.pathname === `/product/view/${productId}`) {
            payload = {
                ...payload,
                _id: productId
            }
        }

        fetch("/product/get", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((products) => {
            if (!products) {
                return alert('Unable to find product.');
            }

            if (!productId) {
                let html = '<ul class="product-list">';
                products.map(product => {
                    html += `<li class="item">
                        <div class="product-image">
                            <img src="data:image/jpeg;base64,${product.product_image.toString('base64')}" width="250" height="250" alt="${product.product_name}" />
                        </div>

                        <div class="product-content">
                            <a href="/product/view/${product._id}">${product.product_name}</a>

                            <span class="price">INR ${product.price}</span>
                        </div>
                    </li>`;
                })
                html += '</ul>';

                document.getElementById('products').innerHTML = html;
            } else {
                const _product = products[0];
                document.getElementById('product-image').src = `data:image/jpeg;base64,${_product.product_image.toString('base64')}`;
                document.getElementById('product-name').textContent = _product.product_name;
                document.getElementById('product-price').textContent = `INR ${_product.price}`;
                document.getElementById('max_qty').value = _product.inventory;
            }
        }).catch(e => {
            alert('Unable to find product.');
            console.log(e);
        });
    }

    if (window.location.pathname === '/create-product') {
        fetch("/category/get", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((categories) => {
            if (!categories) {
                return alert('Unable to find category.');
            }

            let html = '<option value="">Please Select</option>';
            categories.map(category => {
                html += `<option value="${category.category_name}">${category.category_name}</option>`
            })
            
            document.querySelector('#product-form select[name="category_name"]').innerHTML = html;
        }).catch(e => {
            alert('Unable to find category.');
            console.log(e);
        });
    }

    if (window.location.pathname === '/cart') {
        fetch("/cart/getDetails", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then(({ items, addresses }) => {
            if (!items.length) {
                alert('Unable to find cart.');
                location.href = '/my-account';
            } else {
                let html = `
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product QTY</th>
                    </tr>
                `;
                items.map(item => {
                    html += `
                        <tr>
                            <td class="item-image">
                                <img src="data:image/jpeg;base64,${item.item_image.toString('base64')}" width="110" height="110" alt="${item.product_name}" />
                            </td>
                            <td class="item-name">${item.product_name}</td>
                            <td class="item-price">INR ${item.price}</td>
                            <td class="item-qty">${item.item_qty}</td>
                        </tr>
                    `;
                })

                let addressHtml = '<option value="">Please Select</option>';
                addresses.length && addresses.map(address => {
                    const fullAddress = `${address.address}, ${address.state}, ${address.city}, ${address.country}`
                    addressHtml += `
                        <option value="${address._id}">${fullAddress}</option>
                    `;
                })
                
                document.getElementById('cart-items').innerHTML = html;
                document.getElementById('billing_address').innerHTML = addressHtml;
                document.getElementById('shipping_address').innerHTML = addressHtml;
            }
        }).catch(e => {
            alert('Unable to find cart items.');
            console.log(e);
        });
    }

    if (window.location.pathname === '/my-account') {
        fetch("/orders", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((orders) => {
            let html = '';
            orders.map(async (order) => {
                const _address = await fetch("/getAddressById", {
                    method: "POST",
                    body: JSON.stringify({
                        _id: order.shipping_address
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(res => res.json());

                if (_address) {
                    html += `
                        <tr>
                            <td class="item-image">${order.increment_id}</td>
                            <td class="item-name">${order.grandTotal}</td>
                            <td class="item-price">INR ${order.customer_email}</td>
                            <td class="item-qty">${order.customer_firstname} ${order.customer_lastname}</td>
                            <td class="item-qty">${_address.address}, ${_address.state}, ${_address.city}, ${_address.country}</td>
                            <td class="item-qty">
                                <a href="/order/view/${order.increment_id}">View Order</a>
                            </td>
                        </tr>
                    `;
                }
                document.getElementById('order-history').innerHTML += html;
            })
        }).catch(e => {
            alert('Unable to orders.');
            console.log(e);
        });
    }

    if (window.location.pathname === `/order/view/${orderId}`) {
        fetch("/order/getDetails", {
            method: "POST",
            body: JSON.stringify({
                increment_id: orderId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then(({ items, address }) => {
            if (!items.length) {
                alert('Unable to find order items.');
                location.href = '/my-account';
            } else {
                let html = '';
                items.map(item => {
                    html += `
                        <tr>
                            <td class="item-image">
                                <img src="data:image/jpeg;base64,${item.item_image.toString('base64')}" width="110" height="110" alt="${item.product_name}" />
                            </td>
                            <td class="item-name">${item.product_name}</td>
                            <td class="item-price">INR ${item.price}</td>
                            <td class="item-qty">${item.item_qty}</td>
                        </tr>
                    `;
                })

                const addressHTML = `
                    <p>
                        <label>Address</label>
                        <span>${address.address}</span>
                    </p>

                    <p>
                        <label>State</label>
                        <span>${address.state}</span>
                    </p>

                    <p>
                        <label>City</label>
                        <span>${address.city}</span>
                    </p>

                    <p>
                        <label>Country</label>
                        <span>${address.country}</span>
                    </p>
                `;
                
                document.getElementById('cart-items').innerHTML += html;
                document.getElementById('billing-address').innerHTML += addressHTML;
                document.getElementById('shipping-address').innerHTML += addressHTML;
            }
        }).catch(e => {
            alert('Unable to find order items.');
            console.log(e);
        });
    }
}

decrement && decrement.addEventListener('click', () => {
    const qty = document.getElementById('qty');
    const value = parseInt(qty.value) - 1;

    if ( value < 0 ) {
        return false;
    }

    qty.value = value;
})

increment && increment.addEventListener('click', () => {
    const qty = document.getElementById('qty');
    const maxQty = document.getElementById('max_qty');
    const value = parseInt(qty.value) + 1;

    if ( value > maxQty ) {
        return false;
    }

    qty.value = value;
})

addToCartForm && addToCartForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const maxQty = parseInt(formData.get('max_qty'));
    const qty = parseInt(formData.get('qty'));
    const productId = formData.get('product_id');

    if (qty > maxQty) {
        return alert('Requested quantities are not available!');
    }

    if (qty <= 0) {
        return alert('Product QTY should be greater then zeor!');
    }

    fetch("/product/post", {
        method: "POST",
        body: JSON.stringify({
            productId,
            qty
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((item) => {
        if (!item) {
            return alert('Unable to add product into the cart.');
        }

        alert('Product has been added into the cart.');
        location.href = `/product/view/${productId}`;
    }).catch(e => {
        alert('Unable to add product into the cart.');
        console.log(e);
    });
})

placeOrderForm && placeOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/checkout/placeOrder", {
        method: "POST",
        body: JSON.stringify({
            billing_address: formData.get('billing_address'),
            shipping_address: formData.get('shipping_address')
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((item) => {
        if (!item) {
            return alert('Unable to place order.');
        }

        alert('Order has been placed.');
        location.href = `/my-account`;
    }).catch(e => {
        alert('Unable to place order.');
        console.log(e);
    });
})

printInvoice && printInvoice.addEventListener('click', () => {
    const orderHTML = document.getElementById('order-address-wrapper');
    fetch("/print/invoice", {
        method: "POST",
        body: JSON.stringify({
            html: orderHTML.innerHTML
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((status) => {
        if (!status) {
            return alert('Unable to download order invoice.');
        }

        alert('Order invoice has been downloaded.');
        location.reload();
    }).catch(e => {
        alert('Unable to download order invoice.');
        console.log(e);
    });
})
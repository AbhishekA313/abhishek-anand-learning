const account = document.querySelector('.profile-avatar');
const arrowUp = document.querySelector('.arrow-up');
const arrowDown = document.querySelector('.arrow-down');
const accountNav = document.querySelector('.account-nav');

const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('.logout');
const addProduct = document.querySelector('#add-product');

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

// addProduct && addProduct.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log(e)

    // const firstname = addProduct.querySelector('input[name="firstname"]');

    // fetch("/users", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         firstname: firstname.value,
    //         lastname: lastname.value,
    //         avatar: avatar.value,
    //         age: age.value,
    //         email: email.value,
    //         password: password.value,
    //         employment: employment.value
    //     }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })
    // .then((response) => response.json())
    // .then((user) => {
    //     if (!user) {
    //         return alert('Unable to create user.');
    //     }
    //     location.href = '/login';
    // }).catch(e => {
    //     alert('Unable to create user.');
    //     console.log(e);
    // });
// })
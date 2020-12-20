import {API_BASE_URL, ACCESS_TOKEN, PRODUCT_LIST_SIZE, POSTCODE_API_KEY} from '../constants';

const request = (options) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getCurrentUserAddress() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me/address",
        method: 'GET'
    });
}

// Wordt momenteel niet actief gebruikt wel handig voor later zodat de admin profielen kan inzien
export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function createProduct(productData) {
    return request({
        url: API_BASE_URL + "/products",
        method: 'POST',
        body: JSON.stringify(productData)
    });
}

export function getAllProducts(page, size) {
    page = page || 0;
    size = size || PRODUCT_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/products?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function saveAddress(addressData) {
    return request({
        url: API_BASE_URL + "/user/me/address",
        method: 'POST',
        body: JSON.stringify(addressData)
    });
}

export function getAddressAPI(postalcode, housenumber){
    const url = 'https://postcode.tech/api/v1/postcode?postcode='+ postalcode +'&number='+ housenumber;
    const headers = new Headers({'Authorization': 'Bearer '+ POSTCODE_API_KEY});
    const myRequest = new Request(url, {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default',
      });
    return fetch(myRequest);
}

export function placeOrder(orderData) {
    return request({
        url: API_BASE_URL + "/orders",
        method: 'POST',
        body: JSON.stringify(orderData)
    });
}


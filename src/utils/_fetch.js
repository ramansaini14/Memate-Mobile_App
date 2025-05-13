import AsyncStorage from "@react-native-async-storage/async-storage";

export const _fetch = async (url, method, data, header) => {
    const LoginToken = await AsyncStorage.getItemAsync("accessToken");

    if (method === 'get' || method === 'GET') {
        return fetch(url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": LoginToken,
                    // "Authorization": "Bearer " + LoginToken,
                },

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else if (method === 'patch' || method === 'PATCH') {
        return fetch(url,
            {
                method: method,
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": LoginToken,
                },
                body: data,

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else if (method === 'delete' || method === 'DELETE') {
        return fetch(url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": LoginToken,
                },
                body: JSON.stringify(data),

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else if (method === 'Imgpatch' || method === 'IMGPATCH') {
        return fetch(url,
            {
                method: 'PATCH',
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    "Authorization": LoginToken,
                },
                body: data,
            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }
            })
        // .done();
    } else if (method === 'ImagePost' || method === 'ImagePost') {
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    "Authorization": LoginToken,
                },
                body: data,
            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }
            })
        // .done();
    }
    else {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": LoginToken,

            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
    }
}
export default _fetch;
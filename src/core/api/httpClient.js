import axios from 'axios';

const host = 'http://localhost:3000/';

// export const get = async (uri, data) => {
// 	try {
// 		return await axios.get(host + uri, {params: data})
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

export const get = function(uri, data) {
    return new Promise(function (resolve, reject) {
        axios(host + uri, {
						method: 'GET',
						params: data
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export const post = function(uri, data) {
	return new Promise(function (resolve, reject) {
			axios(host + uri, {
					method: 'POST',
					data: data
			}).then(res => {
					resolve(res.data);
			}).catch(err => {
							console.log(err);
							reject(err);
					});
	});
}
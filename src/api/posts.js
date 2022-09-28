import axios from 'axios';

const baseURL = 'http://localhost:3001';

export function getLists() {
	return axios.get(`${baseURL}/treasure/list`);
}

export function getPostById(id) {
	return axios.get(`${baseURL}/treasure/detail`, { params: { id: id } });
}

export function getCategory(type, condition) {
	return axios.get(`${baseURL}/treasure/category`, {
		params: { type: type, condition: condition },
	});
}

export function createPost(data) {
	return axios.post(`${baseURL}/treasure/post`, data);
}

// export function updatePost(id, data) {
// 	return axios.put(`http://localhost:5000/posts/${id}`, data);
// }

// export function deletePost(id) {
// 	return axios.delete(`http://localhost:5000/posts/${id}`);
// }

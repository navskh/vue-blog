import axios from 'axios';

// const baseURL = 'http://treasure-back.jinhakapply.com';

// develp 전용 링크
const baseURL = 'http://localhost:3002';

export function getRequestLists() {
  return axios.get(`${baseURL}/treasure/request`);
}

export function getLists(condition, thisMode) {
	return axios.get(`${baseURL}/treasure/list`, {
		params: { condition: condition, mode: thisMode },
	});
}

export function getNotices() {
	return axios.get(`${baseURL}/treasure/notice`);
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

export function updatePost(data) {
	return axios.post(`${baseURL}/treasure/edit`, data);
}

export function deletePost(idx) {
	return axios.delete(`${baseURL}/treasure/delete`, { data: { idx: idx } });
}

// export function updatePost(id, data) {
// 	return axios.put(`http://localhost:5000/posts/${id}`, data);
// }

// export function deletePost(id) {
// 	return axios.delete(`http://localhost:5000/posts/${id}`);
// }

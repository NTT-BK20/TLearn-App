import axios from "./customize-axios"

const getAllUser = (page) => {
    return axios.get(`api/student/${page}`)
}

const postUser = (user) => {
    return axios.post("api/create-student", user)
}

const updateUser = (user) => {
    return axios.put("api/update-student", user)
}

const getSchool = () => {
    return axios.get('api/school')
}

const deleteUser = (id) => {
    return axios.delete(`api/delete-user/${id}`)
}

export { getAllUser, postUser, updateUser, getSchool, deleteUser }
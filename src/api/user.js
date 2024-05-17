import { localAxios } from "@/util/http-commons.js";

const local = localAxios();

async function userConfirm(user, success, fail) {
    await local.post(`/user/login`, user).then(success).catch(fail);
}

async function findById(userId, success, fail) {
    await local.get(`/user/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken");
    await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userId, success, fail) {
    await local.get(`/user/logout/${userId}`).then(success).catch(fail);
}

async function getUserInfo(token, success, fail) {
    local.defaults.headers["Authorization"] = token;
    await local.get(`/user/info`).then(success).catch(fail);
}

async function userSignup(formData, success, fail) {
    await local.post(`/user/signup`, formData).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout, getUserInfo, userSignup };
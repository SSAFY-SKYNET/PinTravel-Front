import {ref} from "vue"
import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {jwtDecode} from "jwt-decode";

import {userConfirm, findById, tokenRegeneration, logout} from "@/api/user.js"
import {httpStatusCode} from "@/util/http-status.js";

export const useUserStore = defineStore("userStore", () => {
    const router = useRoute()
    const isLogin = ref(false)
    const isLoginError = ref(null)
    const userInfo = ref(null)
    const isValidToken = ref(null)

    const userLogin = async (loginUser) => {
        await userConfirm(
            loginUser,
            async (response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let {data} = response;

                    let accessToken = data["access-token"]
                    let refreshToken = data["refresh-token"]
                    isLogin.value = true
                    isLoginError.value = false
                    isValidToken.value = true
                    sessionStorage.setItem("accessToken", accessToken)
                    sessionStorage.setItem("refreshToken", refreshToken)
                    console.log("로그인 성공 후 토큰 저장 완료")

                    await getUserInfo(accessToken)
                }
            },
            (error) => {
                isLogin.value = false
                isLoginError.value = true
                isValidToken.value = false
                console.error(error)
            }
        )
    }

    const getUserInfo = async (token) => {
        await findById(
            jwtDecode(token).userId,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    console.log("응답 데이터:", response.data);
                    userInfo.value = response.data;
                    console.log("사용자 정보:", userInfo.value.username);
                } else {
                    console.log("유저 정보 없음");
                }
            },
            async (error) => {
                console.error(error.response.status, error.response.statusText);
                isValidToken.value = false;

                await tokenRegeneration();
            }
        );
    };

    const tokenRegenerate = async () => {
        await tokenRegeneration(
            JSON.stringify(userInfo.value),
            (response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let accessToken = response.data["access-token"]
                    sessionStorage.setItem("accessToken", accessToken)
                    isValidToken.value = true
                }
            },
            async (error) => {
                if (error.response.status === httpStatusCode.UNAUTHORIZED) {
                    await logout(
                        userInfo.value.userId,
                        (response) => {
                            if (response.status === httpStatusCode.OK) {
                                console.log("리프레시 토큰 제거 성공")
                            } else {
                                console.log("리프레시 토큰 제거 실패")
                            }
                            alert("RefreshToken 기간 만료 \n 다시 로그인 해주세요")
                            isLogin.value = false
                            userInfo.value = null
                            isValidToken.value = false
                            router.push('/login')
                        },
                        (error) => {
                            console.log(error)
                            isLogin.value = false
                            userInfo.value = null
                        }
                    )
                } else {
                    console.error("토큰 재발급 실패")
                }
            }
        )
    }

    const userLogout = async () => {
        if (userInfo.value && userInfo.value.userId) {
            await logout(
                userInfo.value.userId,
                (response) => {
                    if (response.status === httpStatusCode.OK) {
                        console.log("로그아웃 성공");
                    } else {
                        console.log("로그아웃 실패");
                    }
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("refreshToken");
                    isLogin.value = false;
                    userInfo.value = null;
                    isValidToken.value = false;
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            // userInfo.value가 null이거나 userId가 없는 경우 로그아웃 처리
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
        }
    };

    return {
        isLogin,
        isLoginError,
        userInfo,
        isValidToken,
        userLogin,
        getUserInfo,
        tokenRegenerate,
        userLogout
    }
})
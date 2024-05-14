<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="p-4 p-md-5 border rounded-3 bg-light">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                            v-model="user.email">
                        <label for="floatingInput">이메일 주소</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                            v-model="user.password">
                        <label for="floatingPassword">비밀번호</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit" @click="submitForm">로그인</button>
                    <hr class="my-4">
                    <small class="text-muted">계정이 없으신가요? 지금 가입하세요.</small>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { ref } from 'vue'
const router = useRouter()

const user = ref({
    email: '',
    password: ''
})

const submitForm = () => {
    const email = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value
    login(email, password).then(() => {
        router.push('/')
    })
}
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요. */
</style>

<template>
<<<<<<< Updated upstream

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form>

                    <div class="mb-3">
                        <label for="email" class="form-label">이메일</label>
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="이메일을 입력하세요">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">비밀번호</label>
                        <input type="password" class="form-control" id="password" v-model="password"
                            placeholder="비밀번호를 입력하세요">
                    </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="handleLogin">로그인</button>
=======
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
>>>>>>> Stashed changes
                </form>
            </div>
        </div>
    </div>
<<<<<<< Updated upstream

</template>

<script setup>
import { login } from '@/api/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

=======
</template>

<script setup>
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { ref } from 'vue'
const router = useRouter()
>>>>>>> Stashed changes

const user = ref({
    email: '',
    password: ''
})

<<<<<<< Updated upstream
const email = ref(null);
const password = ref(null);

const router = useRouter();


const handleLogin = async () => {
    try {
        const userInfo = await login(email.value, password.value);
        console.log('로그인 성공:', userInfo);
        // 로그인 성공 후 처리 로직 (예: 페이지 리다이렉션)
        router.push('/magazine');
    } catch (err) {
        error.value = "로그인 실패: " + err.message;
        console.error(err);
    }
};

onMounted(async () => {
    // isLoading.value = true;
    // try {
    //     const data = await getAllUser();
    //     userInfo.value = data;
    // } catch (err) {
    //     error.value = "데이터를 불러오는 중 오류가 발생했습니다.";
    //     console.error(err);
    // } finally {
    //     isLoading.value = false;
    // }
});
=======
const submitForm = () => {
    const email = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value
    login(email, password).then(() => {
        router.push('/')
    })
}
>>>>>>> Stashed changes
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요. */
</style>

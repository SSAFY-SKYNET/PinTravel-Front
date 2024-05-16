<template>
    <div class="container">
        <div class="card" v-for="item in items" :key="item.id">
            <img :src="item.image" alt="Card Image" class="card-image">
            <div class="card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    {
        id: 1,
        title: '모든 핀',
        description: '핀 59개',
        image: 'your-image-url.jpg'
    },
    {
        id: 2,
        title: '일간판',
        description: '핀 26개',
        image: 'your-image-url.jpg'
    },
    // 추가 카드 데이터를 여기에 넣으세요.
]);
</script>

<style lang="css" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card {
    width: 240px;
    margin: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
}

.card-content {
    padding: 15px;
}
</style>
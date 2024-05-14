<template>
    <div v-if="item" class="w-full flex justify-center items-center mb-4 rounded-lg border">
        <div><img :src="item.imageUrl" alt="" class="rounded-lg w-full h-auto"></div>
        <div>
            {{ item.title }}
            <p v-if="!showFullDescription">{{ item.description.substring(0, 100) }}...</p>
            <p v-else>{{ item.description }}</p>
            <button @click="toggleDescription">{{ showFullDescription ? '접기' : '더보기' }}</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const showFullDescription = ref(false);

function toggleDescription() {
    showFullDescription.value = !showFullDescription.value;
}
</script>

<style lang="css" scoped></style>
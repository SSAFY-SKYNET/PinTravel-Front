<template>
    <div v-if="item" class="w-full md:w-[400px] flex justify-center items-center mb-4 rounded-lg">
        <div><img :src="item.firstImage" alt="" class=" rounded-lg"></div>
        <div> {{ item.title }}
            {{ item.addr1 }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="css" scoped></style>
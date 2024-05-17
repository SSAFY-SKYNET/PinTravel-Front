<template>
    <div ref="scrollContainer" class="h-[calc(100vh)] overflow-y-auto flex justify-center main">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto">
            <PinItemList :items="items" />
            <div ref="observerElement" style="height: 1px"></div>
        </div>
    </div>
</template>

<script setup>

import PinItemList from "@/components/PinItemList.vue";

import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from 'vue-router';
import { selectPinByMultiTagAndPage } from "@/api/pin";
const items = ref([]);
const page = ref(1);
const limit = 30;
const scrollContainer = ref(null);
const observerElement = ref(null);
const route = useRoute();
let observer;

const searchTags = ref([]);



const loadItems = async () => {
    const newItems = await selectPinByMultiTagAndPage(searchTags.value, page.value, limit);
    items.value.push(...newItems);
    page.value++;
};

onMounted(async () => {
    updateTagsFromQuery();
    console.log(searchTags.value)
    observer = new IntersectionObserver(
        async (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                await loadItems();
            }
        },
        {
            root: scrollContainer.value,
        }
    );
    observer.observe(observerElement.value);
});


const updateTagsFromQuery = () => {
    const tagsQuery = route.query.tags;
    console.log(tagsQuery)
    searchTags.value = tagsQuery ? tagsQuery.split(',') : [];
}

watchEffect(() => {
    updateTagsFromQuery();
    console.log(searchTags.value)
});


</script>

<style scoped></style>
<template>
  <div ref="scrollContainer" class="h-[calc(100vh)] overflow-y-auto flex justify-center main">
    <div>
      <PinDetail class="w-[100vw] h-[calc(80vh)] mx-auto" />
      <div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto">
          <div v-for="item in items" :key="item.id" class="w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]">
            <router-link :to="`/pin/${item.pinId}`">
              <PinItem :item="item" />
            </router-link>
          </div>
          <div ref="observerElement" style="height: 1px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPinByPage } from "@/api/pin";
import PinDetail from "@/components/PinDetail.vue";
import PinItem from "@/components/PinItem.vue";

const router = useRouter();
const items = ref([]);
const page = ref(1);
const limit = 30;
const scrollContainer = ref(null);
const observerElement = ref(null);
const isLoading = ref(false);
let observer;

const loadItems = async () => {
  const newItems = await getPinByPage(page.value, limit);
  items.value.push(...newItems);
  page.value++;
};

onMounted(async () => {
  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log("asd");
        await loadItems();
      }
    },
    {
      root: scrollContainer.value,
    }
  );

  observer.observe(observerElement.value);
});
</script>

<style scoped>
/* 스크롤바의 폭 너비 */
.main::-webkit-scrollbar {
  width: 5px;
}

.main::-webkit-scrollbar-thumb {
  background: rgb(87, 87, 87);
  /* 스크롤바 색상 */
  border-radius: 10px;
  /* 스크롤바 둥근 테두리 */
}

.main::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  /* 스크롤바 뒷 배경 색상 */
}
</style>

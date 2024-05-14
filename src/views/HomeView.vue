<template>



  <div ref="scrollContainer" class="h-[calc(100vh)] overflow-y-auto flex justify-center main">
    <div>
      <div>
        <PinDetail :item="selectedItem" />
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 auto-cols-max gap-4 mx-auto">

        <div v-for="item in items" :key="item.id" class="w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[14vw]">
          <PinItem :item="item" @click="onClick(item)" />
        </div>
        <div ref="observerElement" style="height: 1px"></div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllAttractionsByPage } from "@/api/attraction-info";
import PinDetail from "@/components/PinDetail.vue";
import PinItem from "@/components/PinItem.vue";
const items = ref([]);
let page = ref(1);
const limit = 30;
const selectedItem = ref(null);
const scrollContainer = ref(null);
const observerElement = ref(null);
const onClick = (item) => {
  console.log("clicked", item);
  selectedItem.value = item;
  items.value = [];
  page.value = 1;
};
let observer;
onMounted(async () => {
  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log("마지막 요소가 보임 - 스크롤바 없음 또는 끝에 도달");
        const newItems = await getAllAttractionsByPage(page.value, limit);
        items.value.push(...newItems);
        page.value++;
      } else {
        console.log("마지막 요소가 안 보임 - 스크롤바 존재");
      }
    },
    {
      root: scrollContainer.value,
    }
  );

  observer.observe(observerElement.value);
});


</script>

<style>
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
  /*스크롤바 뒷 배경 색상*/
}
</style>
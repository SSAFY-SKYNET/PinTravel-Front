<!-- SearchModal.vue -->
<template>
  <div v-show="showModal" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div class="bg-white rounded-lg p-6 z-10">
      <form class="flex">
        <div class="relative flex-grow">
          <input ref="tagInput" type="text" :placeholder="placeholder" class="border rounded-l p-1 w-full"/>
        </div>
        <button class="bg-blue-500 text-white rounded-r p-1 px-4" @click.prevent="search">검색</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, onUpdated, nextTick} from "vue";
import iziToast from "izitoast";
import {selectTagByInput} from "@/api/tag.js";
import Tagify from '@yaireo/tagify';

const tagInput = ref("");
const inputValue = ref("");
const tags = ref([]);
const selectedTags = ref([]);
const placeholder = ref("Tag Search");

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(['close', 'search']);

onMounted(() => {
  console.log("OnMounted")
  console.log(tagInput.value)
  const tagify = new Tagify(tagInput.value, {
    whitelist: tags.value,
    dropdown: {
      maxItems: 6,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: false
    }
  });

  tagify.on('input', async e => {
    inputValue.value = e.detail.value
    tags.value = await selectTagByInput(inputValue.value);
    tagify.settings.whitelist = tags.value.map(tag => tag.name);
    tagify.dropdown.show.call(tagify, inputValue.value);
  });

  tagify.on('add', e => {
    selectedTags.value.push(e.detail.data.value);
  });

  tagify.on('remove', e => {
    selectedTags.value = selectedTags.value.filter(tag => tag !== e.detail.data.value);
  });
});

const search = () => {
  const queryTags = selectedTags.value.join(',');
  if (queryTags.length === 0) {
    iziToast.info({
      title: "No search keywords",
      message: "Please enter search keywords.",
      position: "bottomRight",
      timeout: 3000,
    });
  } else {
    emit('search', queryTags);
    closeModal();
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.bg-white {
  width: 500px; /* 검색바 크기를 1.5배로 늘림 */
}
</style>
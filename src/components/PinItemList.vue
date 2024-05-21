<template>
  <div v-for="item in items" :key="item.id" class="w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]">
    <router-link :to="`/pin/${item.pinId}`">
      <PinItem :item="item" :board-id="boardId" @click="pinId = item.pinId"/>
    </router-link>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import PinItem from '@/components/PinItem.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  boardId: {
    type: Object,
  }
})

const emit = defineEmits(['toggle-pin'])

const togglePin = (item) => {
  emit('toggle-pin', item)
}
</script>

<style scoped>

</style>

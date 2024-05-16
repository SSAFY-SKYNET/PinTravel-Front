<template>
  <div>
    <KakaoMap :lat="latitude" :lng="longitude" :draggable="true" width="100%" height="100%">
      <KakaoMapMarker :lat="latitude" :lng="longitude"></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>
<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { defineProps } from "vue";

defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

</script>

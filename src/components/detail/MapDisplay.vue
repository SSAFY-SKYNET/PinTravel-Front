<template>
  <div>
    <KakaoMap
      :lat="latitude"
      :lng="longitude"
      :draggable="true"
      width="100%"
      height="100%"
    >
      <KakaoMapMarker :lat="latitude" :lng="longitude"></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>
<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { defineProps } from "vue";

const props = defineProps({
  latitude: {
    type: Number,
    default: 37.5665, // 서울의 위도
    required: false,
  },
  longitude: {
    type: Number,
    default: 126.978, // 서울의 경도
    required: false,
  },
});
</script>

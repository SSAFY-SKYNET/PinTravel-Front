<template>
  <div>
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      width="100%"
      height="100%"
    >
      <KakaoMapMarker
        :lat="coordinate.lat"
        :lng="coordinate.lng"
      ></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>
<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { defineProps } from "vue";

const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});
const coordinate = {
  lat: props.latitude,
  lng: props.longitude,
};
</script>

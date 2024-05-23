<template>
  <div>
    <KakaoMap
      :lat="defaultLatitude"
      :lng="defaultLongitude"
      :draggable="true"
      :level="mapLevel"
      width="100%"
      height="100%"
    >
      <KakaoMapMarker
        v-for="marker in computedMarkers"
        :key="marker.pinId"
        :lat="marker.latitude"
        :lng="marker.longitude"
      />
    </KakaoMap>
  </div>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { computed, defineProps } from "vue";

const props = defineProps({
  latitude: Number,
  longitude: Number,
  pins: Array,
});

const computedMarkers = computed(() => {
  return props.pins.length > 0
    ? props.pins
    : [{ latitude: props.latitude, longitude: props.longitude }];
});

const defaultLatitude = computed(
  () =>
    computedMarkers.value.reduce((sum, marker) => sum + marker.latitude, 0) /
    computedMarkers.value.length
);
const defaultLongitude = computed(
  () =>
    computedMarkers.value.reduce((sum, marker) => sum + marker.longitude, 0) /
    computedMarkers.value.length
);
const mapLevel = computed(() => (props.pins.length > 0 ? 15 : 4));
</script>

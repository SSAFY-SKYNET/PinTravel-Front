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
      <template v-if="hasPins">
        <KakaoMapMarker
          v-for="pin in pins"
          :key="pin.pinId"
          :lat="pin.latitude"
          :lng="pin.longitude"
        />
      </template>
      <KakaoMapMarker v-else :lat="defaultLatitude" :lng="defaultLongitude" />
    </KakaoMap>
  </div>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { computed, defineProps } from "vue";

const props = defineProps({
  latitude: {
    type: Number,
    default: 37.5665, // 서울의 위도
  },
  longitude: {
    type: Number,
    default: 126.978, // 서울의 경도
  },
  pins: {
    type: Array,
    default: () => [],
  },
});

const hasPins = computed(() => props.pins && props.pins.length > 0);
const defaultLatitude = computed(() =>
  hasPins.value
    ? props.pins.reduce((sum, pin) => sum + pin.latitude, 0) / props.pins.length
    : props.latitude
);
const defaultLongitude = computed(() =>
  hasPins.value
    ? props.pins.reduce((sum, pin) => sum + pin.longitude, 0) /
      props.pins.length
    : props.longitude
);
const mapLevel = computed(() => (hasPins.value ? 15 : 4));
</script>

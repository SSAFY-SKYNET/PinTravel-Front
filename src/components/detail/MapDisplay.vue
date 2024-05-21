<template>
  <div>
    <KakaoMap
        :lat="defaultLatitude"
        :lng="defaultLongitude"
        :draggable="true"
        :level="pins && pins.length > 1 ? 15 : 4"
        width="100%"
        height="100%"
    >
      <template v-if="pins && pins.length > 0">
        <KakaoMapMarker
            v-for="pin in pins"
            :key="pin.pinId"
            :lat="pin.latitude"
            :lng="pin.longitude"
        ></KakaoMapMarker>
      </template>
      <KakaoMapMarker
          v-else
          :lat="latitude"
          :lng="longitude"
      ></KakaoMapMarker>
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
    required: false,
  },
  longitude: {
    type: Number,
    default: 126.978, // 서울의 경도
    required: false,
  },
  pins: {
    type: Array,
    default: () => [],
    required: false,
  }
});

const defaultLatitude = computed(() => {
  if (props.pins && props.pins.length > 0) {
    const latitudeSum = props.pins.reduce((sum, pin) => sum + pin.latitude, 0);
    return latitudeSum / props.pins.length;
  } else {
    return props.latitude;
  }
});

const defaultLongitude = computed(() => {
  if (props.pins && props.pins.length > 0) {
    const longitudeSum = props.pins.reduce((sum, pin) => sum + pin.longitude, 0);
    return longitudeSum / props.pins.length;
  } else {
    return props.longitude;
  }
});

</script>
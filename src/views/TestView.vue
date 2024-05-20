<template>
  <VueDaumPostcode :options="options" />
</template>
<script>
import { VueDaumPostcode } from "vue-daum-postcode";

export default {
  components: {
    VueDaumPostcode, // export VueDaumPostcode is component
  },
};
</script>

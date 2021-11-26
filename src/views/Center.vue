<template>
  <display-frame :name="'各主机内存使用率'" :decoration-num="1">
<!--    <usage-rate-chart :name="'各主机内存使用率'"/>-->
  </display-frame>
</template>
<script>
import UsageRateChart from "@/components/usageRateChart/UsageRateChart";
import DisplayFrame from "@/components/CenterDisplayFrame";
export default {
  name: "Center",
  components: {
    UsageRateChart,
    DisplayFrame
  }
}
</script>
<style scoped>

</style>

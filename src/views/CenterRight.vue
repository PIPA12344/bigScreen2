<template>
  <display-frame name="各主机磁盘读写情况" decoration-num="6">
<!--    <disk-read-and-write-chart/>-->
  </display-frame>
</template>

<script>
import DiskReadAndWriteChart from "@/components/diskReadAndWriteChart/DiskReadAndWriteChart";
import DisplayFrame from "@/components/CenterDisplayFrame";
export default {
  name: "CenterRight",
  components: {
    DisplayFrame,
    DiskReadAndWriteChart
  }
}
</script>

<style scoped>

</style>

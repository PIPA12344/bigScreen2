<template>
  <dv-border-box-13 style="width: 100%;height: 170px;margin-top:20px;display: flex;">
    <div class="backGround">
      <span style="margin-top: 0;margin-left: 5px;height: 20px">
        <icon-svg icon-class="biaodanzujian-biaoge-copy" class="icon"/>
      </span>
      <span style="margin-top: 0;height: 20px">
        <div class="containerName">&nbsp&nbsp&nbsp{{name}}&nbsp&nbsp</div>
      </span>
      <slot>
      </slot>
    </div>
  </dv-border-box-13>
</template>

<script>
import ParameterTable from "@/components/table/ParameterTable";
export default {
  name: "BottomDisplayFrame",
  components: {
    ParameterTable
  },
  props: {
    name: String
  }
}
</script>

<style scoped>
.backGround {
  width: 96%;
  height: 82%;
  /*background-color: rgb(255,255,255,0);*/
  margin: 4% 0 0 2%;
  display: flex;
  flex-wrap: wrap;
}
.icon {
  font-size: 18px;
  float: left;
  margin-top: 3px
}
.containerName {
  color:#c8c8da;
  font-size: 10px;
  margin-top: 5px
}
</style>

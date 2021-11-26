<template>
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading" class="load ">Loading...</dv-loading>
      <div style="color: white;position: absolute;margin: 2.7% 0 0 72%;font-size: 20px">
        {{dateYear}} {{dateWeek}}  {{dateDay}}
      </div>
      <div>
        <title1>
          Windows监控面板
        </title1>
        <div class="center">
          <center-left ref="centerLeft"/>
          <center/>
          <center-right/>
        </div>
        <bottom @tableChange="tableChange"></bottom>
      </div>
    </dv-full-screen-container>
</template>

<script>
import Title1 from "@/components/title/Title";
import ParameterTable from "@/components/table/ParameterTable";
import Center from "@/views/Center";
import CenterLeft from "@/views/CenterLeft";
import CenterRight from "@/views/CenterRight";
import Bottom from "@/views/Bottom";
import {formatTime} from "../../../big-screen-vue-datav/src/utils";
export default {
  name: "index",
  components: {
    Bottom,
    Title1,
    ParameterTable,
    Center,
    CenterLeft,
    CenterRight,
  },
  mounted() {
    this.cancelLoading()
    this.timeFn()
  },
  data() {
    return {
      loading: true,
      dateDay: null,
      dateWeek: null,
      dateYear: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      },1500)
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    tableChange(show) {
      this.$refs.centerLeft.changeShow(show)
    }
  }
}
</script>

<style>
  .bg {
    background-image: url('../assets/pageBg.jpg');
  }
   body {
     margin: 0;
   }
   .center {
     display: flex;
     justify-content: space-around;
     width: 80%;
     margin-left: 10%
   }
   .load {
     width: 1525px;
     height: 720px
   }
</style>

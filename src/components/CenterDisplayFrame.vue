<template>
  <dv-border-box12 class="container">
    <div class="backGround">
      <span style="margin-top: 5px;margin-left: 5px">
        <icon-svg icon-class="zhexiantu-copy" class="icon"/>
      </span>
      <span style="margin-top: 5px">
<!--        <div class="containerName">&nbsp&nbsp&nbsp{{realName}}&nbsp&nbsp</div>-->
        <el-select v-model="value" @change="chartChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span>
        <component :is="'dv-decoration'+decorationNum" class="decoration"></component>
      </span>
      <slot>

      </slot>
    </div>
  </dv-border-box12>
</template>

<script>
export default {
  name: "DisplayFrame",
  props: {
    decorationNum: {
      type: Number | String,
      default: 3
    },
  },
  data() {
    return {
      realName: '各主机CPU使用率',
      value: '各主机CPU使用率',
      options: [
        {
          value: 1,
          label: '各主机CPU使用率'
        },
        {
          value: 2,
          label: '各主机内存使用率'
        },
        {
          value: 3,
          label:'各主机磁盘读写情况'
        }
      ]
    }
  },
  methods: {
    chartChange() {
      console.log(this.value)
      this.$emit('chartChange',this.value)
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex: 1;
    height: 300px
  }
  .backGround {
    width: 90%;
    height: 90%;
    background-color: rgb(255,255,255,0);
    /*background-color: #0c1020;*/
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    margin: 2.5% 0 0 5%;
  }
  .icon {
    font-size: 15px;
    float: left;
    margin-top: 3px
  }
  .decoration {
    width: 100px;
    height: 20px;
    margin-top: 8px
  }
  .containerName {
    color:#c8c8da;
    font-size: 10px;
    margin-top: 5px
  }
  >>>.el-input__inner {
    margin-top: -8px;

    width: 180px;
    color:#c8c8da;
    background-color: rgba(255,255,255,0);
    border-right-width: 0;
    border-left-width: 0;
    border-top-width: 0;
    border-bottom-width: 0;
  }
   >>>.el-scrollbar__view >>>.el-select-dropdown__list {
    background-color: black;
  }

</style>

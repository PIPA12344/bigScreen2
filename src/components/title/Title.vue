<template>
  <div style="display: flex;justify-content: center;width: 80%;margin-left: 10%;margin-top: 15px">
    <dv-decoration-10 style="width:25%;height:5px;" />
    <dv-decoration-8 style="width:15%;height:50px;" :color="['#568aea', '']" />
    <h2 style="color: white;">
      <slot>
      </slot>
    </h2>
    <dv-decoration-8 :reverse="true" style="width:15%;height:50px;" :color="['#568aea', '']"/>
    <dv-decoration-10 style="width:25%;height:5px;transform: rotate(180deg)" />
  </div>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style scoped>

</style>

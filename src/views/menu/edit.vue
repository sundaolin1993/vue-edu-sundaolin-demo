<template>
  <div class="menu-edit">
    <menu-create-or-edit :title="'编辑菜单'"></menu-create-or-edit>
  </div>
</template>

<script>
import menuCreateOrEdit from './component/createoredit.vue'
export default {
  name: 'menuEdit',
  components: {
    menuCreateOrEdit
  }
}
</script>

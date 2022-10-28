<template>
  <div class="menu-create">
    <menu-create-or-edit></menu-create-or-edit>
  </div>
</template>

<script>
import menuCreateOrEdit from './component/createoredit.vue'
export default {
  name: 'menuCreate',
  components: {
    menuCreateOrEdit
  }
}
</script>

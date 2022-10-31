<template>
  <div>
    <div style="margin-top: 10px; border: 1px solid #ccc">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 560px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="html"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadImage } from '@/services/course'
export default {
  name: 'ComEditor',
  components: { Editor, Toolbar },
  props: ['value'],
  data () {
    return {
      isLoaded: false,
      editor: null,
      html: '',
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            fieldName: 'file',
            maxNumberOfFiles: 1,
            customUpload: async (file, insertFn) => {
              const formData = new FormData()
              formData.append('file', file)
              const { data } = await uploadImage(formData)
              if (data.code === '000000') {
                insertFn(data.data.name)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange (editor) {
      this.$emit('input', editor.getHtml())
    }
  },
  created () {
    this.html = this.value
  },
  beforeDestroy () {
    if (this.editor == null) return
    this.editor.destroy()
  },
  watch: {
    value () {
      if (!this.isLoaded) {
        this.html = this.value
        this.isLoaded = true
      }
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

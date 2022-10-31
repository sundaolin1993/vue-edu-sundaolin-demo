<template>
  <div class="course-upload">
    <el-upload
      ref="upload"
      list-type="picture-card"
      action=""
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="handleUpLoad"
      :on-change="handleChange"
      :file-list="fileListImg"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/services/course'
export default {
  name: 'courseUpload',
  props: {
    value: String
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isUpLoad: false,
      isLoaded: false,
      fileListImg: []
    }
  },
  methods: {
    handleRemove () {
      this.fileListImg = []
      this.$emit('input', '')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async handleUpLoad (option) {
      if (this.isUpLoad) return
      this.isUpLoad = true
      const formData = new FormData()
      formData.append('file', option.file)
      const { data } = await uploadImage(formData, progress => {
        let percent = Math.floor(progress.loaded / progress.total * 100)
        percent > 99 && (percent = 99)
        option.onProgress({ percent })
      })
      if (data.code === '000000') {
        this.$emit('input', data.data.name)
        this.isUpLoad = false
      } else {
        option.onError()
      }
    },
    handleChange (file, fileList) {
      if (this.isUpLoad) {
        fileList.splice(fileList.length - 1, 1)
        this.$message.warning('请等待上传完成')
        return
      }
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
    }
  },
  watch: {
    value () {
      if (!this.isLoaded) {
        this.fileListImg.push({
          url: this.value
        })
        this.isLoaded = true
      }
    }
  }
}
</script>

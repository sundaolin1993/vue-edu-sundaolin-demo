<template>
  <div>
    <el-page-header @back="$router.push({ name: 'course' })" content="添加课程">
    </el-page-header>
    <br />
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(step, i) in steps"
            :key="step.id"
            :title="step.title"
            :icon="step.icon"
            @click.native="activeStep = i"
          ></el-step>
        </el-steps>
      </div>
      <el-form
        ref="courseForm"
        :model="courseForm"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称" prop="courseName">
            <el-input
              v-model="courseForm.courseName"
              placeholder="请输入课程名称"
              :maxlength="50"
              clearable
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="brief">
            <el-input
              v-model="courseForm.brief"
              placeholder="请输入课程简介"
              :maxlength="100"
              clearable
              show-word-limit
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
            <el-input
              v-model="courseForm.teacherDTO.teacherName"
              placeholder="请输入讲师姓名"
              :maxlength="50"
              clearable
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师职位" prop="teacherDTO.position">
            <el-input
              v-model="courseForm.teacherDTO.position"
              placeholder="请输入讲师职位"
              :maxlength="50"
              clearable
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师简介" prop="teacherDTO.description">
            <el-input
              v-model="courseForm.teacherDTO.description"
              placeholder="请输入讲师简介"
              :maxlength="100"
              clearable
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="概述一" prop="previewFirstField">
                <el-input
                  v-model="courseForm.previewFirstField"
                  placeholder="课程预览第一个字段"
                  :maxlength="20"
                  show-word-limit
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="概述二" prop="previewSecondField">
                <el-input
                  v-model="courseForm.previewSecondField"
                  placeholder="课程预览第二个字段"
                  :maxlength="20"
                  show-word-limit
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input-number
              v-model="courseForm.sortNum"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <course-upload v-model="courseForm.courseListImg"></course-upload>
          </el-form-item>
          <el-form-item label="解锁封面">
            <course-upload v-model="courseForm.courseImgUrl"></course-upload
          ></el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格" prop="discounts">
            <el-input
              v-model="courseForm.discounts"
              placeholder="请输入单行文本售卖价格"
              type="number"
              clearable
              :style="{ width: '100%' }"
            >
              <template slot="append"> 元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="price">
            <el-input-number
              v-model="courseForm.price"
              placeholder="请输入商品原价"
              :precision="2"
              controls-position="right"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="销量" prop="sales">
            <el-input-number
              v-model="courseForm.sales"
              placeholder="请输入销量"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="活动标签" prop="discountsTag">
            <el-input
              v-model="courseForm.discountsTag"
              placeholder="请输入活动标签"
              :maxlength="4"
              show-word-limit
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关" prop="field106">
            <el-switch
              v-model="courseForm.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <template v-if="courseForm.activityCourse">
            <el-form-item label="开始时间" prop="activityCourseDTO.beginTime">
              <el-date-picker
                type="datetime"
                v-model="courseForm.activityCourseDTO.beginTime"
                :style="{ width: '100%' }"
                placeholder="请选择开始时间"
                clearable
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="activityCourseDTO.endTime">
              <el-date-picker
                type="datetime"
                v-model="courseForm.activityCourseDTO.endTime"
                :style="{ width: '100%' }"
                placeholder="请选择结束时间"
                clearable
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" prop="activityCourseDTO.amount">
              <el-input
                v-model="courseForm.activityCourseDTO.amount"
                placeholder="请输入秒杀价"
                clearable
                type="number"
                :style="{ width: '100%' }"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" prop="activityCourseDTO.stock">
              <el-input-number
                v-model="courseForm.activityCourseDTO.stock"
                placeholder="秒杀库存"
              ></el-input-number>
            </el-form-item>
          </template>
          <!-- </el-form> -->
        </div>
        <div v-show="activeStep === 4">
          <el-form-item>
            <editor v-model="courseForm.courseDescriptionMarkDown"></editor>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button :disabled="activeStep === 0" @click="activeStep--">
            上一步
          </el-button>

          <el-button
            :disabled="activeStep === steps.length - 1"
            @click="activeStep++"
          >
            下一步
          </el-button>
          <el-button
            type="primary"
            v-if="activeStep === steps.length - 1"
            @click="submitForm"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import courseUpload from './components/course-upload.vue'
import editor from '@/components/editor.vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
export default {
  name: 'saveOrUpdateCourse',
  props: ['courseId'],
  data () {
    return {
      activeStep: 0,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-picture-outline' },
        { id: 3, title: '销售信息', icon: 'el-icon-shopping-bag-1' },
        { id: 4, title: '秒杀活动', icon: 'el-icon-present' },
        { id: 5, title: '课程详情', icon: 'el-icon-edit-outline' }
      ],
      courseForm: {
        id: null,
        courseName: undefined,
        brief: undefined,
        teacherDTO: {
          id: null,
          courseId: null,
          teacherName: undefined,
          position: undefined,
          description: undefined
        },
        previewFirstField: undefined,
        previewSecondField: undefined,
        sortNum: 1,
        courseListImg: '',
        courseImgUrl: '',
        discounts: undefined,
        price: 0,
        sales: 1,
        discountsTag: undefined,
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: undefined,
          stock: 1
        },
        courseDescriptionMarkDown: ''
      },
      rules: {
        courseName: [{
          message: '请输入课程名称',
          required: true,
          trigger: 'blur'
        }],
        brief: [{
          required: true,
          message: '请输入课程简介',
          trigger: 'blur'
        }],
        teacherDTO: {
          teacherName: [{
            required: true,
            message: '请输入讲师姓名',
            trigger: 'blur'
          }],
          position: [{
            required: true,
            message: '请输入讲师职位',
            trigger: 'blur'
          }],
          description: [{
            required: true,
            message: '请输入讲师简介',
            trigger: 'blur'
          }]
        },
        sortNum: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        discounts: [{
          required: true,
          message: '请输入单行文本售卖价格',
          trigger: 'blur'
        }],
        previewFirstField: [{
          required: true,
          message: '课程预览第一个字段',
          trigger: 'blur'
        }],
        previewSecondField: [{
          required: true,
          message: '课程预览第二个字段',
          trigger: 'blur'
        }],
        activityCourseDTO: {
          beginTime: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }],
          endTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请输入秒杀价',
            trigger: 'blur'
          }],
          stock: [{
            required: true,
            message: '秒杀库存',
            trigger: 'blur'
          }]
        }
      },
      validList: [
        ['courseName', 'brief']
      ]
    }
  },
  methods: {
    async submitForm () {
      this.$refs.courseForm.validate(async (valid, options) => {
        if (!valid) {
          for (let index = 0; index < this.validList.length; index++) {
            if (this.validList[index].includes(Object.keys(options)[0])) {
              this.activeStep = index
              return
            }
          }
          return
        }
        // 提交表单
        const { data } = await saveOrUpdateCourse(this.courseForm)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
          this.$router.push({ name: 'course' })
        }
      })
    }
  },
  components: {
    courseUpload,
    editor
  },
  async created () {
    if (this.courseId) {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.courseForm = data.data
        if (!this.courseForm.activityCourse) {
          this.courseForm.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: undefined,
            stock: 1
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}

::v-deep .avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  color: #8c939d;
  font-size: 28px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

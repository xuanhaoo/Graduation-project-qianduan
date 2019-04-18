<template lang="html">
  <div class="main-body">
    <div class="page-bg-head">
      <img src="/static/images/pubcontent.jpg" alt="" class="page-img">
    </div>
    <div class="content-allbody">
      <div class="formContent">
        <el-form ref="pubContentForm" :model="contentForm" label-width="80px">
          <!-- <el-form-item> -->
            <el-input v-model="contentForm.authorId" type="hidden"></el-input>
          <!-- </el-form-item> -->
          <!-- <el-form-item> -->
            <el-input v-model="contentForm.avatar" type="hidden"></el-input>
          <!-- </el-form-item> -->

          <el-form-item label="文章类型">
            <el-select v-model="contentForm.subjectId" placeholder="请选择类型">
              <el-option label="足迹" value="1"></el-option>
              <el-option label="攻略" value="2"></el-option>
              <el-option label="问答" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标题">
            <el-input v-model="contentForm.title"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                multiple>
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2Mb</div>
              </el-upload>
          </el-form-item>

          <el-form-item label="游玩区域（省级）" prop="areaTypeTwo" >
              <el-select v-model="contentForm.areaTypeTwo" placeholder="请选择" @change="loadAreaThree">
                <el-option
                  v-for="item1 in areaTypeTwoData"
                  :key="item1.id"
                  :label="item1.name"
                  :value="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="游玩区域（市级）" prop="areaTypeThree" >
              <el-select v-model="contentForm.areaTypeThree" placeholder="请选择">
                <el-option
                  v-for="item2 in areaTypeThreeData"
                  :key="item2.id"
                  :label="item2.name"
                  :value="item2.id">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="游玩时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="contentForm.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="contentForm.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="游玩天数">
            <el-input v-model="contentForm.title"></el-input>
          </el-form-item>
          <el-form-item label="人均花费">
            <el-input v-model="contentForm.title"></el-input>
          </el-form-item>
          <el-form-item label="允许评论">
            <el-switch v-model="contentForm.delivery"></el-switch>
          </el-form-item>
          <!-- <el-form-item label="活动性质">
            <el-checkbox-group v-model="contentForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          <el-form-item label="游玩方式">
            <el-radio-group v-model="contentForm.resource">
              <el-radio label="个人"></el-radio>
              <el-radio label="情侣"></el-radio>
              <el-radio label="家庭"></el-radio>
              <el-radio label="团体"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="contentForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <tinymce-editor v-model="contentForm.title"
            :disabled="disabled"
            @onClick="onClick"
            ref="editor"></tinymce-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      <!-- <button @click="clear">清空内容</button>
      <button @click="disabled = true">禁用</button> -->
      </div>

  </div>

    </div>
  </div>
</template>

<script>


import pubContentApi from '@/api/pubContent'
import TinymceEditor from '@/components/Tinymce/tinymce-editor'
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      contentForm: {
        title: '',
        avatar: '',
        allowComment: '',
        subjectId: '',


        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      imageUrl: '',

      uploadUrl: '',
      disabled: false,
      // 一级（省级）地址信息
      areaTypeTwoData:[],
      areaParent: {
        parentId: null
      },
      // 二级 区域信息
      areaTypeThreeData:[],
      areaTwoValue: null,
      areaThreeValue: null,
    }
  },
  created() {
    this.loadAreaTwo()  // 预加载省级数据
  },
  methods: {
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    //清空内容
    clear() {
      this.$refs.editor.clear()
    },

    // 加载一级区域
      loadAreaTwo() {
        pubContentApi.queryAllListNoPageTwo().then(res => {
          this.areaTypeTwoData = res.data.data
          // console.log(this.areaTypeTwoData)
        })
      },
      // 加载二级区域
      loadAreaThree(parentId) {
        this.areaParent.parentId = parentId
        pubContentApi.queryAllListNoPageThree(this.areaParent).then(res => {
          this.areaTypeThreeData = res.data.data
        })
      },
    // 上传返回
    handleAvatarSuccess(res, file) {
      console.log("xxx");
      // if (res.code == 1) {
      //   this.userInfoForm.avatar = res.urlData
      //   this.imageUrl = res.urlData
      //   this.$message.success("上传成功！")
      // }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        this.$message.error('上传头像图片只能是 jpg、png、gif 格式!');
        return false;
      }
      // if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      //   this.$message.error('只支持jpg、png、gif格式的图片！')
      //   return false
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },


  },

}
</script>

<style lang="css" scoped>

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.main-body {
  background: #efefef;
  margin-top: 72px;
  min-height: 1500px;
}
.content-allbody {
  width: 1000px;
  margin: 0 auto;
  padding-top: 400px;
}
.formContent {
  padding: 20px;
  background-color: #fff;
}
.page-bg-head {
  height: 380px;
  position: absolute;
  width: 100%;
  background-repeat: no-repeat;
}
.page-img {
  height: 380px;
  width: 100%;
}

</style>

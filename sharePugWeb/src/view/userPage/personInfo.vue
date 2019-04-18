<template lang="html">
  <div class="main-body">
    <div class="content-allbody">
      <div class="">
        <el-card class="box-card">
          <div class="">
            <span>
              <el-button type="info" plain @click="handleUpdatePsw">修改密码</el-button>
            </span>
          </div>
          <Divider orientation="left">个人信息</Divider>
          <div class="personInfoForm">
            <el-form ref="userInfoForm" :model="userInfoForm" label-width="80px">
              <el-form-item label="头像">
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
              <el-form-item>
                <el-input v-model="userInfoForm.id" type="hidden"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="userInfoForm.avatar" type="hidden"></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="userInfoForm.cusName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="userInfoForm.nickName"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfoForm.email"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="userInfoForm.address"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="userInfoForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="userInfoForm.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="简介">
                <el-input type="textarea" v-model="userInfoForm.comment"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateInfo">立即更新</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-card>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="passwordRules" ref="passwordDataForm" :model="passwordForm" label-position="left" label-width="150px" >
        <el-form-item label="原密码" prop="oldPsw" >
          <el-input v-model="passwordForm.oldPsw" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPsw">
          <el-input v-model="passwordForm.newPsw" type="password"></el-input>
          </el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="newPswRe">
          <el-input v-model="passwordForm.newPswRe" type="password"></el-input>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePsw">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import personInfoApi from '@/api/personInfo'
import { resetTemp } from '@/utils'
import { uploadImage } from '@/api/upload'

export default {
    data() {
      let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.passwordForm.newPsw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
      return {
        userInfoForm: {
          id: 0,
          cusName: null,
          nickName: null,
          avatar: null,
          email: null,
          address: null,
          phone: null,
          sex: null,
          comment: null
        },
        imageUrl: '',
        tableQuery: {
          id: null
        },
        uploadUrl: '',
        passwordForm: {
          id: '',
          oldPsw: '',
          newPsw: '',
          newPswRe: '',
        },
        dialogFormVisible: false,
        rules: {
          // name: [{ required: true, message: '必填', trigger: 'blur' }]
        },
        passwordRules: {
          oldPsw: [{validator: validatePass, trigger: 'blur'}],
          newPsw: [{validator: validatePass, trigger: 'change'}],
          newPswRe: [{validator: validatePass2, trigger: 'change'}]
        }
      };
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 上传返回
      handleAvatarSuccess(res, file) {
        console.log("xxx");
        if (res.code == 1) {
          this.userInfoForm.avatar = res.urlData
          this.imageUrl = res.urlData
          this.$message.success("上传成功！")
        }
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

      // 拉取数据
      fetchData() {
        this.tableQuery.id = this.$route.params.userid
        personInfoApi.getUserInfo(this.tableQuery).then(res => {
          this.userInfoForm.id = res.data.userInfo.id
          this.userInfoForm.cusName = res.data.userInfo.cusName
          this.userInfoForm.nickName = res.data.userInfo.nickName
          this.userInfoForm.avatar = res.data.userInfo.avatar
          this.userInfoForm.email = res.data.userInfo.email
          this.userInfoForm.address = res.data.userInfo.address
          this.userInfoForm.phone = res.data.userInfo.phone
          this.userInfoForm.sex = res.data.userInfo.sex
          this.userInfoForm.comment = res.data.userInfo.comment
          this.imageUrl = res.data.userInfo.avatar
        })
        this.uploadUrl = uploadImage()
      },

      // 更新
      updateInfo() {
        personInfoApi.updateUserInfo(this.userInfoForm).then(res => {
          if (res.data.code == 1) {
            this.$message.success('更新成功')
          }
        })
      },

      // 修改密码弹窗
      handleUpdatePsw() {
              resetTemp(this.temp)
              this.dialogFormVisible = true
              this.passwordForm.id = this.userInfoForm.id
              this.$nextTick(() => this.$refs['passwordDataForm'].clearValidate())
            },
      // 修改密码
      updatePsw() {
        this.$refs['passwordDataForm'].validate((valid) => {
                if (!valid) return
                personInfoApi.updatePassword(this.passwordForm).then(res => {
                  this.dialogFormVisible = false
                  this.$message.success("更新密码成功,下次登录需要输入新的密码")
                })
              })
      }

    }
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
  padding-top: 290px;
}
.personInfoForm {
  margin-top: 30px;
}
</style>

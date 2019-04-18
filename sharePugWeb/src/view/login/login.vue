<template lang="html">
  <div class="main-page" :style="backgroundDiv">
    <img src="../../assets/images/login.jpg" style="width: 100%; height: auto; min-height:1000px;">
    <div class="login-logo">
      <div class="">
       <span style="color: rgb(255, 255, 255, 0.4);font-size:80px;margin-left:40%;">👣</span>
      </div>
    </div>
    <div class="login-card-form">
      <el-card class="box-card">
        <el-form ref="loginForm" :model="loginForm">
          <el-form-item props="username">
            <el-input placeholder="请输入您的邮箱账号" name="username" type="text" v-model="loginForm.username" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item props="password">
            <el-input type="password" placeholder="请输入您的密码" name="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <div class="" style="float:right;">
            <span style="color:red;">忘记密码</span>
          </div>
          <el-button type="success" style="width:100%;margin-top:30px;" @click.native.prevent="handleLogin">登录</el-button></el-button>
        </el-form>
      </el-card>


    </div>
  </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate'
import loginApi from '@/api/login'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户帐号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6个字符'))
        } else {
          callback()
        }
      }
    return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../../assets/images/login.jpg') + ')'
        },
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false
    }
},
  methods: {
    handleLogin() {

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          loginApi.login(this.loginForm).then((res) => {
            console.log(res.data);
            if (res.data.code == 1) {
              // sessionStorage.setItem("userInfo", res.data.userInfo)
              // sessionStorage.setItem("token", "")
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))

              this.$store.dispatch("setUser", res.data.userInfo)
              // this.$store.dispatch("setToken", "")
              console.log(this.$store.state.isLogin);
              console.log(this.$store.state.currentUser);
              console.log(this.$store.state.nickName);
              this.$router.push({path: '/index'})
            } else {
              this.$message({
	                message: '用户名或密码错误！',
	                type: 'info',
	                duration: 1500,
	                onClose: () => {

	                }
	              })
            }
          })
        }
      })
    },



    }
}
</script>

<style lang="css" scoped>
.main-page {
  position:fixed;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  /* background: url('../../assets/images/register.jpg'); */
}
.login-logo {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: -940px auto;
}
.login-card-form {
  height: 500px;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: -840px auto;
  border-radius: 20%;
}
.el-form {
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

<template lang="html">
  <div class="main-page" :style="backgroundDiv">
    <img src="../../assets/images/register.jpg" style="width: 100%; height: auto; min-height:1000px;">
    <div class="login-logo">
      <div class="">
       <span style="color: rgb(255, 255, 255, 0.6);font-size:80px;margin-left:40%;">👣</span>
      </div>
    </div>
    <div class="login-card-form" style="padding-top:55px;">
      <el-card class="box-card">
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input placeholder="请输入您的邮箱账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的邮箱账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的邮箱账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的邮箱账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="请输入您的密码"></el-input>
          </el-form-item>

          <el-button type="success" style="width:100%;margin-top:30px;">确定注册</el-button></el-button>
        </el-form>
      </el-card>


    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../../assets/images/register.jpg') + ')'
        }
    }
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

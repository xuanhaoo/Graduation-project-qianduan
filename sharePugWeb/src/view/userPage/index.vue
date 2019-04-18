<template lang="html">
  <div class="main-body">
    <div class="page-bg-head">
      <img src="/static/images/userPage.jpg" alt="" class="page-img">
    </div>
    <div class="content-allbody">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple left-content">
          <el-card class="box-card" style="height:600px;">
            <div class="left-headpic">
              <img :src="this.userInfo.avatar" alt="" class="img-sty">
              <div class="" style="margin-top:10px; width: 200px;">
                <p style="font-size:20px;">{{ this.userInfo.nickName }} <Icon v-if="this.userInfo.sex == 0" type="md-male" size="20" style="margin-left:10px;color:blue;"/>
                <Icon type="md-female" v-if="this.userInfo.sex == 1" size="20" style="margin-left:10px;color:pink;"/></p>
              </div>
              <div class="" style="margin-top:20px; width: 200px;margin-left:-30px;">
                <p style="font-size: 16px;">
                  {{ this.userInfo.email }} | <Icon style="cursor:pointer;" type="ios-cog-outline" size="26" @click="jumpPersonInfo"/>
                </p>
              </div>
           </div>

           <!-- 关注粉丝数量展示 -->
           <div class="left-info">
             <div class="guanzhu" style="float: left;">
               <strong>15</strong>
               <p>关注</p>
             </div>
             <div class="" style="height:64px;float: left;margin-left:55px;border-left:1px solid #999;">
             </div>
             <div class="guanzhu" style="float: left;margin-left:80px;">
               <strong>99+</strong>
               <p>粉丝</p>
             </div>
             <!-- button -->
             <div class="button-sty">
               <el-button type="primary" plain style="margin-top:50px;" @click="pubContent">
                 <i class="el-icon-edit-outline" style="padding-right:10px;"></i>发布内容</el-button>
             </div>
             <div class="user-comment" style="margin-top:50px;">
               <p>简介：{{ this.userInfo.comment }}</p>
             </div>
           </div>
          </el-card>
        </div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 我的足迹</span>
              我的行程
            </el-tab-pane>
            <el-tab-pane label="我的攻略">我的攻略</el-tab-pane>
            <el-tab-pane label="我的回答">我的问答</el-tab-pane>
            <el-tab-pane label="Answer">Answer</el-tab-pane>
          </el-tabs>
        </div></el-col>
      </el-row>
    </div>

</div>
</template>

<script>
import loginApi from '@/api/login'

export default {

  name: 'Comps-Headroom',
  data() {
    return {
			 userArray: {
				 username: null,
			 },
			 dialogVisible: false,
			 userInfo: {},
    }

  },
  created() {
		// this.fetchUsreInfo()
		if (sessionStorage.getItem("userInfo")) {
      // console.log(this.$store.state.id);
      var restoredSession = JSON.parse(sessionStorage.getItem('userInfo'));
			this.userArray.username = restoredSession.cusName
			this.fetchUsreInfo()
		}
	},
  methods: {

		// 拉取用户信息
		fetchUsreInfo() {
			loginApi.getUserInfo(this.userArray).then(res => {
				this.userInfo = res.data.userInfo
				console.log(this.userInfo.id);
				console.log(this.userInfo.nickName);
			})
		},

    jumpPersonInfo() {
      this.$router.push({path: '/user_manage/' + this.userInfo.id + '/personInfo'})
    },

    pubContent() {
      this.$router.push({path: '/pubContent'})
    }


  }



}
</script>

<style lang="css" scoped>

.main-body {
  background: #efefef;
  margin-top: 72px;
  min-height: 1500px;
}
.content-allbody {
  width: 1000px;
  margin: 0 auto;
  padding-top: 350px;
}
.left-content {
  height: 600px;
}
.page-bg-head {
  height: 320px;
  position: absolute;
  width: 100%;
  background-repeat: no-repeat;
}
.page-img {
  height: 320px;
  width: 100%;
}
.left-headpic {
  height: 100px;
  weight: 100px;
  margin: 50px 33%;
}
.img-sty {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.left-info {
  weight: 50px;
  margin:120px 30%
}
.guanzhu {
  float:left;
  padding: 5px 0 0;
  position: absolute;
}
.guanzhu strong {
  font-size: 20px;
    color: #444;
    font-family: Arial;
}
.guanzhu p {
  padding-top: 8px;
  color: #999;
  font-size: 14px;
}
.button-sty {
  margin-left: -3px;
}
</style>

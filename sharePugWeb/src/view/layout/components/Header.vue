<template>
	<div>
		<!-- <headroom> -->
			<div ref="headroom">
				<header id="header" class="header bg-white">
				    <div class="navbar-container">
				        <a class="navbar-logo">
				            <img alt="logo" src="/static/images/logo.png" />
				        </a>
				        <div class="navbar-menu">
									<!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
											<el-menu-item index="1">首页推荐</el-menu-item>
											<el-menu-item index="2">目的地</el-menu-item>
											<el-submenu index="3">
												<template slot="title">主题社区</template>
												<el-menu-item index="3-1">足迹</el-menu-item>
												<el-menu-item index="3-2">攻略</el-menu-item>
												<el-menu-item index="3-3">问答</el-menu-item>
											</el-submenu>
										</el-menu> -->

                    <!-- <router-link id="" to="/blog" @click="indexStyle = 1" :class="{'head-link': indexStyle === 1}">首页</router-link>
                    <router-link id="" to="/archiving" @click="indexStyle = 2" :class="{'head-link': indexStyle === 2}">目的地</router-link>
                    <router-link id="" to="/links" @click="indexStyle = 3" :class="{'head-link': indexStyle === 3}">主题社区</router-link>
                    <router-link id="" to="/about" @click="indexStyle = 4" :class="{'head-link': indexStyle === 4}">关于</router-link> -->
                    <!-- <router-link id="" to="/resume" @click="indexStyle = 5" :class="{'head-link': indexStyle === 5}">XX</router-link>-->


										<Menu mode="horizontal" theme="light" active-name="1">
							        <MenuItem name="1">
							            <router-link id="" to="/index" @click="this.indexStyle = 1" :class="{'head-link': indexStyle === 1}">首页推荐</router-link>
							        </MenuItem>
							        <MenuItem name="2">
							            <router-link id="" to="/destination" @click="this.indexStyle = 2" :class="{'head-link': indexStyle === 1}">目的地</router-link>
							        </MenuItem>
							        <Submenu name="3">
							            <template slot="title">
							                主题社区
							            </template>
													<MenuItem name="3-1" style="float: left; margin-left: 20px;">
														<span @click="jumpSharePug">足迹</span>
														<!-- <router-link id="" to="/sharepug">足迹</router-link> -->
													</MenuItem>
													<MenuItem name="3-2" style="float: left; margin-left:20px;">
														<span @click="jumpSharePug">攻略</span>
													</MenuItem>
													<MenuItem name="3-3" style="float: left; margin-left: 20px;">
														<span @click="jumpSharePug">问答</span>
													</MenuItem>
							        </Submenu>
							    </Menu>
				        </div>
								<div class="navbar-search" onclick="" style="margin-top:-10px;">
				            <span class="icon-search" style="color:#fff;"></span>
				            <form role="search" onsubmit="return false;">
				                <span class="search-box">
				                    <input type="text" id="search-inp" class="input" placeholder="搜索..." maxlength="20"
				                           autocomplete="off"/>
				                </span>
				            </form>
				        </div>
								<!-- 未登录状态 -->
								<div class="navbar-right" v-show="!isLogin">
									<ul class="float-right" >
										<li class="signin float-left"><a href="#" class="signup">
											<router-link id="" to="/register" @click="" :class="">注册</router-link></a>
										</li>
										<li class="signin float-right"><a href="#" class="">
											<router-link id="" to="/login" @click="" :class="">登录</router-link></a></a></li>
									</ul>
								</div>

								<!-- 登录状态 -->
								<div class="navbar-right" v-show="isLogin">
									<ul class="float-right">
										<el-dropdown class="avatar-container right-menu-item" trigger="click">
						        <div class="avatar-wrapper">
						          <img class="user-avatar" :src="this.userInfo.avatar">
											<span class="el-dropdown-link" style="margin-top:-10px;">
										    <!-- {{ userInfo.nickName }} -->
										  </span>
						          <i class="el-icon-caret-bottom"></i>
						        </div>
						        <el-dropdown-menu slot="dropdown" style="width:120px; margin-top:5px;padding-left:10px;">
						          <router-link to="/userPage">
						            <el-dropdown-item style="padding-left:-5px;">
						              个人主页
						            </el-dropdown-item>
						          </router-link>
						          <el-dropdown-item>
						            <span @click="jumpPersonInfo" style="display:block;">修改密码</span>
						          </el-dropdown-item>
											<router-link to="/login">
												<el-dropdown-item divided>
							            <span @click="logout" style="display:block;">退出</span>
							          </el-dropdown-item>
											</router-link>

						        </el-dropdown-menu>
						      </el-dropdown>
									</ul>
								</div>

								    </div>
								</header>
							</div>

		<!-- </headroom> -->

	</div>
</template>
<script>
// import { headroom } from 'vue-headroom'

// export default {
// 	components: {
// 		headroom
// 	}
// }
//
import Headroom from 'headroom.js'
import loginApi from '@/api/login'

export default {
  name: 'Comps-Headroom',
  data() {
    return {
       indexStyle: 1,
			 activeIndex: '1',
			 userArray: {
				 username: null,
			 },
			 dialogVisible: false,
			 userInfo: {},
			 // userid: '',
    }

  },
  props: {
    offset: {
      type: Number,
      default: 0
    },
    tolerance: {
      type: [Object, Number],
      default: 0
    },
    scroller: String,
    initial: {
      type: String,
      default: 'headroom'
    },
    pinned: {
      type: String,
      default: 'headroom--pinned'
    },
    unpinned: {
      type: String,
      default: 'headroom--unpinned'
    },
    top: {
      type: String,
      default: 'headroom--not-top'
    },
    bottom: {
      type: String,
      default: 'headroom--bottom'
    },
    notBottom: {
      type: String,
      default: 'headroom--not-bottom'
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initHeadroom()
    })
  },
	computed: {
		isLogin() {
			if (sessionStorage.getItem("userInfo") != null) {
				this.$store.commit("userStatus", sessionStorage.getItem("userInfo"))
				// return true
			} else {
				this.$store.commit("userStatus", null)
				// return false
			}
			return this.$store.getters.isLogin
			// return false
		}
	},
	created() {
		// this.fetchUsreInfo()
		if (sessionStorage.getItem("userInfo") != null) {
			console.log(sessionStorage.getItem("userInfo"));
			var restoredSession = JSON.parse(sessionStorage.getItem('userInfo'));
			this.userArray.username = restoredSession.cusName
			console.log("XX" + this.userArray.username);
			this.fetchUsreInfo()
		}
	},
  methods: {

		// 拉取用户信息
		fetchUsreInfo() {
			loginApi.getUserInfo(this.userArray).then(res => {
				this.userInfo = res.data.userInfo
				console.log("2-2");
				console.log(this.userInfo.id);
				console.log(this.userInfo.nickName);
			})
		},

		logout() {
			loginApi.logout().then(() => {
				console.log("logout");
				sessionStorage.removeItem("userInfo")
				// sessionStorage.setItem("userInfo", null)
				this.$store.dispatch("setUser", null)
			})
		},
		// 修改密码
		jumpPersonInfo() {
      this.$router.push({path: '/user_manage/' + this.userInfo.id + '/personInfo'})
    },
		// 跳转足迹
		jumpSharePug() {
      this.$router.push({path: '/sharepug'})
    },
    initHeadroom () {
      let _this = this
      let el = this.$refs['headroom']
      let scroller = window
      if (this.scroller && this.scroller.length > 0) {
        scroller = document.querySelector(this.scroller)
      }
      let headroom = new Headroom(el, {
        offset: this.offset,
        tolerance: this.tolerance,
        scroller: scroller,
        classes: {
          initial: this.initial,
          pinned: this.pinned,
          unpinned: this.unpinned,
          top: this.top,
          notTop: this.notTop,
          bottom: this.bottom,
          notBottom: this.notBottom
        },
        onPin () {
          _this.$emit('onPin', el)
        },
        onUnpin () {
          _this.$emit('onUnpin', el)
        },
        onTop () {
          _this.$emit('onTop', el)
        },
        onNotTop () {
          _this.$emit('onNotTop', el)
        },
        onBottom () {
          _this.$emit('onBottom', el)
        },
        onNotBottom () {
          _this.$emit('onNotBottom', el)
        }
      })
      headroom.init()
    }
  }
}

</script>


<style scoped>
	@import '../../../assets/css/style.min.css';
</style>
<style>
.headroom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  animation-duration: .5s;
  animation-fill-mode: both;
  background: white;
  @include after-border();
  &.headroom--pinned {
    animation-name: slideDown;
  }
  &.headroom--unpinned {
    animation-name: slideUp;
  }
}
@keyframes slideDown {
  0% {
    transform:translateY(-44px);
  }
  100% {
    transform:translateY(0);
  }
}
@keyframes slideUp {
  0% {
    transform:translateY(0);
  }
  100% {
    transform:translateY(-44px);
  }
}
.header[data-v-829a447c] {
	background:rgba(78,190,203,.8)!important;
	height:72px;
}
.head-link{
  color:#6fa3ef;
}
.navbar-container[data-v-829a447c] {
	width:1200px;
}
.navbar-menu[data-v-829a447c] {
	float: left;
	margin-left: 130px;
	display: block;
}
.navbar-menu a[data-v-829a447c] {
	font-size: 20px;
	font-weight: bold;
	padding: 24px 20px 22px;
	color: #fff;
}
.navbar-logo img[data-v-829a447c] {
	height: 40px;
}



/* .diysubmenu {
	float:left;
} */
.ivu-menu-light {
	background: rgba(78,190,203,.0)!important;
}
.ivu-menu-horizontal {
	height: 72px;
	line-height: 72px;
}
.ivu-menu {
	font-size: 20px;
	font-weight: bold;
	color: #fff;
	border-bottom: none;
}
.ivu-menu-item {
	font-size: 20px;
	font-weight: bold;
	color: #fff;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    color: #fff;
}
.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
	padding: 0 30px;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
    font-size: 17px!important;
}
.ivu-select-dropdown {
	margin-top:10px;
	min-width: 120px!important;
}
.navbar-right {
	float: right;
	margin-right: 150px;
}
.float-right {
	float: left;
	list-style: none;
}
.signin {
	margin: 23px 0 0;
	height: 20px;
}
.float-left {
	float: left;
}
.signin a {
	float: left;
	color: #fff;
  font-size: 20px;
  line-height: 22px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
	font-weight: bold;
}
.signin a:hover{
	color: #2d8cf0;
}
.signin .signup {
    border-right: 1px solid #FFF;
    padding-right: 10px;
}
ul[data-v-829a447c] {
	margin: 0;
}
/* .user-avatar {
	margin-top: 10px;
	border-radius: 50%;
	width: 50px;
	height:50px;} */

	.avatar-wrapper {
	        cursor: pointer;
	        margin-top: 5px;
	        position: relative;
				}
	        .user-avatar {
	        	margin-top: 10px;
	          width: 40px;
	          height: 40px;
	          border-radius: 10px;
	        }
</style>

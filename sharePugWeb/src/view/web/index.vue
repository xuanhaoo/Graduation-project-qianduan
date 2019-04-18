<template>
  <div class="main-body">
    <div class="lunbo">
      <div class="block">
      <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
      <el-row :gutter="0">
			<el-carousel interval="4000" arrow="always" height="600px">
				<el-carousel-item v-for="item in dataimg" :key="item.index">
					<div class="grid-content">
							<div>
                <div class="button-bg">
                  <el-button  round class="font-button" @click="judgeToPub"><i class="el-icon-edit" style="padding-right:18px;"></i>编写足迹</el-button>
                </div>

								<img :src="item.src">
								<!-- <p class="italictext">{{item.txt}}</p>
								<span class="service">{{item.txt2}}</span>
								<p class="last">{{item.txt3}}</p> -->
							</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</el-row>
    </div>
    </div>
    <!-- 内容区域 -->
    <div class="content-allbody">
      <div class="content-body1">
        <h2>推荐足迹
          <a href="" target="_blank">
            <Icon type="ios-more" size="40"/>more
          </a>
        </h2>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
              <img src="http://photos.breadtrip.com/photo_2019_02_18_86c2497f9ed8f0a4d28907049165055f.jpg?imageView/1/w/640/h/480/q/85" class="image">
              <div style="padding: 14px;">
                <span class="content-title">倾城成都，青城山</span>
                <div class="bottom clearfix" style="padding-top:13px;">
                  <p class="time">成都 chengdu</p>
                </div>
                <div class="bottom clearfix">
                  <time class="time">2019.04.11</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
                <img src="http://photos.breadtrip.com/photo_2019_04_02_18437cef82042b4f36b37fc3466307cd.jpg?imageView/1/w/640/h/480/q/85" class="image">
                <div style="padding: 14px;">
                  <span class="content-title">倾城成都，青城山</span>
                  <div class="bottom clearfix" style="padding-top:13px;">
                    <p class="time">成都 chengdu</p>
                  </div>
                  <div class="bottom clearfix">
                    <time class="time">2019.04.11</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                  </div>
                </div>
              </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
              <img src="http://photos.breadtrip.com/photo_2018_06_10_09fbebd59c80ebc4bd80014d0b6ef27e.jpg?imageView/1/w/640/h/480/q/85" class="image">
              <div style="padding: 14px;">
                <span class="content-title">倾城成都，青城山</span>
                <div class="bottom clearfix" style="padding-top:13px;">
                  <p class="time">成都 chengdu</p>
                </div>
                <div class="bottom clearfix">
                  <time class="time">2019.04.11</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
              <img src="http://photos.breadtrip.com/photo_2017_05_13_2469e64babc8aa4d773ce6145b4a62ee.jpg?imageView/1/w/640/h/480/q/85" class="image">
              <div style="padding: 14px;">
                <span class="content-title">倾城成都，青城山</span>
                <div class="bottom clearfix" style="padding-top:13px;">
                  <p class="time">成都 chengdu</p>
                </div>
                <div class="bottom clearfix">
                  <time class="time">2019.04.11</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

        <!-- 目的地 -->
        <div class="content-body1">
          <h2>出发
            <a href="" target="_blank">
              <Icon type="ios-more" size="40"/>more
            </a>
          </h2>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
                <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
                <div style="" class="destination">
                  <p class="destination-title" style="">成都, chengdu</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
                  <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
                  <div style="" class="destination">
                    <p class="destination-title" style="">北京, beijing</p>
                  </div>
                </el-card>
            </el-col>
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
                <img src="/static/images/avator1.jpg" class="image">
                <div style="" class="destination">
                  <p class="destination-title" style="">深圳, shengzhen</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
                <img src="/static/images/avator1.jpg" class="image">
                <div style="" class="destination">
                  <p class="destination-title" style="">重庆, chongqing</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>


      <!-- <div class="content-body-3">
        下面可以做做作者达人推荐
      </div> -->
    </div>
  </div>
</template>

<script>
export default {

  name: 'Index',
  data() {
			return {
				dataimg: [{
          index: 1,
						src: require('../../assets/images/scorell1.jpeg'),
						// txt: '"Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna."',
						// txt2: '一站式服务',
						// txt3: 'Miami, FL'
					},
					{
            index:2,
						src: require('../../assets/images/scorell2.jpeg'),
						// txt: '"Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor."',
						// txt2: '国际服务',
						// txt3: 'Greensboro, NC'
					},
					{
            index: 3,
						src: require('../../assets/images/scorell3.jpeg'),
						// txt: '"Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna."',
						// txt2: '全网渠道',
						// txt3: 'Charlotte, NC'
					}
				],
			}
		},
    methods: {
      judgeToPub() {
        var flag = this.$store.getters.isLogin
        if (flag == false) {
          this.$alert('你还未登录哦，请登录后操作！', '提示', {
          confirmButtonText: '确定',
        });
        } else {
          this.$router.push({path: '/pubContent'})
        }
      }
    }
}
</script>

<style scoped>

.main-body {
  margin-top: 72px;
  min-height: 1500px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /* .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  } */
  .lunbo {
    padding: 0;
    height: 460px;
    position: absolute;
    width: 100%;
    background-repeat: no-repeat;
  }
  .el-carousel__arrow {
    height:100px;
    width: 40px;
    font-size: 30px;
    border-radius: 0;
  }
  .button-bg {
    width: 600px;
    position: absolute;
    top: 410px;
    left: 50%;
    margin-left: -300px;
    text-align: center;
  }
  .button-bg .font-button {
    padding-left: 30px;
    padding-right: 30px;
    font-size: 25px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  .button-bg .font-button:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  .content-allbody {
    width: 1200px;
    margin: 0 auto;
    padding-top: 600px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    height:260px;
    background-repeat: no-repeat;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .content-title {
    font-size: 18px;
  }
  .content-body1 h2 {
    font-size: 28px;
    color: #5c5c5c;
    height: 40px;
    line-height: 40px;
    margin: 20px 0 33px;
    font-weight: 400;
  }
  .content-body1 h2 a {
    font-size: 25px;
    color: #b0b0b0;
    float: right;
    font-weight: 400;
  }
  .destination {
    position: absolute;
    margin-top: -50px;
    margin-left: 20px;
  }
  .destination-title {
    font-size: 24px;
    color: #fff;
  }
  .card-page {
    cursor: pointer;
  }
</style>

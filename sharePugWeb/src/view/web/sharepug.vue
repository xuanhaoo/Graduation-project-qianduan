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
      <div class="order-type">
        <p><a :class="{'orderTypeInit': true, 'orderType-a': this.orderTypeFlag === 1}" @click="testClick(1)">最新</a> | <a :class="{'orderTypeInit': true, 'orderType-a': this.orderTypeFlag === 2}" @click="testClick(2)">最热</a></p>
      </div>
      <div class="content-body1">
        <div class="article-List">
          <el-row :gutter="20">
            <div class="aticle-item">
              <el-col :span="24">
                <el-card shadow="hover" class="art-item-card">
                  <div class="image">
                    <img src="/static/images/avator1.jpg">
                  </div>
                  <div class="content">
                    <a class="header">大理周边热门旅游地交通攻略</a>
                    <!-- <div class="meta">
                      <span>描述</span>
                    </div> -->
                    <div class="description">
                      <p>天龙八部里的大理国，是多少武侠迷魂牵梦绕的地方！
大理有便利的交通位置，地处滇西十字路口，自古是茶马古道的必经之地，现在亦是泛亚高铁枢纽。
得益于地理位置优势，大理到周边热门旅游地的交通十分方便，以大理为圆点轻松玩转周边热门旅游地！</p>
                    </div>
                    <div class="extra">
                      <Icon type="md-eye" style=""/><span style="margin-right: 10px;"> 299</span> | <Icon type="ios-quote" style="margin-left:10px;"/> 20
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="aticle-item">
              <el-col :span="24">
                <el-card shadow="hover" class="art-item-card">
                  <div class="image">
                    <img src="/static/images/avator1.jpg">
                  </div>
                  <div class="content">
                    <a class="header">大理周边热门旅游地交通攻略</a>
                    <!-- <div class="meta">
                      <span>描述</span>
                    </div> -->
                    <div class="description">
                      <p>天龙八部里的大理国，是多少武侠迷魂牵梦绕的地方！
大理有便利的交通位置，地处滇西十字路口，自古是茶马古道的必经之地，现在亦是泛亚高铁枢纽。
得益于地理位置优势，大理到周边热门旅游地的交通十分方便，以大理为圆点轻松玩转周边热门旅游地！</p>
                    </div>
                    <div class="extra">
                      <Icon type="md-eye" style=""/><span style="margin-right: 10px;"> 299</span> | <Icon type="ios-quote" style="margin-left:10px;"/> 20
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="aticle-item">
              <el-col :span="24">
                <el-card shadow="hover" class="art-item-card">
                  <div class="image">
                    <img src="/static/images/avator1.jpg">
                  </div>
                  <div class="content">
                    <a class="header">大理周边热门旅游地交通攻略</a>
                    <!-- <div class="meta">
                      <span>描述</span>
                    </div> -->
                    <div class="description">
                      <p>天龙八部里的大理国，是多少武侠迷魂牵梦绕的地方！
大理有便利的交通位置，地处滇西十字路口，自古是茶马古道的必经之地，现在亦是泛亚高铁枢纽。
得益于地理位置优势，大理到周边热门旅游地的交通十分方便，以大理为圆点轻松玩转周边热门旅游地！</p>
                    </div>
                    <div class="extra">
                      <Icon type="md-eye" style=""/><span style="margin-right: 10px;"> 299</span> | <Icon type="ios-quote" style="margin-left:10px;"/> 20
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="aticle-item">
              <el-col :span="24">
                <el-card shadow="hover" class="art-item-card">
                  <div class="image">
                    <img src="/static/images/avator1.jpg">
                  </div>
                  <div class="content">
                    <a class="header">大理周边热门旅游地交通攻略</a>
                    <!-- <div class="meta">
                      <span>描述</span>
                    </div> -->
                    <div class="description">
                      <p>天龙八部里的大理国，是多少武侠迷魂牵梦绕的地方！
大理有便利的交通位置，地处滇西十字路口，自古是茶马古道的必经之地，现在亦是泛亚高铁枢纽。
得益于地理位置优势，大理到周边热门旅游地的交通十分方便，以大理为圆点轻松玩转周边热门旅游地！</p>
                    </div>
                    <div class="extra">
                      <Icon type="md-eye" style=""/><span style="margin-right: 10px;"> 299</span> | <Icon type="ios-quote" style="margin-left:10px;"/> 20
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="aticle-item">
              <el-col :span="24">
                <el-card shadow="hover" class="art-item-card">
                  <div class="image">
                    <img src="/static/images/avator1.jpg">
                  </div>
                  <div class="content">
                    <a class="header">大理周边热门旅游地交通攻略</a>
                    <!-- <div class="meta">
                      <span>描述</span>
                    </div> -->
                    <div class="description">
                      <p>天龙八部里的大理国，是多少武侠迷魂牵梦绕的地方！
大理有便利的交通位置，地处滇西十字路口，自古是茶马古道的必经之地，现在亦是泛亚高铁枢纽。
得益于地理位置优势，大理到周边热门旅游地的交通十分方便，以大理为圆点轻松玩转周边热门旅游地！</p>
                    </div>
                    <div class="extra">
                      <Icon type="md-eye" style=""/><span style="margin-right: 10px;"> 299</span> | <Icon type="ios-quote" style="margin-left:10px;"/> 20
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
          </el-row>
        </div>
      </div>
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

        orderTypeFlag: 1,
			}
		},

    methods: {
      testClick(type) {
        if (type == 1) {
          this.orderTypeFlag = 1
          console.log("12356");
        }
        if (type == 2) {
          this.orderTypeFlag = 2
        }
      },

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
  .order-type {
    margin-top: 30px;

  }
  .orderTypeInit{
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    color: #999;
  }
  .order-type p a:hover {
    color: #f90;
  }
  /* .order-type p a:active {
    color: #f90;
  } */
  .orderType-a {
    color: #f90;
  }
  .article-List {
    margin-top: 50px;
  }

  .image {
    width: 200px;
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    display: block;
    float: left;
    margin: 0;
    padding: 0;
    max-height: '';
    -ms-flex-item-align: top;
    align-self: top;
    margin-bottom: 15px;
  }
  .image img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: .125rem;
    border: none;
  }
  .content {
    min-width: 0;
    width: auto;
    float: left;
    margin:0px 50px 50px 50px;
  }
  .header {
    font-size: 21px;
    font-weight: 400;
    color: #333;
  }
  .description {
    font-size: 16px;
    padding-top: 20px;
    width:850px;
    margin: 0;
    color: #666;
    margin-bottom: 20px;
  }
  .extra {
    float: right;
    font-size: 17px;
    color: #8e8b8b;
  }
  .art-item-card {
    margin-top: 30px;
  }
</style>

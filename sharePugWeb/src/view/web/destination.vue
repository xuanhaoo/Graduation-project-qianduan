<template>
  <div class="main-body">
    <div class="lunbo">
      <div class="block">
      <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
      <el-row :gutter="0">
        <div class="" style="margin-left:100px;">
          <div id="myChartMap" :style="{width: '1200px', height: '700px',}"></div>
        </div>

		</el-row>
    </div>
    </div>
    <!-- 内容区域 -->
    <div class="content-allbody">
      <Divider orientation="left" style="font-size: 20px;font-weight:400;"><Icon type="md-paper-plane" />&nbsp;目的地</Divider>
      <!-- <Tag type="dot" color="warning">在上面地图上选择一个您想去的地方</Tag> -->
      <div class="content-body1">

        <!-- <div class="map-sign">
          <span class="icon-sign"></span>
          <span class="text-sign">在上面地图上选择一个您想去的地方</span>
        </div> -->
      <Tag type="dot" color="warning" style="margin-top:38px;">在上面地图上选择一个您想去的地方</Tag>
      <!-- <h3>在上面地图上选择一个您想去的地方</h3> -->
      <h2 class="dest-h2">推荐</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />大熊猫繁殖基地</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>成都 chengdu</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">70%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.0</span>分。
                </p>
                <p>
                  <el-tag type="warning" size="mini">大熊猫</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
              <div style="padding: 14px;">
                <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />都江堰</span>
                <div class="bottom clearfix" style="padding-top:13px;">
                  <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>成都 chengdu</p>
                </div>
              </div>
              <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
              <div style="padding: 14px;">
                <div class="" style="padding-top:1px;">
                  <p class="view-dest">
                    有<span class="view-dest-value">60%</span>的游客的综合口碑评价高于<span class="view-dest-value">3.9</span>分。
                  </p>
                  <p>
                    <el-tag type="warning" size="mini">风景美</el-tag>
                    <el-tag type="warning" size="mini">大好河山</el-tag>
                  </p>
                </div>
              </div>
            </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />西双版纳</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>昆明 kunming</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">68%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.3</span>分。
                </p>
                <p<el-tag type="warning" size="mini">标签</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />故宫</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>北京 beijing</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">85%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.7</span>分。
                </p>
                <p><<el-tag type="warning" size="mini">标签</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>

        <!--  -->
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />圆明园</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>北京 beijing</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">78%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.3</span>分。
                </p>
                <p>
                  <el-tag type="warning" size="mini">标签</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
              <div style="padding: 14px;">
                <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />大理</span>
                <div class="bottom clearfix" style="padding-top:13px;">
                  <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>大理 dali</p>
                </div>
              </div>
              <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
              <div style="padding: 14px;">
                <div class="" style="padding-top:1px;">
                  <p class="view-dest">
                    有<span class="view-dest-value">84%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.2</span>分。
                  </p>
                  <p<el-tag type="warning" size="mini">大熊猫</el-tag>
                  </p>
                </div>
              </div>
            </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />景点X</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>成都 chengdu</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">70%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.0</span>分。
                </p>
                <p<el-tag type="warning" size="mini">大熊猫</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-page">
            <div style="padding: 14px;">
              <span class="content-title"><Icon type="ios-bookmark" style="padding-right:10px;font-size:25px;color:#f90;" />景点X</span>
              <div class="bottom clearfix" style="padding-top:13px;">
                <p class="time"><Icon type="ios-pin-outline" style="padding-right:7px;"/>成都 chengdu</p>
              </div>
            </div>
            <img src="http://breadtripimages.qiniudn.com/photo_2013_03_22_bcce600077562bdf02e61dbaf41401fe.jpg?imageView/1/w/280/h/280/q/75" class="image">
            <div style="padding: 14px;">
              <div class="" style="padding-top:1px;">
                <p class="view-dest">
                  有<span class="view-dest-value">70%</span>的游客的综合口碑评价高于<span class="view-dest-value">4.0</span>分。
                </p>
                <p<el-tag type="warning" size="mini">大熊猫</el-tag>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      </div>
      <div class="content-foot" style="margin-bottom: 50px;">
      </div>
      <div class="" style="text-align: center;padding-bottom: 40px;">
        <el-pagination
        background
        :total="200"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="tablePage.current"
        :page-size="tablePage.size"
        >
        <!--  :total="tablePage.total-->
      </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/map')
require('echarts/map/js/china.js')
require('echarts/map/json/china.json')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/theme/macarons.js')
// import echarts from "echarts";
// import china from 'echarts/map/json/china.json'
// echarts.registerMap('china', china)


// import china from 'echarts/map/json/china.json'
// echarts.registerMap('china', china)

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
        mydata: [
                {name: '北京',value: '100' },{name: '天津',value: this.randomData() },
                {name: '上海',value: this.randomData() },{name: '重庆',value: this.randomData() },
                {name: '河北',value: this.randomData() },{name: '河南',value: this.randomData() },
                {name: '云南',value: this.randomData() },{name: '辽宁',value: this.randomData() },
                {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },
                {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },
                {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },
                {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },
                {name: '湖北',value: this.randomData() },{name: '广西',value: this.randomData() },
                {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },
                {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },
                {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },
                {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },
                {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },
                {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },
                {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },
                {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }
            ],

          tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },

			}
		},

    mounted() {
      this.fetchData()
    },

    methods: {
      //分页
      handleSizeChange(val) {
        this.tablePage.size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.tablePage.current = val;
        this.fetchData();
      },
      fetchData() {
        this.drawLine()
      },

      randomData() {
           return Math.round(Math.random()*500);
      },


      // 地图控件
      drawLine() {
    // this.echartsParameter = this.commentCountData.echartsJsonList
    // console.log(this.echartsParameter);
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('myChartMap'), 'macarons')
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#FFFFFF',
                title: {
                    text: '选择一个您想去的地方',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },

                //左侧小导航图标
                visualMap: {
                    show : true,
                    x: 'left: 300px;',
                    y: 'top: 200px;',
                    splitList: [
                        {start: 500, end:600},{start: 400, end: 500},
                        {start: 300, end: 400},{start: 200, end: 300},
                        {start: 100, end: 200},{start: 0, end: 100},
                    ],
                    color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
                },

                //配置属性
                series: [{
                    name: '数据',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true  //省份名称
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: this.mydata  //数据
                }]

    });
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
    height: 1000px;
    position: absolute;
    width: 100%;
    background-repeat: no-repeat;
  }

  .content-allbody {
    width: 1200px;
    margin: 0 auto;
    padding-top: 720px;
  }
  .content-body1 .dest-h2 {
    font-size: 23px;
    color: #5c5c5c;
    height: 40px;
    line-height: 30px;
    margin: 30px 0 15px;
    font-weight: 400;
  }
  .card-page {
    cursor: pointer;
    margin-top: 20px;
  }
  .view-dest {
    padding-bottom: 13px;
    font-size: 14px;
  }
  .view-dest-value {
    padding-left: 3px;
    padding-right: 3px;
    font-size: 20px;
    color: red;
  }
  .content-title {
    font-size: 18px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .map-sign {
    width: 242px;
    /* height: 22px; */
    line-height: 22px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    /* background: #f7f7f7; */
    font-size: 12px;
    /* vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer; */

    height: 32px;
    line-height: 32px;
    border: 1px solid #e8eaec!important;
    color: #515a6e!important;
    background: #fff!important;
    padding: 0 12px;
  }
  .icon-sign {
    /* display: inline-block */

    width: 12px;
    height: 12px;
    margin-right: 8px;
    border-radius: 50%;
    background: #e8eaec;
    position: relative;
    top: 1px;
    background: #f90;
  }
  .text-sign {
    color: #515a6e;
  }
</style>

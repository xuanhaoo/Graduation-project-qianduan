<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计回复总数</div>
          <count-to :start-val="0" :end-val="this.commentCountData.countNum" :duration="1000" class="card-panel-num"/>
        </div>
      </div>
      <div class="" style="margin-top:60px;margin-left:60px;">
        <el-badge value="new" class="item">
          <i class="el-icon-arrow-down" style="margin-right:10px;"></i>最新评论
        </el-badge>
      </div>
      <div class="block" style="margin-top:50px;margin-left:30px">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in commentList"
            :key="index"
            color="#0bbd87"
            :timestamp="parseTime(item.createDate)">
            {{item.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-left:210px;margin-top:20px;">
      <div id="myChart" :style="{width: '700px', height: '600px'}"></div>
    </el-col>
  </el-row>

  </div>
</template>

<script>

import CountTo from 'vue-count-to'
import commentApi from '@/api/comment'
import { parseTime, resetTemp } from '@/utils'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/theme/macarons.js')
export default {
  components: {
    CountTo
  },
name: 'hello',
data() {
  return {
    commentList: [],
    commentCountData:{},
    echartsParameter: [],
    valueArr: [],
  }
},
created() {

},
mounted() {
  this.fetchData()
  // this.drawLine();
},
methods: {
  parseTime,


  fetchData() {
    commentApi.queryCommentAnalysis().then(res => {
      this.commentList = res.data.commentList
      this.commentCountData = res.data.commentCountData
      // 先渲染数据再渲染图表
      this.drawLine()
    })
  },

  drawLine() {
    this.echartsParameter = this.commentCountData.echartsJsonList
    // console.log(this.echartsParameter);
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('myChart'), 'macarons')
    // 绘制图表
    myChart.setOption({
      title : {
        text: '各主题下的评论数统计',
        subtext: '来自分享足迹数据分析中心',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: this.echartsParameter
    },
    series : [
        {
            name: '回复计数',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: this.echartsParameter,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    });
  }
}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>

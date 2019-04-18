<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-left:10px;margin-top:20px;">
      <div id="myChart" :style="{width: '680px', height: '500px'}"></div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-left:30%;margin-top:20px;">
      <div id="myChart2" :style="{width: '580px', height: '500px'}"></div>
    </el-col>
  </el-row>


  <el-row>
    <el-input style="width:200px;" v-model="tableQuery.spotKeyWord" placeholder="请输入景点名称关键词"></el-input>
    <span style="margin-right: 15px;"></span>
    <el-tooltip class="item" content="搜索" placement="top">
      <el-button icon="el-icon-search" circle @click="fetchTableData()"></el-button>
    </el-tooltip>
  </el-row>

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="设施">
            <span><el-rate
              v-model="props.row.facilities"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.facilities }}</span> -->
          </el-form-item>
          <el-form-item label="服务">
            <span><el-rate
              v-model="props.row.service"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.service }}</span> -->
          </el-form-item>
          <el-form-item label="风景">
            <span><el-rate
              v-model="props.row.scenery"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.scenery }}</span> -->
          </el-form-item>
          <el-form-item label="物业管理">
            <span><el-rate
              v-model="props.row.manage"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.manage }}</span> -->
          </el-form-item>
          <el-form-item label="客流">
            <span><el-rate
              v-model="props.row.passengerFlow"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.passengerFlow }}</span> -->
          </el-form-item>
          <el-form-item label="饮食">
            <span><el-rate
              v-model="props.row.diet"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.diet }}</span> -->
          </el-form-item>
          <el-form-item label="交通">
            <span><el-rate
              v-model="props.row.transport"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></span>
            <!-- <span>{{ props.row.transport }}</span> -->
          </el-form-item>
          <el-form-item label="文字点评">
            <span style="color: #E76514">{{ props.row.comment }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="景点名称"
      prop="spotName">
    </el-table-column>
    <el-table-column
      label="点评用户"
      prop="authorName">
    </el-table-column>
    <el-table-column
      label="点评时间">
      <template slot-scope="scope">
        <span>{{parseTime(scope.row.createDate)}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="300">
      <template slot-scope="scope">
        <el-tooltip content="删除这条点评" placement="top">
          <el-button @click="handleDelete(scope.$index,scope.row)" size="medium" type="danger" icon="el-icon-delete" circle plain></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-bottom: 30px;"></div>
  <!--分页-->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="tablePage.current"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="tablePage.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tablePage.total">
  </el-pagination>
  </div>
</template>

<script>

import CountTo from 'vue-count-to'
import publicPraiseViewApi from '@/api/publicPraiseView'
import debounce from 'lodash/debounce'
import { parseTime, resetTemp } from '@/utils'
import { pageParamNames, confirm, root } from '@/utils/constants'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/radar')
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/theme/macarons.js')
export default {
  components: {
    CountTo
  },
name: 'publicPraiseView',
data() {
  return {


    dateString: [],
    valueArr: [],

    tableLoading:false,
    tableData: [],
    tableQuery:{
      spotKeyWord: null
    },
    tablePage: {
      current: null,
      pages: null,
      size:null,
      total: null
    },
    dataAnalysis: {},
  }
},
created() {
  this.fetchTableData()
},
mounted() {
  this.drawLine()
  this.fetchData();
},
watch:{
  //延时查询
  'tableQuery.spotKeyWord': debounce( function(){
    this.fetchTableData()
  },500)
},//watch
methods: {
  parseTime,

  fetchData() {
    publicPraiseViewApi.praiseViewDataAnalysis().then(res => {
      this.dataAnalysis = res.data.data
      // 先渲染数据再渲染图表
      this.drawLine2()
    })
  },

  drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('myChart'), 'macarons')
    // 绘制图表
    myChart.setOption({
      title: {
        text: '评价指标雷达图'
    },
    tooltip: {},
    legend: {
        // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [4, 5]
           }
        },
        indicator: [
           { name: '综合点评（Comment）', max: 5},
           { name: '服务（Service）', max: 5},
           { name: '风景（Scenery）', max: 5},
           { name: '物业管理（Manage）', max: 5},
           { name: '客流（Passenger Flow）', max: 5},
           { name: '饮食（diet）', max: 5},
           { name: '交通（transport）', max: 5},
           { name: '基础设施（Facilities）', max: 5},
        ]
    },
    series: [{
        name: '指标维度',
        type: 'radar',
        // areaStyle: {normal: {}},
        // data : [
        //     {
        //         value : [4300, 10000, 28000, 35000, 50000, 19000],
        //         name : '预算分配（Allocated Budget）'
        //     },
        //      {
        //         value : [5000, 14000, 28000, 31000, 42000, 21000],
        //         name : '实际开销（Actual Spending）'
        //     }
        // ]
    }]
    });
  },

  drawLine2() {
    this.dateString = this.dataAnalysis.dateString
    this.valueArr = this.dataAnalysis.valueArr
    let myChart2 = echarts.init(document.getElementById('myChart2'), 'macarons')
    myChart2.setOption({
      title: {
        text: '最近7天口碑评价增长情况'
    },
      color: ['#3398DB'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : this.dateString,
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'当天点评数',
              type:'bar',
              barWidth: '60%',
              data: this.valueArr
          }
    ]
    })
  },

  //分页
  handleSizeChange(val) {
    this.tablePage.size = val;
    this.fetchTableData();
  },
  handleCurrentChange(val) {
    this.tablePage.current = val;
    this.fetchTableData();
  },
  //查询
  fetchTableData() {
    this.tableLoading = true
    publicPraiseViewApi.query(this.tableQuery,this.tablePage).then(res => {
      this.tableData = res.data.page.records
      this.tableLoading = false
      //设置后台返回的分页参数
      pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
    })
  },
  //删除
  handleDelete(idx,row) {
    this.$confirm('您确定要永久删除该点评信息', '提示', confirm).then(() => {
      publicPraiseViewApi.delete( {id : row.id} ).then(res => {
        this.tableData.splice(idx, 1)
        --this.tablePage.total
        this.dialogFormVisible = false
        this.$message.success('删除成功')
      })
    }).catch(() => {
      this.$message.info('已取消删除')
    })
  },

}
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-top: 10px;
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .demo-table-expand .el-form-item span {
    margin-top: 7px;
  }
</style>

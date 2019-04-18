<template>
  <div class="app-container">
    <!--下拉框筛选-->
    <el-row>
      <router-link to="/contentOpretion/viewspot" style="float:right">
        <el-button type="text" icon="el-icon-back" >返回景点录入页面</el-button>
      </router-link>
    </el-row>

    <el-row :gutter="12">
      <div class="block" style="margin-top: 20px;" v-for="item in tableComments">
        <el-col :span="8" class="card-panel-col">
                <el-card style="margin-top:10px;margin-left:10px;" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span style="color:#ff9d00">{{ item.authorName }}</span>
                    <el-button type="danger" size="medium" icon="el-icon-delete" circle plain style="float: right;" @click="handleDelete(item.id)"></el-button>
                  </div>

                  <div class="">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="设施">
                        <span><el-rate
                          v-model="item.faciliti"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.facilities }}</span> -->
                      </el-form-item>
                      <el-form-item label="服务">
                        <span><el-rate
                          v-model="item.service"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.service }}</span> -->
                      </el-form-item>
                      <el-form-item label="风景">
                        <span><el-rate
                          v-model="item.scenery"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.scenery }}</span> -->
                      </el-form-item>
                      <el-form-item label="物业管理">
                        <span><el-rate
                          v-model="item.manage"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.manage }}</span> -->
                      </el-form-item>
                      <el-form-item label="客流">
                        <span><el-rate
                          v-model="item.passengerFlow"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.passengerFlow }}</span> -->
                      </el-form-item>
                      <el-form-item label="饮食">
                        <span><el-rate
                          v-model="item.diet"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.diet }}</span> -->
                      </el-form-item>
                      <el-form-item label="交通">
                        <span><el-rate
                          v-model="item.transport"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate></span>
                        <!-- <span>{{ props.row.transport }}</span> -->
                      </el-form-item>
                      <el-form-item label="文字点评">
                        <span style="color: #E76514">{{ item.comment }}</span>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-card>
              </el-col>
      </div>
      </el-row>
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

  import publicPraiseViewApi from '@/api/publicPraiseView'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'PublicPraiseManage',
    data() {
      return {
        tableQuery: {
          spotId: null
        },
        tableComments: [],
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
      }
    },

    created(){
      this.fetchData()
    },

    // watch:{
    //   //延时查询
    //   'tableQuery.subjectId': debounce( function(){
    //     this.fetchData()
    //   },500)
    // },//watch

    methods: {
      parseTime,

      //分页
      handleSizeChange(val) {
        this.tablePage.size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.tablePage.current = val;
        this.fetchData();
      },
      //查询
      fetchData() {
        this.tableQuery.spotId = this.$route.params.spot_id
        publicPraiseViewApi.queryCommentBySpot(this.tableQuery,this.tablePage).then(res => {
          this.tableComments = res.data.page.records
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
        })
      },

      // //删除
      handleDelete(id) {
        this.$confirm('您确定要永久删除该条评论', '提示', confirm).then(() => {
          publicPraiseViewApi.delete( {id : id} ).then(res => {
            this.$message({
      	       message: '成功',
      	       type: 'success',
      	       duration: 1500,
      	       onClose: () => {
      	       this.fetchData()
      	        }
      	     })
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },

    }
  }
</script>

<style>
.item label {
  width: 90px;
  color: #99a9bf;
}
.el-form-item {
  margin-top: 10px;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item span {
  margin-top: 7px;
}
</style>

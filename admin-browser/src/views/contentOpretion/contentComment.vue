<template>
  <div class="app-container">
    <!--下拉框筛选-->
    <el-row>
      <!--角色信息-->
      <span class="page-title">内容标题：<el-tag type="info">{{ this.contentData.title }}</el-tag></span>
      <router-link to="/contentOpretion/content" style="float:right">
        <el-button type="text" icon="el-icon-back" >返回内容管理页面</el-button>
      </router-link>
    </el-row>

    <div class="block" style="margin-top: 20px;">
      <el-timeline>
        <el-timeline-item v-for="item in tableComments" :timestamp="parseTime(item.createDate)">
          <el-card>
            <div class="">
              <h4>{{ item.content }}</h4>
              <p>{{ item.authorName }} 提交于 {{ parseTime(item.createDate) }}</p>
            </div>
            <el-button type="danger" plain size="mini" style="margin-top: -45px;float: right;" @click="handleDelete(item.id)">删除</el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

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

  import contentApi from '@/api/content'
  import commentApi from '@/api/comment'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'ContentManage',
    data() {
      return {
        tableQuery: {
          artId: null
        },
        contentId: null, // 当前内容
        contentData: [],
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
      this.fetchData(),
      this.fetchContent()
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
        this.tableQuery.artId = this.$route.params.content_id
        commentApi.queryByContentId(this.tableQuery,this.tablePage).then(res => {
          this.tableComments = res.data.page.records
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
        })
      },
      // 加载内容信息
      fetchContent() {
        this.contentId = this.$route.params.content_id
        contentApi.queryOneById({contentId: this.contentId}).then(res => {
          this.contentData = res.data.data
        })
      },

      // //删除
      handleDelete(id) {
        this.$confirm('您确定要永久删除该条评论', '提示', confirm).then(() => {
          commentApi.delete( {id : id} ).then(res => {
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

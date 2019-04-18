<template>
  <div class="app-container">
    <!--下拉框筛选-->
    <el-row>
      <el-select v-model="tableQuery.subjectId" placeholder="请选择主题">
        <el-option
          v-for="item in subjectOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="tableQuery.status" placeholder="请选择审核状态">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData()"></el-button>
      </el-tooltip>
    </el-row>
    <!-- 选择根据审核状态来 -->
    <!-- <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">{{textMap.create}}</el-button>
    <div style="margin-bottom: 30px;"></div> -->

    <!--列表-->
    <el-table style="width: 100%;margin-top:20px;"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="Loading"
              border fit highlight-current-row>
      <el-table-column prop="title" label="标题" fixed width="250"></el-table-column>
      <el-table-column prop="authorName" label="作者" width="180"></el-table-column>
      <el-table-column prop="allowComment" label="允许评论" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.allowComment == 1">允许</el-tag>
          <el-tag type="danger" v-else="scope.row.allowComment == 2">禁止评论</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="subjectName" label="所属主题" width="120"></el-table-column>
      <el-table-column prop="bodyId" label="查看内容" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="queryContentBody(scope.$index,scope.row)">点击查看内容</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="commentCount" label="评论回复" width="200">
        <template slot-scope="scope">
          <el-tooltip content="点击查看评论" placement="top">
            <el-button type="info" round size="mini" @click="jumpComment(scope.$index,scope.row)">{{ scope.row.commentCount }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="浏览量" width="200"></el-table-column>
      <el-table-column prop="weight" label="置顶" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.weight == 1">否</el-tag>
          <el-tag type="danger" v-else="scope.row.weight == 2">置顶</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">审核中</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status == 2">审核通过</el-tag>
          <el-tag type="danger" v-else>审核失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="160">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.createDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" width="160">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <!-- <el-tooltip content="编辑" placement="top">
            <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
          </el-tooltip> -->
          <el-tooltip content="置顶" placement="top" v-if="setWeight(scope.row)">
            <el-button @click="handleSetWeight1(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-circle-close" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="取消置顶" placement="top" v-if="!setWeight(scope.row)">
            <el-button @click="handleSetWeight2(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-circle-close" circle plain></el-button>
          </el-tooltip>

          <el-tooltip content="删除" placement="top">
            <el-button @click="handleDelete(scope.$index,scope.row)" size="medium" type="danger" icon="el-icon-delete" circle plain></el-button>
          </el-tooltip>

          <el-button-group v-if="scope.row.status != 2" size="mini">
            <el-button size="mini" type="primary" icon="el-icon-arrow-left" @click="handlePassCheck1(scope.$index,scope.row)">审核通过</el-button>
            <el-button size="mini" type="primary" @click="handlePassCheck2(scope.$index,scope.row)">审核不通过<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
          </el-button-group>
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
    <!--弹出窗口：展示详细内容-->
    <el-dialog title="文章内容" :visible.sync="dialogFormVisible" width="40%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ temp.title }}</span>
          </div>
          <div class="text item">{{ temp.body }}
          </div>
        </el-card>
        </el-form-item>
    </el-dialog>

  </div>
</template>

<script>

  import contentApi from '@/api/content'
  import subjectApi from '@/api/subject'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'ContentManage',
    data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          subjectId: null,
          status: null
        },
        //
        statusOptions: [{
          value: 1,
          label: '审核中'
        }, {
          value: 2,
          label: '审核通过'
        }, {
          value: 3,
          label: '审核失败'
        }],
        subjectOptions: [],
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          title: null,
          body: null
        },
        rules: {

        },
      }
    },

    created(){
      this.fetchData(),
      this.fetchSubject()
    },

    watch:{
      //延时查询
      'tableQuery.subjectId': debounce( function(){
        this.fetchData()
      },500)
    },//watch

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
        this.tableLoading = true
        contentApi.query(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
        })
      },
      fetchSubject() {
        subjectApi.queryAllNoPage().then(res => {
          this.subjectOptions = res.data.data
        })
      },
      // 判断置顶
      setWeight(row) {
        if(row && row.weight === 1) {
          return true;
        }
        return false;
      },
      // liangxuanhao 处理 设置置顶
      handleSetWeight1(idx, row) {
        this.$confirm('您确定要将该内容置顶？', '提示', confirm).then(() => {
          contentApi.setWeight({id: row.id, weightFlag: 2}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("置顶成功")
            this.$message({
	                message: '置顶成功',
	                type: 'success',
	                duration: 1500,
	                onClose: () => {
	                  this.fetchData()
	                }
	              })

          })
        }).catch(() => {
          this.$message.info("已取消操作")
        });
      },
      // 取消置顶
      handleSetWeight2(idx, row) {
        this.$confirm('您确定要取消将该内容置顶？', '提示', confirm).then(() => {
          contentApi.setWeight({id: row.id, weightFlag: 1}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("取消成功")
            this.$message({
	                message: '取消成功',
	                type: 'success',
	                duration: 1500,
	                onClose: () => {
	                  this.fetchData()
	                }
	              })

          })
        }).catch(() => {
          this.$message.info("已取消操作")
        });
      },

      // 通过审核
      handlePassCheck1(idx, row) {
        this.$confirm('您确定要将该内容通过审核？', '提示', confirm).then(() => {
          contentApi.checkContent({id: row.id, checkFlag: 2}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("成功")
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
          this.$message.info("已取消操作")
        });
      },
      // 不通过审核
      handlePassCheck2(idx, row) {
        this.$confirm('您确定要将该内容不通过审核？', '提示', confirm).then(() => {
          contentApi.checkContent({id: row.id, checkFlag: 3}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("成功")
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
          this.$message.info("已取消操作")
        });
      },

      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该内容信息', '提示', confirm).then(() => {
          contentApi.delete( {id : row.id} ).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success('删除成功')
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },

      // 查看文章具体内容
      queryContentBody(idx, row) {
        console.log(row);
        this.dialogFormVisible = true
        this.temp.title = row.title
        contentApi.queryBody( {bodyId: row.bodyId} ).then(res => {
          this.temp.body = res.data.data.contentHtml
        }).catch(() => {
          this.$message.info("发生错误！")
        })
      },
      // 跳转查看评论
      jumpComment(idx, row) {
        this.$router.push({path:'/contentOpretion/content/'+row.id+'/comment'})
      },

      // //新增
      // handleCreate() {
      //   resetTemp(this.temp)
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      //   this.loadAreaTwo()
      // },
      // createData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (!valid) return;
      //     viewSpotApi.add(this.temp).then((res) => {
      //         this.temp.id = res.data.id;//后台传回来新增记录的id
      //         this.temp.createDate = res.data.created;//后台传回来新增记录的时间
      //         this.tableData.unshift(Object.assign({},this.temp))
      //         ++this.tablePage.total
      //         this.dialogFormVisible = false
      //         this.$message.success('添加成功')
      //       })
      //   })
      // },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

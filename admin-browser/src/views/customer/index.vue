<template>
  <div class="app-container">
    <!--查询  -->
    <el-row>
      <el-input style="width:200px;" v-model="tableQuery.cusName" placeholder="用户名"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top" >
        <el-button icon="el-icon-search" circle @click="fetchData(1)" v-perm="'b:user:query'"></el-button>
      </el-tooltip>
    </el-row>
    <!-- <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate" v-perm="'b:user:add'">{{textMap.create}}</el-button>
    <div style="margin-bottom: 30px;"></div> -->
    <!--列表-->
    <el-table style="width: 100%"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="加载中"
              border fit highlight-current-row>
      <el-table-column prop="id" label="用户id"></el-table-column>
      <el-table-column prop="cusName" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == 0">男</el-tag>
          <el-tag type="danger" v-else-if="scope.row.sex == 1">女</el-tag>
          <el-tag type="info" v-else>保密</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="avatar" label="头像"></el-table-column> -->
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="lock" label="状态">
        <template slot-scope="scope">
          <i class="el-icon-error" v-if="scope.row.lock == 1"></i>
          <i class="el-icon-success" v-else></i>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="createDate" label="创建时间">
        <template slot-scope="scope">
          <span v-text="parseTime(scope.row.createDate)"></span>
        </template>
      </el-table-column>
      <!-- 操作选项 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="重置密码" placement="top">
            <el-button @click="handleResetPwd(scope.row)" size="medium" type="info" icon="el-icon-refresh" circle plain></el-button>
          </el-tooltip>
          <!-- 根据锁定状态来显示图标 -->
          <el-tooltip content="锁定" placement="top" v-if="hasLock(scope.row)">
            <el-button @click="handleLockCheck1(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-circle-close" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="解锁" placement="top" v-if="!hasLock(scope.row)">
            <el-button @click="handleLockCheck2(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-circle-check" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
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

  import customerApi from '@/api/customer'
  import {parseTime, resetTemp} from '@/utils'
  import {root,confirm,pageParamNames} from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {

    name: 'CustomerManage',

    data() {
      return {
        parseTime: parseTime,
        tableLoading: false,
        tableData: [],
        tableQuery: {
          cusName: null
        },
        tablePage: {
          current: null,
          pages: null,
          size: null,
          total: null
        },
        dialogFormVisible: false,
      }

    },

    created() {
      this.fetchData()
    },

    watch: {
      //延时查询
      'tableQuery.cusName': debounce(function () {
        this.fetchData()
      }, 500)
    },//watch

    methods: {

      // liangxuanhao 判断锁定状态
      hasLock(row){
        if(row && row.lock === 0) {
          return true;
        }
        return false;
      },

      //分页
      handleSizeChange(val) {
        this.tablePage.size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.tablePage.current = val;
        this.fetchData();
      },

      //liangxuanhao 查询数据，钩子初始化
      fetchData(current) {
        if(current){
          this.tablePage.current = current
        }
        this.tableLoading = true
        customerApi.queryCus(this.tableQuery, this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.page[name]))
        })
      },

      // liangxuanhao 处理锁定
      handleLockCheck1(idx, row) {
        this.$confirm('您确定要锁定该用户？', '提示', confirm).then(() => {
          customerApi.updateCus({id: row.id,lock: 1}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("锁定成功")
            this.$message({
	                message: '锁定成功',
	                type: 'success',
	                duration: 1500,
	                onClose: () => {
	                  this.fetchData()
	                }
	              })

          })
        }).catch(() => {
          this.$message.info("已取消锁定")
        });
      },
      // 解锁
      handleLockCheck2(idx, row) {
        this.$confirm('您确定要解锁该用户？', '提示', confirm).then(() => {
          customerApi.updateCus({id: row.id,lock: 0}).then(res => {
            this.dialogFormVisible = false
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
          this.$message.info("已取消解锁")
        });
      },
      // liangxuanhao 重置密码
      handleResetPwd(row) {
        this.$confirm('您确定要重置该用户的密码（123456）？', '提示', confirm).then(() => {
          customerApi.resetPwd({id: row.id}).then(res => {
            this.dialogFormVisible = false
            this.$message.success("重置成功")
          })
        }).catch(() => {
          this.$message.info("已取消")
        });
      },

     //liangxuanhao 删除
      handleDelete(idx, row) {
        this.$confirm('您确定要永久删除该用户？', '提示', confirm).then(() => {
          customerApi.deleteCus({id: row.id}).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success("删除成功")
          })
        }).catch(() => {
          this.$message.info("已取消删除")
        });

      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .role-checkbox{
    margin-left: 0px;
    margin-right: 15px;
  }
</style>

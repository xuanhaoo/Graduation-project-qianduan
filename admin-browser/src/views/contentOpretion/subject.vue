<template>
  <div class="app-container">
    <!--查询-->
    <el-row>
      <el-input style="width:200px;" v-model="tableQuery.name" placeholder="主题名"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData()"></el-button>
      </el-tooltip>
    </el-row>
    <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">{{textMap.create}}</el-button>
    <div style="margin-bottom: 30px;"></div>
    <!--列表-->
    <el-table style="width: 100%"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="Loading"
              border fit highlight-current-row>
      <el-table-column prop="id" label="id" ></el-table-column>
      <el-table-column prop="name" label="主题名" ></el-table-column>
      <el-table-column prop="desc" label="主题描述" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.createDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="查看主题下内容" placement="top">
            <el-button @click="" size="medium" type="warning" icon="el-icon-view" circle plain></el-button>
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
    <!--弹出窗口：编辑主题-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="150px" >
        <el-form-item label="主题名" prop="name" >
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="主题描述" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="temp.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import subjectApi from '@/api/subject'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'SubjectManage',
    data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          name: null
        },
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          idx: null,//表格的下标
          id: null,
          name: null,
          desc: null,
          createDate: null,
          updateDate: null
        },
        textMap: {
          update: '编辑主题',
          create: '新增主题'
        },
        rules: {
          name: [{ required: true, message: '必填', trigger: 'blur' }]
        },
      }
    },

    created(){
      this.fetchData()
    },

    watch:{
      //延时查询
      'tableQuery.name': debounce( function(){
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
        subjectApi.query(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
        })
      },

      //更新
      handleUpdate(idx,row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.idx = idx
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
            const tempData = Object.assign({}, this.temp)//copy obj
            subjectApi.update(tempData).then(res => {
              tempData.updateDate = res.data.updated
              this.tableData.splice(tempData.idx, 1, tempData)
              this.dialogFormVisible = false
              this.$message.success('更新主题信息成功')
            })
        })
      },

      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该主题？', '提示', confirm).then(() => {
          subjectApi.delete( {id : row.id} ).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success('删除成功')
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },

      //新增
      handleCreate() {
        resetTemp(this.temp)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
          subjectApi.add(this.temp).then((res) => {
              this.temp.id = res.data.id;//后台传回来新增记录的id
              this.temp.createDate = res.data.created;//后台传回来新增记录的时间
              this.tableData.unshift(Object.assign({},this.temp))
              ++this.tablePage.total
              this.dialogFormVisible = false
              this.$message.success('添加成功')
            })
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

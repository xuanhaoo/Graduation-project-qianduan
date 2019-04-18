<template>
  <div class="app-container">
    <!--查询-->
    <!-- <el-row>
      <el-input style="width:200px;" v-model="tableQuery.name" placeholder="主题名"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData()"></el-button>
      </el-tooltip>
    </el-row> -->
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
      <el-table-column prop="type" label="类型" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 1">前台社区</el-tag>
          <el-tag type="info" v-else>后台CMS</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="网站名称" ></el-table-column>
      <el-table-column prop="desc" label="描述" ></el-table-column>
      <el-table-column prop="record" label="备案号" >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.record }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">上线</el-tag>
          <el-tag type="info" v-else>下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
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
        <el-form-item label="网站名" prop="name" >
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择类型">
            <el-option label="前台社区" value="1"></el-option>
            <el-option label="后台CMS" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站描述" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="temp.desc">
          </el-input>
        </el-form-item>
        <el-form-item label="备案号" prop="record" >
          <el-input v-model="temp.record"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="temp.status">
            <el-radio label="1">上线</el-radio>
            <el-radio label="2">下线</el-radio>
          </el-radio-group>
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

  import websetApi from '@/api/webset'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'WebSetManage',
    data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          type: null
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
          type: null,
          name: null,
          desc: null,
          record: null,
          status: null
        },
        textMap: {
          update: '编辑配置',
          create: '新增配置'
        },
        rules: {
          name: [{ required: true, message: '必填', trigger: 'blur' }],
          type: [{ required: true, message: '必选', trigger: 'blur' }],
          status: [{ required: true, message: '必选', trigger: 'blur' }]
        },
      }
    },

    created(){
      this.fetchData()
    },

    watch:{
      //延时查询
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
        websetApi.query(this.tableQuery,this.tablePage).then(res => {
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
            websetApi.update(tempData).then(res => {
              this.tableData.splice(tempData.idx, 1, tempData)
              this.dialogFormVisible = false
              this.$message.success('更新信息成功')
            })
        })
      },

      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该配置项？', '提示', confirm).then(() => {
          websetApi.delete( {id : row.id} ).then(res => {
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
          websetApi.add(this.temp).then((res) => {
              this.temp.id = res.data.id;//后台传回来新增记录的id
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

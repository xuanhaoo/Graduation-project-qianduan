<template>
  <div class="app-container">
    <!--查询-->
    <el-row>
      <el-input style="width:200px;" v-model="tableQuery.name" placeholder="景点名"></el-input>
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
      <el-table-column prop="name" label="景点名称" fixed width="150"></el-table-column>
      <el-table-column prop="info" label="景点介绍" width="250"></el-table-column>
      <el-table-column prop="phone" label="景点联系电话" width="200"></el-table-column>
      <el-table-column prop="viewWeb" label="景点网站" width="120"></el-table-column>
      <el-table-column prop="spendTime" label="花费时间" width="120"></el-table-column>
      <el-table-column prop="transport" label="交通方案" width="200"></el-table-column>
      <el-table-column prop="openTime" label="开放时间" width="200"></el-table-column>
      <el-table-column prop="ticket" label="门票" width="150"></el-table-column>
      <el-table-column prop="areaTwoName" label="地区" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.areaTwoName}}-{{scope.row.areaThreeName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" width="120">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="170">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="景点口碑评价" placement="top">
            <el-button @click="jumpPublicComment(scope.$index, scope.row)" size="medium" type="warning" icon="el-icon-view" circle plain></el-button>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="150px" >
        <el-form-item label="景点名" prop="name" >
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="景点描述" prop="info">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="temp.info">
          </el-input>
        </el-form-item>
        <el-form-item label="景点图片" prop="picture">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="此处请填入图片链接地址，并以英文逗号 ’,‘ 分割" v-model="temp.picture">
          </el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" >
          <el-input v-model="temp.phone" placeholder="多个联系方式请用逗号','隔开"></el-input>
        </el-form-item>
        <el-form-item label="官方网站" prop="viewWeb" >
          <el-input v-model="temp.viewWeb"></el-input>
        </el-form-item>
        <el-form-item label="时间计划" prop="spendTime" >
          <el-input v-model="temp.spendTime"></el-input>
        </el-form-item>
        <el-form-item label="交通方案" prop="transport" >
          <el-input v-model="temp.transport"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="openTime" >
          <el-input v-model="temp.openTime"></el-input>
        </el-form-item>
        <el-form-item label="票价指导" prop="ticket" >
          <el-input v-model="temp.ticket"></el-input>
        </el-form-item>

        <!--  级联选择-->
        <el-form-item label="省级区域" prop="areaTypeTwo" >
          <el-select v-model="temp.areaTypeTwo" placeholder="请选择" @change="loadAreaThree">
            <el-option
              v-for="item1 in areaTypeTwoData"
              :key="item1.id"
              :label="item1.name"
              :value="item1.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市级区域" prop="areaTypeThree" >
          <el-select v-model="temp.areaTypeThree" placeholder="请选择">
            <el-option
              v-for="item2 in areaTypeThreeData"
              :key="item2.id"
              :label="item2.name"
              :value="item2.id">
            </el-option>
          </el-select>
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

  import viewSpotApi from '@/api/viewSpot'
  import areaApi from '@/api/area'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'ViewSpotManage',
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
          info: null,
          picture: null,
          phone: null,
          viewWeb: null,
          spendTime: null,
          transport: null,
          openTime: null,
          ticket: null,
          areaTypeOne: null,
          areaTypeTwo: null,
          areaTypeThree: null,
          createDate: null,
          updateDate: null
        },
        // 一级（省级）地址信息
        areaTypeTwoData:[],
        areaParent: {
          parentId: null
        },
        // 二级 区域信息
        areaTypeThreeData:[],
        areaTwoValue: null,
        areaThreeValue: null,
        textMap: {
          update: '编辑景点',
          create: '新增景点'
        },
        rules: {
          name: [{ required: true, message: '必填', trigger: 'blur' }],
          info: [{ required: true, message: '必填', trigger: 'blur' }],
          picture: [{ required: true, message: '必填', trigger: 'blur' }],
          phone: [{ required: true, message: '必填', trigger: 'blur' }],
          spendTime: [{ required: true, message: '必填', trigger: 'blur' }],
          transport: [{ required: true, message: '必填', trigger: 'blur' }],
          opendTime: [{ required: true, message: '必填', trigger: 'blur' }],
          ticket: [{ required: true, message: '必填', trigger: 'blur' }],
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
        viewSpotApi.query(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,res.data.page[name]))
        })
      },

      // 加载一级区域
      loadAreaTwo() {
        areaApi.queryAllListNoPageTwo().then(res => {
          this.areaTypeTwoData = res.data.data
          // console.log(this.areaTypeTwoData)
        })
      },
      // 加载二级区域
      loadAreaThree(parentId) {
        this.areaParent.parentId = parentId
        areaApi.queryAllListNoPageThree(this.areaParent).then(res => {
          this.areaTypeThreeData = res.data.data
        })
      },

      //更新
      handleUpdate(idx,row) {
        this.loadAreaTwo()  // 预加载省级数据
        this.temp = Object.assign({}, row) // copy obj
        this.temp.idx = idx
        // 设置勾选代码
        // this.areaTwoValue = row.areaTypeTwo  // 设置已有的值
        // this.areaThreeValue = row.areaTypeThree
        this.loadAreaThree(this.temp.areaTypeTwo)   // 传参加载市级数据
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
            const tempData = Object.assign({}, this.temp)//copy obj
            viewSpotApi.update(tempData).then(res => {
              tempData.updateDate = res.data.updated
              this.tableData.splice(tempData.idx, 1, tempData)
              this.dialogFormVisible = false
              this.$message.success('更新景点信息成功')
            })
        })
      },

      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该景点信息', '提示', confirm).then(() => {
          viewSpotApi.delete( {id : row.id} ).then(res => {
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
        this.loadAreaTwo()
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
          viewSpotApi.add(this.temp).then((res) => {
              this.temp.id = res.data.id;//后台传回来新增记录的id
              this.temp.createDate = res.data.created;//后台传回来新增记录的时间
              this.tableData.unshift(Object.assign({},this.temp))
              ++this.tablePage.total
              this.dialogFormVisible = false
              this.$message.success('添加成功')
            })
        })
      },
      // 跳转查看评论
      jumpPublicComment(idx, row) {
        this.$router.push({path:'/contentOpretion/viewspot/'+row.id+'/publicPraise'})
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

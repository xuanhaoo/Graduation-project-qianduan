<template>
	<div class="">
				<div class="main-content index-page clearfix">
				<div class="categoryChoice">
					<div class="button-team">
						<el-row>
							<el-button  round :class="{'button-el':isA, 'active':-1 == itemIndex}" style="line-height: 0;" @click="viewCategoryArticle(0, -1)">所有分类</el-button>
								<el-button  v-for="(cate, index) in categorys" round :class="{'button-el':isA, 'active': index == itemIndex}" style="line-height: 0;" @click="viewCategoryArticle(cate.id, index)">{{ cate.categoryName }}</el-button>

						</el-row>
					</div>

				</div>
				    <div class="post-lists">
				     	<div class="articleItem" v-for="item in articles">
				     		<div class="title">
				     			<h2><a @click="viewArticleItem(item.id)" class="articleFind">{{ item.title }}</a></h2>
				     		</div>
				     		<div class="summary"><a @click="viewArticleItem(item.id)" class="articleFind">{{ item.summary }}</a></div>
				     		<div class="category">分类: {{ item.category.categoryName }}</div>
				     		<div class="datetime">
				     			<div class="todevide">|</div>
				     			{{ item.createDate | timeFilter }}
				     		</div>
				     		<div class="articleDived"></div>
				     	</div>
				    </div>

				    <div class="pagination-container">
				      <el-pagination background layout="prev, pager, next" :total="total" class="pageItem">
				      </el-pagination>
				    </div>
				</div>


	</div>
</template>

<script>
import { getArticles, getCategory } from '@/api/article'
import moment from 'moment'
  export default {
    data() {
      return {
      	listQuery: {
      		page: 1,
      		limit: 10,
      		categoryId: 0
      	},
      	total: null,
      	isA: true,
      	isB: false,
      	itemIndex: -1,
      	articles: [],
      	categorys: [],

      }
    },
    filters: {
    	//格式化时间成美式时间
    	timeFilter(dateTime) {
    		let time = moment(dateTime).format("ll")
    		return time
    	}
    },
    created() {
    	this.getCategoryList()
    	this.getArticleList()
    },
    methods: {
    	//获取已发布的文章列表
    	getArticleList() {
    		getArticles(this.listQuery).then(response => {
    		this.articles = response.data.list
    		this.total = response.data.totalCount
    	})
    	},
    	getCategoryList() {
    		getCategory().then(response => {
    			this.categorys = response.data
    		})
    	},
    	// 查看文章的详细信息
    	viewArticleItem(id) {
    		this.$router.push({ path: `/article/${id}` })

    	},
    	viewCategoryArticle(categoryId, index) {
    		// this.clickFalse2 = true
    		this.itemIndex = index
    		this.listQuery.categoryId = categoryId
    		this.getArticleList()

    	}

    }
  }
</script>
<style>
	@import '../assets/css/style.min.css';
</style>
<style type="text/css">

	/*.el-container{
		max-width: 940px;
		margin:0 auto;
	}*/
	body{
		/*font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;*/
	}
	.main-content {
		/*font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 330;*/
	}
	.index-page .categoryChoice{

		padding-top: 0.8em;
		padding-bottom: 1.2em;
    	border-bottom: 0.8px solid #00000040;
	}
	.button-el.active{
		line-height: 0;
		/*border: 1px solid #dcdfe6;
		background-color: #222;
    	color: #f9f9f9;
	    margin: 0;
	    padding: 12px 20px;
	    font-size: 14px;
	    border-radius: 4px;*/
	    background-color: #686d76;
    	color: #f9f9f9;
    	font-family: sans-serif;
    	border: 1px solid #dcdfe6;
	}

	.button-el{
		line-height: 0;
    	color: #000;
    	border: 1px solid #dcdfe6;
    	/*font-family: sans-serif;   */
	}
	.button-el:hover{
		line-height: 0;
		background-color: #686d76;
    	color: #f9f9f9;
    	/*font-family: sans-serif;*/
    	border: 1px solid #dcdfe6;
	}

	.button-team{
		padding-left: 10px;
	}
	.summary {
		font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 330;
		font-size: 16px;
	}
	.articleItem{
		margin: 25px 15px 35px 15px;
	    line-height: 25px;
	    min-height: 50px;


	}
	.articleDived{
		margin:30px auto 0 auto;
		width: 15%;
		border-bottom: 1px dashed #dcdfe6;

	}
	h2 {
	    display: block;
	    font-size: 1.5em;
	    -webkit-margin-before: 0.83em;
	    -webkit-margin-after: 0.83em;
	    -webkit-margin-start: 0px;
	    -webkit-margin-end: 0px;
	    font-weight: bold;
	    letter-spacing: 0.03em;
	}
	.title h2{
	    margin: 8px 0 12px;
	    font-size: 24px;
	    font-weight: bold;
	    -webkit-font-smoothing: antialiased;
	    font-family: "Georgia","Xin Gothic","PingFang SC","Hiragino Sans GB","Droid Sans Fallback","Microsoft YaHei",sans-serif;
		color: #222223;
	}
	.category{
		float: left;
		margin-right: 5px;
		color: rgba(0,0,0,.5);
    	font-size: 13px;
	}
	.todevide{
		float: left;
		margin-right: 5px;
	}
	.datetime{
		float: left;
		/*margin-left: 5px;*/
		color: rgba(0,0,0,.5);
    	font-size: 13px;
	}
	.pagination-container{
		margin:30px auto 20px auto;
		/*width: 15%;*/
	}
	.pageItem{
		padding: 20px 0;
	    text-align: center;
	    font-size: 15px;
	    font-family: "Avenir Next","Avenir","Helvetica Neue",sans-serif;
	    /*font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;*/
		/*font-weight: 330;*/
	}
	.articleItem a:hover{
		cursor: pointer;
		color: #555555d6;
		text-decoration-color: rgba(0,0,0,0.9);;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active{
		background-color: #75797d;
	}
	.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
		border-radius: 50%;
	}



</style>

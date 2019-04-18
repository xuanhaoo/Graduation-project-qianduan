<template>
	<article class="main-content post-page" itemscope="" itemtype="http://schema.org/Article">
    <div class="post-header">
        <h1 class="article-title">
            {{ articleData.title }}
        </h1>
        <div class="post-data">
        	<div class="article-date">
        		<time>{{ articleData.createDate | timeFilter }}</time>
        	</div>
            <div class="article-author">
            	<div class="todevide">/</div>
            	{{ articleData.nickname }}
            </div>
        </div>
    </div>
    <div id="post-content" class="post-content" itemprop="articleBody">
        <div class="article-category">
        	<div class="article-categoryInfo">
        		分类：{{ articleData.category.categoryName }}
        		
        	</div>
            <div class="article-tags">
            	<div class="todevide2">/</div>
				标签: &nbsp;<button class="tags-btn" v-for="tagItem in tagsList">{{ tagItem.tagName }}</button>
			</div>
        </div>
        <div class="article-content" v-html="articleData.articleBody.contentHtml">
      
        </div>
        <p class="post-info">
          	
        </p>
    </div>
</article>
</template>


<script>
	
	import { queryObject, queryTags } from '@/api/article'
	import moment from 'moment'

	export default {
		data() {
			return {
				//articleId: 0,
				articleData: {
					id: 0,
					title: '',
					allowComment: 0,
					summary: '',
					nickname: '',
					createDate: '',
					viewCounts: '',
					commentCounts: 0,
					articleBody: {
						id: 0,
						content: '',
						contentHtml: ''
					},
					category: {
						id: 0,
						categoryName: ''
					},
				},
				tagsList: []
			}
		},

		created() {
			this.getArticle()

		},
		filters: {
	    	//格式化时间成美式时间
	    	timeFilter(dateTime) {
	    		let time = moment(dateTime).format("ll")
	    		return time
    		}
    	},
		methods: {
			//获取文章
			getArticle() {
				let me = this
				let articleId = this.$route.params.id
				//加载文章
				queryObject(articleId).then(response => {
					me.articleData.id = response.data.id
					me.articleData.title = response.data.title
					me.articleData.allowComment = response.data.allowComment
					me.articleData.summary = response.data.summary
					me.articleData.nickname = response.data.nickname
					me.articleData.createDate = response.data.createDate
					me.articleData.viewCounts = response.data.viewCounts
					me.articleData.commentCounts = response.data.commentCounts
					me.articleData.articleBody.contentHtml = response.data.articleBody.contentHtml
					me.articleData.category.categoryName = response.data.category.categoryName

				}).catch(error => {
					if(error !== 'error'){
		  				that.$message({type: 'error', message: '文章加载失败咯~~~',showClose: true})
		  			}
				})
				//获取标签集
				queryTags(articleId).then(response2 => {
					me.tagsList = response2.data
				}).catch(error => {
					if(error !== 'error'){
		  				that.$message({type: 'error', message: '标签加载失败咯~~~',showClose: true})
		  			}
				})

			}
		},
		watch: {
			'$route': 'getArticle'
		}
	}


</script>
<style>
	@import '../../assets/css/style.min.css';
</style>
<style type="text/css">
	body{
		/*font-family: "Helvetica Neue","Helvetica","Arial","PingFang SC","Hiragino Sans GB","Droid Sans Fallback","Microsoft YaHei",sans-serif;*/
	}
	.main-content {
		font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 370;
	}
	.post-header h1{
		font-family: "Georgia","Xin Gothic","PingFang SC","Hiragino Sans GB","Droid Sans Fallback","Microsoft YaHei",sans-serif;
    	color: #222223;
    	font-weight: bold;
	}
	.post-data{
		margin-top: 12px;
	}
	.article-title{
		margin: 0;
	    padding: .6em 0;
	    font-size: 32px;
	}
	.article-date{
		float: left;
		font-size: 13px;
	}
	.article-author{
		float: left;
		font-size: 13px;
		color: #111;
	}
	.todevide{
		float: left;
		margin: 0 8px;
	}
	.article-category{
		padding: 40px 0 0 0;
		font-size: 13px;
	}
	.article-categoryInfo{
		float: left;
		/*padding-top: 3px;*/
		padding-left: 5px;
		color: #5f5f5f;
	}
	.article-tags{
		float: left;
	}
	.todevide2{
		float: left;
		margin: 0px 8px;
	}
	.tags-btn{
		min-width: 50px;
		color: #fff;
		border: 1px solid #6fa3ef;
	    border-radius: 15px;
	    background: #6fa3ef;
	    font-size: 10px;
	    font-weight: 400;
	    display: inline-block;
	    margin-left: 3px;
	    /*margin: 4px 8px 0 0;*/
	    padding: 0 10px;
	    -webkit-transition-duration: .4s;
	    transition-duration: .4s;
	    text-decoration: none!important;
	    letter-spacing: 0;

	}
	.post-info[data-v-393f8e9e]{
		margin-top: 38px;
	}
	.article-content{
		margin-top: 38px;
	    padding-top: 2em;
	    border-top: 1px solid #e0e0e0;
	}
</style>
<template>
	<div>
		<div class="main-body">
			<div class="me-time-line">
				<timeline>
					<div v-for="item1 in articlesList">
						<timeline-title>{{ item1.artYear }}</timeline-title>
				    	<timeline-item color="#9dd8e0" v-for="item2 in item1.articles" class="singleArt">
				    		<a @click="viewArticleItem(item2.id)">{{ item2.createDate | timeFilter }} -- {{ item2.title }}</a>
				    	</timeline-item>
				    	<timeline-item :hollow="true"></timeline-item>
					</div>
				 </timeline>
			</div>
		
		</div>
	</div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import { accordingArchive } from '@/api/article'
import moment from 'moment'

export default {
	data() {
		return {
			articlesList: []

		}
	},
  	components: {
	    Timeline,
	    TimelineItem,
	    TimelineTitle
  	},
  	filters: {
    	//格式化时间成美式时间
    	timeFilter(dateTime) {
    		let time = moment(dateTime).format("ll")
    		return time
    	}
    },
  	created() {
  		this.getArticleByDate()
  	},
  	methods: {
  		//获取归档文章
  		getArticleByDate() {
  			accordingArchive().then(response => {
  				this.articlesList = response.data
  			})
  		},
  		// 查看文章的详细信息
    	viewArticleItem(id) {
    		this.$router.push({ path: `/article/${id}` })

    	},

  	}
}
</script>

<style scoped>
	/*@import '../assets/css/style.min.css';*/
</style>
<style type="text/css">
	body {
    /*font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;*/
    /*font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;*/
    font-size: 14px;
    line-height: 1.8;
    margin: 0 auto;
    color: #313131;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
	.main-body{
		font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 330;
		max-width: 940px;
		margin: 0 auto;
		padding: 129px 20px 70px 0px;
	}
	.me-time-line{
		padding: 10px 50px 10px 29px;
	}
	.singleArt a:hover{
		cursor: pointer;
		text-decoration-color: rgba(0,0,0,0.9);
	}
</style>
<template>
	<div>
		<div class="main-body">
			<div class="content-body">
				<div class="links-body">
					<div class="link-title"><i class="fa fa-link"></i>&nbsp;资源链接</div>
					<div class="content-style">
	      				<div class="linkBody-style" v-html="linksBody"></div>
	        		</div>
				</div>
				<div class="warning">
					<div class="link-title">
						<i class="fa fa-tag"></i>&nbsp;友链须知
					</div>
					<div class="content-style">
						<div class="tip">
							<ul>
								<li>确定贵站正在运行中</li>
								<li>爱好分享、爱好交流</li>
								
							</ul>
						</div>
					</div>
				</div>
				
			</div>					
		</div>
	</div>
</template>

<script>
	import { getLinks } from '@/api/linksAndAbout'

	export default {
		data() {
			return {
				linksBody: ''
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getLinks().then(response => {
					this.linksBody = response.data.contentHtml
				})
			}
		}

	}
</script>
<style>
	@import '../assets/css/style.min.css';
	@import '../assets/css/font-awesome.min.css';
</style>

<style type="text/css">
	body {
		/*font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;*/
	}
	.main-body{
		font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 330;
		max-width: 940px;
		margin: 0 auto;
		padding: 129px 20px 70px 0px;
	}
	.link-title {
		font-style:italic;
		font-size: 16px;
		color: rgba(4, 176, 245, 0.91); 
	}
	.content-body {
		padding: 10px 50px 10px 29px;
	}
	.content-style {
		margin-top: 10px;
		border-radius: 5px;
		background: #f7f7f7!important;
	}
	.linkBody-style {
		padding-top: 1px;
		padding-bottom: 1px;
	}
	.content-style .tip{
		padding: 4px 16px;
	    background: #f7f7f7!important;
	    border-radius: 4px;
	    border-left: 5px solid #50bfff;
	    margin: 10px 0;
	}
	.warning {
		margin-top: 30px;
	}
	.content-style .tip p{
		font-size: 14px;
	    color: #5e6d82;
	    line-height: 1.5em;
	}
	.content-style a {
		color: #50bfff;
		border-bottom: 1px #0099CC dotted;

	}
</style>
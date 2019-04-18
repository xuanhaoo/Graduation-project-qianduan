<template>
	<div>
		<div class="main-body">
			<div class="content-body">
				<div class="about-body">
					<div>
						<img src="../assets/images/about.png" class="img-responsive">
					</div>
					<div class="about-title"><span class="title-style">About me</span></div>
					<div class="" v-html="linksBody">

	        		</div>

				</div>

				<div class="about-body">

					<div class="about-title"><span class="title-style">About Web</span></div>
					<div class="" >
	      				<p class="about-p">Welcome to Anhao's Blog! 该博客是我的个人站点，在这里我将自己的学习感受，以及收获分享出来。只希望在某年某天您看到了，对您能有一点点的帮助。我亦心满足亦。</p>
	      				<p class="about-p">本站诞生于2018-07-05，后端基于Springboot+Mybatis，前端基于ElementUI+Vuejs，前端页面参考了<a href="http://13blog.site/" class="link-href" target="_blank">13Blog</a>，在此致以真诚的感谢！由于开发时的技术能力正在学习进步，或多或少有一些bug和功能不足，后续闲暇之时我也会继续完善。</p>
	      				<p class="about-p">干净使然，像心称意。</p>
	        		</div>
				</div>

				<div class="about-body">

					<div class="about-title"><span class="title-style">Innermost words</span></div>
					<div class="" >
						<div class="words-style">
							<pre>
								<code>
也许我们就在某时某地  　　　　
曾经擦肩而过  　　
而彼此，却浑然不觉
但从此刻开始，从您踏入Anhao's Blog开始  　　
我们的生活便有了交集  　　
　　
也许您在这里能看到的只是
中国千千万万程序员中最普通的一员  　　
所写下的最蹩足的文字
但我相信它们真实地记载了
我的生活，我的成长  　　
　　  　　
正如      　
伯乐得见绝世好马，子期终遇伯牙佳音
良驹美景， 高山流水   　　
我真心希望 您就是 我的伯乐，我的子期
　　      　
One More Thing
其实是一句话，想分享给您   　　
不论您走到哪儿，在做什么
都请勿忘初心
　　 　
In the end　
您可以在QQ，Email，新浪微博 或者 Github上找到我
也可以在这里逛一逛
谢谢您的来访
								</code>
							</pre>

						</div>

	        		</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { getAbout } from '@/api/linksAndAbout'

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
				getAbout().then(response => {
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
	.about-body a {
		color: #50bfff;
		border-bottom: 1px #0099CC dotted;

	}
	.main-body{
		font-family: "微软雅黑", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 330;
		max-width: 940px;
		margin: 0 auto;
		padding: 129px 20px 70px 0px;
	}

	.about-title {
		margin-top: 15px;
		font-style:italic;
		font-size: 20px;
		color: #696969;
		border-left: 5px solid #50bfff;
	}
	.title-style {
		margin-left: 15px;
	}
	.img-responsive {
		border-radius: 5px;
		display: inline-block;
		height: auto;
		max-width: 100%;
	}
	.content-body {
		padding: 10px 50px 10px 29px;
	}
	.words-style pre {

	}
	.words-style pre code{
		font: 12px/1.5 Tahoma,Helvetica,Arial,STKaiti,sans-serif;
		font-size: 18px;
	}
	.about-p {
		text-indent: 2em;
	}
	/*.link-href {
		color: #50bfff;
		border-bottom: 1px #0099CC dotted;

	}*/
	@media screen and (max-width: 901px) {
		.main-body{
			max-width: 940px;
			margin: 0 auto;
			padding: 50px 20px 70px 0px;
	}
	}
</style>

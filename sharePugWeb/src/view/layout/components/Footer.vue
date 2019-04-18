<template>
	<!-- <el-footer class="me-area">
		<div class="me-footer">
			<span>&copy; Copyright 2018
			<router-link to="/" class="me-login-design-color">Anhao</router-link>
			</span>
		</div>
	</el-footer> -->



   <footer class="footer">
    <div class="footer-social">
      <div class="footer-container clearfix">

        </div>
    </div>
    <div class="footer-meta">
        <div class="footer-container">
          <div class="aboutwebdata">
            <div class="float-left">
              logo+这里写备案信息
            </div>
            <div class="float-right">
              这里写导航栏
            </div>
          </div>
          <div class="somelinks">
            <p class="ulp" style="margin-top:8px;margin-bottom:0px;">官方入口</p>
            <p><ul class="ulp float-left" style="margin-top:-10px;margin-bottom:15px;">
              <li class="linkli float-left"><a href="#">携程旅游网</a></li>
              <li class="linkli float-left"><a href="#">马蜂窝网</a></li>
              <li class="linkli float-left"><a href="#">面包旅行</a></li>
            </ul>
            </p>
            <br>
            <p class="ulp float-left" style="magin-top:-40px;margin-left:-240px;">友情链接</p>
            <p><ul class="ulp float-left" style="margin-top:35px;margin-left:-55px;">
              <li class="linkli float-left"><a href="#">携程旅游网</a></li>
              <li class="linkli float-left"><a href="#">马蜂窝网</a></li>
              <li class="linkli float-left"><a href="#">面包旅行</a></li>
            </ul>
            </p>
          </div>

            <!-- <div class="meta-item meta-copyright">
                <div class="meta-copyright-info">
                    <div class="info-text">

                    </div>
                </div>
            </div> -->

        </div>
    </div>
</footer>


</template>

<script>
export default {
  name: 'Footer',
  data (){
  	return {
  	}
  },
  created: function () {

  }
}
</script>
<style scoped>
  @import '../../../assets/css/style.min.css';
</style>

<style>

/*.el-footer {
  min-width: 100%;
  box-shadow: 0 -2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
  position:absolute;
  bottom:0;
  left:0;
  z-index: 1024;
  background-color: #fff!important;
}
.me-footer{
  text-align: center;
  line-height: 60px;
  font-family: sans-serif;
  font-size: 16px;

}
.me-login-design-color{
  color: #75726c !important;
}*/
.footer[data-v-c4ff0c60] {
    position: relative;
    z-index: 1;
    margin-top: 0;
    /* padding-bottom: 0px; */
    background: #4ABDCC!important;
}
.footer-meta[data-v-1260502b] {
     padding: 0 0 0 0;
}
.footer-meta[data-v-c4ff0c60] {
  background: #4ABDCC!important;
}
.footer-meta .footer-container[data-v-1260502b] {
      height: 60px;
}
.footer-social[data-v-1260502b] {
    border-top: 1px solid rgba(184,197,214,.2);
    border-bottom: 0px;
}
.aboutwebdata {
  height:80px;
  /* color: #fff; */
}
.webdata {
  list-style: none;
}
.somelinks {
  border-top: 0.8px solid #00000040;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.linkli {
  list-style: none;
  padding-left: 19px;
}



</style>

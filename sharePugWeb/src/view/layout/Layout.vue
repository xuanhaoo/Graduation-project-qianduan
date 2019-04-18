<template>
	<div id="home">
      <!-- <base-header :activeIndex="activeIndex"></base-header> -->
      <base-header></base-header>
      <router-view/>
      <base-footer></base-footer>
	</div>
</template>

<script>
	import Header from './components/Header'
  import Footer from './components/Footer'

export default {
  name: 'Layout',
  data (){
  	return {
  			//activeIndex: '/',
  			//footerShow:true
  	}
  },
  components:{
  	'base-header':Header,
  	'base-footer':Footer
  },

}



</script>

<style>

/*.me-container{
  max-width: 940px;
  margin: 120px auto 140px auto;
  background-color: #f7f7f7!important;
}*/

</style>

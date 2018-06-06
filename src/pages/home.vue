<template>
    <div class="mod-Home">
        <!-- <div class="wrapperBox"><label>普通：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"  :isShowBgColor="true"></PageNation></div>
        <div class="wrapperBox"><label>背景色：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"></PageNation></div>
        <div class="wrapperBox"><label>总数：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="3" :prePageItem="3" :isShowTotal="true" ></PageNation></div>          
        <div class="wrapperBox"><label>快捷键：</label><PageNation @pagechange="handlePageChange"  :totalNum="120" :pageSize="3" :prePageItem="3" :isShowFast="true"></PageNation></div>   
        <div class="wrapperBox"><label>每页条数：</label><PageNation @pagechange="handlePageChange" :totalNum="1200"  :prePageItem="5" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" ></PageNation></div>             
        <div class="wrapperBox"><label>前往：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowFast="true" :isShowJump="true"></PageNation></div>  
        <div class="wrapperBox"><label>完整：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" :isShowJump="true"></PageNation></div> -->          
        <div class="wrapperBox"><label></label><DatePicker ></DatePicker></div> 
    </div>   
</template>
<style lang="less" scope>
.mod-Home{
    .wrapperBox{
        width: 1000px;
        display: flex;
        line-height:24px;
        margin:50px auto;
        label{
            width: 120px;
            margin-right: 20px;
            text-align: right;
            font-size: 14px;
            // border-right: 1px solid #ccc;
        }
    }
}
</style>
<script>
import PageNation from './compoents/pagination/pagenation'
import DatePicker from './compoents/datepicker/datepicker' 
export default {
    name:'home',
    data() {
        return {
                        
        }
    },
    components:{
        PageNation,
        DatePicker
    },
    methods: {
        handlePageChange(page){
            console.log(page)
        }
    }
}
</script>


<template>
    <div class="mod-Home">
        <div class="pagebox"><label>普通：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="5" :prePageItem="3"  :isShowBgColor="false"></PageNation></div>
        <div class="pagebox"><label>背景色：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="5" :prePageItem="3" :isShowBgColor="true"></PageNation></div>
        <div class="pagebox"><label>总数：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3" :isShowTotal="true" :isShowBgColor="true"></PageNation></div>          
        <div class="pagebox"><label>快捷键：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3" :isShowFast="true"></PageNation></div>   
        <div class="pagebox"><label>每页条数：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3" :isShowDropdown="true" :isShowFast="true"></PageNation></div>             
        <div class="pagebox"><label>前往：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"></PageNation></div>  
    </div>  
</template>
<style lang="less" scope>
.mod-Home{
    .pagebox{
        width: 500px;
        display: flex;
        line-height:24px;
        margin:50px auto;
        label{
            width: 100px;
            margin-right:5px;
            text-align: right;
            font-size:14px;
        }
    }
}
</style>
<script>
import PageNation from './compoents/pagination/pagenation'
export default {
    name:'home',
    data() {
        return {
                        
        }
    },
    components:{
        PageNation,
    },
    methods: {
        handlePageChange(page){
            // console.log(page)
        }
    }
}
</script>


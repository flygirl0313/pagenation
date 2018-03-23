<template>
    <div class="mod-Home">
        <div class="pagebox"><label>普通：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"  :isShowBgColor="true"></PageNation></div>
        <div class="pagebox"><label>背景色：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"></PageNation></div>
        <div class="pagebox"><label>总数：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="3" :prePageItem="3" :isShowTotal="true" ></PageNation></div>          
        <div class="pagebox"><label>快捷键：</label><PageNation @pagechange="handlePageChange"  :totalNum="120" :pageSize="3" :prePageItem="3" :isShowFast="true"></PageNation></div>   
        <div class="pagebox"><label>每页条数：</label><PageNation @pagechange="handlePageChange" :totalNum="1200"  :prePageItem="5" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" ></PageNation></div>             
        <div class="pagebox"><label>前往：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowFast="true" :isShowJump="true"></PageNation></div>  
        <div class="pagebox"><label>完整：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" :isShowJump="true"></PageNation></div>          
    </div>  
</template>
<style lang="less" scope>
.mod-Home{
    .pagebox{
        width: 1000px;
        display: flex;
        line-height:24px;
        margin:50px auto;
        label{
            width: 120px;
            margin-right: 20px;
            text-align: right;
            font-size: 14px;
            border-right: 1px solid #ccc;
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
            console.log(page)
        }
    }
}
</script>


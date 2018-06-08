<template>
    <div class="mod-Home">
        <!-- <div class="wrapperBox"><label class="pagenation">普通：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"  :isShowBgColor="true"></PageNation></div>
        <div class="wrapperBox"><label class="pagenation">背景色：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="2" :prePageItem="3"></PageNation></div>
        <div class="wrapperBox"><label class="pagenation">总数：</label><PageNation @pagechange="handlePageChange" :totalNum="10" :pageSize="3" :prePageItem="3" :isShowTotal="true" ></PageNation></div>          
        <div class="wrapperBox"><label class="pagenation">快捷键：</label><PageNation @pagechange="handlePageChange"  :totalNum="120" :pageSize="3" :prePageItem="3" :isShowFast="true"></PageNation></div>   
        <div class="wrapperBox"><label class="pagenation">每页条数：</label><PageNation @pagechange="handlePageChange" :totalNum="1200"  :prePageItem="5" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" ></PageNation></div>             
        <div class="wrapperBox"><label class="pagenation">前往：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowFast="true" :isShowJump="true"></PageNation></div>  
        <div class="wrapperBox"><label class="pagenation">完整：</label><PageNation @pagechange="handlePageChange" :totalNum="100" :pageSize="5"  :prePageItem="3" :isShowTotal="true" :isShowFast="true" :isShowDropdown="true" :isShowJump="true"></PageNation></div> -->          
        <div class="wrapperBox"><label class="datepicker">综合大盘(按日按月-快捷单选):</label><DatePicker :width="width" :isDateRange="false" :shortcutsDate="shortcutsDate1" :shortcutsMonth="shortcutsMonth1" @selectTime="handleSelectTime"></DatePicker></div>         
        <div class="wrapperBox"><label class="datepicker">竞品分析(按月-快捷范围):</label><DatePicker :dateType="dateType" @selectTime="handleSelectTime"></DatePicker></div>                 
        <div class="wrapperBox"><label class="datepicker">流转分析(按日按月-快捷范围):</label><DatePicker @selectTime="handleSelectTime"></DatePicker></div> 
        <div class="wrapperBox"><label class="datepicker">用户洞察(按月-快捷单选):</label><DatePicker :width="width" :isDateRange="false" :dateType="dateType" :shortcutsMonth="shortcutsMonth3" @selectTime="handleSelectTime"></DatePicker></div>                         
        <div class="wrapperBox"><label class="datepicker">口碑分析(按月-无快捷单选):</label><DatePicker :width="width" :isDateRange="false" :dateType="dateType" :shortcutsMonth="shortcutsMonth4" @selectTime="handleSelectTime"></DatePicker></div>                                 
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
            min-width: 200px;
            text-align: right;
            font-size: 14px;
            padding-right: 20px; 
        }
        .pagenation{
            margin-right: 20px;            
            border-right: 1px solid #ccc;
        }
        .datepicker{
            margin-right: 180px; 
            border-right: 1px solid #ccc; 
        }
    }
}
</style>
<script>
import PageNation from './compoents/pagination/pagenation'
import DatePicker from './compoents/datepicker/datepicker' 
import {getBeforeDay ,getBeforeMonth} from '../util/util.js'
export default {
    name:'home',
    data() {
        return {
            width: 100,
            /*--------------------------------综合大盘---------------------------------------*/
            shortcutsDate1:[{
                text: '昨天',
                value: [getBeforeDay(1).timeStr, getBeforeDay(0).timeStr],  //时间戳类型
                onClick:  () => {
                    return [getBeforeDay(1).timeStr, getBeforeDay(0).timeStr];
                },
            }, {
                text: '前天',
                value: [getBeforeDay(2).timeStr, getBeforeDay(0).timeStr],
                onClick:  () => {
                    return [getBeforeDay(2).timeStr, getBeforeDay(0).timeStr];
                },                    
            }],
            shortcutsMonth1:[{
                text: '上月',
                value: [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr],  //时间戳类型
                onClick: () => {
                    return [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr];
                },
            }, {
                text: '上上月',
                value: [getBeforeMonth(2).timeStr, getBeforeDay(0).timeStr],
                onClick: () => {
                    return [getBeforeMonth(2).timeStr, getBeforeDay(0).timeStr];
                },                    
            }],
            /*---------------------------------竞品分析--------------------------------------*/
            dateType:[{
                    name: '按月',
                    value: 'month',
                    type: 'month', 
                    format: 'yyyy-MM',                        
            }],
            /*---------------------------------用户洞察--------------------------------------*/
            shortcutsMonth3: [{
                text: '上月',
                value: [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr],  //时间戳类型
                onClick: () => {
                    return [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr];
                },
            }, {
                text: '上上月',
                value: [getBeforeMonth(2).timeStr, getBeforeDay(0).timeStr],
                onClick: () => {
                    return [getBeforeMonth(2).timeStr, getBeforeDay(0).timeStr];
                },                    
            }],
            /*---------------------------------口碑分析--------------------------------------*/
            shortcutsMonth4:[{
                text: '',
                value: [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr],  //时间戳类型
                onClick: () => {
                    return [getBeforeMonth(1).timeStr, getBeforeDay(0).timeStr];
                },
            }],
        }
    },
    components:{
        PageNation,
        DatePicker
    },
    methods: {
        handlePageChange(page){
            console.log(page)
        },
        handleSelectTime(time){
            console.log(time)            
        }
    }
}
</script>


<!-- 带分组的下拉框
可配置参数

样式：
    size：  输入框尺寸，String，mini
    align： 对齐方式，String，left
    format  日期格式，String，yyyy-MM-dd
    placeholder： 提示符，String，选择范围   
    clearable： 是否显示清除按钮，Boolean，false
    editable ： 是否可编辑，Boolean，false

功能： 
    dateType：时间类型，Array，按日按月
    dateChooseType： 时间面板类型，String，date
    isDateRange: 是否能选择范围 Boolean，true
    shortcutsDate ： 按日快捷键 Array
    shortcutsMonth： 按月快捷键 Array
    defaultActiveDateIndex : 默认的快捷菜单选中项, number/string, 0,

父元素可监听到的事件：
 -->
<template>
  <div id="datepicker">
        <div class="timeTxtWarp" @click="handleShowTimePanel">
                <div class="timeTxtContent">
                    <span class="beginTxt">2018.04.09</span>
                    <i class="rangeTxt">至</i>
                    <span class="endTxt">2018.04.12</span>
                </div>
                <div class="arrowWarp">
                    <img class="arrow" :class="[ iconToggle ? 'rotateimg1':'rotateimg2']" src="../../../../static/arrow__down.svg" height="14" width="22" alt="">
                </div>
        </div>
        <div class="timePlateWarp" v-if="isShowTimePanel">
            <div class="timeListWarp">
                <ul class="timeTypeList" v-if="dateType&&dateType.length!=0">             
                    <li class="typeItem "  
                        v-for="(typeItem,typeIndex) in dateType" 
                        :key="typeIndex"
                        :class="{'curTypeItem':typeIndex == curDataType}">
                        <span @click="handleDateTypeChoose(typeItem,typeIndex)">{{typeItem.name}}</span>
                    </li>
                </ul>
                <ul class="fastChooseList" v-if="shortcuts&&shortcuts.length!=0">
                    <li class="chooseItem" 
                        v-for="(chooseItem, chooseIndex) in shortcuts" 
                        :key="chooseIndex"
                        :class="{'curChooseItem':chooseIndex == curFastChoose}"
                        @click="handleFastChoose(chooseItem,chooseIndex)">
                        <span>{{chooseItem.text}}</span>
                    </li>
                </ul>
            </div>
            <div class="datePickTable">
                <div class="start__time">
                    <span class="start__text">开始时间</span>
                    <el-date-picker 
                        ref="elDatepicker1" 
                        :clearable="false" 
                        :editable="false" 
                        :align="align" 
                        :size="size" 
                        :format="format" 
                        value-format="yyyy-MM-dd"                        
                        v-model="modelValue[0]" 
                        :type="dateChooseType" 
                        :placeholder="placeholder" 
                        @change="handleDatePickerChange" 
                        @click.native="handleFocus"
                        :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </div>
                <div class="end__time" v-if="isDateRange">
                    <span class="end__text">结束时间</span>
                    <el-date-picker 
                        ref="elDatepicker2" 
                        :clearable="false" 
                        :editable="false" 
                        :align="align" 
                        :size="size" 
                        :format="format" 
                        value-format="yyyy-MM-dd"
                        v-model="modelValue[1]" 
                        :type="dateChooseType" 
                        :placeholder="placeholder"  
                        @change="handleDatePickerChange" 
                        @click.native="handleFocus"
                        :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="btnWarp">
                <div class="btn srueBtn" @click="handleSubmit">确定</div>
                <div class="btn cancleBtn" @click="handleCancel">取消</div>                
            </div>
        </div>
  </div>
</template>

<style lang="less">
#datepicker{
    position: relative;
    .timeTxtWarp{
        display: flex;
        width: 180px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ccc;
        border-radius: 2px;
        color: #666;
        font-size: 12px;
        font-family: 'MicrosoftYaHei';
        cursor: pointer;
        &:hover{
            border: 1px solid #000;
        }
        .timeTxtContent{
            width:85%; 
            padding: 0px 6px;
            .rangeTxt{
                font-style: normal
            }
        }
        .arrowWarp{
            width: 15%;
            text-align: center;
            .arrow{
                display: inline-block;
                width: 14px;
                height: 14px;
                &.rotateimg1{
                    padding-bottom: 4px; 
                    transform: rotateX(180deg);
                    transition: all .5s;
                } 
                &.rotateimg2{
                    margin-top: 4px;                     
                    transform: rotateX(360deg);
                    transition: all .5s;
                } 
            }
        }
    }
    .timePlateWarp{
        display: flex;
        width: 320px;
        position: absolute;
        top: 29px;
        left:-40%;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(185, 185, 185, 0.5);
        z-index: 1001;
        font-size: 11px;
        .timeListWarp{
            display: flex;
            height: 44px;
            line-height: 44px;
            font-size: 13px;
            padding: 0px 6px;
  
        }
        .timeTypeList{
            display: flex;
            width: 40%;
            .typeItem{
                span{
                    display: inline-block;
                    width: 42px;
                    height: 22px;
                    line-height: 22px;
                    background: #fff;
                    border-radius: 2px;
                    margin: 0 5px;
                    font-size: 11px;
                    color: #606060;
                    letter-spacing: -0.25px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .curTypeItem{
                span{
                    background: #528DFF;
                    color: #FFFFFF;
                }
            }
            
        }
        .fastChooseList{
            display: flex;
            width: 60%;
            padding-left: 50px;
            .chooseItem{
                margin: 0 5px;
                font-size: 11px;
                letter-spacing: -0.25px;
                text-align: center;
                cursor: pointer;
            } 
            .curChooseItem{
               span{
                    color: #528DFF;
                } 
            }
            
        }
        .datePickTable{
            display: flex;
            height: 90px;
            background: #f9f9f9;
            padding: 12px 20px 0;
            box-sizing: border-box;
            background-color: #f9f9f9;
            color: #2e2e2e;
            .start__time{
                margin-right: 10px;
            }
            .el-date-editor.el-input, .el-date-editor.el-input__inner{
                width: 120px;
                margin-top: 6px;
            }
            .el-input--prefix .el-input__inner{
                padding-right:0px;
            }
        }
        .btnWarp{
            display: flex;            
            height: 44px;
            line-height: 44px;
            text-align: center;
            padding-left:180px;
            .btn{
                float: right;
                width: 50px;
                height: 18px;
                line-height: 18px;
                margin-right: 10px;
                margin-top: 13px;
                background-color: #528DFF;
                border: 1px solid #528DFF;
                border-radius: 2px;
                color: #fff;
                cursor: pointer;
            }
            .cancleBtn{
                color: #606060;
                border: 1px solid #979797;
                background: #fff;
                &:hover{
                    background-color: #528DFF;
                    color: #fff;
                    border: 1px solid #528DFF;
                }
            }
        }
    }
}    
</style>

<script>
    import { getBeforeDay ,getBeforeMonth} from '../../../util/util.js'
    export default {
        data() {
           return {
                isShowTimePanel: true,  //显示时间面板
                iconToggle: false,       //箭头反转
                curDataType: 0,          //当前选中的时间类型
                curFastChoose: 0,        //当前快捷菜单选中项
                shortcuts: this.shortcutsDate,
                timeType : this.dateType[0], 
                modelValue : this.shortcutsDate ? this.shortcutsDate[this.defaultActiveDateIndex].value : 
                (function() {

                    
                })(),
           }
        },
        props: {
            //时间类型
            dateType:{
                type: Array,
                default: function() {
                    return [{
                            name: '按日',
                            value: 'day',
                            list: 'shortcutsDate'
                        },
                        {
                            name: '按月',
                            value: 'month',
                            list: 'shortcutsMonth'
                        }
                    ]
                }
            },
            //时间面板类型选择                        
            dateChooseType:{
                type: String,
                default: 'date'
            },
            
            //时间范围类型
            isDateRange:{
                type: Boolean,
                default: true
            },
            //输入框尺寸
            size:{
                type: String,
                default: 'mini'
            },
            //对齐方式
            align:{
                type: String,
                default: 'left'
            },
            //日期格式
            format:{
                type: String,
                default: 'yyyy-MM-dd'
            },
            //不选择时提示符
            placeholder:{
                type: String,
                default: '选择范围'
            },
            //按日快捷键选项列表
            shortcutsDate:{
                type: Array,
                default:function(){
                    let shortcutsDate = [{
                        text: '近7天',
                        value: [getBeforeDay(7).type1, getBeforeDay(1).type1]
                    }, {
                        text: '近15天',
                        value: [getBeforeDay(15).type1, getBeforeDay(1).type1]
                    }, {
                        text: '近30天',
                        value: [getBeforeDay(30).type1, getBeforeDay(1).type1]
                    }];
                    return shortcutsDate;
                }
            },
            //按月快捷键选项列表
            shortcutsMonth:{
                type: Array,
                default:function(){
                    let shortcutsMonth = [{
                        text: '近6个月',
                        value: [getBeforeMonth(6),getBeforeMonth(1)]
                    },{
                        text: '近12个月',
                        value: []
                    }];
                    return shortcutsMonth;
                }
            },
            defaultActiveDateIndex:{
                type: [Number, String],
                default: 0
            },
            //快捷键选择（起始）
            pickerOptionsStart: {
            
            },
            //快捷键选择(结束)
            pickerOptionsEnd:{

            }
        },
        watch: {
            //时间类型切换，快捷菜单列表切换
           'timeType'(newVal) {
                if(newVal.value){
                   newVal.list == 'shortcutsDate' ? this.shortcuts = this.shortcutsDate : this.shortcuts = this.shortcutsMonth;
                }
           }
        },
        created(){
            var aa = getBeforeMonth(6);
            var bb = getBeforeMonth(3);
            var cc = getBeforeMonth(1);            
            console.log(aa)
            console.log(bb) 
            console.log(cc)                                   
        },
        methods: {
            //时间面板显示/收起
            handleShowTimePanel(){
                this.isShowTimePanel = !this.isShowTimePanel;
                this.iconToggle = !this.iconToggle;
            },
            handleFocus(){

            },
            //时间类型的选择
            handleDateTypeChoose(dateTypeItem,typeIndex){
                this.timeType = dateTypeItem;
                this.curDataType = typeIndex;
                this.curFastChoose = 0;   //切换快捷键，默认选中第一个
            },
            //快捷键的选择
            handleFastChoose(fastChooseItem, chooseIndex){
                this.curFastChoose = chooseIndex;
                this.modelValue = fastChooseItem.value;
            },
            //自定义选择时间
            handleDatePickerChange(date){

                console.log(date,111)
            },
            handleSubmit(){
                this.isShowTimePanel = false;
                this.iconToggle = false;
            },
            handleCancel(){
                this.isShowTimePanel = false; 
                this.iconToggle = false;                               
            }
            
        },
    };
</script>
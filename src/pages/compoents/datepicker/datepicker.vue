<template>
  <div id="datepicker">
        <div class="timeTxtWarp" :style="{width: width+'px'}" @click="handleShowTimePanel">
                <div class="timeTxtContent">
                    <span class="beginTxt">{{timeText[0]}}</span>
                    <i class="rangeTxt" v-if="isDateRange">至</i>
                    <span class="endTxt" v-if="isDateRange">{{timeText[1]}}</span>
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
                    <span class="start__text" v-if="isDateRange">开始时间</span>
                    <el-date-picker 
                        ref="elDatepicker1" 
                        :clearable="false" 
                        :editable="false" 
                        :align="align" 
                        :size="size" 
                        v-model="modelValue[0]" 
                        :format="timeType ? timeType.format : 'yyyy-MM-dd'"  
                        value-format="yyyy-MM-dd"                      
                        :type="timeType ? timeType.type : 'date'" 
                        :placeholder="placeholder" 
                        @change="handleDatePickerChange" 
                        @click.native="handleFocus">
                    </el-date-picker>
                </div>
                <div class="end__time" v-if="isDateRange">
                    <span class="end__text" v-if="isDateRange">结束时间</span>
                    <el-date-picker 
                        ref="elDatepicker2" 
                        :clearable="false" 
                        :editable="false" 
                        :align="align" 
                        :size="size" 
                        v-model="modelValue[1]" 
                        :format="timeType ? timeType.format : 'yyyy-MM'" 
                        value-format="yyyy-MM-dd"
                        :type="timeType ? timeType.type : 'date'" 
                        :placeholder="placeholder"  
                        @change="handleDatePickerChange" 
                        @click.native="handleFocus">
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
        height: 26px;
        line-height: 26px;
        border: 1px solid #ccc;
        border-radius: 2px;
        color: #666;
        font-size: 12px;
        font-family: 'MicrosoftYaHei';
        cursor: pointer;
        text-align: center;
        padding: 0 5px;
        &:hover{
            border: 1px solid #000;
        }
        .timeTxtContent{
            width:85%; 
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
            width: 140px;
            box-sizing: border-box;
            overflow: hidden;
            .typeItem{
                float: left;
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
            margin-left: auto;
            box-sizing: border-box;
            overflow: hidden;
            .chooseItem{
                float: left;
                margin: 0 5px;
                font-size: 11px;
                letter-spacing: -0.25px;
                text-align: left;
                cursor: pointer;
                &:hover{
                    color: #528DFF;
                }
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
                margin-top: 10px;
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
                isShowTimePanel: false,  //显示时间面板
                iconToggle: false,       //箭头反转
                curDataType: 0,          //当前选中的时间类型
                curFastChoose: 0,        //当前快捷菜单选中项
                timeType : this.dateType[0],
                shortcuts: this.dateType[0].value =='day' ? this.shortcutsDate : this.shortcutsMonth,
                modelValue : this.dateType[0].value =='day' ? 
                             this.shortcutsDate[this.defaultActiveDateIndex].value : 
                             this.shortcutsMonth[this.defaultActiveDateIndex].value,
           }
        },
        props: {
            //时间框宽度
            width:{
                type: Number,
                default: 180
            },
            //时间类型
            dateType:{
                type: Array,
                default: function() {
                    return [{
                            name: '按日',
                            value: 'day',
                            type: 'date',
                            format: 'yyyy-MM-dd',
                        },
                        {
                            name: '按月',
                            value: 'month',
                            type: 'month', 
                            format: 'yyyy-MM',                        
                        }
                    ]
                }
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
            //不选择时提示符
            placeholder:{
                type: String,
                default: '选择时间'
            },
            //按日快捷键选项列表
            shortcutsDate:{
                type: Array,
                default:function(){
                    let shortcutsDate = [{
                        text: '近7天',
                        value: [getBeforeDay(7).timeStr, getBeforeDay(1).timeStr],  //时间戳类型
                        onClick: () => {
                            return [getBeforeDay(7).timeStr, getBeforeDay(1).timeStr];
                        },
                    }, {
                        text: '近15天',
                        value: [getBeforeDay(15).timeStr, getBeforeDay(1).timeStr],
                        onClick: () => {
                            return [getBeforeDay(15).timeStr, getBeforeDay(1).timeStr];
                        },                    
                    }, {
                        text: '近30天',
                        value: [getBeforeDay(30).timeStr, getBeforeDay(1).timeStr],
                        onClick: () => {
                            return [getBeforeDay(30).timeStr, getBeforeDay(1).timeStr];
                        },
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
                        value: [getBeforeMonth(6).timeStr, getBeforeMonth(1).timeStr],
                        onClick: () => {
                            return [getBeforeMonth(6).timeStr, getBeforeMonth(1).timeStr];
                        },
                    },{
                        text: '近12个月',
                        value: [getBeforeMonth(12).timeStr, getBeforeMonth(1).timeStr],
                        onClick: () => {
                            return [getBeforeMonth(12).timeStr, getBeforeMonth(1).timeStr];
                        },
                    }];
                    return shortcutsMonth;
                }
            },
            defaultActiveDateIndex:{
                type: [Number, String],
                default: 0
            },
        },
        watch: {
            //时间类型切换，快捷菜单列表切换并选中默认值
           'timeType'(newVal) {
                if(newVal.value){
                    if(newVal.value == 'day'){
                        this.shortcuts = this.shortcutsDate;
                        this.modelValue = this.shortcutsDate[this.defaultActiveDateIndex].value;
                    }else{
                        this.shortcuts = this.shortcutsMonth; 
                        this.modelValue = this.shortcutsMonth[this.defaultActiveDateIndex].value;
                    }
                }
           },
           'modelValue'(newVal) {
               if(newVal){
                   let newTimeText = this.handleDateFormatTxt(newVal);
                   this.timeText = newTimeText;
               }
           }
        },
        computed:{
            timeText:{
                get(){
                    let defaultTimeText = this.handleDateFormatTxt(this.modelValue)
                    return defaultTimeText;
                },
                set(newVal){
                    if(newVal)return newVal
                }
            }
        },
        methods: {
            //时间面板显示/收起
            handleShowTimePanel(){
                this.isShowTimePanel = !this.isShowTimePanel;
                this.iconToggle = !this.iconToggle;
            },
            //时间类型的选择
            handleDateTypeChoose(dateTypeItem,typeIndex){
                this.timeType = dateTypeItem;       
                this.curDataType = typeIndex;       
                this.curFastChoose = 0;            
            },
            //快捷键的选择
            handleFastChoose(chooseItem, chooseIndex){
                this.curFastChoose = chooseIndex;
                var initModelValue = chooseItem.onClick();  //重新赋值快捷键
                this.modelValue = initModelValue;
                console.log(initModelValue,111)                
            },
            //自定义时间触发
            handleFocus(){
                this.curFastChoose = -1;
            },
            //自定义时间
            handleDatePickerChange(date){
                // console.log(date,111)
            },
            //确定
            handleSubmit(){
                this.isShowTimePanel = false;
                this.iconToggle = false;
                let timeValue = this.modelValue;
                this.timeText = this.handleDateFormatTxt(timeValue);
                this.$emit('selectTime', timeValue)
            },
            //取消
            handleCancel(){
                this.isShowTimePanel = false; 
                this.iconToggle = false;  
            },
            //处理格式 按日：2018.03.13 按月： 2018.03
            handleDateFormatTxt(date){
                let timeTextArr = [];
                let dateArr = date;
                dateArr.map((item, index) => {
                    this.timeType.value == 'day' ? 
                    item = item.split('-').join('.') :  
                    item = item.split('-').slice(0,2).join('.')
                    timeTextArr.push(item);
                })
                return timeTextArr;
            }            
        }
    };
</script>
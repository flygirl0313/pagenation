<!-- 带分组的下拉框
可配置参数：
样式：
    widthData：分页盒子的宽度
    isShowBgColor: 是否有背景和边框
数据：
    totalNum ： 数据总条数,
    pageSize ： 每页条数,
    prePageItem: 页面上可见的页码个数，其他以...代替,必须是奇数
功能：
    isShowTotal ：是否显示总数 - 默认不显示
    isShowFast: 是否显示快捷跳转首末页 - 默认不显示
    isShowJump: 是否显示允许跳页 - 默认不显示

父元素可监听到的事件：
    选中某项：handleItemClick(number) number:当前点击的页数
    直接前往：handelJumpTo(number) number: 用户输入的页码

实现思想：将页码数组划分为三个区间分别处理。
 -->
<template>
    <div class="mod-pageNation" :style="{width: widthData}">
        <!-- 每页条数下拉框 -->
        <div  class="chooseList" v-if="isShowDropdown" >
            <span class="title">每页10条</span>
            <div v-show="isShowList">
                <li class="chooseItem">每页10条</li>
                <li class="chooseItem">每页10条</li>
                <li class="chooseItem">每页10条</li>                
            </div>
        </div>
        <!-- 总数 -->
        <li class="totalText" v-show="isShowTotal" ><span>共{{totalNum}}条</span></li>            
        <!-- 分页列表 -->
        <ul class="pageList">
            <!-- 上一页 -->
            <li class="pageItem" :class="{'disabled': current == 1}"><span @click="handleItemClick(current - 1)"> « </span></li>
            <!-- 首页 -->
            <li class="pageItem btn" :class="{'disabled': current == 1}" v-show="isShowFast"><span @click="handleItemClick(1)"> 首页 </span></li>
            <!-- 分页项 -->
            <li class="pageItem"
                v-for="pageItem in pageList" 
                :class="{'active': current == pageItem.val}"
                @click="handleItemClick(pageItem.val)">
                <span>{{ pageItem.text }}</span>
            </li>
            <!-- 末页 -->
            <li class="pageItem btn" :class="{'disabled': current == pagesCount}" v-show="isShowFast"><span @click="handleItemClick(pagesCount)">尾页</span></li>
            <!-- 下一页 -->
            <li class="pageItem" :class="{'disabled': current == pagesCount}"><span @click="handleItemClick(current + 1)">»</span></li>         
        </ul>
    </div>  
</template>
<style lang="less" scope>
.mod-pageNation{
    width: 500px; 
    display: flex;   
   .pageList{
       display: flex;
       .pageItem{
            display: inline-block;
            min-width: 30px;
            height: 28px;
            line-height: 28px;
            margin: 0px 5px;
            padding: 0 4px;
            text-align: center;
            font-size: 12px;
            border:1px solid #ccc;
            border-radius: 2px;
            vertical-align: top;
            box-sizing: border-box;
            background: #f4f4f5;
            color: #606266;
            cursor: pointer;
            span{
                font-weight: bold;   
            }
            &:hover{
                color:#409eff;
            }
        }
        .btn{
           min-width: 50px;
        }
        .active {
            background: #409eff;
            color: #fff!important;
            border-color: #409eff;
        }
    }
    .totalText{
        display: inline-block;
        margin:0px 10px;
        line-height: 28px;
        font-size:13px;
    }
    .chooseList{
        .title{
            display: inline-block;
            width: 100px;
            height: 28px;
            line-height: 28px;
            padding-left: 10px;
            font-size: 14px;
            color: #666;
            border: 1px solid #ccc;
            box-sizing: border-box;
            cursor: pointer;
            &:hover{
                border: 1px solid #333;
            }
        }
    }
}
</style>
<script>
export default {
    name:'pagenation',
    props:{
        //分页总宽度
        widthData:{
            type:Number,
            default:400
        },
        //数据总条数, 默认0条
        totalNum:{
            type: Number,
            default:0,
        },
        //每页的条数,默认为10条
        pageSize:{
            type: Number,
            default: 10,
        },
        //可见页码，其他的以...替代，默认5个
        prePageItem: { 
            type : Number,
            default : 5,
        },
        // 当前页码
        currentPage: {
            type: Number,
            default: 1
        },
        //是否显示背景
        isShowBgColor: {
            type:Boolean,
            default:true
        },
        //是否显示首末页快捷键
        isShowFast: {
            type:Boolean,
            default:false
        },
        //是否显示总数
        isShowTotal: {
            type:Boolean,
            default:false
        },
        //是否显示直接前往
        isShowJump: {
            type:Boolean,
            default:false
        },
        //是否显示直接前往
        isShowDropdown: {
            type:Boolean,
            default:false
        },
    },
    data() {
        return {
            current: this.currentPage,     //当前页
            isShowList: false,   // 是否显示下拉框
        }
    },
    computed: {
        //计算总页码, 向上取整（总数/每页条数）
        pagesCount(){
            return Math.ceil(this.totalNum / this.pageSize)
        },
        //可见页码必须为奇数个,默认5
        prePageItems(){
            var num = this.prePageItem;
                num = num > 0 ? num : this.prePageItem;
            return num % 2 === 1 ? num : num + 1;
        },
        //分页数
        pageList(){
            let len = this.pagesCount;    //总页码数
            let temp = [],  list = [];  
            let count = Math.floor(this.prePageItems / 2);  //步长值
            let center = this.current;     //当前的中心
            
            /*情景一：总页码数 < 可显示的页码数 无需处理全部显示，[{1},{2},{3}]；*/
            if (len <= this.prePageItems) {
                for(var i=1; i<=len; i++){
                    temp.push({text: i,  val: i });
                }
                return temp;
            }
            /*情景二：总页码数 > 可显示的页码数 pageList = list; */
            for(var i=1; i<=len; i++){
                temp.push(i);
            }
            /*计算当前的中心位置有三种情况： 
                前半部分 ：区间：0 ~ count = center + count - idx;
                中间部分 : 区间：count ~（len-count) =  this.current;
                后半部分 ：区间：（len-count) ~ len = len - count;
                current：1  center:1  count:1  idx:0  ===> center:2
                current：2  center:2  count:1  idx:1  ===> center:2
                current：3  center:3  count:1  idx:2  ===> center:3
                current：4  center:4  count:1  idx:3  ===> center:4
                current：5  center:5  count:1  idx:4  ===> center:4
             */
            var idx = temp.indexOf(center); 
                if(idx < count) {
                    center = center + count - idx;
                }
                if(this.current > len - count) {
                    center = len - count;
                }                
                /*制作当前显示在页面上的页码数组  splice('开始位置','长度') 
                    可显示页码数：3  count： 1
                    current：1  center：2  [1,2,3,4,5]  ===> [{1},{2},{3}]
                    current：2  center：2  [1,2,3,4,5]  ===> [{1},{2},{3}]
                    current：3  center：3  [1,2,3,4,5]  ===> [{2},{3},{4}]
                    current：4  center：4  [1,2,3,4,5]  ===> [{3},{4},{5}]
                    current：5  center：4  [1,2,3,4,5]  ===> [{3},{4},{5}]
                */
                temp = temp.splice(center - count - 1, this.prePageItems);
                for(var i=0; i<=temp.length+1; i++){
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                }
                /*当总页码 > 当前可显示页码数时，制作...并控制是否显示
                    [{1},{2},{3}] ===> [{1},{2},{3},{...}]
                    [{1},{2},{3}] ===> [{1},{2},{3},{...}]
                    [{2},{3},{4}] ===> [{...},{2},{3},{4},{...}]
                    [{3},{4},{5}] ===> [{...},{3},{4},{5}]
                    [{3},{4},{5}] ===> [{...},{3},{4},{5}]
                */
                if (this.pagesCount > this.prePageItems) {
                    if(this.current > count + 1){
                        list.unshift({text: '...', val: list[0].val - 1});
                    }
                    if(this.current < len - count){
                        list.push({text: '...', val: list[list.length - 1].val + 1});
                    }
                }
                return list;
        },
    },
    methods: {
        handleItemClick(idx){
             if (this.current != idx && idx > 0 && idx < this.pagesCount + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        }
    }
}
</script>


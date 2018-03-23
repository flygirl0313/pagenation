<!-- 带分组的下拉框
可配置参数：
样式：
    widthData：分页盒子的宽度
    isShowBgColor: 是否有背景和边框

数据：
    totalNum ： 数据总条数,
    pageSize ： 每页条数,
    prePageItem: 页面上可见的页码个数，其他以...代替,必须是奇数
    currentPage： 初始化第几页

功能：
    isShowTotal ：  是否显示总数 - 默认不显示
    isShowFast:     是否显示快捷跳转首末页 - 默认不显示
    isShowDropdown :是否显示每页条数下拉框 - 默认不显示
    isShowJump:     是否显示允许跳页 - 默认不显示

父元素可监听到的事件：
    选中某项：handleItemClick()  当前点击的页数
    直接前往：handelJumpTo()     用户输入的页码

实现思想：将页码数组划分为三个区间分别处理。
 -->
<template>
    <div class="mod-pageNation" :style="{width: widthData}">
         <!-- 总数 -->
        <li class="totalText" v-show="isShowTotal" ><span>共{{totalNum}}条</span></li>    
        <!-- 每页条数下拉框 -->
        <div  class="chooseList" v-if="isShowDropdown" >
            <div class="title" @click="handleClickSelect">
                <span class="titleText">{{titleText}}</span>
                <img ref="child" :class="isRotate ? 'rotateup':'rotatedown'" src="../../../../static/arrow__down.svg" height="14" width="22" alt="">
            </div>
            <div class="prePagelist"v-if="prePagelist!=null&&prePagelist.lenth!=0" v-show="isShowList">
                <li class="chooseItem" 
                    v-for="(chooseItem, chooseIndex) in prePagelist"
                    :key="chooseIndex"
                    @click="handleChoosePrePageSize(chooseItem)">
                    {{chooseItem.name}}
                </li>              
            </div>
        </div>       
        <!-- 分页列表 -->
        <ul class="pageList">
            <!-- 上一页 -->
            <li class="pageItem" :class="{'disabled': current == 1, 'simple': isShowBgColor == true}" ><span @click="handleItemClick(current - 1)"> « </span></li>
            <!-- 首页 -->
            <li class="pageItem btn" :class="{'disabled': current == 1, 'simple': isShowBgColor == true}" v-show="isShowFast"><span @click="handleItemClick(1)"> 首页 </span></li>
            <!-- 分页项 -->
            <li class="pageItem"
                v-for="pageItem in pageList" 
                :class="{'active': current == pageItem.val,'simple': isShowBgColor == true}"
                @click="handleItemClick(pageItem.val)">
                <span>{{ pageItem.text }}</span>
            </li>
            <!-- 末页 -->
            <li class="pageItem btn" :class="{'disabled': current == pagesCount, 'simple': isShowBgColor == true}" v-show="isShowFast"><span @click="handleItemClick(pagesCount)">尾页</span></li>
            <!-- 下一页 -->
            <li class="pageItem" :class="{'disabled': current == pagesCount, 'simple': isShowBgColor == true}"><span @click="handleItemClick(current + 1)">»</span></li>         
        </ul>
        <!-- 直接前往 -->
        <div class="jumpTo" v-show="isShowJump">
            <span class="jumpText">前往</span><input type="text" class="jumpNum" v-model="current" ref="jumpInput" @change="handleJumpTo"><span class="jumpText">页</span>
        </div>
    </div>  
</template>
<style lang="less" scope>
.mod-pageNation{
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
            &.active {
                background: #409eff;
                color: #fff!important;
                border-color: #409eff;
            }
        }
        .btn{
           min-width: 50px;
        }
       
        .simple{
            background: #fff;
            border: none;
            &.active {
                background: #fff;
                color: #409eff!important;
                border: none;
            }
        }
    }
    .totalText{
        min-width: 80px;
        text-align: center;
        display: inline-block;
        margin: 0px 10px;
        line-height: 28px;
        font-size: 13px;
    }
    .chooseList{
        position: relative;
        margin:0px 10px;
        .title{
            width: 120px;
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
            .titleText{
                display: inline-block;
                height:100%;
                margin-right:14px;
            }
            img {
                vertical-align: text-top;
                margin-left: -5px;
                &.rotateup{
                    vertical-align: unset;
                    transform: rotateZ(180deg);
                    transition: all .5s;
                } 
                &.rotatedown{
                    vertical-align: unset;
                    transform: rotateZ(360deg);
                    transition: all .5s;
                } 
            }
        }
        .prePagelist{
            min-width: 134px;
            position: absolute;
            top: 30px;
            z-index: 10000;
            background: #fff;
            border: 1px solid #ccc;
            .chooseItem{
                padding: 0px 10px;
                height: 26px;
                line-height: 26px;
                font-size: 13px;
                text-align: left;
                color: #666;
                border-bottom: 1px dashed #ccc;
                cursor: pointer;
                &:hover{
                    background: #f4f4f5;
                    color:#409eff;
                }
            }
            .chooseItem:last-child{border:none;}
        }
    }
    .jumpTo{
        display: flex;
        line-height: 28px;
        margin: 0px 20px;
        font-size:13px;
        .jumpText{
            display: inline-block;
            width: 40px;
            text-align: center;
        }
        .jumpNum{
            display: inline-block;
            width: 48px;            
            height: 26px;
            line-height: 26px;
            outline: none;
            padding: 0 15px;
            text-align: center;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        input:focus{border:1px solid #409eff;}
    }
}
</style>
<script>
export default {
    name:'pagenation',
    props:{
        //分页总宽度
        widthData:{
            type: Number,
            default: 500
        },
        //数据总条数, 默认0条
        totalNum:{
            type: Number,
            default: 0,
        },
        //每页的条数,默认为10条
        pageSize:{
            type: Number,
            default: 10,
        },
        //可见页码，其他的以...替代，默认5个
        prePageItem: { 
            type : Number,
            default: 5,
        },
        // 当前页码
        currentPage: {
            type: Number,
            default: 1
        },
        //是否显示背景
        isShowBgColor: {
            type: Boolean,
            default: false
        },
        //是否显示首末页快捷键
        isShowFast: {
            type: Boolean,
            default: false
        },
        //是否显示总数
        isShowTotal: {
            type: Boolean,
            default: false
        },
        //是否显示直接前往
        isShowJump: {
            type: Boolean,
            default: false
        },
        //是否显示直接前往
        isShowDropdown: {
            type: Boolean,
            default: false
        },
    },
    data() {
        let pageSize = this.pageSize;
        return {
            titleText : '每页'+ pageSize +'条',  //下拉款标题
            pageSizeNum: pageSize,              //每页多少条数据
            current: this.currentPage,          //当前页,默认传入的当前页
            isShowList: false,                  // 是否显示下拉框
            isRotate: false,                    // 下拉框箭头旋转
        }
    },
    computed: {
        //计算总页码, 向上取整（总数/每页条数）
        pagesCount(){
            return Math.ceil(this.totalNum / this.pageSizeNum)
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
        //制作下拉框数据（按总数位数-固定分4层）
        prePagelist(){
            let total = this.totalNum;
            let len = total.toString().length - 1;
            let list = []
            var str = '1'
            if(total!=0){
                while(len--){str = str + '0'}
                for(var count=1; count<=4; count++){
                    list.push({
                        name: '每页'+Math.ceil((Number(str)*count)/2)+'条',
                        value: Math.ceil((Number(str)*count)/2)
                    });
                }
                //制作默认节点
                list.unshift({ 
                    name: '每页'+this.pageSize+'条',
                    value: this.pageSize
                })
                return list 
            }
        }
    },
    watch:{
        //每页条数计算
        'pageSize': function(newValue) {
            this.pageSizeNum = newValue;
        },
    },
    methods: {
        //点击分页
        handleItemClick(idx) {
             if (this.current != idx && idx > 0 && idx < this.pagesCount + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        },
        //下拉框的展示隐藏，箭头旋转
        handleClickSelect() {
            this.isRotate = !this.isRotate;
            this.isShowList = !this.isShowList;
        },
        //选择每页多少条数据
        handleChoosePrePageSize(preItem) {
            this.isRotate = !this.isRotate;
            this.isShowList = !this.isShowList;
            this.titleText = preItem.name;            
            this.pageSizeNum = preItem.value;
        },
        //输入直接前往
        handleJumpTo(){
            let jumpNum = this.$refs.jumpInput.value
            var reg = new RegExp("^[1-9]*$");  //正则匹配，输入的为正整数：
            if(reg.test(jumpNum)){
                this.current = Number(jumpNum)
                this.$emit('pagechange', this.current);
            }else{
                alert('请输入正确的数字格式！');
            }
            (jumpNum>this.pageList.length)&&(alert('超出页码范围'))
        }

    }
}
</script>


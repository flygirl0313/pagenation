<!-- 带分组的下拉框
可配置参数：
样式：
    widthData：下拉框的宽度
    fontSize: 分页项字体大小           
    itemColor: 分页项字体颜色 
    itembgColor: 分页项背景色
数据：
    totalNum ： 数据总条数,
    pageSize ： 每页条数,
    prePageItem: 页面上可见的页码个数，其他以...代替,建议奇数
结构：
    isShowJump: 是否显示允许跳页
父元素可监听到的事件：
    选中某项：dropItemClick(object) object:选中项的文字和value
    搜索：searchKeyChange(newVal) newVal:用户输入的搜索内容
 -->
<template>
    <div class="mod-pageNation" :style="{width: widthData}">
        <ul class="pageList">
            <li class="pageItem" :class="{'disabled': current == 1}"><span @click="handleItemClick(current - 1)"> « </span></li>
            <li class="pageItem btn" :class="{'disabled': current == 1}"><span @click="handleItemClick(1)"> 首页 </span></li>
            <li class="pageItem"
                v-for="p in pageList" 
                :style="itemStyleObj"
                :class="{'active': current == p.val}"
                @click="handleItemClick(p.val)">
                <span>{{ p.text }}</span>
            </li>
            <li class="pageItem btn" :class="{'disabled': current == pagesCount}"><span @click="handleItemClick(pagesCount)">尾页</span></li>
            <li class="pageItem" :class="{'disabled': current == pagesCount}"><span @click="handleItemClick(current + 1)">»</span></li>         
        </ul>
    </div>  
</template>
<style lang="less" scope>
.mod-pageNation{
    width: 300px;    
    margin:100px auto;
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
            font-weight: bolder;
            border:1px solid #ccc;
            border-radius: 2px;
            vertical-align: top;
            box-sizing: border-box;
            background: #f4f4f5;
            color: #606266;
            cursor: pointer;
       }
       .btn{
           min-width: 50px;
        }
        .active {
            background: #409eff!important;
            color: #fff!important;
            border-color: #409eff;
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
        //分页项字体大小
        fontSize:{
            type:String,
            default:'12px'
        },
        //分页项背景色
        itembgColor:{
            type:String,
            default:'#f4f4f5'
        },
        //分页项颜色
        itemColor:{
            type:String,
            default:'#606266'
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
    },
    data() {
        return {
            //配置分页项样式
            itemStyleObj:{
                color:this.itemColor,
                fontSize: this.fontSize,
                background: this.itembgColor,
            },
            //当前页  
            current: this.currentPage,    
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
            debugger
            let len = this.pagesCount;    //总页码数
            let temp = [],  list = [];  
            let count = Math.floor(this.prePageItems / 2);  //步长值
            let center = this.current;     //当前的中心
            if (len <= this.prePageItems) {
                while (len--) {
                    temp.push({text: this.pagesCount - len, val: this.pagesCount - len});
                };
                return temp;
            }
            //制作页码数组[1,2,3,4,5,6,7,8,9,10]
            while (len--) { 
                temp.push(this.pagesCount - len);
            };
            var idx = temp.indexOf(center);   
                (idx < count) && ( center = center + count - idx);
                (this.current > this.pagesCount - count) && ( center = this.pagesCount - count);
                temp = temp.splice(center - count - 1, this.prePageItems);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                } while (temp.length);
                if (this.pagesCount > this.prePageItems) {
                    (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                    (this.current < this.pagesCount - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
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


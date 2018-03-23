import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

export const deepExtend = _.defaultsDeep;

/**
 * 
 * @param {*} c_name 
 * @param {*} value 
 * @param {*} expiremMinutes 
 */
export const setCookie = function(c_name, value, expiremMinutes) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
    document.cookie = c_name + "=" + escape(value) + ((expiremMinutes == null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 
 * @param {*} c_name 
 */
export const getCookie = function(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
};

/**
 * 
 * @param {*} c_name 
 */
export const delCookie = function(c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null) {
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};

/**
 * 获取完整年月日formatter： yyyy-MM-dd
 * 
 * @param {any} time  需要格式化的时间
 * @param {any} separator  分隔符，默认 ‘/’
 * @returns 
 */
function fillDate(time, separator) {
    let { length: len } = arguments;
    var separator;
    if (len == 0) return;
    if (len == 1) {
        separator = "-";
    } else {
        separator = separator;
    }
    var timeArr = time.split(separator);
    var newTimeArr = timeArr.map((item, index) => {
        if (item.length == 1) {
            return '0' + item;
        } else {
            return item
        }
    })
    return newTimeArr.join(separator)
}

const currentDate = () => {
    const now = new Date().getTime() - 24 * 60 * 60 * 1000;
    var st = new Date(now - 24 * 60 * 60 * 1000 * 6).toLocaleDateString();
    var ft = new Date(now).toLocaleDateString();

    st = st.toString().replace(/\//ig, '-');
    ft = ft.toString().replace(/\//ig, '-');

    const startTime = fillDate(st);
    const endTime = fillDate(ft);
    return [startTime, endTime]
};
export const defaultDate = currentDate();


/**
 * 设置localstorage,
 * @param {*} name  存储名称
 * @param {*} content  存储的值，不需要json 化
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 生成promise实例
 * @param {[type]} data [description]
 */
export const setPromise = data => {
    return Promise.resolve(data)
}

/**
 * 获取给定时间的年-月-日
 * @param {*} time 
 */
export const getFullTime = time => {
    const year = new Date(time).getFullYear()
    const month = new Date(time).getMonth() + 1
    const date = new Date(time).getDate()
        //const month = new Date(time).getMonth() + 1 >= 10 ? new Date(time).getMonth() + 1 : '0' + new Date(time).getMonth() + 1;
        //const date = new Date(time).getDate() >= 10 ?  new Date(time).getDate() : '0' + new Date(time).getDate();

    return { year, month, date }
}

/**
 * 实例化axios对象，传入超时时间5s
 */
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * ajax post 请求 
 * @param {*} url 请求地址
 * @param {*} params  请求参数
 */
export const ajaxPost = (url, params) => {
    let axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // 'token': getStore('token'),
            // 'sign': getStore('sign')
        },
        // timeout: 5000
        transformRequest: [function(data) {
            var data = data || {};
            // Do whatever you want to transform the data
            // var token = getStore('token');
            // var sign = getStore('sign');
            // if (token == null) {
            //     window.sessionStorage.clear();
            //     window.location.href = window.location.origin + window.location.pathname + '#/login';
            // } else {
            //     data.token = token;
            //     data.sign = sign;
            // }
            return JSON.stringify(data);
        }],
        transformResponse: [function(data) {
            var data = typeof data == 'string' ? JSON.parse(data) : data;
            if (data != null) {
                // if (data.code == 80008) {
                //     window.location.href = window.location.origin + window.location.pathname + '#/login';
                // }
            }
            return data;
        }],
    });
    return axiosInstance.post(url, params)
}

/**
 * ajax get 请求 
 * @param {*} url 请求地址
 * @param {*} params  请求参数
 * @param {*} isQuery  是否添加？，默认添加
 */

export const ajaxGet = (url, params, isQuery) => {

    let axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // 'token': getStore('token'),
            // 'sign': getStore('sign')
        },
        // timeout: 5000
        // transformRequest: [function(data) {
        //     var data = data || {};
        //     // Do whatever you want to transform the data
        //     var token = getStore('token');
        //     var sign = getStore('sign');
        //     if (token == null) {
        //         window.sessionStorage.clear();
        //         window.location.href = window.location.origin + window.location.pathname + '#/login';
        //     } else {
        //         data.token = token;
        //         data.sign = sign;
        //     }
        //     return JSON.stringify(data);
        // }],
        transformResponse: [function(data) {
            var data = typeof data == 'string' ? JSON.parse(data) : data;
            if (data != null) {
                // if (data.code == 80008) {
                    // window.location.href = window.location.origin + window.location.pathname + '#/login';
                // }
            }
            return data;
        }],
    });
    // var data = {};
    // var token = getStore('token');
    // var sign = getStore('sign');
    // if (token == null) {
    //     window.sessionStorage.clear();
    //     // window.location.href = window.location.origin + window.location.pathname + '#/login';
    // } else {
    //     data.token = token;
    //     data.sign = sign;
    // }
    var data = deepExtend(data, params);
    var queryParams = qs.stringify(data, { addQueryPrefix: isQuery != null && isQuery != undefined ? isQuery : true });
    return axiosInstance.get(url, { params: data })
}


/**
 * 获取自定义维度
 * @param {*} params 参数对象，格式{wid：143，classif:"province/content/site"}
 */
export const getTerminalPlatform = (params) => {
    var url = ""; //???
    var params = params ? params : {};
    return ajaxPost('/ai/adapter/searchparam/terminal', params).then(data => {
        var data = typeof data == "string" ? JSON.parse(data) : data;
        let { code, msg, result } = data.data;
        if (code == 0) {
            return Promise.resolve(result.data)
        } else {
            throw new Error(`error code is : ${code} and msg is : ${msg}`)
        }
    }).catch((err) => {
        console.log(err);
        return Promise.reject(err);
    })
}

/**
 * 获取图形数据
 * @param {*} options 参数对象，参考wiki
 */
export const getChartData = (options, url) => {
    var params = Object.assign({}, options || {});
    var url = !url ? '/yicheindex/index/report/chart' : url;
    return ajaxPost(url, params).then(data => {
        var data = typeof data == "string" ? JSON.parse(data) : data;
        let { code, msg, result } = data.data;
        if (code == 0) {
            if (result && result.data) {
                return setPromise(result.data);
            } else {
                return null
            }
        } else {
            throw new Error(`error code is : ${code} and msg is : ${msg}`)
        }
    }, err => {
        return Promise.reject(err)
    })
};

export const getTableData = (options, url, method) => {
    var params = Object.assign({}, options || {});
    var url = !url ? '/ai/data/marking_large' : url;
    var method = method ? method : 'post';

    return method == 'post' ? ajaxPost(url, params).then(data => {
        var data = typeof data == "string" ? JSON.parse(data) : data;
        let { code, msg, result } = data.data;
        if (code == 0) {
            if (result != null) {
                return Promise.resolve(result)
            } else {
                return null
            }
        } else {
            var isShowNoData = true;
            console.log(isShowNoData)
            throw new Error(`error code is : ${code} and msg is : ${msg}`)
        }
    }, (err) => {
        console.log(err);
    }) : ajaxGet(url, params).then(data => {
        var data = typeof data == "string" ? JSON.parse(data) : data;
        let { code, msg, result } = data.data;
        if (code == 0) {
            if (result != null) {
                return Promise.resolve(result)
            } else {
                return null
            }
        } else {
            throw new Error(`error code is : ${code} and msg is : ${msg}`)
        }
    }, (err) => {
        console.log(err);
    })
};

var pluginsName = function(obj) {
    if (obj instanceof pluginsName) return obj;
    if (!(this instanceof pluginsName)) return new pluginsName(obj);
    this.pluginsNamewrapped = obj;
};

/**
 * 节流函数，自动搜索
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} mustRunDelay 
 */
export const throttle = (fn, delay, mustRunDelay) => {
    let timer = null
    let t_start
    return function() {
        const context = this
        const args = arguments
        let t_curr = +new Date()

        clearTimeout(timer)
        if (!t_start) {
            t_start = t_curr
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args)
            t_start = t_curr
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, delay)
        }
    }
};

/**
 * 拼接字符串，拼接到search中
 */

export const serializeParams = (params) => {
    if (typeof params == "string") return params;
    let queryString = [];
    var queryParams = '';
    Object.keys(params).forEach((item, index) => {
        if (Object.prototype.toString.call(params[item]) == '[object Array]' || Object.prototype.toString.call(params[item]) == '[object Object]') {
            var tempItem = JSON.stringify(params[item]);
            queryString.push(item + '=' + encodeURIComponent(tempItem));
        } else {
            queryString.push(item + '=' + encodeURIComponent(params[item]));
        }
    })
    queryParams = queryString.length > 0 ? queryString.join('&') : "";
    return queryParams;

};


export const colorRgb = function(str, op) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        if (op != null && op != undefined) {
            if (op >= 0 && op < 1) {
                return "RGBA(" + sColorChange.join(",") + ',' + op + ")";
            }
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};
/**
 * 深度复制 有问题，暂时废弃吧
 */

// export const deepExtend = function extended() {
//     var target = arguments[0] || {},
//         deep = false,
//         i = 1;

//     const toString = Object.prototype.toString();
//     let { length: len } = arguments;

//     if (target == null) {
//         throw new TypeError('Cannot convert undefined or null to object');
//     }
//     if (typeof target == "boolean") {
//         deep = target;
//         target = arguments[i] || {};
//         i++;
//     }
//     // 如果是非对象类，如字符串，正则等
//     if (typeof target != "object" && isFunction(target)) {
//         target = {};
//     }
//     // 如果只有一个参数
//     if (len == i) {
//         target = arguments[0];
//         i--;
//     }

//     for (; i < len; i++) {
//         let source = arguments[i];

//         if (source != null) {
//             let srcStack = Object.getOwnPropertyNames(source); //获取非继承来的可枚举和不可枚举对象
//             for (let [item, index] of srcStack) {
//                 let tarElem = target[item];
//                 let srcElem = source[item]
//                 if (tarElem == srcElem) {
//                     continue
//                 }
//                 if (toString.call(source[item]) == "[Object Object]" || srcElem && toString.call(source[item]) == "[Object Array]") {
//                     target[item] = extended(true, tarElem, srcElem)
//                 } else {
//                     target[item] = source[item]
//                 }
//             }

//         }
//     }
//     return target;
// }
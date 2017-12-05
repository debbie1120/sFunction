/*******************************************************************************
 * sFunction.js -  sFunction Script library
 * Version v1.0.0
 * Copyright (C) 2017 Scott
 *
 * @Author Scott
 * @Email scottcoder@163.com
 * @UpdateTime (2017-12-01)
 * @Desc 常用函数库
 *******************************************************************************/

(function (win, undefined) {
	"use strict";
	
	var S = win.S || {};
	
	/**********************************  字符串 *********************************/
	
	
	/**
     * @Dsec 清除空格
     * @Param {String} str 需要清除的字符串
	 * @Param {Number} type 1-所有空格  2-前后空格  3-前空格 4-后空格
     * @Return {String}
    */
	S.trim = function (str, type) {
		type = type || 1;
		switch (type) {
		case 1:
			return str.replace(/\s+/g, "");
		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, "");
		case 3:
			return str.replace(/(^\s*)/g, "");
		case 4:
			return str.replace(/(\s*$)/g, "");
		default:
			return str;
		}
	};
	
	/**
     * @Dsec 字母大小写切换
     * @Param {String} str 需要转换的字符串
	 * @Param {Number} type 1-首字母大写 2-首字母小写 3-大小写转换 4-全部大写 5-全部小写
     * @Return {String}
    */
	S.changeCase = function (str, type) {
		type = type || 1;
		switch (type) {
			case 1:
				return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
					return v1.toUpperCase() + v2.toLowerCase();
				});
			case 2:
				return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
					return v1.toLowerCase() + v2.toUpperCase();
				});
			case 3:
				var itemText = ""
				str.split("").forEach(
					function (item) {
						if (/^([a-z]+)/.test(item)) {
							itemText += item.toUpperCase();
						}
						else if (/^([A-Z]+)/.test(item)) {
							itemText += item.toLowerCase();
						}
						else{
							itemText += item;
						}
					});
				return itemText;
			case 4:
				return str.toUpperCase();
			case 5:
				return str.toLowerCase();
			default:
				return str;
		}
	}
	
	/**
     * @Dsec 字符串替换
     * @Param {String} str 需要处理的字符串
	 * @Param {String} AFindText 要替换的字符
	 * @Param {String} ARepText 替换成什么字符
     * @Return {String}
    */
	S.replaceAll = function (str,AFindText,ARepText) {
		var raRegExp = new RegExp(AFindText,"g");
		return str.replace(raRegExp,ARepText);
	};
	
	/**
     * @Dsec 字符串检测
     * @Param {String} str 需要检测的字符串
	 * @Param {String} type 
     * @Return {Boolean}
    */
	S.checkString = function (str,type) {
		switch (type) {
			case 'email':
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'phone':
				return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
			case 'tel':
				return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
			case 'number':
				return /^[0-9]$/.test(str);
			case 'english':
				return /^[a-zA-Z]+$/.test(str);
			case 'chinese':
				return /^[\u4E00-\u9FA5]+$/.test(str);
			case 'lower':
				return /^[a-z]+$/.test(str);
			case 'upper':
				return /^[A-Z]+$/.test(str);
			default :
				return true;
		}
	};
	
	/**
     * @Dsec 密码强度检测
     * @Param {String} str 需要检测的密码
     * @Return {Number}
    */
	S.checkPwdStrength = function(str){
		var strength = 0;
		
		if (str.length < 6) {// 小于六位
			return strength
		};
		
		if (/[0-9]/.test(str)) {// 包含数字
			strength++
		};
		
		if (/[a-z]/.test(str)) {// 包含小写字母
			strength++
		};
		
		if (/[A-Z]/.test(str)) {// 包含大写字母
			strength++
		};
		
		if (/[\.|-|_]/.test(str)) {// 包含特殊字符
			strength++
		};
		
		return strength;
	}
	
	/**
     * @Dsec 生成Guid
     * @Param {Number} length 需要的Guid长度
	 * @Param {Boolean} isUpperCase 是否需要字母转大写，true-大写 false-小写
     * @Return {String}
    */
	S.getGuid = function(length,isUpperCase){
		var result = "";
		length = length || 32;
	    for (var i = 1; i < length; i++){
	      	var num = Math.floor(Math.random()*16.0).toString(16);
			if(isUpperCase){
				num = num.toLocaleUpperCase();
			}
	       	result += num;
	 	}
	    return result;
	};
	
	/**
	 * 
	 * @Dsec 现金额转大写
	 * @Param {Number} num 
	 * @Return {String}
	*/
	S.digitUppercase = function(num) {
		var fraction = ['角', '分'],
			digit = ['零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖'],
			unit = [
				['元', '万', '亿'],
				['', '拾', '佰', '仟']
			];
		var head = num < 0 ? '欠' : '';
		num = Math.abs(num);
		var s = '';
		for (var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		num = Math.floor(num);
		for (var i = 0; i < unit[0].length && num > 0; i++) {
			var p = '';
			for (var j = 0; j < unit[1].length && num > 0; j++) {
				p = digit[num % 10] + unit[1][j] + p;
				num = Math.floor(num / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元')
			.replace(/(零.)+/g, '零')
			.replace(/^整$/, '零元整');
	};
	
	/**
	 * 
	 * @Dsec 格式化数字为金额格式
	 * @Param {Number} num 
	 * @Return {String}
	*/
	S.number2money = function(str){
		if(S.isNumber(str)){
			str = "" + str;
		}
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	/**********************************  数组 **********************************/
	
	/**
	 * 
	 * @Dsec 数组去重
	 * @Param {Array} arr 需要去重的数组
	 * @Return {Array}
	*/
	S.removeRepeatArray = function (arr){
    	return Array.from(new Set(arr))
	}
	
	/**
	 * 
	 * @Dsec 打乱数组顺序
	 * @Param {Array} arr 需要打乱的数组
	 * @Return {Array}
	*/
	S.upsetArray = function (arr) {
    	return arr.sort(function(){ return Math.random() - 0.5});
	}
	
	/**
	 * 
	 * @Dsec 取数组中的最大值(数字型数组)
	 * @Param {Array} arr 
	 * @Return {Number}
	*/
	S.maxInArray = function (arr) {
    	return Math.max.apply(null,arr);
	}
	
	/**
	 * 
	 * @Dsec 取数组中的最小值(数字型数组)
	 * @Param {Array} arr 
	 * @Return {Number}
	*/
	S.minInArray = function (arr) {
    	return Math.min.apply(null,arr);
	}
	
	/**
	 * 
	 * @Dsec 数组求和(数字型数组)
	 * @Param {Array} arr 
	 * @Return {Number}
	*/
	S.sumForArray = function (arr) {
		var result = 0;
		for(var i=0,len=arr.length;i<len;i++){
			result += arr[i];
		}
		return result
	}
	
	/**
	 * 
	 * @Dsec 数组求平均值(数字型数组)
	 * @Param {Array} arr
	 * @Param {Number} fix 结果保留的小数位长度
	 * @Return {Number}
	*/
	S.covForArray = function (arr,fix) {
		var result = S.sumForArray(arr)/arr.length;
		if(fix){
			result = result.toFixed(fix);
		}
		return result
	}
	
	/**
	 * 
	 * @Dsec 数组(字符串)中一个元素出现的次数
	 * @Param {Object} obj 数组/或者字符串
	 * @Param {Number||String} ele 需要计算的元素
	 * @Return {Number}
	*/
	S.getEleCount = function (obj, ele) {
		var count = 0;
		for (var i = 0, len = obj.length; i < len; i++) {
			if (ele == obj[i]) {
				count++;
			}
		}
		return count;
	}
	
	
	/**********************************  Dom操作 **********************************/
	
	/**
	 * 
	 * @Dsec 设置css样式
	 * @Param {Object} obj Dom元素
	 * @Param {Object} css 字符串则返回值，json则设置样式
	 * @Return {String}
	*/
	S.style = function (obj,css){
		if(S.isString(css)){
			return obj.style[css]
		};
		
		if(S.isObject(css)){
			for(var attr in css){
				obj.style[attr] = css[attr]
			}
		}
	}
	
	/**
	 * 
	 * @Dsec 设置html
	 * @Param {Object} obj Dom元素
	 * @Param {String} code [可选] 不传则返回html代码，有值则赋值
	 * @Return {String}
	*/
	S.html = function (obj,code){
		if(!code || code == undefined){
			return obj.innerHTML;
		}else{
			obj.innerHTML = code;
		}
	}
	
	/**
	 * 
	 * @Dsec 设置文本内容
	 * @Param {Object} obj Dom元素
	 * @Param {Object} text [可选] 不传则返回文本内容，有值则赋值
	 * @Return {String}
	*/
	S.text = function (obj,text){
		if(!text || text == undefined){
			return obj.innerText;
		}else{
			obj.innerText = text;
		}
	}
	
	/**
	 * 
	 * @Dsec 判断是否含有某个类名
	 * @Param {Object} obj Dom元素
	 * @Param {String} classStr 需要判断的类名
	 * @Return null
	*/
	S.hasClass = function (obj,classStr){
    	var arr = obj.className.split(/\s+/);
    	return (arr.indexOf(classStr)==-1)?false:true;
	}
	
	/**
	 * 
	 * @Dsec 添加类
	 * @Param {Object} obj Dom元素
	 * @Param {String} classStr 需要添加的类名
	 * @Return null
	*/
	S.addClass = function (obj,classStr){
		if(obj.className !== ""){
			classStr = " " + classStr;
		}
		if (!S.hasClass(obj,classStr)){
			obj.className += classStr
		};
	}
	
	/**
	 * 
	 * @Dsec 删除类
	 * @Param {Object} obj Dom元素
	 * @Param {String} classStr 需要删除的类名
	 * @Return null
	*/
	S.removeClass = function (obj,classStr){
		if (S.hasClass(obj,classStr)) {
			var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
			obj.className = obj.className.replace(reg, '');
		}
	}
	
	/**
	 * 
	 * @Dsec 替换类
	 * @Param {Object} obj Dom元素
	 * @Param {String} oldClass 旧类名
	 * @Param {String} newClass 新类名
	 * @Return null
	*/
	S.replaceClass = function (obj,oldClass,newClass){
		S.removeClass(obj,oldClass);
		S.addClass(obj,newClass);
	}
	
	/**
	 * 
	 * @Dsec 获取兄弟元素
	 * @Param {Object} obj Dom元素
	 * @Return {Array}
	*/
	S.siblings = function (obj){
		var result = [];
		
		// obj的哥哥
		var prevObj = obj.previousSibling;
		while(prevObj){
			if(prevObj.nodeType === 1 && prevObj.tagName !== "SCRIPT" &&  prevObj.tagName !== "STYLE"){ 
				result.push(prevObj); 
			} 
			prevObj = prevObj.previousSibling;
		} 
		result.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
		
		// obj的弟弟
		var nextObj = obj.nextSibling;
		while(nextObj){
			if(nextObj.nodeType === 1 && nextObj.tagName !== "SCRIPT" &&  nextObj.tagName !== "STYLE"){ 
				result.push(nextObj); 
			} 
			nextObj = nextObj.nextSibling; 
		}
		return result;
	}
	
	
	/**********************************  类型判断 **********************************/

 	/**
     * @Dsec 是否为函数类型
     * @Param {Any} any 被检测的变量
     * @Return {Boolean}
     */
 	S.isFunction = function(any){
  		return Object.prototype.toString.call(any) === '[object Function]';  
	};
	
	/**
     * @Dsec 是否为数组对象类型
     * @Param {Any} any 被检测的变量
     * @Return {Boolean} 结果
     */
	S.isArray = Array.isArray || function(any) { 
  		return Object.prototype.toString.call(any) === '[object Array]';  
	}
	
	/**
     * @Dsec 是否为日期类型
     * @Param {Any} any 被检测的变量
     * @Return {boolean}
     */
	S.isDate = function(any) { 
  		return Object.prototype.toString.call(any) === '[object Date]';  
	}
	
	/**
     * @Dsec 是否为字符串类型
     * @Param {Any} any 被检测的变量
     * @Return {Boolean}
     */
	S.isString = function(any){
		return typeof any === "string";
	}
	
	/**
     * @Dsec 是否为数字类型(为Number且不为正负无穷大数字)
     * @Param {Any} any 被检测的变量
     * @Return {Boolean}
     */
    S.isNumber = function(any){
        return typeof any === 'number' && isFinite(any);
    };

    /**
     * @Dsec 是否为布尔值类型
     * @Param {Any} any 被检测的变量
     * @Return {Boolean}
     */
    S.isBoolean = function(any){
        return typeof any === 'boolean';
    };
	
	/**
     * @Dsec 是否为空对象 null和undefined和数组的长度为0或空字符串("")
     * @Param {Any} any 被检测的变量 
     * @Param {Boolean} allowBlank [可选] 默认false 空字符串认为是空对象 反之 空字符串不认为是空对象
     * @Return {Boolean}
     */
    S.isEmpty = function(any, allowBlank){
        return any === null || any === undefined ||
        (S.isArray(any) && !any.length) ||
        (!allowBlank ? any === '' : false);
    };

	/**
     * @Dsec 是否为正则表达式类型
     * @Param {Any} any 被检测的变量
     * @Return {Boolean}
     */
    S.isRegexp = function(any){
        return Object.prototype.toString.call(any) == '[object RegExp]';
    };

    /**
     * @Dsec 是否为对象类型
     * @Param {Any} any 被检测的变量
     * @return {boolean}
     */
    S.isObject = function(any){
        return !!any && Object.prototype.toString.call(any) === '[object Object]';
    };

	/**
     * @Dsec 判断是否为Android环境
     * @return {Boolean}
     */
	S.isAndroid = function(){
		var UA = navigator.userAgent;
	    var isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Linux') > -1; //android终端或者uc浏览器
		return isAndroid;
	}

	/**
     * @Dsec 判断是否为IOS环境
     * @return {Boolean}
     */
	S.isIOS = function(){
		var UA = navigator.userAgent, app = navigator.appVersion;
		var isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isiOS;
	}
	
	
	/**********************************  缓存存储 **********************************/
	

    /**
     * @Dsec 设置cookie
     * @Param {String} name 被检测的变量
     * @Param {String} value 被检测的变量
     * @Param {String} days 被检测的变量
     * @Return {boolean}
     */
	S.setCookie = function (name,value,days){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+days);
		document.cookie = name+'='+value+';expires='+oDate;
	}
	
	/**
     * @Dsec 获取cookie
     * @Param {String} name cookie名称
     * @Return {boolean}
     */
	S.getCookie = function (name){
 		var arr = document.cookie.replace(/\s/g, "").split(';');
		for (var i = 0; i < arr.length; i++) {
			var tempArr = arr[i].split('=');
			if (tempArr[0] == name) {
				return decodeURIComponent(tempArr[1]);
			}
		}
		return '';
	}
	
	/**
     * @Dsec 删除cookie
     * @Param {String} name 需要删除的cookie名称
     * @return {boolean}
     */
	S.removeCookie = function (name) {
		// 设置已过期，系统会立刻删除cookie
		S.setCookie(name,1,-1);
	}
	
	/**
     * @Dsec 设置localStorage
     * @Param {String} name
     * @Param {any} value
     * @Return null
     */
	S.setLocalStorage = function (name,value) {
		if (S.isObject(value)) {
			value = JSON.stringify(value);
		}
		localStorage.setItem(name,value);
	}
	
	/**
     * @Dsec 获取localStorage
     * @Param {String} name
     * @Return {any}
     */
	S.getLocalStorage = function (name) {
		var result = localStorage.getItem(name);
		if (result !== undefined && S.isString(result)) {
			try {
				result = JSON.parse(result);
			} catch (ex) {
				result = "not found" + name;
			}
		}
		return (result == undefined) ? null : result;
	}
	
	/**
     * @Dsec 删除localStorage
     * @Param {String} name 未传入则删除所有
     * @Return null
     */
	S.removeLocalStorage = function (name) {
		if(name){
			localStorage.removeItem(name);
		}else{
			localStorage.clear();
		}
	}
	
	/**
	 * @Dsec 设置sessionStorage
	 * @Param {String} name
	 * @Param {any} value
	 * @Return null
	 */
	S.setSessionStorage = function (name, value) {
		if (S.isObject(value)) {
			value = JSON.stringify(value);
		}
		sessionStorage.setItem(name,value);
	}
	
	/**
	 * @Dsec 获取sessionStorage
	 * @Param {String} name
	 * @Return null
	 */
	S.getSessionStorage = function (name) {
		var result = sessionStorage.getItem(name);
		if (result !== undefined && S.isString(result)) {
			try{
				result = JSON.parse(result);
			}catch(ex){
				result = "not found" + name;
			}
		}
		return (result == undefined ) ? null : result;
	}
	
	/**
	 * @Dsec 删除sessionStorage
	 * @Param {String} name  未传入则删除所有
	 * @Return null
	 */
	S.removeSessionStorage = function (name) {
		if (name) {
			sessionStorage.removeItem(name);
		}else{
			sessionStorage.clear();
		}
	}
	
	
	/******************************* 其他类型 ********************************/
	
	/**
	 * @Dsec 日期格式化
	 * @Param {Date} date
	 * @Param {String} format
	 * @Return {String}
	*/
	S.dateFormat = function(date,format){
		format = format || "yyyy-MM-dd hh:mm:ss";
		if(date){
			if(!S.isDate(date)){
				date = new Date(date);
			}
		}else{
			date = new Date();
		}
		var o = {
            "M+":date.getMonth() + 1, 
            "d+":date.getDate(),  
            "h+":date.getHours(),  
            "m+":date.getMinutes(), 
            "s+":date.getSeconds(), 
            "q+":Math.floor((date.getMonth() + 3) / 3),  
            "S":date.getMilliseconds()
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
	}
	
	/**
	 * @Dsec 获取URL中的参数
	 * @Param {String} key 参数名称
	 * @Param {String} url 可选，默认location.search
	 * @Return {String}
	*/
	S.getQueryString = function(key,url){
		url = url || location.search;
		if (key != null && key != "" && key != undefined) {
			var value = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
			return value ? value[1] : value;
		}
		var result = url.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
		if (result == null) return null;
		for (var i = 0; i < result.length; i++) {
			result[i] = result[i].substring(1);
		}
		return result;
	}
	
	/**
	 * @Dsec form表单提交方式下载文件
	 * @Param {String} url 下载地址接口
     * @Param {Object} params [可选] 下载接口参数对象
	 * @Return {any}
	*/
	S.download = function(url,params){
		var tempForm = document.createElement("form");
		debugger
		tempForm.setAttribute("target","_blank");
		tempForm.setAttribute("method","post");
		tempForm.setAttribute("name","sDownLoad");
		tempForm.setAttribute("action",url);
		
		for(var key in params){
			var tempInput = document.createElement("input");
			tempInput.setAttribute("type","hidden");
			tempInput.setAttribute("name",key);
			tempInput.setAttribute("value",params[key]);
			tempForm.append(tempInput);
		}
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(tempForm);
		tempForm.submit();
		tempForm.remove();
	}
	
	/**
	 * @Dsec JS文件加载
	 * @Param {String} url 文件地址
     * @Param {Function} callBack [可选] 完成后回调函数
	 * @Return {any}
	*/
	S.jsLoader = function(url,callBack){
		if(!url || url == null || url == undefined) return;
		url = url + "?" + new Date().getTime();
		var header = document.getElementsByTagName("head")[0],
			script = document.createElement("script"),
            clear = function () {
                script.onload = script.onreadystatechange = script.onerror = null;
                header.removeChild(script);
                header = script = null;
            },
            complate = function () {
                clear();
                if (typeof callBack == "function") callBack();
            };
		
		script.src = url;
		
        script.onerror = function () {
            clear();
        };

        if (document.all) {
            script.onreadystatechange = function () {
                if (/loaded|complete/.test(script.readyState)) complate();
            };
        } else {
            script.onload = function () {
                complate();
            };
        }

        header.appendChild(script);
	}
	
	/**
	 * @Dsec css文件加载
	 * @Param {String} url 文件地址
     * @Param {Function} callBack [可选] 完成后回调函数
	 * @Return {any}
	*/
	S.cssLoader = function(url,callBack){
		if(!url || url == null || url == undefined) return;
		url = url + "?" + new Date().getTime();
		
		var header = document.getElementsByTagName("head")[0],
			css = document.createElement("link"),
			clear = function(){
				css.onload = css.onerror = null;
				header = null;
			},
			complate = function(){
                clear();
                if (typeof callBack == "function") callBack();
			};
		
        css.rel = "stylesheet";
        css.type = "text/css";
        css.href = url;

        css.onerror = function () {
            clear();
        };

        css.onload = function () {
            complate();
        };

        header.appendChild(css);
	}
	
	
	win.S = S;
})(window);
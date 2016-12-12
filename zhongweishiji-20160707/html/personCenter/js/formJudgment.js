"use strict";
/**
 * 
 * @authors xichen Liu
 * @date    2016-08-26 11:13:48
 * @version 1.0.0
 */

/**
 * [formJudgment 表单判断]
 */
var formJudg = function(){
	this._eJudgBtn;//表单判断按钮
	this._aInputList = [];//表单input框列表
	this._fCallback;//回调函数
	this._nInitCount = 0;//初始化长度计数
	this._nJudgCount = 2;//长度判断计数
	this._bTypeState = true;//input框类型判断
	this._bMinState = true;//最小值状态
	this._bMaxState = true;//最大值状态

}

formJudg.prototype = {
	/**
	 * [setJudgBtn 设置判断按钮]
	 * @param {string} sType [按钮类型]
	 */
	setJudgBtn:function(sType){
		this._eJudgBtn = this._getEl(sType);
		this._submitBtnEv();
		return this;
	},
	/**
	 * [getJudgBtn 获取判断按钮]
	 * @return {element} [判断按钮]
	 */
	getJudgBtn:function(){
		return this._eJudgBtn;
	},
	/**
	 * [setInputList 设置表单列表]
	 * @param {array} aInputListData [表单列表]
	 */
	setInputList:function(aInputListData){
		this._aInputList = aInputListData;
		this._formProcess();
		return this;
	},
	/**
	 * [_formProcessing 表单处理]
	 */
	_formProcess:function(){
		var aInputList = this._aInputList;//表单列表
		var nInputListLen = aInputList.length;

		if(aInputList.length){//判断是否存在input框
			for (var i = 0; i < aInputList.length; ++i) {
				this._inputProcess(aInputList[i]);//对每个input框做单一处理
			}
		}
	},
	/**
	 * [_inputProcess input框处理]
	 * @param  {object} oInputData [input对象数据]
	 */
	_inputProcess:function(oInputData){
		var _self = this;
		var eInputEl = this._getEl(oInputData['inputEl']);//获取当前input框
		
		this._fChange = function(e){//闭包

			_self._inputJudge(e,oInputData);

		}

		eInputEl && this._addEvent(eInputEl,'change',this._fChange,false);//事件绑定
	},
	/**
	 * [_submitBtnEv 提交按钮事件]
	 */
	_submitBtnEv:function(){

		var _self = this;

		var aInputList = this._aInputList;//表单列表

		this._addEvent(this._eJudgBtn,'click',function(e){//处理菜单按钮事件绑定

			if(aInputList.length){

				for (var i = 0; i < aInputList.length; ++i) {

					_self._inputJudge(e,aInputList[i]);//对每个input框做单一处理

				}
				_self._formSubmit();
			}

		},false);
	},
	/**
	 * [_inputEv input框事件]
 	 * @param  {object}  e        [事件对象]
	 * @param  {object}  oCurObj  [input对象]
	 */
	_inputJudge:function(e,oCurObj){

		var eInputEl = this._getEl(oCurObj['inputEl']);

		for(var key in oCurObj){
			switch (key) {
				case 'type':{//input类型
					this._typeHandle(oCurObj,eInputEl);
				}
					break;
				case 'minLen':{//最小长度
					this._minHandle(oCurObj,eInputEl);

				}
					break;
				case 'maxLen':{//最大长度
					this._maxHandle(oCurObj,eInputEl);
				}
					break;
			}
		}
	},
	/**
	 * [_typeHandle 类型判断]
	 * @param  {object}  oCurObj   [当前对象]
	 * @param  {element} eInputEl  [input框]
	 */
	_typeHandle:function(oCurObj,eInputEl){
		console.log('这是类型判断');
		var sCurType = oCurObj['type'];
		var bState;
		var sVal = eInputEl.value;
		switch (sCurType) {
			case 'phone':{//手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				this._bTypeState = reg.test(sVal);
			}
				break;
			case 'email':{//邮箱
				var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				this._bTypeState = reg.test(sVal);
			}
				break;
			case 'phone || email':{
				var regPhone = /^1[3|4|5|7|8]\d{9}$/;
				var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				if(regPhone.test(sVal) || regEmail.test(sVal)){
					this._bTypeState = true;
				}
				else {
					this._bTypeState = false;
				}

			}
				break;
		}
		this._viewResult(oCurObj['type'],this._bTypeState);
	},
	/**
	 * [_minHandle 最小值判断]
	 * @param  {object}  oCurObj   [当前对象]
	 * @param  {element} eInputEl  [input框]
	 */
	_minHandle:function(oCurObj,eInputEl){
		console.log('这是最小值判断');

		var nCurLen = eInputEl.value.length;//当前input框长度
		var nMinLen = oCurObj['minLen'];//最小长度

		if(nCurLen < nMinLen){//是否符合最小值要求
			this._bMinState = false;
		}
		else {
			this._bMinState = true;
		}

		this._resultJudg('minLen',this._bMinState);
	},
	/**
	 * [_maxHandle 最大值判断]
	 * @param  {object}  oCurObj   [当前对象]
	 * @param  {element} eInputEl  [input框]
	 */
	_maxHandle:function(oCurObj,eInputEl){
		console.log('这是最大值判断');

		var nCurLen = eInputEl.value.length;//当前input框长度
		var nMaxLen = oCurObj['maxLen'];//最大长度

		if(nCurLen > nMaxLen){//是否符合最大值要求
			this._bMaxState = false;
		}
		else {
			this._bMaxState = true;	
		}

		this._resultJudg('maxLen',this._bMaxState);
	},
	/**
	 * [_resultJudg 长度判断]
	 * @param  {string}  sJudgType [判断类型]
	 * @param  {boolean} bState    [判断状态]
	 */
	_resultJudg:function(sJudgType,bState){
		var bCurState = false;

		++this._nInitCount;

		if(this._bMinState && this._bMaxState){
			bCurState = true;
		}

		if(this._nInitCount == this._nJudgCount){
			this._viewResult('valLen',bCurState);
			this._nInitCount = 0;
		}
	},
	/**
	 * [getInputList 获取表单列表]
	 * @return {array} [表单数组]
	 */
	getInputList:function(){
		return this._aInputList;
	},
	/**
	 * [clearInputList 清空表单列表]
	 */
	clearInputList:function(){
		this._aInputList = [];
		return this;
	},
	/**
	 * [addInputList 添加input列表]
	 * @param {object} oInputData [input对象数据]
	 */
	addInputList:function(oInputData){
		this._aInputList.push(oInputData);
		return this;
	},
	/**
	 * [_formSubmit 表单提交]
	 */
	_formSubmit:function(){
		var bState = false;
		if(this._bTypeState && this._bMinState && this._bMaxState){
			bState = true;
		}
		this._fFormSubmitFn.call(this,bState);
	},
	setFormSubmitFn:function(fFormSubmitFn){
		this._fFormSubmitFn = fFormSubmitFn;
	},
	/**
	 * [_viewResult 显示结果]
	 * @param  {string}  sJudgType [判断类型]
	 * @param  {boolean} bState    [判断状态]
	 */
	_viewResult:function(sJudgType,bState){
		if(this._fCallback){
			this._fCallback.call(this,sJudgType,bState);
		}
	},
	/**
	 * [setCallback 设置回调函数]
	 * @param {function} fCallback [回调函数]
	 */
	setCallback:function(fCallback){
		this._fCallback = fCallback;
		return this;
	},
	/**
	 * [_getEl 获取元素]
	 * @param  {string}  sType [元素类型]
	 * @return {element}       [当前元素]
	 */
	_getEl:function(sType){
		return typeof sType === 'string' ? document.querySelector(sType) : sType;
	},
    /**
     * [_addEvent 添加事件]
     * @param  {element}   el    [事件对象]
     * @param  {string}    sEv    [事件类型]
     * @param  {Function}  fn     [事件方法]
     * @param  {booloean}  state  [事件状态]
     */
    _addEvent: function (el, sEv, fn, state) {
        if (el.addEventListener) {
            el.addEventListener(sEv, fn, state);
        }
        else {
            el.attachEvent('on' + sEv, function () {
                fn.call(el, event);
            });
        }
    },
    /**
     * [_removeEvent 移除事件]
     * @param  {element}   el    [事件对象]
     * @param  {string}    sEv    [事件类型]
     * @param  {Function}  fn     [事件方法]
     * @param  {booloean}  state  [事件状态]
     */
    _removeEvent: function (el, sEv, fn, state) {
        if (el.removeEventListener) {
            el.removeEventListener(sEv, fn, state);
        }
        else {
            el.detachEvent('on' + sEv, fn);
        }
    }
}

var oFormJudg = new formJudg();
"use strict";
/**
 * 
 * @authors xichen Liu
 * @date    2016-08-26 11:38:10
 * @version 1.0.0
 */

/**
 * [formJudgmentData 表单判断数据]
 */
var formJudgmentData = [
	{
		inputEl:'#phone',
		type:'phone'
	},
	{
		inputEl:'#verCode',
		minLen:4,
		maxLen:20
	},
	{
		inputEl:'#password',
		minLen:6,
		maxLen:20
	}
]
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
		inputEl:'#user',
		type:'phone || email'
	},
	{
		inputEl:'#passWord',
		minLen:4,
		maxLen:10
	}
]
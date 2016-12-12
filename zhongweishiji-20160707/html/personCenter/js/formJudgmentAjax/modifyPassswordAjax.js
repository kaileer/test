"use strict";
$(function(){
    oFormJudg.setInputList(formJudgmentData).setJudgBtn('#btn').setCallback(function(sJudgType,bState){
        console.log(sJudgType,bState);
    })
    oFormJudg.setFormSubmitFn(function(state){
        if(state){
            console.log('表单全部正确');
            $.ajax({
                url: "",
                type: "post",
                aysnc:false,
                data: {
                },
                success: function(data) {

                },
                error: function(err) {
                    
                }
            });
        }
        else {
            console.log('表单有错误');
        }
    });
});

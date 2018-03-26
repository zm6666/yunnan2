//=====================适配方案开始
 (function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 默认设计图为640的情况下1rem=100px；根据自己需求修改
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
 
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//=====================适配方案结束



//领取免费流量点击显示弹框
function drawClick() {
	$('.drawA').click(function () {
		$('.alert-draw').fadeIn('fast');
		$('.alert-drawInner').fadeIn('fast');
	})
}
drawClick();


//点击灰色背景弹框消失
function drawHide() {
	$('.close').click(function () {
		$('.alert-draw').fadeOut('fast');
		$('.alert-drawInner').fadeOut('fast');
	})
}
drawHide();


//手机号正则判断
function isPhone() {
	var tel=$('.ipt-phone').val();
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (reg.test(tel)) {
        $('.alert-draw').fadeOut('fast');
		$('.alert-drawInner').fadeOut('fast');
		alertShow();
        return true;
    } else {
    	$('.empty').show();
    	$('.sure').css({
			margin:'.17rem auto'
		})
        $('.empty').html('请输入正确的手机号！');
        return false;
    }
}

//点击确认按钮
function sureClick() {
	$('.sure').click(function () {
		if ($('.ipt-phone').val()=='') {
			$('.empty').html('请输入您的手机号，点击确认！');
			$('.empty').show();
			$('.sure').css({
				margin:'.17rem auto'
			})
		}else{
			var phone =$('.ipt-phone').val();
			//console.log(typeof(phone));
			var pram={};
		    pram["phone"]=phone;
	    	$.ajax({
	    		type:'POST',
	    		url:'/yn_activity/twoupfour/check',
	    		data:JSON.stringify(pram),
	    		dataType:'json',
	    		contentType:'application/json;charset=UTF-8',
	    		success:function (data) {
	    			if (data.code==0) {
		            	alertShow(data.message);
		            }else if (data.code==1) {
	    				$('.empty').html(data.message);
						$('.empty').show();
						$('.sure').css({
							margin:'.17rem auto'
						})
					}else if (data.code==2) {
						$('.empty').html(data.message);
						$('.empty').show();
				    	$('.sure').css({
							margin:'.17rem auto'
						})
					}else if (data.code==3) {
						alertShow(data.message);
					}else if (data.code==4) {
						alertShow(data.message);
					}else if (data.code==5) {
						alertShow(data.message);
					}else if (data.code==6) {
						alertShow(data.message);
					}
				},
				error:function(){
		            alert('服务器报错');
		        }
	    		
	    	})
			isPhone();
		}
	})
}
sureClick();


//输入框焦点事件
function iptFocus() {
	$('.ipt-phone').focus(function () {
		$('.empty').hide();
		$('.sure').css({
			margin:'.37rem auto'
		})
		$('.ipt-phone').select(); //获取焦点选中手机号
	})
}
iptFocus();


//z领取流量，显示弹框
function alertShow(msg) {
	$('.alert-draw').fadeIn('fast');
	$('.alert-mask').fadeIn('fast');
	$('.alert-maskWord').html(msg)
}



//点击灰色背景弹框消失
function drawHide2() {
	$('.close').click(function () {
		$('.alert-draw').fadeOut('fast');
		$('.alert-mask').fadeOut('fast');
	})
}
drawHide2();

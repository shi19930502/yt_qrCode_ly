'use strict';
var timerId;
var timer_85;
var timer;
var loading_num=0;
var evaluateArr=[];
var allEvaluateArr=[];
var swiperObj={};
$(function () {
//	timerId=window.setInterval(myAJAX,500);
	myAJAX();
	loading_num_f();
//	if(!GetRequest().time&&GetRequest().tranId){
//		window.location.href=location.href+'&time='+parseInt(Math.random()*100000)
//	}else{
//		myAJAX();
//		loading_num_f();
//	}
});
var dataObj={};
var oddActiveIndex=0;
var arr_1 = []; //田间
var arr_2 = []; //施肥
var arr_3 = []; //用药
//swiper动画效果等
function skip(flg_1,odd,swiper){
	if(flg_1){
		if(odd<swiper.activeIndex){
			////console.log('213213132132321',swiper.activeIndex+1,swiper.slides.length)
//			if(swiper.activeIndex+1==swiper.slides.length){
			if(swiper.isEnd){
				swiper.slideTo(odd, 0, true)
			}else{
				swiper.slideTo(swiper.activeIndex+1, 0, true)
			}
		}else{
			swiper.slideTo(swiper.activeIndex-1, 0, true)
		}
		oddActiveIndex=swiper.activeIndex
	}
////console.log('aaaaaajjjjj',flg_1,odd,swiper.activeIndex)
}
function animateSwiper() {
	 ////console.log('加载', 3);
	$('#loading').css({ display: 'none' });
	$('.ishow').css({ display: 'block' });
	////console.log(dataObj);
//	dataObj.aaData.ltxx=[];
	
	var swiper = new Swiper('.swiper-container', {
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true, //修改swiper的父元素时，自动初始化swiper
		pagination: '.swiper-pagination',
		paginationClickable: true,
		direction: 'vertical',
		onInit: function onInit(swiper) {
			//Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
			//			    alert(swiper.activeIndex)
		},
		onSlideChangeEnd: function onSlideChangeEnd(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			//判断当那个页面没有内容的时候直接跳过
			if(swiper.activeIndex == 1){
				skip(!dataObj.aaData.ncqh[0],oddActiveIndex,swiper);
			}else if(swiper.activeIndex == 2){
				skip(!dataObj.aaData.nw.length>0,oddActiveIndex,swiper);
			}else if(swiper.activeIndex == 3){
				skip(!dataObj.aaData.ltxx.length>0,oddActiveIndex,swiper);
			}
			//滚动判断
			if (swiper.activeIndex == 0) {
				if(dataObj.aaData.ltxx.length>0&&dataObj.aaData.ncqh[0]&&dataObj.aaData.nw.length>0){
					////console.log('xiangshuij',$('.upload .ani').attr('swiper-animate-delay'))
					$('.upload .ani').attr({
						'swiper-animate-delay': $('.upload .ani').attr('swiper-animate-delay').split('s')[0] - 2 + 's'
					});
				}
				//判断是否滑动了页面，当没有滑动了的时候给定位增加动画
				if(dataObj.aaData.ltxx.length>0||dataObj.aaData.ncqh[0]||dataObj.aaData.nw.length>0){
					$('#dy_img').addClass('dy_img animateTimeImg');
					$('#dy_name').addClass('dy_name animateTimeName');
				}
				setTimeout(function(){
		    		$('.amap-icon').css({
		    			display:'none'
		    		})
		    		$('#areaName').css({
		    			display:'none'
		    		})
		    	},3100)
			} else {
				$('.first .ani').attr({
					'swiper-animate-delay': '3.2s'
				});
				
				$('.first .amap-icon').attr('swiper-animate-duratio','2s')
				$('.first .amap-icon').attr('swiper-animate-delay','0.5s')
				$('#areaName').attr('swiper-animate-duratio','2s')
				$('#areaName').attr('swiper-animate-delay','1s')
				
				$('#dy_img').removeClass('dy_img animateTimeImg');
				$('#dy_name').removeClass('dy_name animateTimeName');
			}
			////console.log('s')
			if (swiper.activeIndex == 2) {
//				swiper.slideTo(4, 0, true)
				thrHtml(arr_1, '田间管理', true);
				$('.thr .administration-children-img').addClass('administrationAnimation');
			} else {
				$('.thr .administration-children-img').removeClass('administrationAnimation');
			}
		}
		//      effect: 'coverflow',//coverflow,cube
		//      grabCursor: true,
		//      slidesPerView: 1,
		//		centeredSlides: true,
		//      coverflow: {
		//          rotate: 30,//翻转角度
		//          stretch: 10,//翻转紧密度
		//          depth: 60,//翻转时的图片大小
		//          modifier: 2,
		//          slideShadows : true
		//      },
		//      cube: {
		//          shadow: true,
		//          slideShadows: true,
		//          shadowOffset: 20,
		//          shadowScale: 0.94
		//      },
		//      effect: 'flip',
		//      grabCursor: true,
		//      nextButton: '.swiper-button-next',
		//      prevButton: '.swiper-button-prev'

	});
//	//console.log('2',dataObj)
	swiperObj=swiper;
	if(dataObj.aaData){
		if(!(dataObj.aaData.ltxx.length>0||dataObj.aaData.ncqh[0]||dataObj.aaData.nw.length>0)){
			//当后面的没有东西时候，禁止滑动。
			swiper.disableTouchControl();
		};
	}
	var moreFlg=true;
	$('#checkMoreId').click(function(){
		$('#fanhuiId').css({display:'block'})
		
		//console.log(allEvaluateArr)
		$('#allEvaluateId').css({
			display:'block',
		})
		var str=''
		str=pinglun(allEvaluateArr);
		$('.mb_div_1').css({
			display:'none'
		})
		$('#allEvaluateListId').html(str);
		look_mb_div('allEvaluateId'); //是否显示蒙版
		pinlun_xq(swiperObj)
		
		swiper.disableTouchControl();
		moreFlg=false;
	})
	pinlun_xq(swiperObj)	
	
	$('#pinlunCloseId').click(function(){
		$('#pinlunShowId').css({
			display:'none',
		})
		if(moreFlg){
			swiper.enableTouchControl();
		}else{
			swiper.disableTouchControl();
		}
		
	})
	$('#fanhuiId').click(function(){
		moreFlg=true;
		swiper.enableTouchControl();
		$('#allEvaluateId').css({
			display:'none',
		})
		$('#pinlunShowId').css({display:'none',})
		$('#fanhuiId').css({display:'none'})
	})
}
//查看详情的评论内容
function  pinlun_xq(swiper){
		$('.evaluateLook_list').click(function(){
			if($(this).children()[2].style.display=='block'){
				swiper.disableTouchControl();
				$('#pinlunShowId').css({
					display:'block',
				})
				$('#h4_time').html($(this).children()[0].children[0].innerHTML)
				$('#pinlunShowId .content').html($(this).children()[1].children[0].innerHTML)
				$('#pinlunShowId .popup_introduce').css({
					height:($('#pinlunShowId .content').innerHeight()+$('#pinlunShowId .h4').innerHeight()+$('#pinlunCloseId').innerHeight())+'px',
				})
			}
			
		})
}
function map(){
	AMapUI.loadUI(['control/BasicControl','overlay/SimpleMarker'], function(BasicControl,SimpleMarker) {
			var layerCtrl = new BasicControl.LayerSwitcher({
		            theme: 'transparent',
		            //自定义基础图层*这里可以简写的，第一次用，就复杂写了*
		            baseLayers: [ {
		                enable: true,
		                id: 'satellite',
		                name: '图层B',
		                layer: new AMap.TileLayer.Satellite()
		            }],
		            //自定义覆盖图层
		            overlayLayers: [ {
		                id: 'roadNet',
		                name: '图层D',
		                enable: false,
		                layer: new AMap.TileLayer.RoadNet()
		            }]
		        });
		    var map = new AMap.Map('container', {
		        resizeEnable: true,
		      	center: [104.06, 33.67],
		        zoom: 1,
	//	      	layers: [new AMap.TileLayer.Satellite()],
		       	layers: layerCtrl.getEnabledLayers(),
		    });
		    map.addControl(layerCtrl);
		    //禁止拖动
		    map.setStatus({dragEnable: false});
		    //禁止双击放大
		    map.setStatus({doubleClickZoom: false});
		    if(dataObj.aaData.nodeInfo.length>0){
		    	var marker = new AMap.Marker({
		            map: map,
		            position:[dataObj.aaData.nodeInfo[0].gisX, dataObj.aaData.nodeInfo[0].gisY],
		    	});
//		    	new SimpleMarker({
//		            iconLabel: {
//	//	                innerHTML: '<div class="my-blue-point"><img src="//webapi.amap.com/theme/v1.3/hotNew.png"/></div>',
//		            	innerHTML: '<div class="my-blue-point "><img src="../imgs/one_icon_dingwei.png"/></div>',
//		            },
//		            iconStyle: 'black',
//		            map: map,
//			        position:[dataObj.aaData.nodeInfo[0].gisX, dataObj.aaData.nodeInfo[0].gisY],
//		       });
		    }
		    
		    ////console.log($('.amap-icon'))
		    //设置自定义图标
		    
			//地图图块加载完毕！
		    map.on('complete', function() {
		    	$('.loading').fadeOut(700);
				////console.log('.offset();',$('.amap-icon').offset())
				////console.log('.offset();',$('.amap-markers').offset())
		    	if($('.amap-icon').offset()){
		    		$('#areaName').css({
						top:($('.amap-icon').offset().top+$('.amap-icon').height()+5)+'px',
						left:($('.amap-icon').offset().left-$('#areaName').width()/2+6)+'px',
					})
		    	}else{
		    		$('#areaName').css({
						top:2.8*2+'rem',
						left:1.3*2+'rem',
					})
		    		//console.log('nodeInfo为空或者未找到nodeInfo的经纬度')
		    		if(dataObj.aaData.nodeInfo.length>0){
		    			$('#areaName').html('该地理位置不在此地图上')
		    		}
		    		$('#headerRightImg').css({display:'none'})
		    	}
				
				$('.amap-icon').attr('swiper-animate-effect','bounceInDown')
				$('.amap-icon').attr('swiper-animate-duratio','2.1s')
				$('.amap-icon').attr('swiper-animate-delay','1.5s')
				$('.amap-icon').addClass('ani')
				$('#areaName').attr('swiper-animate-effect','bounceInLeft')
				$('#areaName').attr('swiper-animate-duratio','2.1s')
				$('#areaName').attr('swiper-animate-delay','2s')
				setTimeout(function(){
		    		$('.amap-icon').css({
		    			display:'none'
		    		})
		    		$('#areaName').css({
		    			display:'none'
		    		})
		    	},4300)
				animateSwiper();
		    });
//		    AMap.event.addDomListener(document.getElementById('setCenter'), 'click', function() {
		        // 设置缩放级别和中心点
		//      map.setZoomAndCenter(1, [116.21, 39.91]);
		        // 在新中心点添加 marker 
			    
//		    });
	});
}
function myAJAX() {
	var sendDate=new Date();
	
//	
	getDataList(API_URL + 'importantGood/queryInfoByTranId', {
		tranId: tranId
	}, function (d) {
		var successDate=new Date();
		console.log(successDate-sendDate);
		var executeFunction=function(){
		
		if (d && d.state === 0&&d.aaData!=null) {
			clearInterval(timer_85);
			timer_85=setInterval(function(){
        		if(loading_num>=100){
//		        	//console.log(1)
		        	loading_num=100;
		        	clearInterval(timer_85);
//		        	 $('.loading').fadeOut(1500);
		        setTimeout(function () {
//	               animateSwiper();
//	               $('.loading').fadeOut(1500);
	                map();
	            }, 500);
		        }else{
		        	loading_num++;
		        }
		        $('#loading_num').html(loading_num + '%');
        	},20)
			dataObj=d;
			//检测
			jiance(d)
			//第一个页面
			firstHtml(d);
			//第三个页面
			d.aaData.nw=d.aaData.nw.reverse();
			//我要评价页面
			if(d.aaData.nodeInfo&&d.aaData.nodeInfo.length>0&&d.aaData.nodeInfo[0].marketId){
				plAjax(d.aaData.nodeInfo[0].marketId,false)
			}else{
				$('.zanwupl').html('无法获取企业信息')
				$('#checkMoreId').css({display:'none'})
			}
			
//			if(d.aaData.messages&&d.aaData.messages.length>0){
//				myEvaluate(d.aaData.messages);
//				allEvaluateArr=d.aaData.messages;
//				if(d.aaData.messages.length<=4){
//					$('#checkMoreId').css({display:'none'})
//				}
//			}else{
//				$('#checkMoreId').css({display:'none'})
//			}
			for (var a = 0; a < d.aaData.nw.length; a++) {
				if (d.aaData.nw[a].farm_type == '4') {
					arr_2.push(d.aaData.nw[a]); //施肥
				} else if (d.aaData.nw[a].farm_type == '5') {
					arr_3.push(d.aaData.nw[a]); //用药
				} else {
					arr_1.push(d.aaData.nw[a]); //田间
				}
			}
			thrHtml(arr_1, '田间管理', true);
			// ////console.log('加载', 1);
			//yhh
			if(d.aaData.ncqh[0]){
            	// 气候数据
	            renderFarmClimate(d.aaData.ncqh[0]);
	            // 基地信息
	            renderBaseInfo(d.aaData.ncqh[0]);
            }
            if(d.aaData.ltxx&&d.aaData.ltxx.length>0){
            	// 销售记录
            	renderXsjlList(d.aaData.ltxx,d.aaData.outquarantineinfo);
            }
//          map();
		}else if(d.statusText=='timeout'){
			//30s后请求超时,显示请求超时的画面
			clearInterval(timer);
			clearInterval(timer_85);
			$('.loading').fadeOut(500);
			$('.error_data_fail').html('请求超时！')
			$('.error_data_fail').css({color:'#818388'})
			$('.erroe_list').html('')
        	$('#error_data').css({display:'block'})
//      	||d.statusText=="error"
		}else{
			clearInterval(timer);
			clearInterval(timer_85);
			$('#error_data').css({display:'block'})
			$('.loading').fadeOut(500);
		}
		
		}
		if((successDate-sendDate)<2500){
			setTimeout(function(){
				executeFunction();
			},2500-(successDate-sendDate))
			
		}else{
			executeFunction();
		}
//		animateSwiper();
	});
}
function plAjax(nodeId,flg){
	getDataList(API_URL + 'messageComment/list', {
		nodeId: nodeId
		}, function (d) {
			if( d.state === 0&&d.msg=='success'){
				myEvaluate(d.aaData,flg);
				allEvaluateArr=d.aaData;
				if(d.aaData.length<=4){
					$('#checkMoreId').css({display:'none'})
				}else{
					$('#checkMoreId').css({display:'block'})
				}
			}
	})
}
function myEvaluate(arr,flg){
	var str='';
	evaluateArr=arr.slice(0,4);
	str=pinglun(evaluateArr)
	$('#evaluateLookC').html(str);
	if(flg){
		pinlun_xq(swiperObj)
	}
}
function jiance(d){
	
}
function firstHtml(d) {
	////console.log('obj',obj)
	if(d.aaData.zycpcx[0]){
		var obj = d.aaData.zycpcx[0];
		$('#baseName').html(obj.baseName);
		$('#nodename').html(obj.nodeName);
		$('#inDate').html(obj.inDate.split(' ')[0]);
		$('#plantDate').html(obj.plantDate);
		$('#precipitation').html(obj.precipitation + '%');
//		obj.goodsDes?$('#first_p').html(obj.goodsDes):$('#first_p').html('');
//		obj.goodsName?$('#goodsName').html(obj.goodsName):$('#goodsName').html('暂无数据');
		if(obj.goodsName){
			$('#goodsName').html(obj.goodsName)
			$('#first_p').html(obj.goodsName+'是桃的一个品种名称，是山果之珍。其特点是个头硕大，形态秀美，色泽鲜艳，皮薄肉嫩，果肉细腻，汁甜如蜜。');
		}else{
			$('#goodsName').html('暂无数据');
			$('#first_p').html('')
		}
		$('#hege').html('合格')
	}else{
		$('#hege').html('空')
	}
	//检测信息
	if(d.aaData.quarantineinfo&&d.aaData.quarantineinfo.length>0){
		if(d.aaData.quarantineinfo[0].pesticide===null){
			$('#pesticide').html(0+'%')
		}else{
			$('#pesticide').html(d.aaData.quarantineinfo[0].pesticide + '%')
			$('#hege').html(d.aaData.quarantineinfo[0].detectionResult)
		}
	}else{
		$('#pesticide').html(0+'%')
	}
	//模拟抑制率，使它更真实。
	if(!d.aaData.zycpcx[0]&&!(d.aaData.quarantineinfo&&d.aaData.quarantineinfo.length)){
		$('#pesticide').html(0+'%')
		$('#hege').html('空')
	}
	//第一个页面的图片
	if(d.aaData.goodProduct&&d.aaData.goodProduct.length>0){
		$('#first_img').attr({src:IMG_URL+d.aaData.goodProduct[0].imageUrl})
	}else{
		
		$('#first_img').attr({src:IMG_URL+''})
	}
	//header的地理位置信息
	if(d.aaData.nodeInfo.length>0){
		$('#headerRightText').html(d.aaData.nodeInfo[0].areaName)
//		$('#dy_name').html(d.aaData.nodeInfo[0].areaName)
		$('#areaName').html(d.aaData.nodeInfo[0].areaName)
	}else{
		$('#areaName').html('未获取到地理位置信息')
	}
}
function thrHtml(data_arr, name, isAni) {
	//可以用循环的。
	////console.log('obj',arr)
	// ////console.log('加载', 2);
	$('#headerTj').html(name);
	var arr = [];
	arr = data_arr.slice(0, 3);
	// ////console.log('123123', arr);
	for (var x = 0; x < 3; x++) {
		$('#is_show_' + x).css({ display: 'none' });
		$('#is_show_' + x).attr({
			'swiper-animate-delay': '0s'
		});
		//		animation-duration
	}
	if (name == '田间管理' && isAni) {
		var animated_ajax_ = 'animated_ajax_';
	} else {
		animated_ajax_ = '';
	}
	if (arr) {
		var strHtml = '';
		for (var a = 0; a < arr.length; a++) {
			if (!arr[a].f_inputs_name) {
				arr[a].f_inputs_name = '无';
			}
			//字符串方法,其中的动画也可以动态生成style。就不用class，拼接麻烦
			if (a % 2 == 0) {
				var strHtml_list = '<div  class="tj-message-1 ani ' + animated_ajax_ + a + ' " swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay="1s">' + '<div class="tj-message-1-1 ani ">' + '<div><span>' + arr[a].farm_type_name + '</span> <span>' + arr[a].f_indate.split(' ')[0] + '</span></div>' + '<p>' + '操作人：<span>' + arr[a].f_operator + '</span>；' + '投入品名称：<span >' + arr[a].f_inputs_name + '</span>；' + '用量：<span >' + arr[a].f_mu_usage + '</span>；' + '使用方式：<span >' + arr[a].f_usage_method + '</span>。' + '</p>' + '</div>' + '<img onerror="imgError(this)" src='+IMG_URL+arr[a].f_image_url+' class="tj-message-1-img ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s"  alt="" />' + '<div class="tj-message-1-radius ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s">' + (a + 1) + '</div>' + '</div>';
			} else {
				var strHtml_list = '<div  class="tj-message-1 ani ' + animated_ajax_ + a + '" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="1.2s">' + '<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-radius ani tj-message-right-radius">2</div>' + '<img onerror="imgError(this)" src='+IMG_URL+arr[a].f_image_url+' swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-img ani tj-message-right-img" alt="" />' + '<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-1 ani">' + '<div class="twoName"><span >' + arr[a].farm_type_name + '</span> <span >' + arr[a].f_indate.split(' ')[0] + '</span></div>' + '<p class="tj-message-right-p">' + '操作人：<span>' + arr[a].f_operator + '</span>；' + '投入品名称：<span >' + arr[a].f_inputs_name + '</span>；' + '用量：<span >' + arr[a].f_mu_usage + '</span>；' + '使用方式：<span >' + arr[a].f_usage_method + '</span>。' + '</p>' + '</div>' + '</div>';
			}
			strHtml = strHtml + strHtml_list;
		}
		$('#tj-message').html(strHtml);
	}
}
function thrBtn(t) {
	////console.log($(t))
	//	$('.tj-message-1').css({display:'none'})
	$(t).addClass('yy-color').siblings().removeClass('yy-color');
	var name = $(t).html();
	if (name == '田间管理') {
		thrHtml(arr_1, name, false);
	} else if (name == '施肥管理') {
		thrHtml(arr_2, name, false);
	} else if (name == '用药管理') {
		thrHtml(arr_3, name, false);
	}
}
function renderFarmClimate(data) {
    var view = $("#farmClimateView");
    var tpl = $("#farmClimateTpl").html();
    $('.climate-data').html(data.f_ave_temperature + '℃');
    laytpl(tpl).render(data, function (html) {
        view.html(html);
        var count = 0;
        var eles = $('.climate-type').children('div');
        var imgs = ['imgs/two_icon_wendu.png', 'imgs/two_icon_haiba.png', 'imgs/four_icon_jiangshui.png'];
        var texts = ['年平均温度', '海拔', '年平均降水量'];

        var datas = [data.f_ave_temperature + '℃', data.f_altitude + 'm', data.f_precipitation + 'ml'];
        setInterval(function () {
            count++;
            if (count >= eles.length) {
                count = 0;
            }
            // 选择样式
            eles.eq(count).addClass('active').siblings('').removeClass('active');
            // 图片
            $('.climate-img>img').attr('src', imgs[count]);
            // 数据
            $('.climate-data').html(datas[count]);
            // 文字
            $('#climate-text').html(texts[count]);
        }, 2500);
    });
}
// 渲染基地信息
function renderBaseInfo(data) {
	if(data.f_image_url){
		var imgsrc = IMG_URL + data.f_image_url;
	}else{
		//当上面的为空的时候，就默认这个为基地图片
		var imgsrc = 'imgs/img_moren.png';
	}
    
    $("#jdimg>img").attr('src', imgsrc);
    var view = $("#baseinfoView");
    var tpl = $("#baseinfoTpl").html();
    laytpl(tpl).render(data, function (html) {
        view.html(html);
        var now=new Date();
        var nowY=now.getFullYear();
		var nowM = now.getMonth()+1;
		var enddate = nowY+"年"+nowM+'月'
		$('#expirationDate').html(enddate)
    });
}
// 渲染第四页销售记录
function renderXsjlList(data,outquarantineinfo) {
	var arr=['one','two','three','four','five','six','seven','eight','nine','ten',]
	var dataLength=data.length;
//  //console.log(data)
    var view = $("#salerecordView");
    var tpl = $("#salerecordTpl").html();
    data.reverse();//颠倒
//	arr.reverse();
	arr=arr.slice(0,dataLength).reverse();
	var oneObj=data[dataLength-1][arr[dataLength-1]];
    var htmlStr='';
    var animateC=1;
    var animateT=1.4;
    var dateText='';
    var yici=1;
    for(var m=0;m<data.length;m++){
		var htmlStr_right='';
		var htmlStr_left='';
		var htmlStr_right_add='';
		if(m%2==0){
			dateText='采收时间：'
		}else{
			dateText='进场日期：'
		}
		if(m>=1){
	    	for(var n=1;n<2;n++){
	    		htmlStr_left='<li class="picihao">'
		    		+'<span class="yellow_spot ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay='+animateC+'s></span>'
		    		+'<div class="text ani" swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay='+animateT+'s>'
		    		+'<p>批次号</p>'
		    		+'<p class="span">'+data[m][arr[m]].batchId+'</p>'
		    		+'<p>出场检测</p>'
		    		+'<p class="span">'+outquarantineinfo[0].detectionResult+'</p>'
		    		+'<p>检测日期</p>'
		    		+'<p class="span">'+outquarantineinfo.detectionDate+'</p>'
		    		+'<p>追溯码</p>'
		    		+'<p class="span">'+data[m][arr[m]].transId+'</p>'
		    		+'</div>'
		    		+'</li>'
		    	animateC=animateC+0.8
	    		animateT=animateT+0.8
	    	}
	    }
    	htmlStr_right='<li>'
	    	+'<span class="yellow_spot ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay='+animateC+'s></span>'
	        +'<div class="text ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay='+animateT+'s>'
	        +'<p>'+data[m][arr[m]].salermarketName+'</p>'
	        +'<p>'+dateText+data[m][arr[m]].indate.split(' ')[0]+'</p>'
	        +'</div>'
	        +'</li>'
	    if(oneObj.salemarketId!='999999999'&&yici=='1'){
	        if(oneObj.goodsCode=='01351014'||oneObj.goodsCode=='01351014'||oneObj.goodsCode=='01342309'||oneObj.goodsCode=='01342100'||oneObj.goodsCode=='01342200'){
	        	if(oneObj.salermarketName.indexOf('九州')!=-1){
	        		htmlStr_right_add='<li>'
			    	+'<span class="yellow_spot ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay='+'1.2'+'s></span>'
			        +'<div class="text ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay='+'1.6'+'s>'
			        +'<p>临沂乐超物流仓储有限公司</p>'
			        +'<p>'+oneObj.indate.split(' ')[0]+'</p>' 
			        +'</div>'
			        +'</li>'
			        yici=0;
	        	}
	        }
	    }
	    animateC=animateC+0.8
	    animateT=animateT+0.8
    	htmlStr=htmlStr + htmlStr_left+htmlStr_right +htmlStr_right_add ;
  }
    view.html(htmlStr);
    data[0][arr[0]].goodsName?$('#ltxxgoodsName').html(data[0][arr[0]].goodsName):$('#ltxxgoodsName').html('暂无数据')
    var height = 6 / view.children().length;
    view.children().css({
        height: height + 'rem'
    });
    var styleStr='top:0;bottom:0;margin:auto;height:';
    for(var h=0;h<$('#salerecordView li .text').length;h++){
    	$('#salerecordView li .text')[h].style=styleStr+$('#salerecordView li .text')[h].offsetHeight+'px'
    }
    
//  laytpl(tpl).render(data[dataLength-1][arr[dataLength-1]], function (html) {
//      $('#ltxxgoodsName').html(data[1][arr[dataLength-1]].goodsName);
//      // 动态设置li的高度平均布局
//      view.html(html);
//      var height = 6 / view.children().length;
//      view.children().css({
//          height: height + 'rem'
//      });
//  });
}
function loading_num_f() {
	//30秒超时,仿真模拟加载
    var math_80=parseInt(75+Math.random()*10)
    timer = setInterval(function () {
        if(loading_num>=math_80){
        	loading_num=math_80;
        	clearInterval(timer);
        	var mathTime=500+Math.random()*1000
        	timer_85=setInterval(function(){
        		if(loading_num>=90){
		        	loading_num=93;
		        	clearInterval(timer_85);
		        }else{
		        	loading_num++;
		        }
		        $('#loading_num').html(loading_num + '%');
        	},1000)
        	
        }else{
        	loading_num++;
        }
        $('#loading_num').html(loading_num + '%');
    }, 23);
}

//错误图片的事件
function imgError(t){
	$(t).attr({
		src:'imgs/zanwutupian.png'
	})
}
function evaluateBtn(t){
	var name = $(t).html();
	if(name=='我要评价'){
		$('#evaluateMeFather').css({display:'block'})
		$('#evaluateLook').css({display:'none'})
		
	}else if(name=='查看评价'){
		$('#evaluateMeFather').css({display:'none'})
		$('#evaluateLook').css({display:'block'})
		look_mb_div('evaluateLook')
	}
}
function look_mb_div(id){
	for(var y=0;y<$('#'+id+' .lookContentP').length;y++){
			if($('#'+id+' .lookContent').height()<$('#'+id+' .lookContentP')[y].offsetHeight){
				$('.mb_div_1_'+y).css({
					display:'block'
				})
			}else{
				$('.mb_div_1_'+y).css({
					display:'none'
				})
			}
		}
}
function pinglun(arr){
	var myEvaluateStr='';
	for(var m=0;m<arr.length;m++){
			var starStr='';
			for(var n=0;n<arr[m].starLevel;n++){
				starStr+='<a class="starA_xx " href="javascript:;"></a>'
			}
			for(var x=0;x<5-arr[m].starLevel;x++){
				starStr+='<a  href="javascript:;"></a>'
			}
			myEvaluateStr+='<div class="evaluateLook_list">'
			+'<div class="lookLeft">'
			+'<p class="lookTime">'+arr[m].createDate+'</p>'
			+'<div class="lookStar">'
			+'<div class="wrapper">'
			+starStr
			+'</div>'
			+'</div>'
			+'</div>'
			+'<div class="lookContent">'
			+'<p class="lookContentP" >'+arr[m].content+'</p>'
			+'</div>'
			+'<div class="mb_div_1_'+m+' mb_div_1"></div>'
			+'</div>'
		}
	return myEvaluateStr;
}
//# sourceMappingURL=index.js.map
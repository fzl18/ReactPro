mui.ready(() => {
    queryBaseParamByUserId();

    getDoctorGroup();

    mui('#pullrefresh').pullRefresh({
        container: '#pullrefresh',
        up: {
            callback: queryVisitDynamic
        }
    });
});

function queryBaseParamByUserId() {
    mui.ajax(`${path}project/queryBaseParamByUserId.do?acctId=${sessionStorage.getItem('acctId')}${paramsAcc}`, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        success(data) {
            if (data.error) {
                mui.toast(data.error);
            } else {
                const investigationId = data.investigationId;
                const siteId = data.siteId;
                if (siteId == '' || siteId == null || siteId == undefined) {
                    mui.openWindow({
                        url: '../pdmsApp/patient/switchDoctor.html',
                        id: '../pdmsApp/patient/switchDoctor.html'
                    });
                }
                const userId = data.userId;
                const roleId = data.roleId;
                const siteName = data.siteName;
                const roleName = data.roleName;
                const investigationName = data.investigationName;

                sessionStorage.setItem('investigationId', investigationId);
                sessionStorage.setItem('siteId', siteId);
                sessionStorage.setItem('roleId', roleId);
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('investigationName', investigationName);
                sessionStorage.setItem('siteName', siteName);
                sessionStorage.setItem('roleName', roleName);

                queryVisitDynamic();

            }
        },
        error(xhr, type, errorThrown) {
            // 异常处理；
            console.log(type);
        },
    });
}
var offset = '';
function queryVisitDynamic() {
    var params = 'curYdataAccountId=' + sessionStorage.getItem('acctId') + '&offset=' + (offset * 1 + 1 * 1) + '&limit=10';
    mui.ajax(path + 'visit/queryVisitDynamic.do?' + params + paramsAcc, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        success(data) {
            if (data.error) {
                mui.toast(data.error);
            } else {
                var str = '';
                var dynamicList = data.datas;
                var isHighlightCount = 0;
                if (dynamicList != '' && dynamicList != undefined && dynamicList != null) {
                    for (var i = 0; i < dynamicList.length; i++) {
                        var node = dynamicList[i];
                        str += '<li class="mui-table-view-cell patientDetail" visitDynamicId="'+node.visitDynamicId+'" visitId="'+node.visitId+'" userId="'+node.userId+'" siteId="' + node.siteId + '" patientId="' + node.patientId + '" visitTypeId="' + node.visitTypeId + '">';
                        str += '<a class="mui-navigate-right">';
                        str += '<div class="mui-row">';
                        str += '<div class="mui-col-sm-12 mui-col-xs-12 timeClass">';
                        if (node.operationTime != '' && node.operationTime != null && node.operationTime != undefined) {
                            str += node.operationTime;
                        } else {
                            str += '';
                        }
                        str += '</div>';
                        if(node.isHighlight == '1'){
                            str += '<div class="mui-col-sm-12 mui-col-xs-12 updateClass">';
                        }else{
                            str += '<div class="mui-col-sm-12 mui-col-xs-12">';
                        }
                        isHighlightCount += isHighlightCount*1 + node.isHighlight*1;
                        if (node.visitDynamicComment != '' && node.visitDynamicComment != null && node.visitDynamicComment != undefined) {
                            str += node.visitDynamicComment;
                        } else {
                            str += '';
                        }
                        str += '</div>';
                        str += '</div>';
                        str += '</a>';
                        str += '</li>';
                    }
                    $("#list").append(str);
                    if(dynamicList.length > 1 && isHighlightCount != 0){
                        $(".dynamic").append('<span style="position: absolute; border-radius: 6px; border: 5px solid rgb(255, 0, 0);"></span>');
                    }

                    $('.scrollPatient').css({ transform: 'translate3d(0px, 0px, 0px) translateZ(0px)' });

                    offset = (offset * 1 + 1 * 1);

                    var totalCount = data.totalCount;
                    if (offset * 10 >= totalCount) {
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    } else {
                        mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
                    }

                    // 跳转到详情页面
                    mui('.mui-table-view').on('tap', '.patientDetail', function (e) {
                        var patientId = $(this).attr('patientId'),
                            visitId = $(this).attr('visitId'),
                            userId = $(this).attr('userId'),
                            siteId = $(this).attr('siteId'),
                            visitTypeId = $(this).attr('visitTypeId');

                        var visitDynamicId = $(this).attr('visitDynamicId');

                        
                        sessionStorage.setItem('visitId', visitId);
                        sessionStorage.setItem('userId', userId);
                        sessionStorage.setItem('siteId', siteId);
                        sessionStorage.setItem('patientId', patientId);
                        sessionStorage.setItem('visitTypeId', visitTypeId);
                        sessionStorage.setItem('roleFlag', 'Dynamic');

                        markVisitDynamicReaded(visitDynamicId);
                        
                    });
                } else {
                    $("#list").html(str);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                }

            }
        },
        error(xhr, type, errorThrown) {
            // 异常处理；
            console.log(type);
        },
    });
}

function markVisitDynamicReaded(visitDynamicId){
    mui.ajax(`${path}visit/markVisitDynamicReaded.do?visitDynamicId=${visitDynamicId}&curYdataAccountId=${sessionStorage.getItem('acctId')}${paramsAcc}`, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        success(data) {
            if (data.error) {
                mui.alert(data.error, '提示');
            } else {
                mui.openWindow({
                    url: '../pdmsApp/patient/patientGroupDetail.html',
                    id: '../pdmsApp/patient/patientGroupDetail.html',
                });
            }
        },
        error(xhr, type, errorThrown) {
            // 异常处理；
            console.log(type);
        },
    });
}

function getDoctorGroup() {
    var doctorGroupArr = [];
    var curYdataAccountId = sessionStorage.getItem('acctId');
    mui.ajax(path + 'user/queryDoctorGroupListByAcctId.do?curYdataAccountId=' + curYdataAccountId + '&openid=' + sessionStorage.getItem('openid'), {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        success(data) {
            if (data.error) {
                mui.alert(data.error, '提示');
            } else {
                var groupList = data.groupList;
                if (groupList != '' && groupList != null && groupList != undefined) {
                    if (groupList.length > 1) {
                        $("#showUserPicker").show();
                        for (var i = 0; i < groupList.length; i++) {
                            var siteId = groupList[i].doctorGroup.siteId,
                                groupName = groupList[i].doctorGroup.groupName,
                                roleId = groupList[i].roleId;

                            var roleName = '';
                            if (groupList[i].role != '' && groupList[i].role != null && groupList[i].role != undefined) {
                                roleName = groupList[i].role.roleName;
                            }

                            var textName = groupName;
                            if (roleName != '' && roleName != null && roleName != undefined) {
                                textName += '(' + roleName + ')';
                            }

                            var doctorGroupClass = {
                                'value': siteId,
                                'text': textName,
                                'roleId': roleId
                            }

                            doctorGroupArr.push(doctorGroupClass);
                        }
                        var userPicker = new mui.PopPicker();
                        userPicker.setData(doctorGroupArr);
                        var showUserPickerButton = document.getElementById('showUserPicker');
                        showUserPickerButton.addEventListener('tap', function (event) {
                            userPicker.show(function (items) {
                                var defaultPatams = 'siteId=' + items[0].value + '&roleId=' + items[0].roleId + '&userId=' + sessionStorage.getItem('userId');
                                mui.ajax(path + 'project/saveDefaultLogin.do?' + defaultPatams + paramsAcc, {
                                    data: {},
                                    dataType: 'json', // 服务器返回json格式数据
                                    type: 'post', // HTTP请求类型
                                    success(data) {
                                        if (data.error) {
                                            mui.alert(data.error, '提示');
                                        } else {
                                            mui.toast('切换医生组成功');
                                            setTimeout(() => {
                                                mui.openWindow({
                                                    url: 'patientList.html',
                                                    id: 'patientList.html'
                                                });
                                            }, 1000);
                                        }
                                    },
                                    error(xhr, type, errorThrown) {
                                        // 异常处理；
                                        console.log(type);
                                    },
                                });
                            });
                        }, false);
                    } else {
                        $('#showUserPicker').hide();
                    }
                } else {
                    $('#showUserPicker').hide();
                }

            }
        },
        error(xhr, type, errorThrown) {
            // 异常处理；
            console.log(type);
        },
    });

}


mui('.mui-bar').on('tap', '.patient', function () {
    sessionStorage.setItem('scientificFlag', '1');
    mui.openWindow({
        url: '../pdmsApp/patient/patientList.html',
        id: '../pdmsApp/patient/patientList.html'
    });
});
mui('.mui-bar').on('tap', '.calendar', function () {
    mui.openWindow({
        url: '../../calendar/index.html',
        id: '../../calendar/index.html'
    });
});
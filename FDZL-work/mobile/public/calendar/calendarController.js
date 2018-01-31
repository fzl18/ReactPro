
mui.ready(function () {
    jssDk();
});

function jssDk(){
    mui.ajax(path + 'jssdk.do?url=' + window.location.href + paramsAcc, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        success(data) {
          if (data.error) {
            mui.alert(data.error, '提示');
          } else {
            var role = sessionStorage.getItem('role');
            if (!role) {
                const url = encodeURIComponent(location.href);
                location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${path}oauth.do?url=${window.location.href}&response_type=code&scope=snsapi_userinfo&state=HDWX#wechat_redirect`;
                return false;
            }
            if (role == 'PATIENT') {
                //页面显示元素
                getDom(role);
                queryPatientAccountInfo();
            } else {
                //页面显示元素
                getDom(role);
                queryBaseParamByUserId();
                queryVisitToDoList(formatDate(new Date()));
                if(role == 'DOCTOR'){
                    getScientific();
                }
            }

            //backController();
          }
        },
        error(xhr, type, errorThrown) {
          // 异常处理；
          console.log(type);
        },
      });
}

//切换医生组
function getScientific(){
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
                        mui.toast('切换科研库成功');
                        setTimeout(() => {
                          mui.openWindow({
                            url: 'index.html',
                            id: 'index.html'
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
            }
          }
        }
      },
      error(xhr, type, errorThrown) {
        // 异常处理；
        console.log(type);
      },
    });
  }
  

//获取非病人参数
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
                        url: '../crf/pdmsApp/patient/switchDoctor.html',
                        id: '../crf/pdmsApp/patient/switchDoctor.html'
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

                queryVisitToDoForCalender();
            }
        },
        error(xhr, type, errorThrown) {
            // 异常处理；
            console.log(type);
        },
    });
}

//获取非病人角色下的日期
var toDoDateList = '';
function queryVisitToDoForCalender() {
    var calenderParams = 'acctId=' + sessionStorage.getItem('acctId') + '&month=' + formatDate(new Date());
    mui.ajax(path + 'visit/queryVisitToDoForCalender.do?' + calenderParams + paramsAcc, {
        data: {},
        dataType: 'json',//服务器返回json格式数据
        type: 'post',//HTTP请求类型
        success: function (data) {
            if (data.error) {
                mui.alert(data.error, '提示');
            } else {
                var node = data.toDoDateList;
                if (node != '' && node != null && node != undefined) {
                    toDoDateList = node;
                } else {
                    toDoDateList = '';
                }

                caleandarController();
            }
        },
        error: function (xhr, type, errorThrown) {
            console.log(type);
        }
    });
}

//病人点击马上提交
mui('.mui-row').on('tap', '#patientVisit', function () {
    //visitId 不存在 自动创建一条访视
    if (visitIdPatient == '' || visitIdPatient == undefined || visitIdPatient == null) {
        var _param = 'patientId=' + patientIdPatient + '&visitTypeId=' + visitTypeIdPatient + '&visitTime=' + new Date().toString('yyyy-MM-dd') +
            '&siteId=' + siteIdPatient + '&roleId=' + roleIdPatient + '&userId=' + userIdPatient;

        mui.ajax(path + 'patient/addVisit.do?' + _param + paramsAcc, {
            data: {},
            dataType: 'json',//服务器返回json格式数据
            type: 'post',//HTTP请求类型
            success: function (data) {
                if (data.error) {
                    mui.alert(data.error, '提示');
                } else {
                    sessionStorage.setItem('roleFlag', 'Calendar');
                    setTimeout(function () {
                        mui.openWindow({
                            url: '../crf/pdmsApp/patient/patientGroupDetail.html',
                            id: '../crf/pdmsApp/patient/patientGroupDetail.html'
                        })
                    }, 500);
                }
            },
            error: function (xhr, type, errorThrown) {
                console.log(type);
            }
        });
    } else {
        sessionStorage.setItem('visitId', visitIdPatient);
        sessionStorage.setItem('roleFlag', 'Calendar');
        mui.openWindow({
            url: '../crf/pdmsApp/patient/patientGroupDetail.html',
            id: '../crf/pdmsApp/patient/patientGroupDetail.html'
        });
    }
});

function getDom(role) {
    if (role == 'PATIENT') {
        $("#patientId").show();
        $("#doctorId").hide();
    } else {
        $("#doctorId").show();
        $("#patientId").hide();
    }

    getDomNav(role);
}

//底部导航
function getDomNav(role) {
    var str = '';
    if (role == 'PATIENT') {
        str += '<a class="mui-tab-item mui-active">';
        str += '<span class="mui-tab-label">日历</span>';
        str += '</a>';
        str += '<a class="mui-tab-item patient">';
        str += '<span class="mui-tab-label">我的档案</span>';
        str += '</a>';
    } else {
        str += '<a class="mui-tab-item mui-active">';
        str += '<span class="mui-tab-label">日历</span>';
        str += '</a>';
        str += '<a class="mui-tab-item dynamic">';
        str += '<span class="mui-tab-label">动态</span>';
        str += '</a>';
        str += '<a class="mui-tab-item patient">';
        str += '<span class="mui-tab-label">我的档案</span>';
        str += '</a>';
    }

    $("#navId").html(str);
    if(role != 'PATIENT'){
        queryVisitDynamic();
    }
}


var visitIdPatient = '',
    visitTypeIdPatient = '',
    roleIdPatient = '',
    siteIdPatient = '',
    userIdPatient = '',
    investigationIdPatient = '',
    patientIdPatient = '';
//获取医生参数
function queryPatientAccountInfo() {
    mui.ajax(path + 'user/queryPatientAccountInfo.do?curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid'), {
        data: {},
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (data) {
            if (data.error) {
                mui.alert(data.error);
            } else {
                patientIdPatient = data.patientId,
                    roleIdPatient = data.roleId,
                    siteIdPatient = data.siteId,
                    userIdPatient = data.userId,
                    investigationIdPatient = data.investigationId;

                sessionStorage.setItem('investigationId', investigationIdPatient);
                sessionStorage.setItem('siteId', siteIdPatient);
                sessionStorage.setItem('roleId', roleIdPatient);
                sessionStorage.setItem('userId', userIdPatient);
                sessionStorage.setItem('patientId', patientIdPatient);

                queryVisitToDoByPatientId(patientIdPatient);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}

var visitToDoList = '';
//获取病人日期并渲染
function queryVisitToDoByPatientId(patientId) {
    console.log(new Date().toString('yyyy-MM-dd'));
    var paramsVisit = 'patientId=' + patientId + '&month=' + new Date().toString('yyyy-MM-dd');
    mui.ajax(path + 'visit/queryVisitToDoByPatientId.do?' + paramsVisit + paramsAcc, {
        data: {},
        dataType: 'json',
        type: 'post',
        success(data) {
            if (data.error) {
                mui.alert(data.error, '提示');
            } else {
                //visitIdPatient = data.visitToDoList[0].visitId,
                visitIdPatient = '32',
                    visitTypeIdPatient = data.visitToDoList[0].visitTypeId;

                sessionStorage.setItem('visitTypeId', visitTypeIdPatient);

                var visitToDoListData = data.visitToDoList;
                if (visitToDoListData != '' && visitToDoListData != null && visitToDoListData != undefined) {
                    visitToDoList = data.visitToDoList;
                } else {
                    visitToDoList = '';
                }

                caleandarController();
            }
        },
        error(xhr, type, errorThrown) {
            console.log(type);
        },
    });
}

function caleandarController() {
    calendarIns = new calendar.calendar({
        count: 1,
        selectDate: new Date(),
        selectDateName: '',
        isShowHoliday: true,
        isShowWeek: false
    });

    $.bind(calendarIns, 'afterSelectDate', function (event) {
        var curItem = event.curItem,
            date = event.date,
            dateName = event.dateName;
        calendarIns.setSelectDate(date);

        var role = sessionStorage.getItem('role');
        if (role == 'PATIENT') {
            if (visitToDoList != '' && visitToDoList != null && visitToDoList != undefined) {
                for (var v = 0; v < visitToDoList.length; v++) {
                    var visitToDoDate = visitToDoList[v].visitToDoDate,
                        visitCanCreateBegin = visitToDoList[v].visitCanCreateBegin,
                        visitCanCreateEnd = visitToDoList[v].visitCanCreateEnd;

                    if (date == formatDate(new Date(visitToDoDate)) ||
                        (date >= formatDate(new Date(visitCanCreateBegin)) && date <= formatDate(new Date(visitCanCreateEnd)))) {
                        $("#patientTitle").html(date + ',祝您安康</br>按照医嘱，本日您可以提交随访资料');
                        $("#patientVisit").show();
                    } else {
                        $("#patientTitle").html(date + ',祝您安康</br>本日没有医嘱待办事项');
                        $("#patientVisit").hide();
                    }
                }
            }
        } else {
            queryVisitToDoList(date);
        }
    });

    $('#prevMonth').on('click', function () {
        calendarIns.prevMonth();
    });

    $('#nextMonth').on('click', function () {
        calendarIns.nextMonth();
    });
}

//获取当前日期下病人数据
function queryVisitToDoList(month) {
    mui.ajax(path + 'visit/queryVisitToDoList.do?acctId=' + sessionStorage.getItem('acctId') + '&month=' + month + paramsAcc, {
        data: {},
        dataType: 'json',
        type: 'post',
        success(data) {
            if (data.error) {
                mui.alert(data.error, '提示');
            } else {
                var visitToDoList = data.visitToDoList;
                var str = '';
                if (visitToDoList != '' && visitToDoList != null && visitToDoList != undefined) {
                    for (var i = 0; i < visitToDoList.length; i++) {
                        var node = visitToDoList[i].patient;
                        str += '<li class="mui-table-view-cell patientDetail" patientId="' + node.patientId + '">';
                        str += '<a class="mui-navigate-right mui-slider-handle">';
                        str += '<div class="mui-row">';
                        str += '<div class="mui-col-sm-3 mui-col-xs-3" style="text-align:initial;">';
                        if (node.patientName != '' && node.patientName != null && node.patientName != undefined) {
                            str += node.patientName;
                        }else{
                            str += '';
                        }
                        str += '</div>';
                        str += '<div class="mui-col-sm-2 mui-col-xs-2">';
                        if (node.hospitalizationNumber != '' && node.hospitalizationNumber != null && node.hospitalizationNumber != undefined) {
                            str += '|&nbsp;' + node.hospitalizationNumber;
                        }else{
                            str += '';
                        }
                        str += '</div>';
                        str += '<div class="mui-col-sm-6 mui-col-xs-6" style="text-align: right;">';
                        if (node.visitTypeName != '' && node.visitTypeName != null && node.visitTypeName != undefined) {
                            str += node.visitTypeName;
                        }else{
                            str += '';
                        }
                        str += '</div>';
                        str += '</div>';
                        str += '</a>';
                        str += '</li>';
                    }
                    $("#getDateId").html(str);
                    $("#getDateId").show();
                    $("#noDate").hide();

                    // 跳转到详情页面
                    mui('.mui-table-view').on('tap', '.patientDetail', function (e) {
                        const patientId = $(this).attr('patientId');
                        sessionStorage.setItem('patientId', patientId);
                        sessionStorage.setItem('roleFlag', 'Calendar');
                        mui.openWindow({
                            url: '../crf/pdmsApp/patient/patientDetail.html',
                            id: '../crf/pdmsApp/patient/patientDetail.html',
                        });
                    });
                } else {
                    $("#getDateId").hide();
                    $("#noDate").show();
                }
            }
        },
        error(xhr, type, errorThrown) {
            console.log(type);
        },
    });
}

// function backController() {
//     pushHistory();
// }

// window.addEventListener("popstate", function (e) {
//     doGetBack();
// }, false);

// function doGetBack() {
//     mui.openWindow({
//         url: '/MyPanel',
//         id: '/MyPanel'
//     });
// }

// function pushHistory() {
//     var state = {
//         title: "title",
//         url: "#"
//     };
//     window.history.pushState(state, "title", "#");
// }

mui('.mui-bar').on('tap', '.dynamic', function () {
    mui.openWindow({
        url: '../crf/dynamic/dynamic.html',
        id: '../crf/dynamic/dynamic.html'
    });
});
mui('.mui-bar').on('tap', '.patient', function () {
    var role = sessionStorage.getItem('role');
    if (role == 'PATIENT') {
        sessionStorage.setItem('scientificFlag', '-1');
    } else {
        sessionStorage.setItem('scientificFlag', '1');
    }
    mui.openWindow({
        url: '../crf/pdmsApp/patient/patientList.html',
        id: '../crf/pdmsApp/patient/patientList.html'
    });
});

function formatDate(dateObj) {
    var year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        day = dateObj.getDate();

    return `${year}-${formatNum(month)}-${formatNum(day)}`;
}

function formatNum(num) {
    if (num < 10) {
        num = `0${num}`;
    }
    return num;
}
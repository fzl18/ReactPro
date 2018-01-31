
mui.ready(() => {
  var aId = sessionStorage.getItem('acctId');
  if(aId == '' || aId == undefined || aId == null || aId == 'null'){
    mui.openWindow({
      url: '/BindAccount',
      id: '/BindAccount'
    });
  }else{
    jssDk();
  }
});

function jssDk(){
  mui.ajax(path + 'jssdk.do?url=' + window.location.href + '&curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid'), {
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

          var urlParams = location.search; //获取url中"?"符后的字串 区别科研库和随访
          var _urlParams = "";
          if(urlParams.indexOf("?") != -1) {
            var strs = urlParams.substr(1).split("&");
            _urlParams = unescape(strs[0].split("=")[1]);
            if(_urlParams != ''){
              sessionStorage.setItem('scientificFlag','1');
            }else{
              sessionStorage.setItem('scientificFlag','');
            }
          }

          var scientificFlag = sessionStorage.getItem('scientificFlag');
          if(scientificFlag == '1' || scientificFlag == '-1' || _urlParams == 'NOTSCIENTIFIC'){
            sessionStorage.setItem('scientificResearchLibraryId','');
            titleController('病例记录');
            $("#pullrefresh").css('margin-top','50px');
            $("#scientificId").hide();
            queryBaseParamByUserId();
          }else{
            titleController('科研库');
            $("#pullrefresh").css('margin-top','85px');
            $("#scientificId").show();
            getScientific();
          }
          getDoctorGroup();

          getRoleNav();

          //backController();
        }
      },
      error(xhr, type, errorThrown) {
        // 异常处理；
        console.log(type);
      },
    });
}

function getScientific(){
  var doctorGroupArr = [];
  var curYdataAccountId = sessionStorage.getItem('acctId');
  mui.ajax(path + 'department/queryScientificResearchLibraryByAccountId.do?ydataAccountId=' + curYdataAccountId + '&curYdataAccountId=' + curYdataAccountId + '&openid=' + sessionStorage.getItem('openid'), {
  //mui.ajax('http://192.168.10.152:12003/department/queryScientificResearchLibraryByAccountId.do?ydataAccountId=' + curYdataAccountId, {
    data: {},
    dataType: 'json', // 服务器返回json格式数据
    type: 'post', // HTTP请求类型
    success(data) {
      if (data.error) {
        mui.alert(data.error, '提示');
      } else {
        var groupList = data.list;
        if (groupList != '' && groupList != null && groupList != undefined) {
          $("#srl").html(groupList[0].scientificResearchLibraryName);
          sessionStorage.setItem('scientificResearchLibraryId',groupList[0].scientificResearchLibraryId);
          for (var i = 0; i < groupList.length; i++) {
            var siteId = groupList[i].scientificResearchLibraryId,
              groupName = groupList[i].scientificResearchLibraryName;

            var doctorGroupClass = {
              'value': siteId,
              'text': groupName
            }

            doctorGroupArr.push(doctorGroupClass);
          }
          var userPicker = new mui.PopPicker();
          userPicker.setData(doctorGroupArr);
          var showUserPickerButton = document.getElementById('srl');
          showUserPickerButton.addEventListener('tap', function (event) {
            userPicker.show(function (items) {
              mui.toast('切换科研库成功');
              $("#srl").html(items[0].text);
              sessionStorage.setItem('scientificResearchLibraryId',items[0].value);
              setTimeout(() => {
                 getPatientList();
              }, 1000);
            });
          }, false);
          queryBaseParamByUserId();
        }else{
          mui.toast('暂无科研库权限');
        //   setTimeout(() => {
        //     mui.openWindow({
        //       url: '/MyPanel',
        //       id: '/MyPanel',
        //     });
        //  }, 1000);
        }
      }
    },
    error(xhr, type, errorThrown) {
      // 异常处理；
      console.log(type);
    },
  });
}

function getRoleNav(){
  var role = sessionStorage.getItem('role');
  var str = '';
  if(role == 'PATIENT'){
    str += '<a class="mui-tab-item menu-item calendar" target="home ">';
    str += '<span class="mui-tab-label">日历</span>';
    str += '</a>';
    str += '<a class="mui-tab-item menu-item mui-active patient" target="search">';
    str += '<span class="mui-tab-label">病例记录</span>';
    str += '</a>';
  }else{
    str += '<a class="mui-tab-item menu-item calendar" target="home ">';
    str += '<span class="mui-tab-label">日历</span>';
    str += '</a>';
    str += '<a class="mui-tab-item menu-item dynamic" target="patientManager">';
    str += '<span class="mui-tab-label ">';
    str += '动态</span>';
    str += '</a>';
    str += '<a class="mui-tab-item menu-item mui-active patient" target="search">';
    str += '<span class="mui-tab-label">病例记录</span>';
    str += '</a>';
  }

  $("#navId").html(str);
  if(role != 'PATIENT'){
    queryVisitDynamic();
  }
}


function queryBaseParamByUserId() {
  var params = 'acctId=' + sessionStorage.getItem('acctId') +'&curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid');
  mui.ajax(path + 'project/queryBaseParamByUserId.do?' + params, {
    data: {},
    dataType: 'json', // 服务器返回json格式数据
    type: 'post', // HTTP请求类型
    success(data) {
      if (data.error) {
        mui.toast(data.error);
      } else {
        const investigationId = data.investigationId;
        const siteId = data.siteId;
        if(siteId == '' || siteId == null || siteId == undefined){
          mui.openWindow({
            url: 'switchDoctor.html',
            id: 'switchDoctor.html'
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

        getProjectBaseInfo();

        getSdv();
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
                var defaultPatams = 'siteId=' + items[0].value + '&roleId=' + items[0].roleId + '&userId=' + sessionStorage.getItem('userId') + 
                '&curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid');
                mui.ajax(path + 'project/saveDefaultLogin.do?' + defaultPatams, {
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


let patientNameType = '';
function getProjectBaseInfo() {
  var params = 'curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid');
  mui.ajax(path + 'project/getProjectBaseInfo.do?' + params, {
    data: {},
    dataType: 'json', // 服务器返回json格式数据
    type: 'post', // HTTP请求类型
    success(data) {
      if (data.error) {
        mui.alert(data.error, '提示');
      } else {
        patientNameType = data.investigationPatientNameType;
        sessionStorage.setItem('patientNameType', patientNameType);
        if (patientNameType == 1) {
          $('#key').prop('placeholder', '请输入姓名搜索');
        } else {
          $('#key').prop('placeholder', '请输入姓名拼音搜索');
        }

        getPatientList();
      }
    },
    error(xhr, type, errorThrown) {
      // 异常处理；
      console.log(type);
    },
  });
}

$('.mui-input-clear').on('input', (event) => {
  offset = 0;
  getPatientList();
});

function getPatientList() {
  const statusMap = [];
  statusMap['crf状态'] = '-1';
  statusMap['未录入'] = 'NEW';
  statusMap['录入中'] = 'RECOREDING';
  statusMap['已完成'] = 'COMPLETED';
  statusMap['提交中'] = 'COMMITING';
  statusMap['已提交'] = 'COMMITED';
  statusMap['清理中'] = 'CLEARING';
  statusMap['已清理'] = 'CLEARED';
  statusMap['已入组'] = 'ENTERED';
  statusMap['随访中'] = 'FOLLOWUP';
  statusMap['已取消'] = 'CANCELLED';


  const sdvStatusMap = [];
  sdvStatusMap['crf状态'] = '-1';
  sdvStatusMap['未SDV'] = 'UNSDV';
  sdvStatusMap['SDV中'] = 'SDVING';
  sdvStatusMap['已SDV'] = 'SDVEND';

  const keyValue = $('#key').val();
  const crfStatus = $.trim($('#statusContent').html());

  let statusValue = '-1';
  let sdvStatusValue = '-1';

  let status = '';
  let sdvStatus = '';
  if (crfStatus != 'CRF状态') {
    status = crfStatus.substring(0, 3);
    if (status != '') {
      for (const statusKey in statusMap) {
        statusValue = statusMap[status];
      }
    }

    sdvStatus = crfStatus.substring(3, 7);
    if (sdvStatus != '') {
      for (const sdvStatusKey in sdvStatusMap) {
        sdvStatusValue = sdvStatusMap[sdvStatus];
      }
    }
  } else {
    statusValue = '-1';
    sdvStatusValue = '-1';
  }
  var searchPatientsParams = 'patientName='+keyValue+'&status='+statusValue+'&siteId=' + sessionStorage.getItem('siteId') + '&roleId=' + sessionStorage.getItem('roleId') +
    '&userId=' + sessionStorage.getItem('userId') + '&offset=' + (offset * 1 + 1 * 1) + '&limit=10&researchLibraryId=' + sessionStorage.getItem('scientificResearchLibraryId');
  mui.ajax(`${path}patient/searchPatients.do?${searchPatientsParams}${paramsAcc}`, {
    data: {},
    dataType: 'json', // 服务器返回json格式数据
    type: 'post', // HTTP请求类型
    timeout: 10000, // 超时时间设置为10秒；
    success(data) {
      if (data.error) {
        mui.alert(data.error, '提示');
      } else {
        let str = '';
        if (data.datas.datas.length * 1 > 0) {
          for (let i = 0; i < data.datas.datas.length; i++) {
            str += `<li class="mui-table-view-cell patientDetail" patientId="${data.datas.datas[i].patientId}">`;
            str += '<a class="mui-navigate-right mui-slider-handle">';
            str += '<div class="mui-row">';
            str += '<div class="mui-col-sm-3 mui-col-xs-3">';
            if (patientNameType == 0) {
              if (data.datas.datas[i].patientName != '') {
                str += data.datas.datas[i].patientName;
              } else {
                str += '未填写';
              }
            } else if (patientNameType == 1) {
              if (data.datas.datas[i].patientNameCN != '') {
                str += data.datas.datas[i].patientNameCN;
              } else {
                str += '未填写';
              }
            } else if (data.datas.datas[i].patientName != '') {
              str += data.datas.datas[i].patientName;
            } else {
              str += '未填写';
            }

            str += '</div>';
            str += '<div class="mui-col-sm-2 mui-col-xs-2">';
            str += `|&nbsp;${data.datas.datas[i].patientNo}`;
            str += '</div>';


            const statusName = data.datas.datas[i].statusName;
            const sdvStatusName = data.datas.datas[i].sdvStatusName;
            const sdvType = data.sdvType;
            str += '<div class="mui-col-sm-7 mui-col-xs-7" style="text-align: right;padding-right: 15px;">';
            str += statusName;
            str += '</div>';

            str += '</div>';
            str += '</a>';

            str += '<div class="mui-slider-right mui-disabled">';
            str += `<a class="mui-btn mui-btn-green access_control" accesscontrolkey="commitPatient_btn" patientId="${data.datas.datas[i].patientId}">提交</a>`;
            str += `<a class="mui-btn mui-btn-red access_control" accesscontrolkey="deletePatient_btn" status="${data.datas.datas[i].status}" patientUserId="${data.datas.datas[i].userId}" patientId="${data.datas.datas[i].patientId}">删除</a>`;
            str += '</div>';
            str += '</li>';
          }

          $('#patientList').html(str);
          //mui('#pullrefresh').pullRefresh().scrollTo(0,0,100);
          $('.scrollPatient').css({ transform: 'translate3d(0px, 0px, 0px) translateZ(0px)' });

          offset = (offset * 1 + 1 * 1);

          const totalCount = data.totalCount;
          if (offset * 10 >= totalCount) {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
          } else {
            mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
          }

          // 权限
          var scientificFlag = sessionStorage.getItem('scientificFlag');
          if(scientificFlag == ''){
            $('.access_control').each(function(){
              $(this).hide();
            });
          }else{
            accessControl();
          }
          

          // 跳转到详情页面
          mui('.mui-table-view').on('tap', '.patientDetail', function (e) {
            const patientId = $(this).attr('patientId');
            sessionStorage.setItem('patientId', patientId);
            var roleFlag = sessionStorage.getItem('roleFlag');
            if(roleFlag == 'Calendar'){
              sessionStorage.setItem('roleFlag','');
            }
            
            
            mui.openWindow({
              url: 'patientDetail.html',
              id: 'patientDetail.html',
            });
          });

          // 提交病例
          mui('.mui-disabled').on('tap', '.mui-btn-green', function (e) {
            const val = $(this).attr('patientId');

            commitPatients(val);
          });

          // 删除病例
          mui('.mui-disabled').on('tap', '.mui-btn-red', function (e) {
            const val = $(this).attr('patientId');
            const patientUserId = $(this).attr('patientUserId');
            const status = $(this).attr('status');
            deletePatient(val, patientUserId, status);
          });
        } else {
          str += noData();
          $('#patientList').html(str);
        }
      }
    },
    error(xhr, type, errorThrown) {
      // 异常处理；
      console.log(type);
    },
  });
}

function getSdv() {
  let str = '';

  str += '<li class="mui-table-view-cell stateLi">';
  str += 'crf状态';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '未录入';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '录入中';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '已完成';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '已入组';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '随访中';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  str += '<li class="mui-table-view-cell stateLi">';
  str += '已取消';
  str += '<img class="tick" src="../../assets/image/tick.png" />';
  str += '</li>';

  $('#statusId').html(str);

  $('#topPopover').css('height', `${$('.stateLi').length * 50 - 40}px`);

  mui('.mui-popover').on('tap', '.stateLi', function (e) {
    offset = 0;
    $('.tick').hide();
    $(this).find('.tick').show();
    $('.stateLi').removeClass('colorBlue');
    $(this).addClass('colorBlue');
    $('#statusContent').html($(this)[0].innerText);
    $('.mui-popover').removeClass('mui-active');
    $('.mui-popover').hide();
    $('.mui-backdrop').hide();

    getPatientList();
  });
}


// 提交病例

function commitPatients(patientId) {
  const btnArray = ['否', '是'];
  mui.confirm('请确认该病例所有访视已结束，并完成所有数据录入工作。提交后无法修改数据！是否提交病例的所有访视?', '提示', btnArray, (e) => {
    if (e.index == 1) {
      offset = 0;
      var commitPatientsParams = 'patientIds=' + patientId + '&siteId=' + sessionStorage.getItem("siteId") +
        '&roleId=' + sessionStorage.getItem("roleId") + '&userId=' + sessionStorage.getItem("userId");
      mui.ajax(path + 'patient/commitPatients.do?' + commitPatientsParams + paramsAcc, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        success(data) {
          if (data.error) {
            mui.alert(data.error, '提示');
          } else {
            const status = data.status;
            const countSucc = data.countSucc;
            if (status == 1) {
              if (countSucc > 0) {
                mui.toast('病例提交成功');
                setTimeout(() => {
                  getPatientList();
                }, 1500);
              } else {
                mui.alert('未提交的病例可能CRF状态非已完成或者CRF未SDV或者有未关闭的质询', '提示');
              }
            } else {
              mui.alert('病例提交失败', '提示');
            }
          }
        },
        error(xhr, type, errorThrown) {
          // 异常处理；
          console.log(type);
        },
      });
    }
  });
}

// 删除病例
function deletePatient(patientId, patientUserId, status) {
  const btnArray = ['否', '是'];
  mui.confirm('确定删除当前病例？', '提示', btnArray, (e) => {
    if (e.index == 1) {
      offset = 0;
      var deletePatientsParams = 'patientStatus[' + patientUserId + ']=' + status + '&patientIds=' + patientId +
        '&siteId=' + sessionStorage.getItem("siteId") +
        '&roleId=' + sessionStorage.getItem("roleId") + '&userId=' + sessionStorage.getItem("userId");
      var paramsAcc = '&curYdataAccountId=' + sessionStorage.getItem('acctId') + '&openid=' + sessionStorage.getItem('openid');
      mui.ajax(path + 'patient/deletePatients.do?' + deletePatientsParams + paramsAcc, {
        data: {},
        dataType: 'json', // 服务器返回json格式数据
        type: 'post', // HTTP请求类型
        timeout: 10000, // 超时时间设置为10秒；
        success(data) {
          if (data.error) {
            mui.alert(data.error, '提示');
          } else {
            const status = data.status;
            const countSucc = data.countSucc;
            if (status == 1) {
              if (countSucc > 0) {
                mui.toast('病例删除成功');
                setTimeout(() => {
                  getPatientList();
                }, 1500);
              } else {
                mui.alert('病例删除失败,病例中包含已提交或已清理的访视', '提示');
              }
            } else {
              mui.alert('病例删除失败', '提示');
            }
          }
        },
        error(xhr, type, errorThrown) {
          // 异常处理；
          console.log(type);
        },
      });
    } else {
      getPatientList();
    }
  });
}


// function backController() {
//   pushHistory();
// }

// window.addEventListener('popstate', (e) => {
//   doGetBackIndexValue();
// }, false);

// function doGetBackIndexValue() {
//   //sessionStorage.setItem('scientificFlag', '');
//   var roleFlag = sessionStorage.getItem('roleFlag');
//   if(roleFlag == 'DopaSpace'){
//     mui.openWindow({
//       url: '/DopaSpace',
//       id: '/DopaSpace',
//     });
//   }else{
//     mui.openWindow({
//       url: '/MyPanel',
//       id: '/MyPanel',
//     });
//   }
// }

// function pushHistory() {
//   const state = {
//     title: 'title',
//     url: '#',
//   };
//   window.history.pushState(state, 'title', '#');
// }

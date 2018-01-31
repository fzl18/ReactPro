export const PAGE_SIZE = 15;
export const curRole = 'PATIENT';
const ENV = window.configs || {};
export const API_URL = {
  department: {
    queryLastTendencyList: `${ENV.ADMIN_URL}/department/queryLastTendencyList.do`, // 最新动态
    queryCarrouselImgList: `${ENV.ADMIN_URL}/department/queryCarrouselImgList.do`, // 轮播图
    queryMeetingList: `${ENV.ADMIN_URL}/department/queryMeetingList.do`, // 学术会议
    queryResearchSubjectList: `${ENV.ADMIN_URL}/department/queryResearchSubjectList.do`, // 热门课题
    queryPopularScienceCategoryList: `${ENV.ADMIN_URL}/department/queryPopularScienceCategoryList.do`, // 科普宣教分类
    queryDepartment: `${ENV.ADMIN_URL}/department/queryDepartment.do`, // 科室介绍
    queryPopularScienceList: `${ENV.ADMIN_URL}/department/queryPopularScienceList.do`, // 科普宣教
    queryDepartmentDoctor: `${ENV.ADMIN_URL}/department/queryDepartmentDoctor.do`, // 医生团队
  },
  user: {
    doctorAndAssistantBind: `${ENV.ADMIN_URL}/user/doctorAndAssistantBind.do`, // 医生医助绑定
    patientBind: `${ENV.ADMIN_URL}/user/patientBind.do`, // 病人绑定
    queryPersonalNotice: `${ENV.ADMIN_URL}/user/queryPersonalNotice.do`, // 消息列表
    queryNoticeInfo: `${ENV.ADMIN_URL}/user/queryNoticeInfo.do`, // 消息详情
    applyOrReject: `${ENV.ADMIN_URL}/user/applyOrReject.do`, // 授权拒绝or同意
    deleteNoticeById: `${ENV.ADMIN_URL}/user/deleteNoticeById.do`, // 授权拒绝or同意
    deleteAllNotice: `${ENV.ADMIN_URL}/user/deleteAllNotice.do`, // 清空消息
    initiateApplicationByDocAss: `${ENV.ADMIN_URL}/user/initiateApplicationByDocAss.do`, // 医助发起服务申请
    queryAccountSimpleInfoById: `${ENV.ADMIN_URL}/user/queryAccountSimpleInfoById.do`, // 获取当前用户头像and名称
    queryAuthInfo: `${ENV.ADMIN_URL}/user/queryAuthInfo.do`, // 授权服务,解除授权
    relieveAuthInfo: `${ENV.ADMIN_URL}/user/relieveAuthInfo.do`, // 解除授权
    unbindAccount: `${ENV.ADMIN_URL}/user/unbindAccount.do`, // 解除账号绑定
    modifyUserPassword: `${ENV.ADMIN_URL}/user/modifyUserPassword.do`, // 设置密码
    verifyCode: `${ENV.ADMIN_URL}/user/verifyCode.do`, // 发送验证码

  },
  conversation: {
    generateChat: `${ENV.ADMIN_URL}/conversation/generateChat.do`, // 获取创建房间的配置信息
    queryChatList: `${ENV.ADMIN_URL}/conversation/queryChatList.do`, // 获取我的咨询列表
    deleteConversation: `${ENV.ADMIN_URL}/conversation/deleteConversation.do`, // 获取我的咨询列表
    queryHotConversation: `${ENV.ADMIN_URL}/conversation/queryHotConversation.do`, // 获取热门咨询列表
    generateInfo: `${ENV.ADMIN_URL}/conversation/generateInfo.do`, // 获取通用Websocket的配置信息
    queryHotConversationDetailForWx: `${ENV.ADMIN_URL}/conversation/queryHotConversationDetailForWx.do`, // 获取热门资讯详情
  },
};
export const AUTH = {
  PATIENT: {
      // 个人中心权限配置
    account: {
      access: true,
      dataAuth: {
        name: true,
        patientNo: true,
        mobile: true,
      },
    },
    pwd: {
      access: false,
    },
    authInfo: {
      access: false,
    },
    notice: {// 页面权限
      access: false,
      dataAuth: {
        // 页面元素
        noticeList: false,
      },
    },
    doctorInfo: {
      access: true,
      dataAuth: {
        authStatus: false,
        Request: false, // 请求
        Consultation: true, // 咨询
      },
    },
    DoctorItem: {
      access: true,
      dataAuth: {
        chat: true,
        auth: false,
        nothing: false,
      },
    },
    empowerApply: {
      access: false,
      dataAuth: {
        name: false,
        mobile: false,
        department: false,
        email: false,
        company: false,
      },
    },
    MyPanel: {
      access: true,
      dataAuth: {


      },
    },

  },
  ASSISTANT: {
    // 医学助理中心权限配置
    account: {
      access: true,
      dataAuth: {
        name: true,
        patientNo: false,
        mobile: true,
        email: true,
        enterprise: true,
        department: true,
      },
    },
    pwd: {
      access: true,
    },
    authInfo: {
      access: false,
      dataAuth: {
        authStatus: true,
      },
    },
    notice: {
      access: true,
      dataAuth: {
        noticeList: true,
      },
    },
    doctorInfo: {
      access: true,
      dataAuth: {
        authStatus: true,
        Request: true,
        Consultation: false,
      },
    },
    DoctorItem: {
      access: true,
      dataAuth: {
        chat: false,
        auth: true,
        nothing: false,
      },
    },
    empowerApply: {
      access: true,
      dataAuth: {
        name: true,
        mobile: true,
        department: true,
        email: true,
        company: true,
      },
    },
    MyPanel: {
      access: true,
      dataAuth: {


      },
    },
  },
  DOCTOR: {
    // 医生中心权限配置
    account: {
      access: true,
      dataAuth: {
        name: true,
        patientNo: false,
        mobile: true,
        email: true,
        enterprise: true,
        department: true,
      },
    },
    pwd: {
      access: true,
    },
    authInfo: {
      access: true,
      dataAuth: {
        authStatus: false,
      },
    },
    notice: {
      access: true,
      dataAuth: {
        noticeList: true,
      },
    },
    doctorInfo: {
      access: true,
      dataAuth: {
        authStatus: false,
        Request: false,
        Consultation: false,
      },
    },
    DoctorItem: {
      access: true,
      dataAuth: {
        chat: false,
        auth: false,
        nothing: true,

      },
    },
    MyPanel: {
      access: true,
      dataAuth: {


      },
    },
    empowerApply: {
      access: true,
      dataAuth: {
        name: true,
        mobile: true,
        department: true,
        email: true,
        company: true,
      },
    },
  },
  VISITOR: {
    account: {
      access: false,
    },
    pwd: {
      access: false,
    },
    authInfo: {
      access: false,
    },
    notice: {
      access: false,
    },
    doctorInfo: {
      access: false,
    },
    DoctorItem: {
      access: true,
      dataAuth: {
        chat: false,
        auth: false,
        nothing: false,
        visitor: true,
      },
    },
    empower: {
      access: false,
    },
    Chat: {
      access: false,
    },
    empowerApply: {
      access: false,
    },
    myPanel: {
      access: false,
    },
    doctorList: {
      access: false,
    },
    chat: {
      access: false,
    },
  },
};

export const queryCrfById = { isSdvEnd: false, datas: [{ notInSameModuleCodes: [], moduleDefineType: 'DIR', moduleDefineOrder: 1, moduleDefineUsingScore: '0', moduleItem: 3, moduleDefineCommentFlag: '0', children: [{ moduleDefineType: 'LEAF', moduleDefineOrder: 3, moduleDefineUsingScore: '0', moduleItem: 6, moduleDefineCommentFlag: '0', children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6688, datas: false, id: '18578', open: 'false', moduleDefineIsIntrinsic: '0', name: '饮酒强度', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_6T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '饮酒强度', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '饮酒强度', projectDefineOrder: 6, projectDefineDataFormatId: 2, projectDefineParentId: 6509, criteriaDefineId: 899, projectItemId: 222, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, unitDefineId: 42, treeNodeOrder: 6, treeNodeId: 6688, projectDefineId: 6688, projectDefineWebType: 'INPUT', projectDefineSearchFlag: '1', treeParentNodeId: 6509 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: true, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 3, treeNodeId: 18578, criteriaDefineDescrible: '', moduleDefineName: '饮酒强度', moduleDefineUploadFile: '0', moduleDefineId: 18578, projectDefineDataFormat: { projectDefineDataFormatId: 2, projectDefineDataType: 'NUMBER', projectDefineDataFormatValue: '9999.99', projectDefineDataFormatComment: null }, unitDefine: { createTime: '2017-05-12 13:17:31', status: 'ACTIVE', unitDefineValue: '毫升/天', unitDefineId: 42, modifyTime: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18575, treeParentNodeId: 18575, moduleDefineCode: 'INDICATOR_118_6T' }, { moduleDefineType: 'LEAF', moduleDefineOrder: 4, moduleDefineUsingScore: '0', moduleItem: 7, moduleDefineCommentFlag: '0', moduleDefineFilters: [{ showTip: null, moduleDefineFilterUnits: '{"?1":"毫升/天","INDICATOR_CODES":"INDICATOR_118_6T","?0":"INDICATOR_118_6T > 10?1"}', moduleDefineItem: 1, moduleDefineId: 18579, moduleDefineFilterCond: 'INDICATOR_118_6T > 10', showCond: null, moduleDefineFilterValue: '啤酒//米酒//果酒', moduleDefineFilterType: 'IN', moduleDefineFilterId: 50 }, { showTip: null, moduleDefineFilterUnits: '{"?1":"毫升/天","INDICATOR_CODES":"INDICATOR_118_6T","?0":"INDICATOR_118_6T < 8?1"}', moduleDefineItem: 2, moduleDefineId: 18579, moduleDefineFilterCond: 'INDICATOR_118_6T < 8', showCond: null, moduleDefineFilterValue: '白酒//蒸酒', moduleDefineFilterType: 'IN', moduleDefineFilterId: 51 }], children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6687, moduleDefineConstraints: [{ moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18579, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '白酒//蒸酒//啤酒//米酒//果酒' }], datas: false, id: '18579', open: 'false', moduleDefineIsIntrinsic: '0', moduleDefineIsVirtual: '0', name: '常饮酒为', value: 'INDICATOR_118_7T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '常饮酒为', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '常饮酒为', projectDefineOrder: 5, projectDefineDataFormatId: 1, projectDefineParentId: 6509, criteriaDefineId: 875, projectItemId: 221, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, treeNodeOrder: 5, treeNodeId: 6687, projectDefineId: 6687, projectDefineWebType: 'CHECKBOX', projectDefineSearchFlag: '1', treeParentNodeId: 6509 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 4, treeNodeId: 18579, criteriaDefineDescrible: '', moduleDefineName: '常饮酒为', moduleDefineUploadFile: '0', moduleDefineId: 18579, projectDefineDataFormat: { projectDefineDataFormatId: 1, projectDefineDataType: 'TEXT', projectDefineDataFormatValue: '255', projectDefineDataFormatComment: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18575, treeParentNodeId: 18575, moduleDefineCode: 'INDICATOR_118_7T', filters: [{ value: '啤酒//米酒//果酒', cond: 'INDICATOR_118_6T > 10', reference: [{ isInSameGroup: 1, value: 'INDICATOR_118_6T' }] }, { value: '白酒//蒸酒', cond: 'INDICATOR_118_6T < 8', reference: [{ isInSameGroup: 1, value: 'INDICATOR_118_6T' }] }] }, { moduleDefineType: 'DIR', moduleDefineOrder: 5, moduleDefineUsingScore: '0', moduleItem: 8, moduleDefineCommentFlag: '0', children: [{ moduleDefineType: 'LEAF', moduleDefineOrder: 1, moduleDefineUsingScore: '0', moduleItem: 11, moduleDefineCommentFlag: '0', children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6482, moduleDefineConstraints: [{ moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18589, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '有//无' }, { moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18589, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '有//无' }], datas: false, id: '18589', open: 'false', moduleDefineIsIntrinsic: '0', name: '其他腹部手术史', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_11T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '其他腹部手术史', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '其他腹部手术史', projectDefineOrder: 3, projectDefineDataFormatId: 1, projectDefineParentId: 6479, criteriaDefineId: 1413, projectItemId: 33, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, treeNodeOrder: 3, treeNodeId: 6482, projectDefineId: 6482, projectDefineWebType: 'RADIO', projectDefineSearchFlag: '1', treeParentNodeId: 6479 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 1, treeNodeId: 18589, criteriaDefineDescrible: '', moduleDefineName: '其他腹部手术史', moduleDefineUploadFile: '0', moduleDefineId: 18589, projectDefineDataFormat: { projectDefineDataFormatId: 1, projectDefineDataType: 'TEXT', projectDefineDataFormatValue: '255', projectDefineDataFormatComment: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18585, treeParentNodeId: 18585, moduleDefineCode: 'INDICATOR_118_11T' }, { moduleDefineType: 'LEAF', moduleDefineOrder: 2, moduleDefineUsingScore: '0', moduleItem: 12, moduleDefineCommentFlag: '0', children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6484, datas: false, id: '18590', open: 'false', moduleDefineIsIntrinsic: '0', name: '手术具体描述', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_12T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '手术具体描述', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '手术具体描述', projectDefineOrder: 5, projectDefineDataFormatId: 1, projectDefineParentId: 6479, criteriaDefineId: 1414, projectItemId: 35, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, treeNodeOrder: 5, treeNodeId: 6484, projectDefineId: 6484, projectDefineWebType: 'INPUT', projectDefineSearchFlag: '1', treeParentNodeId: 6479 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 2, treeNodeId: 18590, criteriaDefineDescrible: '', moduleDefineName: '手术具体描述', moduleDefineUploadFile: '0', moduleDefineId: 18590, projectDefineDataFormat: { projectDefineDataFormatId: 1, projectDefineDataType: 'TEXT', projectDefineDataFormatValue: '255', projectDefineDataFormatComment: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18585, treeParentNodeId: 18585, moduleDefineCode: 'INDICATOR_118_12T' }], moduleDefineFreezeColumns: 0, usingCondAssign: '0', datas: false, id: '18585', open: 'false', moduleDefineIsIntrinsic: '0', name: '组件显示组件名', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_8T', iconSkin: 'FIELD', nodeType: 'NodeType_FIELD', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '\n                  组件显示组件名      ', moduleDefineIsDisplayGlobalCrf: '1', moduleDefineUsingGlobalCrf: '0', moduleId: 118, moduleDefineIsRequired: '0', moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'true', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 5, treeNodeId: 18585, moduleDefineName: '组件显示组件名', moduleDefineUploadFile: '1', moduleDefineId: 18585, moduleDefineParentId: 18575, moduleDefineIsForm: '0', treeParentNodeId: 18575, moduleDefineCode: 'INDICATOR_118_8T' }, { moduleDefineType: 'LEAF', moduleDefineOrder: 6, moduleDefineUsingScore: '0', moduleItem: 9, moduleDefineCommentFlag: '0', children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6481, moduleDefineConstraints: [{ moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18586, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '有//无' }], datas: false, id: '18586', open: 'false', moduleDefineIsIntrinsic: '0', name: '胃切除手术史', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_9T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '胃切除手术史', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '胃切除手术史', projectDefineOrder: 1, projectDefineDataFormatId: 1, projectDefineParentId: 6479, criteriaDefineId: 1411, projectItemId: 32, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, treeNodeOrder: 1, treeNodeId: 6481, projectDefineId: 6481, projectDefineWebType: 'RADIO', projectDefineSearchFlag: '1', treeParentNodeId: 6479 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 6, treeNodeId: 18586, criteriaDefineDescrible: '', moduleDefineName: '胃切除手术史', moduleDefineUploadFile: '0', moduleDefineId: 18586, projectDefineDataFormat: { projectDefineDataFormatId: 1, projectDefineDataType: 'TEXT', projectDefineDataFormatValue: '255', projectDefineDataFormatComment: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18575, treeParentNodeId: 18575, moduleDefineCode: 'INDICATOR_118_9T' }, { moduleDefineType: 'LEAF', moduleDefineOrder: 7, moduleDefineUsingScore: '0', moduleItem: 10, moduleDefineCommentFlag: '0', children: [], moduleDefineFreezeColumns: 0, usingCondAssign: '0', projectDefineId: 6482, moduleDefineConstraints: [{ moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18587, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '有//无' }, { moduleDefineItem: null, moduleDefineConstraintId: null, moduleDefineId: 18587, status: null, moduleDefineConstraintPreCond: null, moduleDefineConstraintType: 'IN', myMaxValue: null, myMiniValue: null, showTxt: null, moduleDefineConstraintValue: '有//无' }], datas: false, id: '18587', open: 'false', moduleDefineIsIntrinsic: '0', name: '其他腹部手术史', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_10T', iconSkin: 'LEAF', nodeType: 'NodeType_LEAF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', projectDefineName: '其他腹部手术史', moduleDefineUsingGlobalCrf: '0', moduleDefineIsRequired: '0', moduleId: 118, projectDefine: { projectDefineType: 'LEAF', projectDefineName: '其他腹部手术史', projectDefineOrder: 3, projectDefineDataFormatId: 1, projectDefineParentId: 6479, criteriaDefineId: 1413, projectItemId: 33, children: [], projectDefineIsPopup: '0', projectDefineIsIntrinsic: '0', projectId: 40, treeNodeOrder: 3, treeNodeId: 6482, projectDefineId: 6482, projectDefineWebType: 'RADIO', projectDefineSearchFlag: '1', treeParentNodeId: 6479 }, moduleDefineUsingDefaultValue: '0', moduleDefineIsDatas: '0', isParent: 'false', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 7, treeNodeId: 18587, criteriaDefineDescrible: '', moduleDefineName: '其他腹部手术史', moduleDefineUploadFile: '0', moduleDefineId: 18587, projectDefineDataFormat: { projectDefineDataFormatId: 1, projectDefineDataType: 'TEXT', projectDefineDataFormatValue: '255', projectDefineDataFormatComment: null }, moduleDefineIsForm: '0', moduleDefineParentId: 18575, treeParentNodeId: 18575, moduleDefineCode: 'INDICATOR_118_10T' }], moduleDefineFreezeColumns: 0, usingCondAssign: '0', datas: false, id: '18575', open: 'false', moduleDefineIsIntrinsic: '0', name: '饮酒', moduleDefineIsVirtual: '0', value: 'INDICATOR_118_3T', iconSkin: 'CRF', nodeType: 'NodeType_CRF', mouduleDefineIsDisplay: '1', moduleDefineDescribe: '', moduleDefineIsDisplayGlobalCrf: '1', moduleDefineUsingGlobalCrf: '0', moduleId: 118, moduleDefineIsRequired: '0', moduleDefineUsingDefaultValue: '0', moduleName: '5d954694-bc67-43f6-9bea-8124ee6af42d', moduleDefineIsDatas: '0', isParent: 'true', number: false, moduleDefineIsGlobalCrf: '0', treeNodeOrder: 1, treeNodeId: 18575, moduleDefineName: '饮酒', moduleDefineUploadFile: '0', moduleDefineId: 18575, moduleDefineParentId: 18574, moduleDefineIsForm: '1', treeParentNodeId: 18574, notInSameCRFCodes: [], moduleDefineCode: 'INDICATOR_118_3T' }], isCleared: false, count: 1, totalCount: 1, data: null, visitCrf: { visitCrfId: 136624, cleanTime: null, finishTime: null, sdvStatus: 'UNSDV', sdvTime: null, status: 'NEW', moduleDefineId: 18575, visitId: 7605, sdvStatusUpdate: false }, isCompleted: false };

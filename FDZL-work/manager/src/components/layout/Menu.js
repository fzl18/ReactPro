export const menuList = [
    {
        name:"科室首页",
        icon:'icon-shouye',
        level:0,
        children:[
            {
                name:"最新动态",
                path:"#/index/news",
                level:1,
                children:[
                    {
                        name:"添加",
                        path:"#/index/news/save",
                        level:2,
                        back:true,
                    },
                    {
                        name:"修改",
                        path:"#/index/news/save/:id",
                        level:2,
                        back:true,
                    }
                ]
            },
            {
                name:"学术会议",
                path:"#/index/meet",
                level:1,
                children:[
                    {
                        name:"添加",
                        path:"#/index/meetsave",
                        level:2,
                        back:true,
                    },
                    {
                        name:"修改",
                        path:"#/index/meetsave/:id",
                        level:2,
                        back:true,
                    }
                ]
            },
            {
                name:"研究课题",
                path:"#/index/subject",
                level:1,
                children:[
                    {
                        name:"添加",
                        path:"#/index/subject/save",
                        level:2,
                        back:true,
                    },
                    {
                        name:"修改",
                        path:"#/index/subject/save/:id",
                        level:2,
                        back:true,
                    }
                ]
            },
            {
                name:"首页轮播",
                path:"#/index/carousel",
                level:1,
            },
        ]
    },
    {
        name:"科室团队",
        icon:'icon-tuandui',
        level:0,
        children:[
            {
                name:"科室管理",
                path:"#/team/department",
                level:1,
            },
            {
                name:"医生管理",
                path:"#/team/doctor",
                level:1,
                children:[
                    {
                        name:"添加",
                        path:"#/team/doctor/save",
                        level:2,
                        back:true,                        
                    },
                    {
                        name:"修改",
                        path:"#/team/doctor/save/:id",
                        level:2,
                        back:true,                        
                    }
                ]
            }
        ]
    },
    {
        name:"科普宣教",
        icon:'icon-kepu',
        level:0,
        children:[
            {
                name:"分类管理",
                path:"#/education/class",
                level:1,
            },
            {
                name:"文章管理",
                path:"#/education/detail",
                level:1,
                children:[
                    {
                        name:"添加",
                        path:"#/education/save",
                        level:2,
                        back:true,
                    },
                    {
                        name:"修改",
                        path:"#/education/save/:id",
                        level:2,
                        back:true,
                    }
                ]
            }
        ]
    },
    {
        name:"问题库",
        icon:'icon-biaoqian',
        path:"#/question",
        level:0,
        show:true,
        children:[
            {
                name:"添加",
                path:"#/question/save",
                level:1,
                show:false,
                back:true,
            },
            {
                name:"修改",
                path:"#/question/save/:id",
                level:1,
                show:false,
                back:true,
            }
        ]
    },
    {
        name:"咨询历史",
        icon:'icon-jian',
        path:"#/consulhistory",
        level:0,
        show:true,
        children:[
            {
                name:"详情",
                path:"#/consulhistory/detail/:id",
                level:1,
                show:false,
                back:true,
            }
        ]
    },
    {
        name:"热门咨询",
        icon:'icon-remen',
        path:"#/consulhot",
        level:0,
        show:true,
        children:[
            {
                name:"详情",
                path:"#/consulhot/detail/:id",
                level:1,
                show:false,
                back:true,
            },
            {
                name:"自定义",
                path:"#/consulhot/diy",
                level:1,
                show:false,
                back:true,
            },
            {
                name:"修改",
                path:"#/consulhot/diy/:id",
                level:1,
                show:false,
                back:true,
            }
        ]
    },
    {
        name:"用户管理",
        icon:'icon-guanli',
        level:0,
        children:[
            {
                name:"患者",
                path:"#/UserManager/Patients",
                level:1,
            },
            {
                name:"医学助理",
                path:"#/UserManager/Assistants",
                level:1,
            },
            {
                name:"医生",
                path:"#/UserManager/Doctors",
                level:1,
            }
        ]
    },
    {
        name:"服务记录",
        icon:'icon-jilu',
        path:"#/serive",
        level:0,
    },
    {
        name:"咨询排班",
        icon:'icon-zhibananpai',
        path:"#/arrangement",
        level:0,
        show:true,
        children:[
            {
                name:"排班详情",
                path:"#/arrangement/detail/:id",
                level:1,
                show:false,
                back:true,
            }
        ]
    },
    {
        name:"科研库权限",
        icon:'icon-quanxian',
        path:"#/auth",
        level:0,
    }
]
/* 각 JS파일 버전을 관리합니다 */
const { nowPath } = pathCalc();
const NOW_URL_PATH = nowPath;
/* s : path, version set */

/**
 * --------------------------------------------------------------
 * @version 2022.05.03, 버전표시
 * --------------------------------------------------------------
 * 각 폴더와 파일을 오브젝트 형식으로 관리합니다.
 * 폴더명은 확장자가 표시되지 않은 key ex) controller
 * 파일명은 확장자가 표시된 (.js) key ex) commonRequest.js
 * --------------------------------------------------------------
 * 파일명에는 다음과 같은 key와 value값이 들어갑니다.
 * @property {type} : text/javascript / module
 * @property {priority} : 우선순위
 * @property {url_path} : 적용될 url 작성합니다. 여러 파일에 작성되어야 하는경우 || 로 나누고 모든것에 적용이 되어야 하는 경우엔 *을 작성합니다.
 * @property {file_path} : script에 src로 들어갈 path를 작성합니다.(절대경로 기준)
 * @property {version} : 스크립트가 적용될 버전을 명시해줍니다.
 */
const VERSION = '2022.05.03.16.36';

const FILE_TREE = {
    lib: {
        jquery: {
            custom: {},
            library: {
                // 'jquery-3.6.0.js': {
                //     priority: 0,
                //     url_path: '*',
                //     file_path: '/H-Connect/js/lib/jquery/library/',
                // },
                // 'jquery-3.6.0.min.js': {
                //     priority: 0,
                //     url_path: '*',
                //     file_path: '/H-Connect/js/lib/jquery/library/',
                // },
            },
        },
        d3: {
            custom: {
                'customD3.js': {
                    type: 'module',
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/d3/custom/',
                },
            },
            library: {
                'd3-7.3.0.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/d3/library/',
                },
            },
        },
        socket: {
            custom: {},
            library: {
                'sockjs-1.5.0.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/socket/library/',
                },
                'stomp-1.7.1.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/socket/library/',
                },
            },
        },
        moment: {
            custom: {},
            library: {
                'moment-2.29.3.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/moment/library/',
                },
                'moment.min.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/moment/library/',
                },
            },
        },

        fullcalendar: {
            library: {
                'fullcalendar.js': {
                    priority: 0,
                    url_path: '/doctor/remote||/doctor/remote_new',
                    file_path: '/H-Connect/js/lib/fullcalendar/library/',
                },
                'main.min.js': {
                    priority: 0,
                    url_path: '/doctor/remote||/doctor/remote_new',
                    file_path: '/H-Connect/js/lib/fullcalendar/library/',
                },
            },
            custom: {
                'customFullcalendar.js': {
                    type: 'module',
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/fullcalendar/custom/',
                },
            },
        },
        swiper: {
            custom: {},
            library: {
                'slide.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/swiper/library/',
                },
                'swiper-bundle.min.js': {
                    priority: 0,
                    url_path: '*',
                    file_path: '/H-Connect/js/lib/swiper/library/',
                },
            },
        },
    },
    utils: {
        common: {
            'utils.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/common/',
            },
            'arrayHandle.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/common/',
            },
        },
        controller: {
            'commonRequest.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'historyController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'cookieController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'localStorageController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'sessionController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'serverController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
            'deviceNameController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
            },
        },
        module: {
            auth: {
                'login.js': {
                    type: 'module',
                    priority: 0,
                    url_path: '/||/index',
                    file_path: '/H-Connect/js/utils/module/auth/',
                },
                'logout.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/auth/',
                },
            },
            select: {
                'selectList.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/select/',
                },
            },
            d3js: {
                'd3Module.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/d3js/',
                },
            },
            pagination: {
                'pagination.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/pagination/',
                },
            },
            tabController: {
                'tabController.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/tabController/',
                },
            },
            popupController: {
                'popupController.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/popupController/',
                },
            },
        },
        custom: {
            'utils.js': {
                type: 'module',
                url_path: '*',
                priority: 0,
                file_path: '/H-Connect/js/utils/custom/',
            },
        },
    },
    common: {
        text: {
            'validationText.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/common/text/',
            },
        },
        header: {
            actions: {
                'accountPopupActions.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/common/header/actions/',
                },
            },
        },
        popup: {
            templates: {
                'commonPopupTmpl.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/common/popup/templates/',
                },
            },
        },
    },
    doctor: {
        monitoring: {
            actions: {
                'eventListAPI.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/actions/',
                },
                'eventScreenAPI.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/actions/',
                },
                'selectBioSignalEventActions.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/actions/',
                },
            },
            templates: {
                'templateEvent.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/templates/',
                },
                'templateEventScreen.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/templates/',
                },
            },
            renders: {
                'renderNewEvents.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/renders/',
                },
                'renderPreEvents.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/renders/',
                },
                'renderEventScreen.js': {
                    type: 'module',
                    url_path: '/doctor/monitoring',
                    file_path: '/H-Connect/js/doctor/monitoring/renders/',
                },
            },
            'common.js': {
                type: 'module',
                url_path: '/doctor/monitoring',
                file_path: '/H-Connect/js/doctor/monitoring/',
            },
        },
        remote: {
            index: {
                actions: {
                    'dateScheduleHandle.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path: '/H-Connect/js/doctor/remote/index/actions/',
                    },
                    'dateScheduleAPI.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path: '/H-Connect/js/doctor/remote/index/actions/',
                    },
                },
                renders: {
                    'dateScheduleRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path: '/H-Connect/js/doctor/remote/index/renders/',
                    },
                },
                templates: {
                    'dateScheduleTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/remote/index/templates/',
                    },
                    'dateScheduleDetailTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/remote/index/templates/',
                    },
                },
            },
            remoteNew: {
                actions: {
                    'calendarActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'bookmarkActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'attendeesSectionActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    eachCooperationActions: {
                        'realTimeActions.js': {
                            type: 'module',
                            url_path: '/doctor/remote_new',
                            file_path:
                                '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/',
                        },
                        'opinionActions.js': {
                            type: 'module',
                            url_path: '/doctor/remote_new',
                            file_path:
                                '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/',
                        },
                        'requestScheduleActions.js': {
                            type: 'module',
                            url_path: '/doctor/remote_new',
                            file_path:
                                '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/',
                        },
                        'contentActions.js': {
                            type: 'module',
                            url_path: '/doctor/remote_new',
                            file_path:
                                '/H-Connect/js/doctor/remote/remoteNew/actions/eachCooperationActions/',
                        },
                    },
                    'createCooperationActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'cooperationSectionActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'remoteNewAPI.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'selector.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                    'dataActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/actions/',
                    },
                },
                renders: {
                    'commonRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/renders/',
                    },
                    'bookmarkRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/renders/',
                    },
                    'attendeesSectionRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/renders/',
                    },
                    'cooperationSectionRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/renders/',
                    },
                    'firstUpdateInformationRenders.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/renders/',
                    },
                },
                templates: {
                    'bookmarkSectionTmpl.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/templates/',
                    },
                    'attendeesSectionTmpl.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/templates/',
                    },
                    'cooperationSectionTmpl.js': {
                        type: 'module',
                        url_path: '/doctor/remote_new',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteNew/templates/',
                    },
                },
            },
            common: {
                actions: {
                    'calendarActions.js': {
                        type: 'module',
                        url_path: '/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/actions/',
                    },
                    'sessionBanner.js': {
                        type: 'module',
                        url_path:
                            '/doctor/remote||/doctor/remote_alarm||/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/actions/',
                    },
                    'insertReplyHandle.js': {
                        type: 'module',
                        url_path:
                            '/doctor/remote||/doctor/remote_alarm||/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/actions/',
                    },
                    'remoteAPI.js': {
                        type: 'module',
                        url_path:
                            '/doctor/remote||/doctor/remote_alarm||/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/actions/',
                    },
                },
                renders: {
                    'countRender.js': {
                        type: 'module',
                        url_path:
                            '/doctor/remote_check||/doctor/remote_alarm||/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/renders/',
                    },
                    'calendarRender.js': {
                        type: 'module',
                        url_path:
                            '/doctor/remote_check||/doctor/remote_alarm||/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/remote/common/renders/',
                    },
                },
                templates: {},
            },
            remoteAlarm: {
                actions: {
                    'remoteAlarmHandle.js': {
                        type: 'module',
                        url_path: '/doctor/remote_alarm',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteAlarm/actions/',
                    },
                    'remoteAlarmAPI.js': {
                        type: 'module',
                        url_path: '/doctor/remote_alarm',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteAlarm/actions/',
                    },
                },
                renders: {
                    'remoteAlarmRender.js': {
                        type: 'module',
                        url_path: '/doctor/remote_alarm',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteAlarm/renders/',
                    },
                },
                templates: {
                    'remoteAlarmTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/remote_alarm',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteAlarm/templates/',
                    },
                    'remoteAlarmDetailTemplate.js': {
                        type: 'module',
                        url_path: '/doctor/remote_alarm',
                        file_path:
                            '/H-Connect/js/doctor/remote/remoteAlarm/templates/',
                    },
                },
            },
            opinion: {
                renders: {
                    'opinionRender.js': {
                        type: 'module',
                        url_path: '/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/opinion/renders/',
                    },
                },
                actions: {
                    'opinionHandle.js': {
                        type: 'module',
                        url_path: '/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/opinion/actions/',
                    },
                },
                templates: {
                    'opinionTemplate.js': {
                        type: 'module',
                        url_path: '/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/opinion/templates/',
                    },
                    'opinionDetailTemplate.js': {
                        type: 'module',
                        url_path: '/doctor/remote_check',
                        file_path:
                            '/H-Connect/js/doctor/remote/opinion/templates/',
                    },
                },
            },
        },
        hworks: {
            session: {
                actions: {
                    'hWorksAPI.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/actions/',
                    },
                    'hWorkHandle.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/actions/',
                    },
                },
                renders: {
                    'hWorkRender.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/renders/',
                    },
                    'caseInfoListRender.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/renders/',
                    },
                },
                templates: {
                    'sessionListTemplate.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/templates/',
                    },
                    'caseInfoListTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/session/templates/',
                    },
                },
            },
            mySchedule: {
                actions: {
                    'calendarHandle.js': {
                        type: 'module',
                        url_path: '/doctor/index',
                        file_path:
                            '/H-Connect/js/doctor/hworks/mySchedule/actions/',
                    },
                    'myCalendarAPI.js': {
                        type: 'module',
                        url_path: '/doctor/index',
                        file_path:
                            '/H-Connect/js/doctor/hworks/mySchedule/actions/',
                    },
                },
                renders: {
                    'myCalendarRender.js': {
                        type: 'module',
                        url_path: '/doctor/index||/doctor/remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/mySchedule/renders/',
                    },
                },
                templates: {
                    'myCalendarTemplate.js': {
                        type: 'module',
                        url_path: '/doctor/index',
                        file_path:
                            '/H-Connect/js/doctor/hworks/mySchedule/templates/',
                    },
                },
            },
            remoteHworks: {
                actions: {
                    'myRemoteAPI.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/actions/',
                    },
                    'myRemoteHandle.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/actions/',
                    },
                },
                renders: {
                    'myRemoteRender.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/renders/',
                    },
                    'noCheckConsultRender.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/renders/',
                    },
                },
                templates: {
                    'myRemoteTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/templates/',
                    },
                    'noCheckConsultTemplates.js': {
                        type: 'module',
                        url_path: '/doctor/my_remote',
                        file_path:
                            '/H-Connect/js/doctor/hworks/remoteHworks/templates/',
                    },
                },
            },
        },
    },
    nurse: {
        common: {
            header: {
                actions: {
                    'searchPatientAPI.js': {
                        type: 'module',
                        url_path:
                            '/nurse/monitoring||/nurse/patient||/nurse/arteriotony||/nurse/patient_warning||/nurse/index||/nurse/device_management||/nurse/measure',
                        file_path: '/H-Connect/js/nurse/common/header/actions/',
                    },
                },
                renders: {
                    'searchPatientRender.js': {
                        type: 'module',
                        url_path:
                            '/nurse/monitoring||/nurse/patient||/nurse/arteriotony||/nurse/patient_warning||/nurse/index||/nurse/device_management||/nurse/measure',
                        file_path: '/H-Connect/js/nurse/common/header/renders/',
                    },
                },
                templates: {
                    'searchPatientTmpl.js': {
                        type: 'module',
                        url_path:
                            '/nurse/monitoring||/nurse/patient||/nurse/arteriotony||/nurse/patient_warning||/nurse/index||/nurse/device_management||/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/common/header/templates/',
                    },
                },
            },
        },
        dashboard: {
            actions: {
                'getDisplayList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                },
                'getPatientList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                },
                'getWardList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                },
                'displayActions.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                },
                'sickBedActions.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                },
            },
            renders: {
                'renderDashboard.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/renders/',
                },
            },
            templates: {
                'templateWardListLeft.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                },
                'templateSickBedListLeft.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                },
                'templateDisplayBtn.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                },
                'templateDashboardScreen.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                },
                'templateDisplayDeletePop.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                },
            },
        },
        management: {
            device: {
                actions: {
                    'searchHandle.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                    },
                    'deviceAPI.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                    },
                    'deviceHandle.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                    },
                },
                renders: {
                    'select_device_list.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/renders/',
                    },
                    'select_device_unused_list.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/renders/',
                    },
                },
                templates: {
                    'deviceList.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/templates/',
                    },
                    'unusedDeviceList.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/templates/',
                    },
                },
            },
            measure: {
                actions: {
                    'measureAPI.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'measureHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'updateMeasureHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'deleteMeasureHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'newMeasureHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'searchMeasureHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                    'selectBoxHandle.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                    },
                },
                renders: {
                    'createMeasureList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                    },
                    'selectBoxRender.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                    },
                    'newSickBedPopDeviceList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                    },
                },
                templates: {
                    'measurList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                    },
                    'deviceList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                    },
                    'selectBoxItem.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                    },
                },
            },
            ward: {
                actions: {
                    'wardAPI.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                    },
                    'wardEvent.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                    },
                    'sickRoomAPI.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                    },
                    'sickRoomEvent.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                    },
                },
                renders: {
                    'constant.js': {
                        priority: 0,
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                    },
                    'insertWardList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                    },
                    'insertRoomList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                    },
                },
                templates: {
                    'sickRoomList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/templates/',
                    },
                    'wardList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/templates/',
                    },
                },
            },
        },
        message: {
            actions: {
                'message.js': {
                    type: 'module',
                    url_path: '/nurse/message',
                    file_path: '/H-Connect/js/nurse/message/actions/',
                },
            },
            renders: {},
            templates: {},
        },
        monitoring: {
            actions: {
                'fakeData.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                },
                'fakeSocket.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                },
                'monitoringAPI.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                },
                'streamingMonitoring.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                },
                'monitoringHandle.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                },
            },
            renders: {
                'renderMonitoringPatient.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
                'renderMonitoringRoom.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
                'updateMonitoringPatient.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
                'addMonitoringEmptyBed.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
                'addDeviceList.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
                'addSickBedSelectBox.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                },
            },
            templates: {
                'monitoringPatientTml.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/templates/',
                },
                'deviceTemplate.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/templates/',
                },
                'selectBoxTemplate.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/templates/',
                },
            },
        },
        patientMonitoring: {
            common: {
                actions: {
                    'patientMonitoringAPI.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/actions/',
                    },
                },
                renders: {
                    'renderPatientInfo.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/renders/',
                    },
                },
                templates: {
                    'pateintInfoTmpl.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/templates/',
                    },
                },
            },
            arteriotony: {
                actions: {
                    'bloodPressureActions.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/',
                    },
                    'sendDoctorHandle.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/',
                    },
                    'bloodPressureAPI.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/',
                    },
                },
                renders: {
                    'renderArteriotonyList.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/',
                    },
                    'sendDoctorListRender.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/',
                    },
                },
                templates: {
                    'arteriotonyTmpl.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/',
                    },
                    'sendDoctorList.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/',
                    },
                },
            },
            patient: {
                common: {
                    actions: {
                        'patientActions.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/common/actions/',
                        },
                    },
                    renders: {
                        'renderSimpleData.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/common/renders/',
                        },
                        'renderVital.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/common/renders/',
                        },
                    },
                    templates: {
                        'vitalHeaderTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/',
                        },
                        'globalSettingPopupTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/',
                        },
                    },
                },
                currentVital: {
                    actions: {
                        'fakeData.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/',
                        },
                        'fakeSocket.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/',
                        },
                        'alarmSettingPopupActions.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/',
                        },
                        'simpleDataAction.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/',
                        },
                        'test.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/',
                        },
                    },
                    renders: {
                        'renderCurrentVital.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/renders/',
                        },
                    },
                    templates: {
                        'alarmSettingPopupTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/templates/',
                        },
                    },
                },
                tabularTrend: {
                    actions: {},
                    renders: {
                        'renderTabularTrendList.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/tabularTrend/renders/',
                        },
                    },
                    templates: {
                        'tabularTrendTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/tabularTrend/templates/',
                        },
                    },
                },
                event: {
                    actions: {},
                    renders: {
                        'renderEventSimpleList.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/event/renders/',
                        },
                    },
                    templates: {
                        'eventSimpleTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/event/templates/',
                        },
                        'eventDeletePopupTmpl.js': {
                            type: 'module',
                            url_path: '/nurse/patient',
                            file_path:
                                '/H-Connect/js/nurse/patientMonitoring/patient/event/templates/',
                        },
                    },
                },
            },
        },
    },
};

/* s: settings function */
// function pathCalc() {
//     /**
//      * 주소 path값을 반환하는 함수입니다.
//      * 어떠한 환경에서 실행되는지를 명확히 알수가 없어
//      * path값에서 .html을 제외하고 반환해줍니다.
//      */
//     const _getPath = location.pathname; // location의 path값을 반환합니다.
//     let _resultPath = _getPath; // 반환될 path값을 설정해줍니다.

//     if (_getPath.indexOf('.html') !== -1) {
//         _resultPath = _getPath.split('.html')[0];
//     }

//     return _resultPath;
// }
function pathCalc() {
    /**
     * 주소 path값을 반환하는 함수입니다.
     * 어떠한 환경에서 실행되는지를 명확히 알수가 없어
     * path값에서 .html을 제외하고 반환해줍니다.
     */
    const _pathname = location.pathname; // location의 path값을 반환합니다.

    let _nowPath = _pathname; // 반환될 path값을 설정해줍니다.

    if (_pathname.indexOf('.html') !== -1) {
        _nowPath = _pathname.split('.html')[0];
    }

    return { nowPath: _nowPath };
}
/* e: settings function */

/* e : path, version set */
let SCRIPT_ARR = [];
function _findJsInVersion(_targetObj, filter) {
    // 재귀를 통한 스크립트 오브젝트 배열 세팅 함수
    if (typeof _targetObj !== 'object') {
        return;
    }

    for (let key in _targetObj) {
        if (!_targetObj[key]) {
            continue;
        }
        if (/[.]js$/gm.test(key)) {
            const pathArray = _targetObj[key].url_path.split('||');
            for (let i = 0; i < pathArray.length; i++) {
                if (pathArray[i] === NOW_URL_PATH || pathArray[i] === '*') {
                    _targetObj[key].file_name = key;
                    SCRIPT_ARR.push(_targetObj[key]);
                }
            }
            continue;
        }
        _findJsInVersion(_targetObj[key], filter);
    }
}
function setScript() {
    // 스크립트를 생성해줍니다.
    _findJsInVersion(FILE_TREE, '.js');
    SCRIPT_ARR.sort((a, b) => {
        if (typeof a.priority === 'number' && typeof b.priority === 'number') {
            return a.priority - b.priority;
        } else {
            return 1;
        }
    });
    /* 
    jquery 라이브러리 붙이기 전에
    versionController를 로드하기 때문에 
    해당 파일에서만 dom관련 함수를
    vanilla js로 작성
    */
    const versionScriptSrc = `H-Connect/js/utils/controller/versionController.${VERSION}.js`;
    const versionScriptEls = document.head.querySelectorAll('script');
    let versionScriptTargetEl = null;

    const scriptElsFregment = document.createDocumentFragment();

    for (let i = 0, len = versionScriptEls.length; i < len; i++) {
        const { src } = versionScriptEls[i] ?? {};
        if (src.includes(versionScriptSrc)) {
            versionScriptTargetEl = versionScriptEls[i];
            break;
        }
    }

    for (let i = 0, len = SCRIPT_ARR.length; i < len; i++) {
        const _arr = SCRIPT_ARR[i];
        const { file_path, file_name, type } = _arr;
        const scriptEl = document.createElement('script');
        scriptEl.type = type ? type : 'text/javascript';
        scriptEl.defer = true;
        scriptEl.async = false;
        scriptEl.src = file_path + file_name + '?v=' + VERSION;

        scriptElsFregment.append(scriptEl);
    }
    document.head.insertBefore(
        scriptElsFregment,
        versionScriptTargetEl.nextSibling
    );
}

setScript(); // 스크립트 생성해주는 함수

/* s : 파일 버전별 임포트 */
/*
사용 방법
const { serverController } = await import( importVersion('/H-Connect/js/utils/controller/serverController.js') );
위와 같이 import 가 필요한 파일에서 await import 구문과 함께 인자로 파일의 "절대경로"를 작성해줍니다.
무조건 절대경로로로 작성해주세요 해당 파일의 버전을 찾는 로직이 절대경로 기준으로 찾습니다.
*/
function importVersion(_path) {
    return _path + '?v=' + VERSION;
}
/* e : 파일 버전별 임포트 */

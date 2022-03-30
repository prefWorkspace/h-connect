/* 각 JS파일 버전을 관리합니다 */
const NOW_URL_PATH = pathCalc();
/* s : path, version set */

/**
 * --------------------------------------------------------------
 * @version 2022.01.27, 버전표시
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

const VERSION = {
    lib: {
        chartjs: {
            'd3-7.3.0.js': {
                priority: 0,
                url_path: '/nurse/patient',
                file_path: '/H-Connect/js/lib/chartjs/',
                version: '2022.01.17.11.33',
            },
        },
        chartjs: {
            'chartjs-3.7.0.js': {
                priority: 0,
                url_path: '/nurse/patient',
                file_path: '/H-Connect/js/lib/chartjs/',
                version: '2022.01.17.11.33',
            },
            'chartjs-3.7.0.min.js': {
                priority: 0,
                url_path: '/nurse/patient',
                file_path: '/H-Connect/js/lib/chartjs/',
                version: '2022.01.17.11.33',
            },
        },
        socket: {
            'sockjs-1.5.0.js': {
                priority: 0,
                url_path: '/nurse/monitoring||/nurse/patient',
                file_path: '/H-Connect/js/lib/socket/',
                version: '2022.01.17.11.33',
            },
            'stomp-1.7.1.js': {
                priority: 0,
                url_path: '/nurse/monitoring||/nurse/patient',
                file_path: '/H-Connect/js/lib/socket/',
                version: '2022.01.17.11.33',
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
                version: '2022.01.17.11.33',
            },
            'arrayHandle.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/common/',
                version: '2022.01.17.11.33',
            },
        },
        controller: {
            'commonRequest.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.17.11.33',
            },
            'historyController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.26.12.45',
            },
            'cookieController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.17.11.33',
            },
            'localStorageController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.17.11.33',
            },
            'sessionController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.27.09.24',
            },
            'serverController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.17.11.33',
            },
            'deviceNameController.js': {
                type: 'module',
                priority: 0,
                url_path: '*',
                file_path: '/H-Connect/js/utils/controller/',
                version: '2022.01.17.11.33',
            },
        },
        module: {
            auth: {
                'login.js': {
                    type: 'module',
                    priority: 0,
                    url_path: '/||/index',
                    file_path: '/H-Connect/js/utils/module/auth/',
                    version: '2022.01.17.11.33',
                },
                'logout.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/auth/',
                    version: '2022.01.21.11.37',
                },
            },
            select: {
                'selectList.js': {
                    type: 'module',
                    url_path: '*',
                    priority: 0,
                    file_path: '/H-Connect/js/utils/module/select/',
                    version: '2022.03.25.12.37',
                },
            },
        },
        custom: {
            'utils.js': {
                type: 'module',
                url_path: '*',
                priority: 0,
                file_path: '/H-Connect/js/utils/custom/',
                version: '2022.01.25.18.16',
            },
        },
    },
    nurse: {
        dashboard: {
            actions: {
                'getDisplayList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                    version: '2022.03.25.12.01',
                },
                'getPatientList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                    version: '2022.03.25.12.01',
                },
                'getWardList.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/actions/',
                    version: '2022.03.25.12.01',
                },
            },
            renders: {
                'renderDashboard_2.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/renders/',
                    version: '2022.03.25.12.01',
                },
            },
            templates: {
                'templateDisplayBtn.js': {
                    type: 'module',
                    url_path: '/nurse/dashboard',
                    file_path: '/H-Connect/js/nurse/dashboard/templates/',
                    version: '2022.03.25.12.01',
                },
                // 'dashboardScreenTmpl.js': {
                //     type: 'module',
                //     url_path: '/nurse/dashboard',
                //     file_path: '/H-Connect/js/nurse/dashboard/templates/',
                //     version: '2022.03.25.12.01',
                // },
            },
        },
        management: {
            device: {
                actions: {
                    'cancel_device_unused.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'createDevice.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'delete_device.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'searchHandle.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'select_device_unused.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'select_device.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/actions/',
                        version: '2022.03.25.12.01',
                    },
                },
                renders: {
                    'select_device_list.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'select_device_unused_list.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/renders/',
                        version: '2022.03.25.12.01',
                    },
                },
                templates: {
                    'deviceList.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'unusedDeviceList.js': {
                        type: 'module',
                        url_path: '/nurse/device_management',
                        file_path:
                            '/H-Connect/js/nurse/management/device/templates/',
                        version: '2022.03.25.12.01',
                    },
                },
            },
            measure: {
                actions: {
                    'measure_delete_sickBed.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'measure_insert_new_sickBed.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'measure_selectBox.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'measure_update_sickBed.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'new_device_list.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'new_sickBed__selectBox.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'selectMeasurementInfoList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'update_sickBed_selectBox.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/actions/',
                        version: '2022.03.25.12.01',
                    },
                },
                renders: {
                    'constant.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'createMeasureList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'sickRoomSelectBoxList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'wardSelectBoxList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/renders/',
                        version: '2022.03.25.12.01',
                    },
                },
                templates: {
                    'insert_device_list.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'insert_new_sickBed_measure.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'measurList.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'sickRoomSelectBox.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'wardSelectBox.js': {
                        type: 'module',
                        url_path: '/nurse/measure',
                        file_path:
                            '/H-Connect/js/nurse/management/measure/templates/',
                        version: '2022.03.25.12.01',
                    },
                },
            },
            ward: {
                actions: {
                    'deleteSickRoom.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'deleteWard.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'insertSickRoom.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'insertWard.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'selectSickRoom.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'selectWard.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'updateSickRoom.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'updateWard.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/actions/',
                        version: '2022.03.25.12.01',
                    },
                },
                renders: {
                    'constant.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'insertRoomList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                        version: '2022.03.25.12.01',
                    },
                    'insertWardList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/renders/',
                        version: '2022.03.25.12.01',
                    },
                },
                templates: {
                    'sickRoomList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/templates/',
                        version: '2022.03.25.12.01',
                    },
                    'wardList.js': {
                        type: 'module',
                        url_path: '/nurse/index',
                        file_path:
                            '/H-Connect/js/nurse/management/ward/templates/',
                        version: '2022.03.25.12.01',
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
                    version: '2022.03.25.12.01',
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
                    version: '2022.03.25.12.01',
                },
                'fakeSocket.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                    version: '2022.03.25.12.01',
                },
                'monitoringAPI.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                    version: '2022.03.25.12.01',
                },
                'streamingMonitoring.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring',
                    file_path: '/H-Connect/js/nurse/monitoring/actions/',
                    version: '2022.03.25.12.01',
                },
            },
            renders: {
                'renderMonitoringPatient.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                    version: '2022.03.25.12.01',
                },
                'renderMonitoringRoom.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                    version: '2022.03.25.12.01',
                },
                'updateMonitoringPatient.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/renders/',
                    version: '2022.03.25.12.01',
                },
            },
            templates: {
                'monitoringPatientTml.js': {
                    type: 'module',
                    url_path: '/nurse/monitoring||/nurse/monitoring_room',
                    file_path: '/H-Connect/js/nurse/monitoring/templates/',
                    version: '2022.03.25.12.01',
                },
            },
        },
        patientMonitoring: {
            arteriotony: {
                actions: {
                    'bloodPressureActions.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/',
                        version: '2022.03.25.12.01',
                    },
                    'bloodPressureAPI.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/',
                        version: '2022.03.25.12.01',
                    },
                },
                renders: {
                    'renderPrerecord.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/renders/',
                        version: '2022.03.25.12.01',
                    },
                },
                templates: {
                    'prerecordTmpl.js': {
                        type: 'module',
                        url_path: '/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/',
                        version: '2022.03.25.12.01',
                    },
                },
            },
            common: {
                actions: {
                    'patientMonitoringAPI.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/actions/',
                        version: '2022.03.25.12.01',
                    },
                },
                renders: {
                    'renderPatientInfo.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/renders/',
                        version: '2022.03.25.12.01',
                    },
                },
                templates: {
                    'pateintInfoTmpl.js': {
                        type: 'module',
                        url_path: '/nurse/patient||/nurse/arteriotony',
                        file_path:
                            '/H-Connect/js/nurse/patientMonitoring/common/templates/',
                        version: '2022.03.25.12.01',
                    },
                },
            },
        },
    },
};

/* s: settings function */
function pathCalc() {
    /**
     * 주소 path값을 반환하는 함수입니다.
     * 어떠한 환경에서 실행되는지를 명확히 알수가 없어
     * path값에서 .html을 제외하고 반환해줍니다.
     */
    const _getPath = location.pathname; // location의 path값을 반환합니다.
    let _resultPath = _getPath; // 반환될 path값을 설정해줍니다.

    if (_getPath.indexOf('.html') !== -1) {
        _resultPath = _getPath.split('.html')[0];
    }

    return _resultPath;
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
    _findJsInVersion(VERSION, '.js');
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
    for (let i = 0; i < SCRIPT_ARR.length; i++) {
        const _arr = SCRIPT_ARR[i];
        const { file_path, file_name, version, type } = _arr;
        const scriptEl = document.createElement('script');
        scriptEl.type = type ? type : 'text/javascript';
        scriptEl.defer = true;
        scriptEl.async = false;
        scriptEl.src = file_path + file_name + '?v=' + version;
        document.head.append(scriptEl);
    }
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
    let _findTargetPath = SCRIPT_ARR.find((_target) => {
        const _filePath = _target.file_path + _target.file_name;
        return _filePath === _path;
    });
    return _path + '?v=' + _findTargetPath.version;
}
/* e : 파일 버전별 임포트 */

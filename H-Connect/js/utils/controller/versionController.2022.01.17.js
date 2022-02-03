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
 * @property {priority} : 우선순위
 * @property {url_path} : 적용될 url 작성합니다. 여러 파일에 작성되어야 하는경우 || 로 나누고 모든것에 적용이 되어야 하는 경우엔 *을 작성합니다.
 * @property {file_path} : script에 src로 들어갈 path를 작성합니다.(절대경로 기준)
 * @property {version} : 스크립트가 적용될 버전을 명시해줍니다.
 */
const VERSION = {
    'lib' : {
        'chartjs' : {
            'd3-7.3.0.js' : {
                priority:0,
                url_path:'/nurse/patient',
                file_path:'/H-Connect/js/lib/chartjs/',
                version:'2022.01.17.11.33'
            },
        },
        'chartjs' : {
            'chartjs-3.7.0.js' : {
                priority:0,
                url_path:'/nurse/patient',
                file_path:'/H-Connect/js/lib/chartjs/',
                version:'2022.01.17.11.33'
            },
            'chartjs-3.7.0.min.js' : {
                priority:0,
                url_path:'/nurse/patient',
                file_path:'/H-Connect/js/lib/chartjs/',
                version:'2022.01.17.11.33'
            },
        },
        'socket' : {
            'sockjs-1.5.0.js' : {
                priority:0,
                url_path:'/nurse/monitoring||/nurse/patient',
                file_path:'/H-Connect/js/lib/socket/',
                version:'2022.01.17.11.33'
            },
            'stomp-1.7.1.js' : {
                priority:0,
                url_path:'/nurse/monitoring||/nurse/patient',
                file_path:'/H-Connect/js/lib/socket/',
                version:'2022.01.17.11.33'
            }
        }
    },
    'utils' : {
        'common' : {
            'utils.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/common/',
                version:'2022.01.17.11.33'
            },
            'arrayHandle.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/common/',
                version:'2022.01.17.11.33'
            }
        },
        'controller' : {
            'commonRequest.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'historyController.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.26.12.45'
            },
            'cookieController.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'localStorageController.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'sessionController.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.27.09.24'
            },
            'serverController.js' : {
                priority:0,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            }
        },
        'module' : {
            'auth' : {
                'login.js' : {
                    url_path:'/||/index',
                    file_path:'/H-Connect/js/utils/module/auth/',
                    version:'2022.01.17.11.33',
                },
                'logout.js' : {
                    url_path:'*',
                    file_path:'/H-Connect/js/utils/module/auth/',
                    version:'2022.01.21.11.37',
                },
            },
        },
        'custom' : {
            'utils.js' : {
                url_path:'*',
                file_path:'/H-Connect/js/utils/custom/',
                version:'2022.01.25.18.16'
            }
        }
    },
    'nurse' : {
        'template' : {
            'header' : {
                'headerSearchPatientInsert.js' : {
                    priority:0,
                    url_path:'/nurse/monitoring||/nurse/patient||/nurse/arteriotony||/nurse/patient_warning||/nurse/index||/nurse/device_management||/nurse/measure',
                    file_path:'/H-Connect/js/nurse/template/header/',
                    version:'2022.01.26.12.01'
                }
            },
            'index' : {
                'insert_newWard_index.js' : {
                    url_path:'/nurse/index',
                    file_path:'/H-Connect/js/nurse/template/index/',
                    version:'2022.01.18.15.22'
                },
                'insert_newSickRoom_index.js' : {
                    url_path:'/nurse/index',
                    file_path:'/H-Connect/js/nurse/template/index/',
                    version:'2022.01.19.11.43'
                }
            },
            'measure' : {
                'insert_ward_measur.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/template/measure/',
                    version:'2022.01.19.18.15'
                },
                'insert_new_sickBed_measure.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/template/measure/',
                    version:'2022.01.20.14.34'
                },
                'insert_device_list.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/template/measure/',
                    version:'2022.01.25.17.07'
                }
            },
            'monitoring' : {
                'insertMonitoringPatient.js' : {
                    url_path:'/nurse/monitoring',
                    file_path:'/H-Connect/js/nurse/template/monitoring/',
                    version:'2022.01.18.15.22'
                }
            },
            'patient_monitoring' : {
                'insertPatientInform.js' : {
                    priority:2,
                    url_path:'/nurse/patient||/nurse/arteriotony',
                    file_path:'/H-Connect/js/nurse/template/patient_monitoring/',
                    version:'2022.01.18.15.22'
                },
                'patient' : {
                    'insertPatientVital.js' : {
                        priority:2,
                        url_path:'/nurse/patient',
                        file_path:'/H-Connect/js/nurse/template/patient_monitoring/patient/',
                        version:'2022.01.18.15.22'
                    },
                }
            },
            'dashboard' : {
                'insertWardList.js' : {
                    url_path:'/nurse/dashboard',
                    file_path:'/H-Connect/js/nurse/template/dashboard/',
                    version:'2022.01.18.15.22'
                }
            }, 
            'device' : {
                'select_device_list.js' : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/template/device/',
                    version:'2022.01.24.12.24'
                },
                'select_device_unused_list.js' : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/template/device/',
                    version:'2022.01.24.17.51'
                }
            }
        },
        'action' : {
            'header' : {
                'getPatientSearchList.js' : {
                    priority:0,
                    url_path:'/nurse/monitoring||/nurse/patient||/nurse/arteriotony||/nurse/patient_warning||/nurse/index||/nurse/device_management||/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/header/',
                    version:'2022.01.26.12.01'
                }
            },
            'monitoring' : {
                'getMonitoringAll.js' : {
                    url_path:'/nurse/monitoring',
                    file_path:'/H-Connect/js/nurse/action/monitoring/',
                    version:'2022.01.18.15.22'
                },
                'websoket_test.js' : {
                    priority : 1,
                    url_path:'/nurse/monitoring',
                    file_path:'/H-Connect/js/nurse/action/monitoring/',
                    version:'2022.01.18.15.22'
                }
            },
            'patient_monitoring' : {
                'getPatientInform.js' : {
                    priority:1,
                    url_path:'/nurse/patient||/nurse/arteriotony',
                    file_path:'/H-Connect/js/nurse/action/patient_monitoring/',
                    version:'2022.01.18.15.22'
                },
                'patient' : {
                    'patientInit.js' : {
                        priority:2,
                        url_path:'/nurse/patient',
                        file_path:'/H-Connect/js/nurse/action/patient_monitoring/patient/',
                        version:'2022.01.28.11.56'
                    },
                    'chartTest.js' : {
                        url_path:'/nurse/patient',
                        file_path:'/H-Connect/js/nurse/action/patient_monitoring/patient/',
                        version:'2022.01.28.11.56'
                    },
                },
                'arteriotony' : {
                    'arteriotonyInit.js' : {
                        priority:2,
                        url_path:'/nurse/arteriotony',
                        file_path:'/H-Connect/js/nurse/action/patient_monitoring/arteriotony/',
                        version:'2022.01.28.11.56'
                    },
                }
            },
            'dashboard' : {
                'getWardList.js' : {
                    url_path:'/nurse/dashboard',
                    file_path:'/H-Connect/js/nurse/action/dashboard/',
                    version:'2022.01.18.15.22'
                }
            },
            'index' : {
                'wardAction' : {
                    'selectWard.js' : {
                        url_path:'/nurse/index',
                        file_path:'/H-Connect/js/nurse/action/index/wardAction/',
                        version:'2022.01.18.16.00'
                    },
                    'insertWard.js' : {
                        url_path:'/nurse/index',
                        file_path:'/H-Connect/js/nurse/action/index/wardAction/',
                        version:'2022.01.18.15.33'
                    },
                    'updateWard.js' : {
                        url_path:'/nurse/index',
                        file_path:'/H-Connect/js/nurse/action/index/wardAction/',
                        version:'2022.01.18.16.49'
                    },
                    'deleteWard.js' : {
                        url_path:'/nurse/index',
                        file_path:'/H-Connect/js/nurse/action/index/wardAction/',
                        version:'2022.01.18.18.47'
                    } 
                },
                'sickRoomAction' : {
                    'selectSickRoom.js' : {
                        url_path:'/nurse/index||/nurse/measure',
                        file_path:'/H-Connect/js/nurse/action/index/sickRoomAction/',
                        version:'2022.01.19.11.30'
                    },
                    'insertSickRoom.js' : {
                        url_path:'/nurse/index||/nurse/measure',
                        file_path:'/H-Connect/js/nurse/action/index/sickRoomAction/',
                        version:'2022.01.19.12.09'
                    },
                    'deleteSickRoom.js' : {
                        url_path:'/nurse/index||/nurse/measure',
                        file_path:'/H-Connect/js/nurse/action/index/sickRoomAction/',
                        version:'2022.01.19.14.30'
                    },
                    'updateSickRoom.js' : {
                        url_path:'/nurse/index||/nurse/measure',
                        file_path:'/H-Connect/js/nurse/action/index/sickRoomAction/',
                        version:'2022.01.19.16.09'
                    }
                }
            },
            'measure' : {
                'selectMeasurementInfoList.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.26.10.30'
                },
                'measure_selectBox.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.20.11.22'
                },
                'new_sickBed__selectBox.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.20.14.11'
                },
                'measure_insert_new_sickBed.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.20.14.30'
                },
                'measure_delete_sickBed.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.21.16.47'
                },
                'measure_update_sickBed.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.24.10.09'
                },
                'update_sickBed_selectBox.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.24.10.48'
                },
                'new_device_list.js' : {
                    url_path:'/nurse/measure',
                    file_path:'/H-Connect/js/nurse/action/measure/',
                    version:'2022.01.25.17.13'
                }
            },
            "device" : {
                "select_device.js" : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/action/device/',
                    version:'2022.01.24.12.08'
                },
                "delete_device.js" : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/action/device/',
                    version:'2022.01.24.15.10'
                },
                "insert_device.js" : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/action/device/',
                    version:'2022.01.24.15.20'
                },
                "select_device_unused.js" : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/action/device/',
                    version:'2022.01.24.17.41'
                },
                "cancel_device_unused.js" : {
                    url_path:'/nurse/device_management',
                    file_path:'/H-Connect/js/nurse/action/device/',
                    version:'2022.01.24.18.00'
                }
            },
            'message' : {
                'socket_connect.js' : {
                    url_path:'/nurse/message',
                    file_path:'/H-Connect/js/nurse/action/message/',
                    version:'2022.01.25.11.20'
                }
            }
        }
    }
}

/* s: settings function */
function pathCalc(){
    /**
     * 주소 path값을 반환하는 함수입니다.
     * 어떠한 환경에서 실행되는지를 명확히 알수가 없어
     * path값에서 .html을 제외하고 반환해줍니다.
     */
    const _getPath = location.pathname; // location의 path값을 반환합니다.
    let _resultPath = _getPath; // 반환될 path값을 설정해줍니다.

    if(_getPath.indexOf('.html') !== -1){
        _resultPath = _getPath.split('.html')[0];
    }

    return _resultPath; 
}
/* e: settings function */

/* e : path, version set */
let SCRIPT_ARR = [];
function _findJsInVersion(_targetObj, filter){
    // 재귀를 통한 스크립트 오브젝트 배열 세팅 함수
    if(typeof(_targetObj) !== 'object'){return;}
    for(let key in _targetObj){
        if(!_targetObj[key]){continue};
        if(/[.]js$/gm.test(key)){
            const pathArray = _targetObj[key].url_path.split('||');
            for(let i = 0; i < pathArray.length; i++){
                if(pathArray[i] === NOW_URL_PATH || pathArray[i] === '*'){
                    _targetObj[key].file_name = key;
                    SCRIPT_ARR.push(_targetObj[key]);
                }
            }
            continue;
        }
        _findJsInVersion(_targetObj[key], filter);
    }
}

function setScript(){
    // 스크립트를 생성해줍니다.
    _findJsInVersion(VERSION, '.js');
    SCRIPT_ARR.sort((a, b)=>{
        if(typeof a.priority === "number" && typeof b.priority === "number" ){
            return a.priority - b.priority;
        }else{
            return 1;
        }
    });
    /* 
    jquery 라이브러리 붙이기 전에
    versionController를 로드하기 때문에 
    해당 파일에서만 dom관련 함수를
    vanilla js로 작성
    */
    for(let i = 0; i < SCRIPT_ARR.length; i++){
        const _arr = SCRIPT_ARR[i];
        const {file_path, file_name, version } = _arr;
        const scriptEl = document.createElement('script');
        scriptEl.defer = true;
        scriptEl.async = false;
        scriptEl.src = file_path + file_name + '?v=' + version;
        document.head.append(scriptEl);
    }
}

setScript(); // 스크립트 생성해주는 함수
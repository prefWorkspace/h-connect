/* 각 JS파일 버전을 관리합니다 */
const doc = document;
const NOW_URL_PATH = pathCalc();
/* s : path, version set */

/**
 * --------------------------------------------------------------
 * @version 2022.01.17, 버전표시
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
    'utils' : {
        'controller' : {
            'commonRequest.js' : {
                priority:1,
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'cookieController.js' : {
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'localStorageController.js' : {
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            },
            'serverController.js' : {
                url_path:'*',
                file_path:'/H-Connect/js/utils/controller/',
                version:'2022.01.17.11.33'
            }
        },
        'module' : {
            'auth' : {
                'login.js' : {
                    url_path:'/',
                    file_path:'/H-Connect/js/utils/module/auth/',
                    version:'2022.01.17.11.33',
                },
            },
        },
    },
    'nurse' : {
        'template' : {
            'index' : {
                'insert_newWard.js' : {
                    url_path:'/nurse/index||/nurse/measure',
                    file_path:'/H-Connect/js/nurse/template/index/',
                    version:'2022.01.18.15.22'
                }
            },
            'monitoring' : {
                'monitoring.js' : {
                    url_path:'/nurse/monitoring',
                    file_path:'/H-Connect/js/nurse/template/monitoring/',
                    version:'2022.01.18.15.22'
                }
            }
        },
        'action' : {
            'monitoring' : {
                'insert_monitoring.js' : {
                    url_path:'/nurse/monitoring',
                    file_path:'/H-Connect/js/nurse/action/monitoring/',
                    version:'2022.01.18.15.22'
                }
            }
        },
        'insertWard.js' : {
            url_path:'/nurse/index||/nurse/measure',
            file_path:'/H-Connect/js/nurse/',
            version:'2022.01.18.15.33'
        },
        'selectWard.js' : {
            url_path:'/nurse/index||/nurse/measure',
            file_path:'/H-Connect/js/nurse/',
            version:'2022.01.18.16.00'
        }
    }
}

/* e : path, version set */
let scriptArr = [];
function scriptSet(){
    // 스크립트를 생성해줍니다.
    findJsInVersion(VERSION, '.js');
    const tempScript = doc.createDocumentFragment();
    for(let i = 0; i < scriptArr.length; i++){
        const arr = scriptArr[i];
        const scriptEl = doc.createElement('script');
        scriptEl.defer = true;
        scriptEl.src = arr.file_path + arr.file_name + '?v=' + arr.version;
        tempScript.append(scriptEl);
    }
    doc.head.append(tempScript);
}
function findJsInVersion(_targetObj, filter){
    // 재귀를 통한 스크립트 오브젝트 배열 세팅 함수
    if(typeof(_targetObj) !== 'object'){return;}
    for(let key in _targetObj){
        if(!_targetObj[key]){continue};
        if(/[.]js$/gm.test(key)){
            const pathArray = _targetObj[key].url_path.split('||');
            for(let i = 0; i < pathArray.length; i++){
                if(pathArray[i] === NOW_URL_PATH || pathArray[i] === '*'){
                    _targetObj[key].file_name = key;
                    scriptArr.push(_targetObj[key]);
                }
            }
            continue;
        }
        findJsInVersion(_targetObj[key], filter);
    }
}
scriptSet(); // 스크립트 생성해주는 함수

/* s: settings function */

function pathCalc(){
    /**
     * 주소 path값을 반환하는 함수입니다.
     * 어떠한 환경에서 실행되는지를 명확히 알수가 없어
     * path값에서 .html을 제외하고 반환해줍니다.
     */
    const _GET_PATH = location.pathname; // location의 path값을 반환합니다.
    let _resultPath = _GET_PATH; // 반환될 path값을 설정해줍니다.

    if(_GET_PATH.indexOf('.html') !== -1){
        _resultPath = _GET_PATH.split('.html')[0];
    }

    return _resultPath; 
}
/* e: settings function */
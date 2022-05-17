const { coopParticipantInformSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
const { renderActivateCreateCoopBtn } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
/* 유틸성 함수 */

function getDataWithTarget(targetWrap) {
    let _objArr = [];
    const _$realTimeDataEls = $(targetWrap).find('[data-key]');

    _$realTimeDataEls.each(function () {
        const _this = $(this);
        _objArr.push({
            key: _this.attr('data-key'),
            value: (function () {
                const _keyType = _this.attr('data-keyType');
                if (_keyType === 'text') {
                    return _this.text();
                } else if (_keyType === 'input') {
                    return _this.val();
                } else if (_keyType.includes('data')) {
                    const _dataKey = _keyType
                        .split('data')[1]
                        .split('[')[1]
                        .split(']')[0]
                        .split(',');
                    let _obj = {};
                    for (let i = 0, len = _dataKey.length; i < len; i++) {
                        const _item = _dataKey[i].replaceAll(' ', '');
                        _obj[_item] = _this.data(_item);
                    }
                    return _obj;
                }
            })(),
        });
    });

    const _isPass = !_objArr.some((_item) => {
        const { value } = _item;
        if (typeof value === 'object') {
            let _pss = true;
            for (const [k, v] of Object.entries(value)) {
                if (v === undefined || v === null || v === '') {
                    _pss = false;
                    break;
                }
            }
            return !_pss;
        } else {
            return _item.value === '';
        }
    });
    const _resultObj = { pass: _isPass, info: _objArr };
    return _resultObj;
}

/* s : 협진 정보 입력 확인 */

/* *****************************
 * 전체 validation 컨트롤 함수 *
 *******************************/
export function validateCoopAll() {
    const _surgerySelected = $('.surgery_box').attr('data-option-role');

    let _checkSectionData = false;

    switch (_surgerySelected) {
        case '실시간원격협진':
            const { pass: _checkRealTime } = getDataRealTimeDate();
            _checkSectionData = _checkRealTime;
            break;
        case '소견요청협진':
            const { pass: _checkOpinionTime } = getDataOpinionDate();
            _checkSectionData = _checkOpinionTime;
            break;
        case '협진일정요청':
            _checkSectionData = false;
            break;
    }

    const _checkContentCaseData = !getDataCaseContent().some(
        (_item) => _item.pass === false
    );
    const _checkChoiceDoctorLenData =
        coopParticipantInformSelector.itemEls().length > 0 ? true : false;

    /* 최종 chek 확인*/
    const _checkAllValidateData =
        _checkSectionData && _checkContentCaseData && _checkChoiceDoctorLenData
            ? true
            : false;
    renderActivateCreateCoopBtn(_checkAllValidateData);
    return _checkAllValidateData;
}

/* 협진 내용 Case Content 데이터 가져오기 (Array 형식) */
function getDataCaseContent() {
    const _$getContentCaseEls = $(
        '#cooperation-section #content-wrap .content-caseform'
    );
    let _arr = [];
    _$getContentCaseEls.each(function () {
        _arr.push(getDataWithTarget($(this)));
    });
    return _arr;
}

/* 실시간 원격 협진 데이터 가져오기 */
function getDataRealTimeDate() {
    // 실시간 원격 협진 입력 값 받아오기
    return getDataWithTarget('.rt_view .rt_time');
}

function getDataRealTimeType() {
    const _$realTimeTypeChekcedEl = $('.rt_view .type input:checked');
    const _whichCheckedType = {
        key: _$realTimeTypeChekcedEl.attr('id'),
        value: true,
    };
    return _whichCheckedType;
}
// 소견 요청 협진
function getDataOpinionDate() {
    // 소견 요청 협진 시간 받아오기
    return getDataWithTarget('.surgery_view.ro_view');
}

/* e : 협진 정보 입력 확인 */

/* s : server data service 정보 가공 */
export const serviceData = {
    content: {
        // 협진 내용
        caseList: calcDataCaseContentList,
        doctorList: calcDataChoiceDoctorList,
    },
    realTime: {
        // 실시간 원격 협진
        date: calcDataRealTimeDate,
        type: calcDataRealTimeType,
    },
    opinion: {
        // 소견 요청 협진
    },
};

/* 종류 : 공통 */
// 콘텐츠 정보 가공
export function calcDataCaseContentList() {
    const _contentDatas = getDataCaseContent();
    let _resultDatas = [];

    for (let i = 0, len = _contentDatas.length; i < len; i++) {
        const _info = _contentDatas[i].info;
        let _obj = {};
        for (let t = 0, len2 = _info.length; t < len2; t++) {
            const { key, value } = _info[t];

            if (key === 'caseTitle') {
                _obj[key] = value;
            } else if (key === 'cont_patient_name') {
                for (const [ptKey, ptValue] of Object.entries(value)) {
                    _obj[ptKey] = ptValue;
                }
            } else if (key === 'caseContents') {
                _obj[key] = value;
            }
        }
        _resultDatas.push(_obj);
    }
    return _resultDatas;
}

// 협진 참여자 정보 (의사) 가공
export function calcDataChoiceDoctorList() {
    let _resultChoiceDocList = [];
    coopParticipantInformSelector.itemEls().each(function () {
        const _docData = $(this).data();
        const { departmentCode, departmentName, userId, userName } =
            _docData ?? {};
        _resultChoiceDocList.push({
            doctorName: userName,
            doctorId: userId,
            doctorClassName: departmentName,
            doctorClass: departmentCode,
        });
    });
    return _resultChoiceDocList;
}

/* 종류 : 실시간 원격 협진 */

// 실시간 원격 협진 타입 데이터 가공
export function calcDataRealTimeType() {
    return getDataRealTimeType().key === 'real' ? 1 : 2;
}

// 실시간 원격 협진 시간선택 데이터 가공
export function calcDataRealTimeDate() {
    let _tempObj = {};
    getDataRealTimeDate().info.forEach((_item) => {
        const { key, value } = _item;
        _tempObj[key] = value.toString().padStart(2, '0');
    });

    const {
        rt_start_month,
        rt_start_date,
        rt_start_hours,
        rt_start_minutes,
        rt_end_hours,
        rt_end_minutes,
    } = _tempObj;
    const _fullYear = new Date().getFullYear();
    return {
        startDatetime: `${_fullYear}-${rt_start_month}-${rt_start_date} ${rt_start_hours}:${rt_start_minutes}:00`,
        endDatetime: `${_fullYear}-${rt_start_month}-${rt_start_date} ${rt_end_hours}:${rt_end_minutes}:00`,
    };
}

/* e : server data service 정보 가공 */

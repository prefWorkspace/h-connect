const { coopSurgerySelector, coopParticipantInformSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
const { renderActivateCreateCoopBtn } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);

export function departmentDoctorListToBasicList(_departmentDoctorList) {
    /* 각 과별 의사 목록 하나로 합치는 리스트 함수 */
    let resultList = [];
    if (!_departmentDoctorList) return [];
    for (let i = 0, len = _departmentDoctorList.length; i < len; i++) {
        const { doctorInfo } = _departmentDoctorList[i] ?? {};
        resultList = resultList.concat(doctorInfo);
    }
    return resultList;
}
/* 유틸성 함수 */

export function getDataWithTarget(targetWrap) {
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
            const { pass: _checkOpinionTime, info: _opinionInfo } =
                getDataOpinionDate();

            const { module } = $('#calendar').data('calendar-module');
            const _year = moment(module.getDate()).format('YYYY');
            console.log('_year: ', _year);

            const _startMonth = _opinionInfo.filter(
                (item) => item.key === 'op_start_month'
            );
            console.log('_startMonth: ', _startMonth.value);
            const _startDay = _opinionInfo.filter(
                (item) => item.key === 'op_start_date'
            );
            const _endMonth = _opinionInfo.filter(
                (item) => item.key === 'op_end_month'
            );
            const _endDay = _opinionInfo.filter(
                (item) => item.key === 'op_end_date'
            );
            if (_checkOpinionTime) {
                const _startDate = new Date(
                    `${_year}-${_startMonth.value}-${_startDay.value}`
                ).getTime();
                const _endDate = new Date(
                    `${_year}-${_endMonth.value}-${_endDay.value}`
                ).getTime();
                console.log(_startDate, _endDate);
                _checkSectionData = _startDate > _endDate ? false : true;
                console.log('_checkSectionData: ', _checkSectionData);
            } else {
                _checkSectionData = false;
            }
            break;
        case '협진일정요청':
            const { pass: _checkRqScheduleDeadline } =
                getDataRequestScheduleDeadlineDate();
            const { pass: _checkRqScheduleCan } =
                getDataRequestScheduleCanDateList();
            const { pass: _checkRqScheduleCanDuple } =
                getDataRequestScheduleCanIsDuple();
            _checkSectionData =
                _checkRqScheduleDeadline &&
                _checkRqScheduleCan &&
                _checkRqScheduleCanDuple;
            break;
    }

    const _checkContentCaseData = !getDataCaseContent().some(
        (_item) => _item.pass === false
    );
    const _checkChoiceDoctorLenData =
        coopParticipantInformSelector.itemEls().length > 0 ? true : false;

    /* 최종 check 확인*/
    const _checkAllValidateData =
        _checkSectionData && _checkContentCaseData && _checkChoiceDoctorLenData
            ? true
            : false;
    renderActivateCreateCoopBtn(_checkAllValidateData);
    return _checkAllValidateData;
}

function isNumberic(_cv) {
    return !isNaN(_cv);
}
function dateMinMax(_dateValid) {
    switch (_dateValid) {
        case 'month':
            return ['1', '12'];
        case 'date':
            return ['1', '31'];
        case 'hours':
            return ['0', '18'];
        case 'minutes':
            return ['0', '59'];
        default:
            const _isDepend = _dateValid.includes('depend');

            if (_isDepend) {
                // 의존 validate 추가
                const _depend = _dateValid.split(',')[0].split('depend=')[1];
                const _dependKey = _depend.split('[')[0];
                const _dependValue = parseInt(
                    _depend.split('[')[1].split(']')[0],
                    10
                );

                const _$dependEl = $(`input[data-key="${_dependKey}"]`);
                const _dependElValue = parseInt(_$dependEl.val(), 10);
                if (_dependElValue >= _dependValue) {
                    return ['0', '00'];
                } else {
                    const [min, max] = _dateValid
                        .split('range=[')[1]
                        .split(']')[0]
                        .replaceAll(' ', '')
                        .split(',');
                    return [min, max];
                }
            } else {
                const [min, max] = _dateValid
                    .split(']')[0]
                    .split('[')[1]
                    .replaceAll(' ', '')
                    .split(',');
                return [min, max];
            }
    }
}

export function validateDate(_inputTarget) {
    const _dateValid = _inputTarget.attr('data-validate');

    const [_min, _max] = dateMinMax(_dateValid);

    let _inputVal = _inputTarget.val();

    if (!isNumberic(_inputVal)) {
        // 숫자만 넣기
        let _valArr = _inputVal.split('');
        _valArr.forEach((_iv) => {
            if (!isNumberic(_iv)) {
                _inputVal = _inputVal.replaceAll(_iv, '');
            }
        });
        _inputTarget.val(_inputVal);
    } else {
        // 숫자일 때
        if (parseInt(_inputVal, 10) > parseInt(_max, 10)) {
            // max limit
            _inputVal = _max;
        }

        // 숫자 lenght 제한
        if (_inputVal.length > 2) {
            // 2개 길이보다 커지려하면 제한
            _inputVal = _inputVal.substring(1, 3);
        } else if (_inputVal.length === 2) {
            // 2개 길이면
            if (_min !== '0') {
                // min 이 0 초과면(1이상)
                if (_inputVal === '00') {
                    _inputVal = '';
                }
            } else {
                // min 이 0이면
                if (_inputVal !== '00') {
                    _inputVal = _inputVal.toString().padStart(2, '0');
                }
            }
        } else if (_inputVal.length === 1) {
            // 1개 길이면
            if (_min !== '0') {
                // min 값이 0 초과면(1이상)
                if (_inputVal !== '0') {
                    _inputVal = _inputVal.toString().padStart(2, '0');
                } else {
                    _inputVal = '';
                }
            } else {
                // min 값이 0이면
                if (_inputVal !== '0') {
                    _inputVal = _inputVal.toString().padStart(2, '0');
                }
            }
        }
        _inputTarget.val(_inputVal);
    }
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

/* 실시간 원격 협진 데이터 */
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
/* 소견 요청 협진 데이터 */
function getDataOpinionDate() {
    // 소견 요청 협진 시간 받아오기
    return getDataWithTarget('.surgery_view.ro_view');
}

/* 협진 일정 요청 데이터 */
function getDataRequestScheduleDeadlineDate() {
    // 협진 일정 요청 / 일정 요청 마감 일자
    return getDataWithTarget('.surgery_view.t_view .deadline_wrap');
}
function getDataRequestScheduleCanDateList() {
    // 협진 일정 요청 / 협진 가능시간 선택
    return getDataWithTarget('.surgery_view.t_view .ut_wrap');
}
function getDataRequestScheduleCanIsDuple() {
    const _getIsDupl =
        coopSurgerySelector.requestSchedule.scheduleCan
            .itemEls()
            .find('.repeat.active').length > 0
            ? false
            : true;
    return {
        pass: _getIsDupl,
    };
}
function getDataRequestScheduleCanDateItem(_item) {
    // 협진 일정 요청 / 협진 가능시간 선택
    return getDataWithTarget(_item);
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
        date: calcDataOpinionDate,
    },
    requestSchedule: {
        // 협진 일정 요청
        deadlineDate: calcDataRequestScheduleDeadlineDate,
        scheduleCanDateItem: calcDataRequestScheduleCanDateItem,
        scheduleCanDateList: calcDataRequestScheduleCanDateList,
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
    } = _tempObj ?? {};
    const { module } = $('#calendar').data('calendar-module');
    const _year = moment(module.getDate()).format('YYYY');
    const _fullYear = getYearFromCalendar();
    return {
        startDatetime: `${_fullYear}-${rt_start_month}-${rt_start_date} ${rt_start_hours}:${rt_start_minutes}:00`,
        endDatetime: `${_fullYear}-${rt_start_month}-${rt_start_date} ${rt_end_hours}:${rt_end_minutes}:00`,
    };
}

/* 종류 : 소견 요청 협진 */

// 소견 요청 협진 협진 시간 선택 데이터 가공
export function calcDataOpinionDate() {
    let _tempObj = {};
    getDataOpinionDate().info.forEach((_item) => {
        const { key, value } = _item;
        _tempObj[key] = value.toString().padStart(2, '0');
    });
    const {
        op_start_month,
        op_start_date,
        op_start_hours,
        op_start_minutes,
        op_end_month,
        op_end_date,
        op_end_hours,
        op_end_minutes,
    } = _tempObj ?? {};
    const _fullYear = getYearFromCalendar();
    return {
        startDatetime: `${_fullYear}-${op_start_month}-${op_start_date} ${op_start_hours}:${op_start_minutes}:00`,
        endDatetime: `${_fullYear}-${op_end_month}-${op_end_date} ${op_end_hours}:${op_end_minutes}:00`,
    };
}

/* 종류 : 협진 일정 요청 */

// 협진 일정 요청 일정 요청 마감 일자 데이터 가공
// 실시간 원격 협진 시간선택 데이터 가공
export function calcDataRequestScheduleDeadlineDate() {
    let _tempObj = {};
    getDataRequestScheduleDeadlineDate().info.forEach((_item) => {
        const { key, value } = _item;
        _tempObj[key] = value.toString().padStart(2, '0');
    });

    const { rqd_end_month, rqd_end_date, rqd_end_hours, rqd_end_minutes } =
        _tempObj ?? {};
    const _fullYear = getYearFromCalendar();
    return {
        deadlineTime: `${_fullYear}-${rqd_end_month}-${rqd_end_date} ${rqd_end_hours}:${rqd_end_minutes}:00`,
    };
}
// 협진 일정요청 가능시간 선택 각 개별 아이템 날짜 가공
export function calcDataRequestScheduleCanDateItem(_info) {
    let _tempObj = {};
    _info.forEach((_item) => {
        const { key, value } = _item;
        _tempObj[key] = value.toString().padStart(2, '0');
    });

    const {
        rqc_start_month,
        rqc_start_date,
        rqc_start_hours,
        rqc_start_minutes,
        rqc_end_hours,
        rqc_end_minutes,
    } = _tempObj ?? {};
    const _fullYear = getYearFromCalendar();
    return {
        startDatetime: `${_fullYear}-${rqc_start_month}-${rqc_start_date} ${rqc_start_hours}:${rqc_start_minutes}:00`,
        endDatetime: `${_fullYear}-${rqc_start_month}-${rqc_start_date} ${rqc_end_hours}:${rqc_end_minutes}:00`,
    };
}
export function calcDataRequestScheduleCanDateList() {
    let _tempArr = [];
    coopSurgerySelector.requestSchedule.scheduleCan.itemEls().each(function () {
        const _getItem = getDataWithTarget(this).info;
        const { startDatetime, endDatetime } =
            calcDataRequestScheduleCanDateItem(_getItem);
        let _tempObj = {
            consultStartDatetime: startDatetime,
            consultEndDatetime: endDatetime,
        };
        _tempArr.push(_tempObj);
    });

    return { scheduleInfo: _tempArr };
}

/* e : server data service 정보 가공 */

export const calendarData = {
    module: getModuleFromCalendar,
    year: getYearFromCalendar,
    month: getMonthFromCalendar,
    day: getDayFromCalendar,
};
function getModuleFromCalendar() {
    return $('#calendar').data('calendar-module');
}
function getYearFromCalendar() {
    const { module } = $('#calendar').data('calendar-module');
    if (module) {
        return moment(module.getDate()).format('YYYY');
    } else {
        return moment(new Date()).format('YYYY');
    }
}

function getMonthFromCalendar() {
    const { module } = $('#calendar').data('calendar-module');
    if (module) {
        return moment(module.getDate()).format('MM');
    } else {
        return moment(new Date()).format('MM');
    }
}
function getDayFromCalendar() {
    const { module } = $('#calendar').data('calendar-module');
    if (module) {
        return moment(module.getDate()).format('DD');
    } else {
        return moment(new Date()).format('DD');
    }
}

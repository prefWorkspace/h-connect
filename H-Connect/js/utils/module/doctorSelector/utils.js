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

const {
    renderChoiceDoctorList,
    removeChoiceDoctorList,
    unCheckedSelectDoctorList,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/attendeesSectionRenders.js'
    )
);

function addSelectDoctorListAction() {
    /* 의료진 선택 input 체크박스 변경시 선택된 의료진 list 에 넣기 */
    // 즐겨찾기, 의료진 선택 모두 포함해서 의료진 선택에 입력합니다.
    const _$selectDoctorListWrapEl = $('.choice_staff .container .list_inner');
    _$selectDoctorListWrapEl.on(
        'change',
        '.doctor-list-item .input_wrap input',
        function () {
            const _isChecked = $(this).is(':checked');
            const _$listItemEl = $(this).closest('.doctor-list-item');
            const _listItemData = _$listItemEl.data();
            if (_isChecked) {
                renderChoiceDoctorList(_listItemData);
            } else {
                removeChoiceDoctorList(_listItemData);
            }
        }
    );
}

function removeChoiceDoctorListAction() {
    /* 선택된 의료진 제거 */
    // 즐겨찾기, 의료진 선택 모두 포함해서 제거합니다.
    const _$choiceDoctorListWrapEl = $('.choice_staff .choice .choice_member');
    _$choiceDoctorListWrapEl.on('click', '.mem .btn_del', function (e) {
        const _$listItemEl = $(this).closest('.mem');
        const { userId } = _$listItemEl.data();
        _$listItemEl.remove();
        unCheckedSelectDoctorList(userId);
    });
}

function initAddActions() {
    addSelectDoctorListAction();
    removeChoiceDoctorListAction();
}
initAddActions();

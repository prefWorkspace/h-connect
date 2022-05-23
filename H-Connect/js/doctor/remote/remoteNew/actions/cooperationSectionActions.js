const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
    )
);
const { getDataWithTarget, validateCoopAll, validateDate, serviceData } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
        )
    );
const { coopSurgerySelector, coopContentSelector } = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);
const {
    renderActivateCheckBox,
    renderActivateChoiceDoctor,
    renderActivateChoiceDoctorLength,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
const { renderCooperationSection } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/cooperationSectionRenders.js'
    )
);
const { renderChoiceDoctorValidation } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/attendeesSectionRenders.js'
    )
);
const {
    coopContentCaseBlockTmpl, // 협진 내용 > case 템플릿
    coopSearchPatientBlock, // 환자 검색 item 템플릿
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);

function addSelectBoxAction() {
    // 협진 종류 선택 select box action
    const _$surgeryLabel = $('.surgery_label');
    const _$surgeryOptions = $('.surgery_option');

    _$surgeryOptions.off().on('click', function () {
        // 선택
        surgerySelect(this);

        // 활성화 여부
        reset(_$surgeryOptions, 'active');
        $(this).addClass('active');
        _$surgeryLabel.parent().removeClass('active');

        // 옵션 재설정
        const _optionRole = $(this).data('option-role');

        // 섹션 렌더링
        renderCooperationSection(_optionRole);
    });

    _$surgeryLabel.off().on('click', function () {
        $(this).parent().toggleClass('active');
    });

    function surgerySelect(_item) {
        $(_item).parent().removeClass('active');
        _$surgeryLabel.text(_item.textContent);
    }

    function reset(_content, _className) {
        for (let i = 0, len = _content.length; i < len; i++) {
            _content.eq(i).removeClass(_className);
        }
    }
}

function initAction() {
    addSelectBoxAction();
}
initAction();

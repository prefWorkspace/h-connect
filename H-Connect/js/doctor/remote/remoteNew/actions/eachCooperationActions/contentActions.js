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
    coopRequestScheduleBlockTmpl,
} = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/cooperationSectionTmpl.js'
    )
);

function addCoopContentAction() {
    // 협진 내용 액션

    (function checkValidateCoopContent() {
        // 협진 콘텐츠 유효성 체크
        coopContentSelector.wrapEl().on('input', '[data-key]', function () {
            const _checkValidateAll = validateCoopAll();
        });
    })();

    (function addContentCaseAction() {
        // 협진 내용 > case 추가
        coopContentSelector.wrapEl().on('click', '.btn_add', function () {
            coopContentSelector.case.wrapEl().append(coopContentCaseBlockTmpl);
            const _checkValidateAll = validateCoopAll();
        });
    })();

    (function deleteContentCaseAction() {
        // 협진 내용 > case 삭제
        coopContentSelector
            .wrapEl()
            .on('click', '.content-case-wrap .btn_case_delete', function () {
                const _btnIndex = coopContentSelector.case
                    .delBtnEl()
                    .index(this);
                if (_btnIndex === 0) return; // 0 번째 삭제 막기
                coopContentSelector.case.itemEls().eq(_btnIndex).remove();
            });
    })();

    (function addSearchPatientForCaseAction() {
        function appendSearchPatientList(_containerEl, _searchList) {
            if (_searchList && _searchList.length > 0) {
                const _searchListHtml = _searchList.htmlFor((_data) => {
                    return coopSearchPatientBlock(_data);
                });
                _containerEl
                    .find('.remote_search .wrap_inner')
                    .html(_searchListHtml);
                _containerEl.find('.remote_search').fadeIn();
            } else {
                // 찾을 수 없을 때
                _containerEl.addClass('not_find');
                const _$searchInputEl = _containerEl.find('.input_search');
                _$searchInputEl.val('');
                _$searchInputEl.attr('placeholder', '찾을 수 없습니다');
            }
        }
        async function handleSearchPatient(targetEl) {
            const _$searchContainerEl =
                $(targetEl).closest('.search_container');
            const _$searchInputEl = _$searchContainerEl.find('.input_search');
            const _searchInputVal = _$searchInputEl.val();
            const _getPatientList = await selectMeasurementInfoList(
                _searchInputVal
            );
            appendSearchPatientList(_$searchContainerEl, _getPatientList);
        }
        // 검색 버튼 클릭 시
        coopContentSelector
            .wrapEl()
            .on(
                'click',
                '.content .content-case-wrap .search_container .btn_search',
                function () {
                    handleSearchPatient(this);
                }
            );
        // 검색 엔터로 검색시
        coopContentSelector
            .wrapEl()
            .on(
                'keypress',
                '.content .content-case-wrap .search_container input',
                function (e) {
                    if (e.key === 'Enter') {
                        handleSearchPatient(this);
                    }
                }
            );
        // 검색 input change 시
        coopContentSelector
            .wrapEl()
            .on(
                'input',
                '.content .content-case-wrap .patient_select .search_container .input_search',
                function (e) {
                    const _$searchContainerEl =
                        $(this).closest('.search_container');
                    if (_$searchContainerEl.hasClass('not_find')) {
                        _$searchContainerEl.removeClass('not_find');
                        $(this).attr(
                            'placeholder',
                            '이름 혹은 담당병과명을 입력해주세요.'
                        );
                    }
                    // input의 길이가 0이되면 검색모드 종료
                    if ($(e.target).val().length <= 0) {
                        $(
                            'section.new_remote .content-case-wrap .search_patient .wrap_inner'
                        ).html('');
                        $('.patient_select .remote_search').fadeOut();
                    }
                }
            );

        // 검색 리스트 아이템 클릭 시
        coopContentSelector
            .wrapEl()
            .on(
                'click',
                '.content .content-case-wrap .search-patient-list-item',
                function () {
                    const _$patientSelectContainerEl =
                        $(this).closest('.patient_select');
                    const _$patientSelectNameEl =
                        _$patientSelectContainerEl.find('.patient-select-name');
                    const _dataListItems = $(this).data();
                    for (const [key, value] of Object.entries(_dataListItems)) {
                        _$patientSelectNameEl.data(key, value);
                    }
                    const { patientName } = _dataListItems ?? {};
                    $('.patient_select .remote_search').fadeOut();
                    _$patientSelectNameEl.text(patientName);
                    _$patientSelectNameEl.data(_dataListItems);

                    const _checkValidateAll = validateCoopAll();
                }
            );
    })();

    (function deleteCollaboParticipantDoctorAction() {
        // 협진 참여자 정보 삭제 액션

        $('section.new_remote').on(
            'click',
            '.participant .mem .btn_del',
            function () {
                const _$listItemEl = $(this).closest('.mem');
                const { userId } = _$listItemEl.data();
                renderActivateCheckBox(userId, false);
                renderActivateChoiceDoctor(userId);
            }
        );
    })();
}

function initAction() {
    addCoopContentAction();
}
initAction();

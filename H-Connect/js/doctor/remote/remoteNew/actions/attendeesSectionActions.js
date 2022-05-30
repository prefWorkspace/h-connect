const {
    doctorListSelector,
    coopParticipantInformSelector,
    choiceDoctorSelector,
} = await import(
    importVersion('/H-Connect/js/doctor/remote/remoteNew/actions/selector.js')
);

const { departmentDoctorListToBasicList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/actions/dataActions.js'
    )
);

const { renderActivateCheckBox, renderActivateChoiceDoctor } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/commonRenders.js'
    )
);
const { renderChoiceDoctorList, removeChoiceDoctorList } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/renders/attendeesSectionRenders.js'
    )
);
const { selectMeasurementInfoList, selectHisDoctorList, insertRemoteConsult } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/remote/remoteNew/actions/remoteNewAPI.js'
        )
    );
const { choiceDoctorItemTmpl, searchDoctorBlock } = await import(
    importVersion(
        '/H-Connect/js/doctor/remote/remoteNew/templates/attendeesSectionTmpl.js'
    )
);

function addChoiceDoctorListAction() {
    /* 의료진 선택 input 체크박스 변경시 선택된 의료진 list 에 넣기 */
    // 즐겨찾기, 의료진 선택 모두 포함해서 의료진 선택에 입력합니다.
    doctorListSelector
        .wrapEl()
        .on('change', '.doctor-list-item .input_wrap input', function () {
            const _isChecked = $(this).is(':checked');
            const _$listItemEl = $(this).closest('.doctor-list-item');
            const _listItemData = _$listItemEl.data();
            renderActivateCheckBox(_listItemData.userId, _isChecked);

            if (_isChecked) {
                renderChoiceDoctorList(_listItemData);
            } else {
                removeChoiceDoctorList(_listItemData);
            }
        });
}

function removeChoiceDoctorListAction() {
    /* 선택된 의료진 제거 */
    // 즐겨찾기, 의료진 선택 모두 포함해서 제거합니다.
    choiceDoctorSelector.wrapEl().on('click', '.mem .btn_del', function (e) {
        const _$listItemEl = $(this).closest('.mem');
        const { userId } = _$listItemEl.data();
        renderActivateCheckBox(userId, false);

        renderActivateChoiceDoctor(userId);
    });
}

function searchDoctorAction() {
    // 의사 검색 액션
    function appendSearchDoctorList(_containerEl, _searchList) {
        console.log('_searchList: ', _searchList);
        if (_searchList && _searchList.length > 0) {
            const _searchListHtml = _searchList.htmlFor((_data) => {
                return searchDoctorBlock(_data);
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
    async function handleSearchDoctor(targetEl) {
        const _$searchContainerEl = $(targetEl).closest('.search_container');
        const _$searchInputEl = _$searchContainerEl.find('.input_search');
        const _searchInputVal = _$searchInputEl.val();
        const _getDepartmentDoctorList = await selectHisDoctorList(
            _searchInputVal
        );
        const _doctorList = departmentDoctorListToBasicList(
            _getDepartmentDoctorList
        );
        appendSearchDoctorList(_$searchContainerEl, _doctorList);
    }
    // 검색 버튼 클릭 시
    $('section.attendee .choice_staff .search_container .btn_search').on(
        'click',
        function () {
            handleSearchDoctor(this);
        }
    );
    // 검색 엔터로 검색시
    $('section.attendee .choice_staff').on(
        'keypress',
        '.search_container .input_search',
        function (e) {
            if (e.key === 'Enter') {
                handleSearchDoctor(this);
            }
        }
    );
    // 검색 input change 시
    $('section.attendee .choice_staff .search_container .input_search').on(
        'input',
        function (e) {
            const _$searchContainerEl = $(this).closest('.search_container');
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
                    'section.attendee .choice_staff .search_container .wrap_inner'
                ).html('');
                $('.search_container .remote_search').fadeOut();
            }
        }
    );

    // 검색 리스트 아이템 클릭 시
    $('section.attendee .choice_staff').on(
        'click',
        '.search-doctor-list-item',
        function () {
            const _dataListItems = $(this).data();
            renderChoiceDoctorList(_dataListItems);
            $('.search_container .remote_search').fadeOut();

            renderActivateCheckBox(_dataListItems.userId, true);
        }
    );
}

function initAddActions() {
    addChoiceDoctorListAction();
    removeChoiceDoctorListAction();
    searchDoctorAction();
}
initAddActions();

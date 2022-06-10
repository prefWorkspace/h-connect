const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { departmentDoctorListToBasicList, renderActivateCheckBox } =
    await import(
        importVersion('/H-Connect/js/utils/module/doctorSelector/utils.js')
    );

function getUserInfo() {
    return JSON.parse(localStorageController.getLocalS('userData'));
}

export class DoctorSearchModule {
    constructor(_initOptions) {
        this.options = _initOptions;

        this.appendInitSearchListWrap();

        this.addEventDoctorSearch();
    }
    /* 최초 search list wrapper 붙이기 */
    appendInitSearchListWrap() {
        const { doctorSearch } = this.options ?? {};
        this.options.doctorSearch.target.searchListWrap = '.pop.remote_search';
        $(doctorSearch.target.container).append(
            this.templates.searchListWrap()
        );
    }
    /* 검색 된 의사 목록 append list */
    appendDoctorSearchList(_searchList) {
        const { doctorSearch } = this.options ?? {};
        if (_searchList && _searchList.length > 0) {
            // 검색 리스트 있을 때
            const _searchListHtml = _searchList.htmlFor((_data) =>
                this.templates.searchDoctorBlock(_data)
            );
            $(doctorSearch.target.searchListWrap)
                .find('.wrap_inner')
                .html(_searchListHtml);
            $(doctorSearch.target.searchListWrap).fadeIn();
        } else {
            // 검색 리스트 찾을 수 없을 때
            $(doctorSearch.target.container).addClass('not_find');
            $(doctorSearch.target.input).val('');
            $(doctorSearch.target.input).attr(
                'placeholder',
                '찾을 수 없습니다'
            );
        }
    }
    /* 검색 시 이벤트 */
    // 핸들러
    async handleDoctorSearch() {
        const { doctorSearch } = this.options ?? {};
        const _searchInputVal = $(doctorSearch.target.input).val();
        const _getDepartmentDoctorList = await this.API.selectHisDoctorList(
            _searchInputVal
        );
        const _getDoctorList = departmentDoctorListToBasicList(
            _getDepartmentDoctorList
        );
        this.appendDoctorSearchList(_getDoctorList);

        // callBack
        if (typeof doctorSearch?.afterSearchDoctor === 'function') {
            doctorSearch.afterSearchDoctor();
        }
    }
    // 이벤트
    addEventDoctorSearch() {
        const { doctorSearch } = this.options ?? {};

        // 검색 버튼 클릭 시
        $(document).on(
            'click',
            doctorSearch.target.searchBtn,
            this.handleDoctorSearch.bind(this)
        );

        // 엔터로 검색 시
        $(document).on('keypress', doctorSearch.target.input, (e) => {
            if (e.key === 'Enter') {
                this.handleDoctorSearch();
            }
        });

        // 검색 input change 시
        $(document).on('input', doctorSearch.target.input, (e) => {
            if ($(doctorSearch.target.container).hasClass('not_find')) {
                $(doctorSearch.target.container).removeClass('not_find');
                $(e.target).attr(
                    'placeholder',
                    '이름 혹은 담당병과명을 입력해주세요.'
                );
            }
            // input의 길이가 0이되면 검색모드 종료
            if ($(e.target).val().length <= 0) {
                $(doctorSearch.target.searchListWrap)
                    .find('.wrap_inner')
                    .html('');
                $(doctorSearch.target.searchListWrap).fadeOut();
            }
        });

        // 검색 리스트 아이템 클릭 시
        $(document).on('click', '.search-doctor-list-item', (e) => {
            const { choiceDoctorModule } = this.sharing ?? {};
            const _dataListItems = $(e.currentTarget).data();
            $(doctorSearch.target.searchListWrap).fadeOut();

            choiceDoctorModule.addChoiceDoctorList(_dataListItems);

            renderActivateCheckBox(_dataListItems.userId, true);
        });
    }

    shareModule(_module) {
        this.sharing = _module;
    }

    API = {
        selectHisDoctorList: async (_searchName) => {
            /* 의사 리스트 불러오기 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/SelectHisDoctorList',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    userId: id,
                    searchName: _searchName,
                }),
                (res) => {},
                (err) => console.error(err)
            );
            if (res.result) {
                return res.doctorInfoList;
            } else {
                return null;
            }
        },
    };

    /* 템플릯 */
    templates = {
        searchListWrap: () => {
            return `
            <div class="pop remote_search" style="width:100%">
                <div class="wrap_inner"></div>
            </div>
        `;
        },
        searchDoctorBlock: (_data) => {
            const {
                departmentCode,
                departmentName,
                userId,
                userName,
                jikchek,
            } = _data ?? {};
            return `
            <p class='search-doctor-list-item'  data-department-code='${departmentCode}' data-department-name='${departmentName}' data-user-id='${userId}' data-user-name='${userName}'>
                <span>${userName} ${jikchek ?? ''}</span>
                <span>(${departmentName})</span>
            </p>
            `;
        },
    };
}

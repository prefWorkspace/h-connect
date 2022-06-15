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

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

function getUserInfo() {
    return JSON.parse(localStorageController.getLocalS('userData'));
}

export class DoctorListModule {
    constructor(_initOptions) {
        this.options = _initOptions;
        console.log('this.options: ', this.options);
        this.renderInit();
        this.actionInit();
    }
    async renderInit() {
        let _getDepartmentDoctorList = await this.API.selectHisDoctorList();
        this.renderDoctorList(_getDepartmentDoctorList);
    }
    renderDoctorList(_departmentDoctorList) {
        const { doctorList } = this.options ?? {};

        let _getDoctorList = departmentDoctorListToBasicList(
            _departmentDoctorList
        );
        /* "의료진 리스트" 렌더 함수 */
        let _html = errorText();
        if (doctorList.departmentRender === true && _getDoctorList.length > 0) {
            // department render 일시

            _html = _departmentDoctorList.htmlFor((_data) => {
                if (_data?.doctorInfo && _data?.doctorInfo?.length > 0) {
                    return this.templates.departmentDoctorListTmpl(_data);
                } else {
                    return '';
                }
            });
        } else if (
            doctorList.departmentRender !== true &&
            _getDoctorList.length > 0
        ) {
            // doctor list render 일시

            _html = _getDoctorList.htmlFor((_data) =>
                this.templates.doctorListTmpl(_data)
            );
        }

        $(doctorList.target.container).html(_html);
    }
    async actionInit() {
        this.actionDoctorDepartmentAccordion();
        this.actionCheckboxDoctorList();
    }
    actionDoctorDepartmentAccordion() {
        // 메세지 아코디언
        $(document).on('click', '.message .medical_depart .title', (e) => {
            $(e.currentTarget).toggleClass('active');
            $(e.currentTarget).siblings().slideToggle(300);
        });
    }
    actionCheckboxDoctorList() {
        /* 의료진 선택 input 체크박스 변경시 선택된 의료진 list 에 넣기 */
        // 즐겨찾기, 의료진 선택 모두 포함해서 의료진 선택에 입력합니다.
        $(document).on('change', '.doctor-list-item .input_wrap input', (e) => {
            const { choiceDoctorModule } = this.sharing ?? {};
            const _isChecked = $(e.currentTarget).is(':checked');
            const _$listItemEl = $(e.currentTarget).closest(
                '.doctor-list-item'
            );
            const _listItemData = _$listItemEl.data();
            renderActivateCheckBox(_listItemData.userId, _isChecked);

            if (_isChecked) {
                choiceDoctorModule.addChoiceDoctorList(_listItemData);
            } else {
                choiceDoctorModule.removeChoiceDoctorList(_listItemData);
            }
        });
    }

    shareModule(_module) {
        this.sharing = _module;
    }

    API = {
        selectHisDoctorList: async () => {
            if (
                typeof this.options.doctorList.api.selectHisDoctorList ===
                'function'
            ) {
                return this.options.doctorList.api.selectHisDoctorList();
            }

            /* 의사 리스트 불러오기 API */
            const { id } = getUserInfo();
            if (!id) return;
            const res = await serverController.ajaxAwaitController(
                'API/Doctor/SelectHisDoctorList',
                'POST',
                JSON.stringify({
                    ...commonRequest(),
                    userId: id,
                }),
                (res) => {},
                (err) => console.error(err)
            );
            if (res.result) {
                return res.doctorInfoList;
            }
        },
    };
    templates = {
        doctorListTmpl: (_data) => {
            // 선택 될 의사 리스트 아이템
            const {
                userId,
                userName,
                jikchek,
                departmentCode,
                departmentName,
            } = _data ?? {};
            return `
            <div class='doctor-list-item' 
            data-user-id='${userId}' 
            data-user-name='${userName}' 
            data-jikchek='${jikchek}' 
            data-department-code='${departmentCode}' 
            data-department-name='${departmentName}'>
                <div class="input_wrap">
                    <input type="checkbox" name="doctor" id="${
                        'check-doctor' + userId
                    }"
                        class="check-${userId} green_custom">
                    <label for="${'check-doctor' + userId}"></label>
                    <label for="${'check-doctor' + userId}">
                        <span>${userName} ${jikchek ?? ''}</span>
                        <span>${departmentName}</span>
                    </label>
                </div>

                <div class="favorite_container">
                    <input class='favorite-${userId}' type="checkbox" id="${
                'favorite-doctor-' + userId
            }">
                    <label for="${'favorite-doctor-' + userId}"></label>
                </div>
            </div>
            `;
        },
        departmentDoctorListTmpl: (_data) => {
            const { doctorInfo, departmentCode, departmentName } = _data ?? {};
            return `
            <div class="medical_depart" 
            data-department-code='${departmentCode}' 
            data-department-name='${departmentName}'>
              <div class="title">
                  ${departmentName}
              </div>

              <div class="input_container">
                  ${doctorInfo.htmlFor((_docData) =>
                      this.templates.doctorListTmpl(_docData)
                  )}
              </div>
          </div>
        `;
        },
    };
}

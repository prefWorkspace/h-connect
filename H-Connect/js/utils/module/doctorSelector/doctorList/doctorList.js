const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
);
const { commonRequest } = await import(
    importVersion('/H-Connect/js/utils/controller/commonRequest.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);

const { departmentDoctorListToBasicList } = await import(
    importVersion('/H-Connect/js/utils/module/doctorSelector/utils.js')
);

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

function getUserInfo() {
    return JSON.parse(localStorageController.getLocalS('userData'));
}

export class DoctorList {
    constructor(_initOptions) {
        this.options = _initOptions;
        this.initDoctorList();
    }
    async selectHisDoctorList() {
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
    }
    renderDoctorList(_departmentDoctorList) {
        const { target, departmentRender } = this.options ?? {};

        let _getDoctorList = departmentDoctorListToBasicList(
            _departmentDoctorList
        );
        /* "의료진 리스트" 렌더 함수 */
        let _html = errorText();
        if (departmentRender === true && _getDoctorList.length > 0) {
            // department render 일시

            _html = _departmentDoctorList.htmlFor((_data) =>
                this.templates.departmentDoctorListTmpl(_data)
            );
        } else if (departmentRender !== true && _getDoctorList.length > 0) {
            // doctor list render 일시

            _html = _getDoctorList.htmlFor((_data) =>
                this.templates.doctorListTmpl(_data)
            );
        }

        $(target.container).html(_html);
    }
    async initDoctorList() {
        let _getDepartmentDoctorList = await this.selectHisDoctorList();
        this.renderDoctorList(_getDepartmentDoctorList);
    }

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
            <div class='doctor-list-item' data-user-id='${userId}' data-user-name='${userName}' data-jikchek='${jikchek}' data-department-code='${departmentCode}' data-department-name='${departmentName}'>
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
            console.log('_data: ', _data);
            const { doctorInfo, departmentName } = _data ?? {};
            // const {
            //     userId,
            //     userName,
            //     jikchek,
            //     departmentCode,
            //     departmentName,
            // } = _data ?? {};
            return `
            <div class="medical_depart">
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

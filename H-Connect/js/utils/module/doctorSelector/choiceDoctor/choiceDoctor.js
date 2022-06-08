const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

const { renderActivateCheckBox } = await import(
    importVersion('/H-Connect/js/utils/module/doctorSelector/utils.js')
);

export class ChoiceDoctorModule {
    constructor(_initOptions) {
        this.options = _initOptions;
        this.actionInit();
    }
    actionInit() {
        this.actionRemoveChoiceDoctor();
    }
    actionRemoveChoiceDoctor() {
        const { choiceDoctor } = this.options ?? {};
        $(document).on(
            'click',
            `${choiceDoctor.target.container} .mem .btn_del`,
            (e) => {
                const _$listItemEl = $(e.currentTarget).closest('.mem');
                const { userId } = _$listItemEl.data();

                this.syncChoiceDoctor(userId);
            }
        );
    }

    syncChoiceDoctor(_targetData) {
        /* 의사 삭제 */
        if (_targetData) {
            const { choiceDoctor } = this.options ?? {};
            const _$choiceItemEls = $(
                `${choiceDoctor.target.container} .mem[data-user-id='${_targetData}']`
            );
            _$choiceItemEls.each(function () {
                $(this).remove();
            });
        }
        /* 동기화 */
        renderActivateCheckBox(_targetData, false);
        this.UTILS.renderChoiceDoctorValidation();
    }

    addChoiceDoctorList(_docData) {
        const { choiceDoctor } = this.options ?? {};
        /* "선택 된 의료진" 리스트 렌더 함수 */
        this.UTILS.renderChoiceDoctorEmptyControll(false);

        const { userId } = _docData ?? {};
        if (this.UTILS.findChoiceDoctorUserIdIndex(userId) === -1) {
            // 중복 되는 id 가 없다면 append 해주기
            $(choiceDoctor.target.container).append(
                this.templates.choiceDoctorItemTmpl(_docData)
            );
        }

        this.UTILS.renderChoiceDoctorValidation();

        if (typeof choiceDoctor.afterAddChoiceDoctor === 'function') {
            // callBack
            choiceDoctor.afterAddChoiceDoctor(_docData);
        }
    }
    removeChoiceDoctorList(_docData) {
        const { choiceDoctor } = this.options ?? {};
        /* 선택된 의사 에서 체크 해제된 의사 지워주기 */
        const { userId } = _docData ?? {};
        const _choiceDocDuplIndex =
            this.UTILS.findChoiceDoctorUserIdIndex(userId);
        if (_choiceDocDuplIndex !== -1) {
            // index 찾으면 지워주기
            $(`${choiceDoctor.target.container} .mem`)
                .eq(_choiceDocDuplIndex)
                .remove();
        }

        this.UTILS.renderChoiceDoctorValidation();

        if (typeof choiceDoctor.afterRemoveChoiceDoctor === 'function') {
            // callBack
            choiceDoctor.afterRemoveChoiceDoctor(_docData);
        }
    }

    shareModule(_module) {
        this.sharing = _module;
    }

    UTILS = {
        findChoiceDoctorUserIdIndex: (_userId) => {
            const { choiceDoctor } = this.options ?? {};
            // user id 기준 choice doctor 에서 index 찾기 함수
            return $(
                `${choiceDoctor.target.container} .mem[data-user-id='${_userId}']`
            ).index();
        },
        renderChoiceDoctorEmptyControll: (_isEmpty) => {
            const { choiceDoctor } = this.options ?? {};
            // 선택된 의사 없을때 메세지 표시 여부 렌더 함수
            if (_isEmpty) {
                $(choiceDoctor.target.container).html(
                    errorText({ msg: '선택된 의사가 없습니다' })
                );
            } else {
                $(choiceDoctor.target.container)
                    .children('.error_text')
                    .remove();
            }
        },
        renderChoiceDoctorValidation: () => {
            const { choiceDoctor } = this.options ?? {};
            // 만약 제거 했을 때 선택 된 의사 없으면 validation msg 넣기
            if ($(`${choiceDoctor.target.container} .mem`).length <= 0) {
                this.UTILS.renderChoiceDoctorEmptyControll(true);
            }
        },
    };

    templates = {
        choiceDoctorItemTmpl: (_data) => {
            const { userId, userName, departmentCode, departmentName } =
                _data ?? {};
            // 선택 된 의료진 리스트 아이템
            return `
            <div class="mem" data-user-id='${userId}' data-user-name='${userName}' data-department-code='${departmentCode}' data-department-name='${departmentName}'>
                <p>${userName} 교수님</p>
                <button type="button" class="btn_del">
                    <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                </button>
            </div>
            `;
        },
    };
}

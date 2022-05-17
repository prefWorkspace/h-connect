/*
사용 방법

class 선언법

const popupCreated = new PopupController({
    target: {
        openButton: '.btn_set', // 팝업 오픈용 클릭 타겟
        appendWrap: '.globalSetting_popup_wrap', // 팝업을 감싸는 타겟
    },
    templates: {
        popup: globalSettingPopupTmpl, // 팝업창 템플릿 : 함수형태
    },
    popupBtn: {
      // 클릭시 실행할 함수 선언
      // 키값은 Object.entries 로 돌려서 버튼의 기능이 선언되기때문에 이름의 용도만 있다.
        cancelBtn: {
            target: '.btn_cancel', // 타겟이 될 버튼
            close: true, // close true 가 없으면 버튼이 닫혀지지 않습니다.
        },
        submitBtn: {
            target: '.btn_check',
            close: true,
            action: async () => { 
              // 클릭시 실행될 함수 선언 함수가 다 실행이 된 후 팝업이 닫힙니다.
               
            },
        },
    },
});

saveData , getData 를 통해 해당 모듈의 데이터를 저장 및 가져와 쓸 수 있는데,
버튼 클릭 시에 저장된 데이터를 가져와 쓸 수 있도록 만들었다.

*/

export class PopupController {
    constructor(_initData) {
        this.initData = _initData;
        this.payload = {};
        this.initEvent();
        this.eventTarget = null;
    }
    initEvent() {
        const { target, templates, popupBtn } = this.initData || {};
        let _this = this;
        $('body').on('click', `${target?.openButton}`, async function (e) {
            _this.eventTarget = this;
            const _getTemplate = await templates?.popup(); // 팝업의 템플릿 받아옴
            $(target?.appendWrap)
                .html(_getTemplate)
                .find('.overlay')
                .fadeIn(() => {
                    if (popupBtn) {
                        for (const [objectKey, objectValue] of Object.entries(
                            popupBtn
                        )) {
                            const {
                                target: btnTarget,
                                action: btnAction,
                                close: btnClose,
                            } = objectValue || {};
                            $(target?.appendWrap)
                                .find(btnTarget)
                                .off()
                                .on('click', async function () {
                                    if (btnAction) {
                                        await btnAction(_this);
                                    }
                                    if (btnClose) {
                                        $(target?.appendWrap)
                                            .find('.overlay')
                                            .fadeOut(() => {
                                                $(target?.appendWrap).html('');
                                            });
                                    }
                                });
                        }
                    }
                });
        });
    }
    closePopup() {
        // close: false, 이고 팝업을 닫을 때 사용할 수 있습니다.
        const { target } = this.initData || {};
        $(target?.appendWrap)
            .find('.overlay')
            .fadeOut(() => {
                $(target?.appendWrap).html('');
            });
    }
    saveData(key, value) {
        // 데이터를 저장해둬서 action 또는 다른 곳에서 사용할 수 있습니다.
        let copyPayload = { ...this.payload };
        copyPayload[key] = value;
        this.payload = copyPayload;
        return this;
    }
    getData() {
        // 저장해 둔 데이터를 사용합니다.
        return this.payload;
    }
}

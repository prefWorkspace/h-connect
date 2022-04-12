/*
사용 방법

class 선언법

const globalSettingPopup = new PopupController({
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

*/

export class PopupController {
    constructor(_initData) {
        this.initData = _initData;
        this.initEvent();
    }
    initEvent() {
        const { target, templates, popupBtn } = this.initData || {};
        $('body').on('click', `${target?.openButton}`, async () => {
            const _getTemplate = await templates?.popup();
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
                                .on('click', async () => {
                                    if (btnAction) {
                                        await btnAction();
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
}

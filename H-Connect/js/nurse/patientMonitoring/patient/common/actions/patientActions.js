const { TabController } = await import(
    importVersion('/H-Connect/js/utils/module/tabController/tabController.js')
);

const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);
const { globalSettingPopupTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/common/templates/globalSettingPopupTmpl.js'
    )
);

const { UpdateGlobalSetting } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);

// 탭 컨트롤러 생성
const tabPatientController = new TabController({
    link: {
        keepParams: ['measurement_code'],
    },
});

// 글로벌 세팅 팝업 생성
const globalSettingPopup = new PopupController({
    target: {
        openButton: '.btn_set',
        appendWrap: '.globalSetting_popup_wrap',
    },
    templates: {
        popup: globalSettingPopupTmpl,
    },
    popupBtn: {
        cancelBtn: {
            target: '.btn_cancel',
            close: true,
        },
        submitBtn: {
            target: '.btn_check',
            close: true,
            action: async () => {
                const getSeconds = $(
                    '.globalSetting_popup_wrap .input_wrap input:checked'
                ).data('globalsecond');
                await UpdateGlobalSetting(getSeconds);
            },
        },
    },
});

const { TabController } = await import(
    importVersion('/H-Connect/js/utils/module/tabController/tabController.js')
);

const { PopupController } = await import(
    importVersion(
        '/H-Connect/js/utils/module/popupController/popupController.js'
    )
);

// 탭 컨트롤러 생성
const tabPatientController = new TabController({
    link: {
        keepParams: ['measurement_code'],
    },
});

const popupPatientController = new PopupController();

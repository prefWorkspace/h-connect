const { TabController } = await import(
    importVersion('/H-Connect/js/utils/module/tabController/tabController.js')
);
const tabPatientController = new TabController({
    link: {
        keepParams: ['measurement_code'],
    },
});
// tabPatientController.onTab();

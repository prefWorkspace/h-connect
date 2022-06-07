const { DoctorSelector } = await import(
    importVersion('/H-Connect/js/utils/module/doctorSelector/doctorSelector.js')
);
const doctorSelectorOptions = {
    doctorSearch: {
        target: {
            container: '.select_doctor .search_container',
            input: '.select_doctor .search_container input',
            searchBtn: '.select_doctor .search_container button.btn_search',
        },
    },
    doctorList: {
        target: {
            container: '.doctor_list .list_inner',
        },
        departmentRender: true,
    },
    bookmark: {},
};
const doctorSelectorModule = new DoctorSelector(doctorSelectorOptions);

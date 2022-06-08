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
    bookmark: {
        tab: {
            target: {
                container: '.favorite_list .group .group_list_inner',
                button: '.favorite_list .group button.btn_add',
            },
        },
        list: {
            target: {
                container: '.favorite_list .group_container',
            },
            allCheckRender: true,
        },
    },
};

const doctorSelectorModule = new DoctorSelector(doctorSelectorOptions);

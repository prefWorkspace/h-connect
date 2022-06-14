const { DoctorSelector } = await import(
    importVersion('/H-Connect/js/utils/module/doctorSelector/doctorSelector.js')
);
const doctorSelectorOptions = {
    choiceDoctor: {
        use: true,
        target: {
            container: '.select_list',
        },
        afterAddChoiceDoctor: () => {},
        afterRemoveChoiceDoctor: () => {},
    },
    doctorSearch: {
        use: true,
        target: {
            container: '.select_doctor .search_container',
            input: '.select_doctor .search_container input',
            searchBtn: '.select_doctor .search_container button.btn_search',
        },
        afterSearchDoctor: () => {},
    },
    doctorList: {
        use: true,
        target: {
            container: '.doctor_list .list_inner',
        },
        departmentRender: true,
    },
    bookmark: {
        use: true,
        tab: {
            target: {
                container: '.favorite_list .group .group_list_inner',
                nextBtn: '.favorite_list .group button.btn_next',
                addBtn: '.favorite_list .group button.btn_add',
                deleteBtn: '.favorite_list button.btn_del',
            },
        },
        list: {
            target: {
                container: '.favorite_list .group_container',
            },
            allCheckRender: true,
        },
        popup: {
            target: {
                container: '.bookmark_popup_wrap',
            },
        },
    },
};

const doctorSelectorModule = new DoctorSelector(doctorSelectorOptions);

$('body').on('click', '.patient .management_list .doctor_send', function () {
    $('.pop.send_doctor .overlay').fadeIn();
});
$('.pop .pop_cont .btn_list .btn_cancel').on('click', function () {
    $('.pop .overlay').fadeOut();
});
$('.pop.send_doctor .btn_exit').on('click', function () {
    $('.pop.send_doctor .overlay').fadeOut();
});

const { getDisplayList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getDisplayList.js')
);
const { selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

// const { parseDisplayBtn } = import(
//     importVersion(
//         '/H-Connect/js/nurse/dashboard/templates/templateDisplayBtn.js'
//     )
// );

import { parseDisplayBtn } from '../templates/templateDisplayBtn.js?v=2022.03.25.12.01';
const { parseDashboardScreen } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateDashboardScreen.js'
    )
);

// DOM Object
const $btn_Viewlist = $('.btn_Viewlist');
const $display_inpat = $('.inpat');

// 일반 상수
const DISPLAY_START = 1;
const DISPLAY_END = 10;

// API variable
const displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
const { sickBedList } = await selectSickBedList();

//전역 변수들
let selected_display = '';

// Rendering BisplayBtn
const renderDisplayBtn = async () => {
    try {
        const parsedDisplayBtn = await parseDisplayBtn(displayList);
        $btn_Viewlist.html(parsedDisplayBtn);
        selected_display = displayList[0].displayCode;
        await addEventToDisplayBtn();
        await addEventToAddDisplayBtn();
    } catch (err) {
        console.log(err);
    }
};

// Rendering Dashboard Screen
const renderDashboardScreen = async () => {
    try {
        const parsedDashboardScreen = await parseDashboardScreen(
            selected_display,
            sickBedList
        );
        $display_inpat.html(parsedDashboardScreen);
        await addEventToDashboardSickBeds();
    } catch (err) {
        console.log(err);
    }
};

async function addEventToDisplayBtn() {
    const $btn_View = $('.btn_View');
    $btn_View.each(function () {
        $(this)
            .off()
            .on('click', () => {
                $btn_View.removeClass('on');
                $(this).addClass('on');
                selected_display = $(this).data('id');
                renderDashboardScreen(selected_display, sickBedList);
            });
    });
}

async function addEventToDeleteBtn() {
    const $btn_delete = $('.btn_delete');
    $btn_delete.off().on('click', () => {
        console.log(1);
    });
}

async function addEventToAddDisplayBtn() {
    const $btn_addView = $('.btn_addView');
    const $add_display_pop = $('.dash_ward_name .overlay');
    $btn_addView.each(function () {
        $(this)
            .off()
            .on('click', () => {
                $add_display_pop.css('display', 'block');
            });
    });
}

async function addEventToDashboardSickBeds() {
    const $dashboard_sickbeds = $('.inpat_sickbed');
    $dashboard_sickbeds.each(function () {
        $(this)
            .off()
            .on('click', () => {
                const $dashboard_sickbeds_checked = $('.inpat_sickbed:checked');
                const $btn_delete = $('.btn_delete');
                if ($dashboard_sickbeds_checked.length) {
                    $btn_delete.prop('disabled', false);
                } else {
                    $btn_delete.prop('disabled', true);
                }
            });
    });
}

//팝업 이벤트 부여
async function addEventToMakeDisplayPop() {
    const $add_display_pop = $('.dash_ward_name .overlay');
    const $cancel_btn = $('.btn.rd.btn_cancel');
    $cancel_btn.off().on('click', () => {
        $add_display_pop.css('display', 'none');
    });
}

// Rendering Initialize
async function firstRender() {
    addEventToDeleteBtn();
    addEventToMakeDisplayPop();
    await renderDisplayBtn();
    await renderDashboardScreen();
}

firstRender();

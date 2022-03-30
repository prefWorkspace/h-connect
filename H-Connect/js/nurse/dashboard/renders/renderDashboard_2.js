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

async function addEventToAddDisplayBtn() {
    const $btn_addView = $('.btn_addView');
    $btn_addView.each(function () {
        $(this)
            .off()
            .on('click', () => {
                console.log('화면추가');
            });
    });
}

// Rendering Initialize
async function firstRender() {
    await renderDisplayBtn();
    await renderDashboardScreen();
}

firstRender();

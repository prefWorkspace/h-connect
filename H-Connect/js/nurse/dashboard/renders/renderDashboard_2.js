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

// DOM Object
const $btn_Viewlist = $('.btn_Viewlist');

// Rendering BisplayBtn
const renderDisplayBtn = async () => {
    try {
        const displayList = await getDisplayList(1, 10);
        const parsedDisplayBtn = parseDisplayBtn(displayList);
        $btn_Viewlist.html(parsedDisplayBtn);
        addEventToDisplayBtn();
    } catch (err) {
        console.log(err);
    }
};

const renderDashboardScreen = async () => {

}

async function addEventToDisplayBtn() {
    const $btn_View = $('.btn_View');
    console.log($btn_View.length);
    $btn_View.each(function () {
        $(this)
            .off()
            .on('click', () => {
                $btn_View.removeClass('on');
                $(this).addClass('on');
            });
    });
}

// Rendering Initialize
async function firstRender() {
    renderDisplayBtn();
}

firstRender();
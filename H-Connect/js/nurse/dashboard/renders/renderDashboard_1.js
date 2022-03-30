import {
    selectWardList,
    selectSickRoomList,
    selectSickBedList,
} from '../../../utils/module/select/selectList.js?v=2022.03.25.12.37';

import { parseWardListLeft } from '../templates/templateWardListLeft.js?v=2022.03.25.12.01';
import { parseSickRoomListLeft } from '../templates/templateSickRoomListLeft.js?v=2022.03.25.12.01';

const MAX_DISPLAY_SHOW = 26;

// JQUERY DOM
const $target_select = $('.taget_select');

// variable
let selectedWard = null;

// Rendering Function and Add Event
const renderDashboard = async () => {
    try {
        // Ward Select Box Part
        const { wardList } = await selectWardList();
        const templateWardSelect = await parseWardListLeft(wardList);
        $target_select.html(templateWardSelect);
        addEventToWardSelectBox();
        // SickRoom Left Part
        const { sickRoomList } = await selectSickRoomList();
        const { sickBedList } = await selectSickBedList();
        const templateSickRoomList = await parseSickRoomListLeft(
            sickRoomList,
            sickBedList
        );
        $('.select_head').after(templateSickRoomList);
        showSickRoom(selectedWard);
    } catch (err) {
        console.log(err);
    }
};

// Add Event Function
async function addEventToWardSelectBox() {
    const $ward_selectbox = $(`.selectBox2.select_ward`);
    const $ward_selectbox_selected = $(`.selectBox2 .ward_label`);
    const $ward_selectbox_optionlist = $(
        `.select_ward .ward_option .ward_list`
    );
    const wardSelect = (ele) => {
        $ward_selectbox.removeClass('active');
        $ward_selectbox_selected.html(ele.text());
        return ele.data('wardcode');
    };

    $ward_selectbox_selected.on('click', () => {
        if ($ward_selectbox.hasClass('active')) {
            $ward_selectbox.removeClass('active');
        } else {
            $ward_selectbox.addClass('active');
        }
    });

    $ward_selectbox_optionlist.each(function () {
        $(this)
            .off()
            .on('click', () => {
                const changeWard = wardSelect($(this));
                if (changeWard != selectedWard) {
                    selectedWard = changeWard;
                    showSickRoom(selectedWard);
                }
            });
    });
}

// Rendering Left SickRoom
function showSickRoom(wardCode) {
    $('.ward_block').css('display', 'none');
    if (wardCode) $(`.ward_block.${wardCode}`).css('display', 'block');
}

// Rendering Funation Initialize
function dashboardInitialize() {
    renderDashboard();
}

// Initializing
dashboardInitialize();

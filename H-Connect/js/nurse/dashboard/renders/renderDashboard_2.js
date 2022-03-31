// API Function Import
const { getDisplayList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getDisplayList.js')
);
const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);

// Template Function Import
const { parseWardListLeft } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateWardListLeft.js'
    )
);
const { parseSickBedListLeft } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateSickBedListLeft.js'
    )
);
const { parseDisplayBtn } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateDisplayBtn.js'
    )
);
const { parseDashboardScreen } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateDashboardScreen.js'
    )
);

// DOM Object
const $target_select = $('.taget_select');
const $btn_Viewlist = $('.btn_Viewlist');
const $display_inpat = $('.inpat');

// 일반 상수
const DISPLAY_START = 1;
const DISPLAY_END = 10;
const DISPLAY_MAX_BED = 26;

// API variable
const displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
const { sickBedList } = await selectSickBedList();

//전역 변수들
let selectedWard = null;
let selected_display = '';
let bed_number_by_display = {};
displayList.forEach((display) => {
    if (!bed_number_by_display[`${display.displayCode}`]) {
        bed_number_by_display[`${display.displayCode}`] = 0;
    }
});
sickBedList.forEach((sickBed) => {
    bed_number_by_display[`${sickBed.displayCode}`] += 1;
});
console.log(bed_number_by_display);

// Rendering Monitoring Target Ward Select Box
const renderWardSelectBox = async () => {
    try {
        const { wardList } = await selectWardList();
        const templateWardSelect = await parseWardListLeft(wardList);
        $target_select.html(templateWardSelect);
        await addEventToWardSelectBox();
    } catch (err) {
        console.log(err);
    }
};

const renderSickBedListLeft = async () => {
    const $select_head = $('.select_head');

    const { sickRoomList } = await selectSickRoomList();
    const { sickBedList } = await selectSickBedList();
    const templateSickBedList = await parseSickBedListLeft(
        sickRoomList,
        sickBedList
    );
    $select_head.after(templateSickBedList);
    $('.ward_block').css('display', 'none');
    if (selectedWard) $(`.ward_block.${selectedWard}`).css('display', 'block');
};

// Rendering Display Button
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

// Add Event Start
// Add Event To Ward SelectBox
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
                    //showSickRoom(selectedWard);
                    $('.ward_block').css('display', 'none');
                    if (selectedWard)
                        $(`.ward_block.${selectedWard}`).css(
                            'display',
                            'block'
                        );
                }
            });
    });
}

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

async function addEventToAddBtn() {
    const $btn_add = $('.btn.bl.btn_add');
}

async function addEventToDeleteBtn() {
    const $btn_delete = $('.btn_delete');
    $btn_delete.off().on('click', () => {
        let checked_sickbed = [];
        $('.inpat_sickbed:checked').each(function () {
            checked_sickbed.push($(this).attr('id'));
        });
        console.log(checked_sickbed);
        renderDashboardScreen();
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
    // DOM element
    const $add_display_pop = $('.dash_ward_name .overlay');
    const $ward_name = $('#ward_Name');
    const $ok_btn = $('.btn.blf.btn_check');
    const $cancel_btn = $('.btn.rd.btn_cancel');

    $ok_btn.off().on('click', () => {
        if ($ward_name.val()) {
            // Creat Action Part
            console.log('병동생성: ', $ward_name.val());

            $ward_name.val('');
            $add_display_pop.css('display', 'none');
        }
    });

    $cancel_btn.off().on('click', () => {
        $ward_name.val('');
        $add_display_pop.css('display', 'none');
    });
}

// Rendering Initialize
async function firstRender() {
    await renderWardSelectBox();
    await renderSickBedListLeft();

    addEventToDeleteBtn();
    addEventToMakeDisplayPop();

    await renderDisplayBtn();

    await renderDashboardScreen();
}

firstRender();

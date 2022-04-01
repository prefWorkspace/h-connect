// API Function Import
const { getDisplayList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getDisplayList.js')
);
const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);
const {
    insertDisplay,
    selectDisplaycodeList,
    selectDisplayDetail,
    updateDisplayName,
    deleteDisplay,
} = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/displayActions.js')
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
let displayList = {};
const { wardList } = await selectWardList();
const { sickRoomList } = await selectSickRoomList();
const { sickBedList } = await selectSickBedList();

//전역 변수들
let selectedWard = null;
let selected_display = '';
let sickBedsByDisplay = {};
let arraySickBedCodesByDisplay = [];

async function displayInfoUpdate() {
    displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
    selected_display = displayList[0].displayCode;
    sickBedsByDisplay = {};
    arraySickBedCodesByDisplay = [];
    displayList.forEach((display) => {
        if (!sickBedsByDisplay[`${display.displayCode}`]) {
            sickBedsByDisplay[`${display.displayCode}`] = [];
        }
    });
    sickBedList.forEach((sickBed) => {
        if (sickBed.displayCode) {
            sickBedsByDisplay[`${sickBed.displayCode}`].push(sickBed);
            arraySickBedCodesByDisplay.push(sickBed.sickBedCode);
        }
    });
}

// Rendering Monitoring Target Ward Select Box
const renderWardSelectBox = async () => {
    try {
        const templateWardSelect = await parseWardListLeft(wardList);
        $target_select.html(templateWardSelect);
        await addEventToWardSelectBox();
    } catch (err) {
        console.log(err);
    }
};

const renderSickBedListLeft = async () => {
    const $select_head = $('.select_head');
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
        await addEventToDisplayBtn();
        await addEventToAddDisplayBtn();
        await addEventToDeleteDisplayBtns();
    } catch (err) {
        console.log(err);
    }
};

// Rendering Dashboard Screen
const renderDashboardScreen = async () => {
    try {
        displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
        const selectDisplay = displayList.filter(
            (display) => display.displayCode === selected_display
        )[0];
        const parsedDashboardScreen = await parseDashboardScreen(
            selected_display,
            selectDisplay.displayName,
            sickBedsByDisplay[selected_display]
        );
        $display_inpat.html(parsedDashboardScreen);
        await addEventToDashboardSickBeds();
        await addEventToChangeDisplayNameBtn();
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

    $ward_selectbox_optionlist.each(function () {
        $(this)
            .off()
            .on('click', () => {
                const changeWard = wardSelect($(this));
                if (changeWard != selectedWard) {
                    selectedWard = changeWard;
                    // 병동에 따른 병실 출력
                    $('.ward_block').css('display', 'none');
                    if (selectedWard)
                        $(`.ward_block.${selectedWard}`).css(
                            'display',
                            'block'
                        );
                    // 병동 체크박스 이벤트 부여
                    addEventOnWardCheck(selectedWard);
                    //병동 바꿀 시 병동 선택되어 있으면 선택 해제
                    isWardChecked();

                    //모니터랑 대상 병실 병상 체크 해제
                    $(`input[name=sickBed_no]`).prop('checked', false);
                    // 병동 변경시 펼쳐진 병실병상 리스트 접기
                    $('.ward_count.on').trigger('click');
                    //병실 체크박스 이벤트
                    addEventOnSickRoomCheck(selectedWard);
                    //병상 체크박스 이벤트부여
                    addEventOnSickBed(selectedWard);
                    // 병동 바꿀 시 체크된 병상들 체크 해제
                    allSickBedsUnchecked();
                    // 병동 바꿀 시 체크된 병실들 체크 해제
                    allSickRoomUnchecked();
                }
            });
    });

    $ward_selectbox_selected.on('click', () => {
        if ($ward_selectbox.hasClass('active')) {
            $ward_selectbox.removeClass('active');
        } else {
            $ward_selectbox.addClass('active');
        }
    });
}

// Add Event To Left SickRoom Arrow
async function addEventToSickRoomArrow() {
    sickRoomList.forEach((sickRoom) => {
        $(`.ward_count.${sickRoom.sickRoomCode}`)
            .off()
            .on('click', () => {
                if (
                    $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                        'display'
                    ) == 'block'
                ) {
                    $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                        'display',
                        'none'
                    );
                    $(`.ward_count.${sickRoom.sickRoomCode}.on`).removeClass(
                        'on'
                    );
                } else {
                    $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                        'display',
                        'block'
                    );
                    $(`.ward_count.${sickRoom.sickRoomCode}`).addClass('on');
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
                renderDashboardScreen();
                $('.btn_delete').prop('disabled', true);
            });
    });
}

async function addEventOnWardCheck(wardCode) {
    const $ward_check = $('#ward_check');
    $ward_check.off().on('click', () => {
        //병실 체크
        const sickRoomByWard = wardList
            .filter((ward) => ward.wardCode === wardCode)[0]
            .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
        sickRoomByWard.forEach((sickRoomCode) => {
            if ($ward_check.prop('checked')) {
                $(`#${sickRoomCode}`).prop('checked', true);
            } else {
                $(`#${sickRoomCode}`).prop('checked', false);
            }
        });
        // 병상 체크
        const checkSickbedsArray = sickBedList
            .filter((sickBed) => sickBed.wardCode === wardCode)
            .map((bed) => bed.sickBedCode);
        checkSickbedsArray.forEach((sickBedCode) => {
            if ($ward_check.prop('checked')) {
                $(`#${sickBedCode}`).prop('checked', true);
            } else {
                $(`#${sickBedCode}`).prop('checked', false);
            }
        });
    });
}

//병동 바꿀 시 병동 선택되어 있으면 선택 해제
async function isWardChecked() {
    const $ward_check = $('#ward_check');
    $ward_check.prop('checked', false);
}

//병실 선택 전체 해제
async function allSickRoomUnchecked() {
    const $sickRoomCheck = $('input[name=room_no]');
    $sickRoomCheck.prop('checked', false);
}

async function allSickBedsUnchecked() {
    const $sickBedCheck = $('input[name=sickBed_no]');
    $sickBedCheck.prop('checked', false);
}

//병실 체크박스 이벤트 부여
async function addEventOnSickRoomCheck(wardCode) {
    const sickRoomByWard = wardList
        .filter((ward) => ward.wardCode === wardCode)[0]
        .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    //다 체크되면 병동선택 체크하는 함수
    function checkWardByCheckRoom(roomLength) {
        let checkedLen = 0;
        sickRoomByWard.forEach((sickRoomCode) => {
            if ($(`#${sickRoomCode}`).prop('checked')) checkedLen += 1;
        });

        if (roomLength === checkedLen) {
            $('#ward_check').prop('checked', true);
        } else {
            $('#ward_check').prop('checked', false);
        }
    }
    sickRoomByWard.forEach((sickRoomCode) => {
        const $sickRoom_check = $(`#${sickRoomCode}`);

        $sickRoom_check.off().on('click', () => {
            //병실 체크박스 체크시 이벤트 부여
            checkWardByCheckRoom(sickRoomByWard.length);
            const checkSickBedsArray = sickBedList
                .filter((sickBed) => sickBed.sickRoomCode === sickRoomCode)
                .map((sickBed) => sickBed.sickBedCode);
            checkSickBedsArray.forEach((sickBedCode) => {
                if ($sickRoom_check.prop('checked')) {
                    $(`#${sickBedCode}`).prop('checked', true);
                } else {
                    $(`#${sickBedCode}`).prop('checked', false);
                }
            });
        });
    });
}

//병상 체크박스 이벤트부여
async function addEventOnSickBed(wardCode) {
    const sickRoomByWard = wardList
        .filter((ward) => ward.wardCode === wardCode)[0]
        .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    function checkWardByCheckRoom(roomLength) {
        let checkedLen = 0;
        sickRoomByWard.forEach((sickRoomCode) => {
            if ($(`#${sickRoomCode}`).prop('checked')) checkedLen += 1;
        });
        if (roomLength === checkedLen) {
            $('#ward_check').prop('checked', true);
        } else {
            $('#ward_check').prop('checked', false);
        }
    }
    //병상에 따른 병실 체크박스 제어
    let sickBedsBySickRoomMany = {};
    sickRoomByWard.forEach((sickRoomCode) => {
        if (!sickBedsBySickRoomMany[sickRoomCode]) {
            sickBedsBySickRoomMany[sickRoomCode] = 0;
        }
    });

    const checkSickBedsArray = sickBedList
        .filter((sickBed) => sickBed.wardCode === wardCode)
        .map((sickBed) => {
            sickBedsBySickRoomMany[sickBed.sickRoomCode] += 1;
            return {
                sickRoomCode: sickBed.sickRoomCode,
                sickBedCode: sickBed.sickBedCode,
            };
        });

    checkSickBedsArray.forEach((sickBed) => {
        $(`#${sickBed.sickBedCode}`)
            .off()
            .on('click', () => {
                const sickRoomCodeofSickBed = checkSickBedsArray.filter(
                    (bed) => bed.sickBedCode === sickBed.sickBedCode
                )[0].sickRoomCode;
                let checkSickBed = 0;
                const sickBedsBySickRoom = checkSickBedsArray
                    .filter((bed) => bed.sickRoomCode === sickRoomCodeofSickBed)
                    .map((b) => b.sickBedCode);
                sickBedsBySickRoom.forEach((bed) => {
                    if ($(`#${bed}`).prop('checked')) checkSickBed += 1;
                });

                if (
                    checkSickBed ===
                    sickBedsBySickRoomMany[sickRoomCodeofSickBed]
                ) {
                    $(`#${sickRoomCodeofSickBed}`).prop('checked', true);
                } else {
                    $(`#${sickRoomCodeofSickBed}`).prop('checked', false);
                }

                let checkSickBedByWard = 0;
                checkSickBedsArray.forEach((bed) => {
                    if ($(`#${bed.sickBedCode}`).prop('checked'))
                        checkSickBedByWard += 1;
                });
                if (!checkSickBedsArray.length === checkSickBedByWard) {
                    $(`#ward_check`).prop('checked', false);
                }
                checkWardByCheckRoom(sickRoomByWard.length);
            });
    });
}

async function addEventToAddBtn() {
    const $btn_add = $('.btn.bl.btn_add');
    let checkedSickBeds = [];
    $btn_add.off().on('click', () => {
        checkedSickBeds.length = 0;
        if ($('input[name=sickBed_no]:checked').length) {
            $.each($('input[name=sickBed_no]:checked'), function () {
                let checkedSickBed = sickBedList.filter(
                    (bed) => bed.sickBedCode === $(this).attr('id')
                )[0];
                checkedSickBeds.push(checkedSickBed);
            });
            checkedSickBeds.forEach((sickBed) => {
                if (sickBedsByDisplay[selected_display].length) {
                    for (
                        let i = 0;
                        i < sickBedsByDisplay[selected_display].length;
                        i++
                    ) {
                        if (
                            sickBed.sickBedCode ===
                            sickBedsByDisplay[selected_display][i].sickBedCode
                        ) {
                            break;
                        }

                        if (
                            i ==
                                sickBedsByDisplay[selected_display].length -
                                    1 &&
                            sickBedsByDisplay[selected_display].length <
                                DISPLAY_MAX_BED &&
                            !arraySickBedCodesByDisplay.includes(
                                sickBed.sickBedCode
                            )
                        ) {
                            let newSickBed = {
                                ...sickBed,
                                displayCode: selected_display,
                            };
                            arraySickBedCodesByDisplay.push(
                                sickBed.sickBedCode
                            );
                            sickBedsByDisplay[selected_display].push(
                                newSickBed
                            );
                        }
                    }
                } else {
                    if (
                        sickBedsByDisplay[selected_display].length <
                            DISPLAY_MAX_BED &&
                        !arraySickBedCodesByDisplay.includes(
                            sickBed.sickBedCode
                        )
                    ) {
                        let newSickBed = {
                            ...sickBed,
                            displayCode: selected_display,
                        };
                        arraySickBedCodesByDisplay.push(sickBed.sickBedCode);
                        sickBedsByDisplay[selected_display].push(newSickBed);
                    }
                }
            });
            renderDashboardScreen();
        }
    });
}

async function addEventToDeleteBtn() {
    const $btn_delete = $('.btn_delete');
    $btn_delete.off().on('click', () => {
        let checked_sickbed = [];
        $('.inpat_sickbed:checked').each(function () {
            checked_sickbed.push($(this).attr('id').replace('inpat_', ''));
        });
        for (let j = 0; j < checked_sickbed.length; j++) {
            for (
                let i = 0;
                i < sickBedsByDisplay[selected_display].length;
                i++
            ) {
                if (
                    checked_sickbed[j] ===
                    sickBedsByDisplay[selected_display][i].sickBedCode
                ) {
                    arraySickBedCodesByDisplay =
                        arraySickBedCodesByDisplay.filter(
                            (code) =>
                                code !==
                                sickBedsByDisplay[selected_display][i]
                                    .sickBedCode
                        );
                    sickBedsByDisplay[selected_display].splice(i, 1);

                    i--;
                }
            }
        }
        renderDashboardScreen();
        $('.btn_delete').prop('disabled', true);
    });
}

async function addEventToAddDisplayBtn() {
    $('.btn.btn_addView')
        .off()
        .on('click', () => {
            insertDisplay(displayList.length + 1);
            location.reload();
        });
}

async function addEventToDeleteDisplayBtns() {
    $('.display_delete').click(function () {
        const del_dis = displayList.filter(
            (display) => display.displayCode === $(this).data('dpid')
        )[0];
        $('.pop.delete .overlay .pop_cont').html(`
            <div>
                <img src="/H-Connect/img/logo.png" alt="로고" />
            </div>
            <h3>현재 화면에 설정된 내용들이 삭제됩니다.</h3>
            <h2><span>${del_dis.displayNumber}번 화면</span> 을 삭제합니다.</h2>
            <div class="btn_list">
                <button type="button" class="btn gr btn_no">
                    아니요
                </button>
                <button type="button" class="btn rdf btn_cut">
                    네, 삭제합니다
                </button>
            </div>
        `);
        $('.pop.delete .overlay').css('display', 'block');

        $('.pop_cont .btn_cut').click(function () {
            deleteDisplay(del_dis.displayCode);
            location.reload();
        });

        $('.pop_cont .btn_no').click(function () {
            $('.pop.delete .overlay').css('display', 'none');
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

async function addEventToChangeDisplayNameBtn() {
    const $account = $('.account');
    const $name_change_pop = $('.dash_ward_name .overlay');
    const $ward_name = $('#ward_Name');
    const $ok_btn = $('.btn.blf.btn_check');
    const $cancel_btn = $('.btn.rd.btn_cancel');

    $account.off().on('click', () => {
        $name_change_pop.css('display', 'block');
        $ward_name.val($(`.acc_${selected_display} p`).text());
    });

    $ok_btn.off().on('click', () => {
        updateDisplayName(selected_display, $ward_name.val());
        $(`.account.acc_${selected_display} p`).text($ward_name.val());

        $ward_name.val('');
        $name_change_pop.css('display', 'none');
    });

    $cancel_btn.off().on('click', () => {
        $ward_name.val('');
        $name_change_pop.css('display', 'none');
    });
}
// Rendering Initialize
async function firstRender() {
    await renderWardSelectBox();
    await renderSickBedListLeft();

    addEventToSickRoomArrow();

    addEventToAddBtn();
    addEventToDeleteBtn();

    await displayInfoUpdate();
    await renderDisplayBtn();
    await renderDashboardScreen();
}

firstRender();

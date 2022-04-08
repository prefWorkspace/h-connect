// API Function Import
const { getDisplayList } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/getDisplayList.js')
);
const { selectWardList, selectSickRoomList, selectSickBedList } = await import(
    importVersion('/H-Connect/js/utils/module/select/selectList.js')
);
const { insertDisplay, updateDisplayName, updateDisplayNumber, deleteDisplay } =
    await import(
        importVersion('/H-Connect/js/nurse/dashboard/actions/displayActions.js')
    );
const { updateSickBed, updateSickBedDisplayCode } = await import(
    importVersion('/H-Connect/js/nurse/dashboard/actions/sickBedActions.js')
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

const { parseDisplayDeletePop } = await import(
    importVersion(
        '/H-Connect/js/nurse/dashboard/templates/templateDisplayDeletePop.js'
    )
);

// 일반 상수
const DISPLAY_START = 1;
const DISPLAY_END = 99;
const DISPLAY_MAX_BED = 26;

// API variable
let displayList = {};
let _wardList = [];
let _sickRoomList = [];
let _sickBedList = [];

//전역 변수들
let selectedWard = null;
let selected_display = '';
let sickBedsByDisplay = {};
let arraySickBedCodesByDisplay = [];

$.fn.hasScrollBar = function () {
    return (
        (this.prop('scrollWidth') == 0 && this.prop('clientWidth') == 0) ||
        this.prop('scrollWidth') > this.prop('clientWidth')
    );
};

// displayCode에 따라서 스크롤 이동
function moveScrollBarByDisplayCode(displayCode) {
    if ($('.btn_ViewlistScroll').hasScrollBar()) {
        $('.btn_ViewlistScroll').scrollLeft($('.btn_ViewlistScroll').width());
        Object.keys(sickBedsByDisplay).forEach((code, index) => {
            if (code === displayCode) {
                $('.btn_ViewlistScroll').scrollLeft(
                    ($('.btn_ViewlistScroll').width() /
                        Object.keys(sickBedsByDisplay).length) *
                        index
                );
                return false;
            }
        });
    }
}

async function displayInfoUpdate() {
    displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
    sickBedsByDisplay = {};
    arraySickBedCodesByDisplay = [];

    displayList.forEach(async (display) => {
        if (!sickBedsByDisplay[`${display.displayCode}`]) {
            sickBedsByDisplay[`${display.displayCode}`] = [];
        }
    });

    _sickBedList = (await selectSickBedList()).sickBedList;
    _sickBedList.forEach(async (sickBed) => {
        if (sickBed.displayCode) {
            sickBedsByDisplay[`${sickBed.displayCode}`].push(sickBed);
            arraySickBedCodesByDisplay.push(sickBed.sickBedCode);
        }
    });
}

// Rendering Monitoring Target Ward Select Box
const renderWardSelectBox = async () => {
    try {
        _wardList = (await selectWardList()).wardList;
        const templateWardSelect = await parseWardListLeft(_wardList);
        $('.taget_select').html(templateWardSelect);
        await addEventToWardSelectBox();
    } catch (err) {
        console.log(err);
    }
};

const renderSickBedListLeft = async () => {
    try {
        _sickRoomList = (await selectSickRoomList()).sickRoomList;
        _sickBedList = (await selectSickBedList()).sickBedList;
        const templateSickBedList = await parseSickBedListLeft(
            _sickRoomList,
            _sickBedList
        );
        $('.select_head').after(templateSickBedList);
        $('.ward_block').css('display', 'none');
        if (selectedWard)
            $(`.ward_block.${selectedWard}`).css('display', 'block');
    } catch (err) {
        console.log(err);
    }
};

// Rendering Display Button
const renderDisplayBtn = async () => {
    try {
        displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
        const parsedDisplayBtn = await parseDisplayBtn(
            displayList,
            selected_display
        );
        $('.btn_Viewlist').html(parsedDisplayBtn);
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
        $('.inpat').html(parsedDashboardScreen);
        addEventToDashboardSickBeds();
        addEventToChangeDisplayNameBtn();
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
                    $('#ward_check').prop('checked', false);

                    //모니터랑 대상 병실 병상 체크 해제
                    $(`input[name=sickBed_no]`).prop('checked', false);
                    // 병동 변경시 펼쳐진 병실병상 리스트 접기
                    $('.ward_count.on').trigger('click');
                    //병실 체크박스 이벤트
                    addEventOnSickRoomCheck(selectedWard);
                    //병상 체크박스 이벤트부여
                    addEventOnSickBed(selectedWard);
                    // 병동 바꿀 시 체크된 병상들 체크 해제
                    $('input[name=sickBed_no]').prop('checked', false);
                    // 병동 바꿀 시 체크된 병실들 체크 해제
                    $('input[name=room_no]').prop('checked', false);
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
    _sickRoomList = (await selectSickRoomList()).sickRoomList;
    _sickRoomList.forEach((sickRoom) => {
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
                    $(`.ward_count.${sickRoom.sickRoomCode}`).toggleClass('on');
                } else {
                    $(`.patient_info.${sickRoom.sickRoomCode}`).css(
                        'display',
                        'block'
                    );
                    $(`.ward_count.${sickRoom.sickRoomCode}`).toggleClass('on');
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
                moveScrollBarByDisplayCode(selected_display);
                renderDashboardScreen();
                $('.btn_delete').prop('disabled', true);
            });
    });
}

async function addEventOnWardCheck(wardCode) {
    $('#ward_check')
        .off()
        .on('click', async () => {
            //병실 체크
            let sickRoomByWard = [];
            _wardList = (await selectWardList()).wardList;
            if (
                _wardList.filter((ward) => ward.wardCode === wardCode)[0]
                    .sickRoomList
            ) {
                sickRoomByWard = _wardList
                    .filter((ward) => ward.wardCode === wardCode)[0]
                    .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
            }
            sickRoomByWard.forEach((sickRoomCode) => {
                if ($('#ward_check').prop('checked')) {
                    $(`#${sickRoomCode}`).prop('checked', true);
                } else {
                    $(`#${sickRoomCode}`).prop('checked', false);
                }
            });
            // 병상 체크
            _sickBedList = (await selectSickBedList()).sickBedList;
            const checkSickbedsArray = _sickBedList
                .filter((sickBed) => sickBed.wardCode === wardCode)
                .map((bed) => bed.sickBedCode);
            checkSickbedsArray.forEach((sickBedCode) => {
                if ($('#ward_check').prop('checked')) {
                    $(`#${sickBedCode}`).prop('checked', true);
                } else {
                    $(`#${sickBedCode}`).prop('checked', false);
                }
            });
        });
}

//병실 체크박스 이벤트 부여
async function addEventOnSickRoomCheck(wardCode) {
    let sickRoomByWard = [];
    _wardList = (await selectWardList()).wardList;
    if (
        _wardList.filter((ward) => ward.wardCode === wardCode)[0].sickRoomList
    ) {
        sickRoomByWard = _wardList
            .filter((ward) => ward.wardCode === wardCode)[0]
            .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    }
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
    _sickBedList = (await selectSickBedList()).sickBedList;
    sickRoomByWard.forEach((sickRoomCode) => {
        $(`#${sickRoomCode}`)
            .off()
            .on('click', () => {
                //병실 체크박스 체크시 이벤트 부여
                checkWardByCheckRoom(sickRoomByWard.length);
                const checkSickBedsArray = _sickBedList
                    ?.filter((sickBed) => sickBed.sickRoomCode === sickRoomCode)
                    .map((sickBed) => sickBed.sickBedCode);
                checkSickBedsArray?.forEach((sickBedCode) => {
                    if ($(`#${sickRoomCode}`).prop('checked')) {
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
    let sickRoomByWard = [];
    _wardList = (await selectWardList()).wardList;
    if (
        _wardList.filter((ward) => ward.wardCode === wardCode)[0].sickRoomList
    ) {
        sickRoomByWard = _wardList
            .filter((ward) => ward.wardCode === wardCode)[0]
            .sickRoomList.map((sickRoom) => sickRoom.sickRoomCode);
    }
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
    _sickBedList = (await selectSickBedList()).sickBedList;
    const checkSickBedsArray = _sickBedList
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
            .on('click', async () => {
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
    let checkedSickBeds = [];
    $('.btn.bl.btn_add')
        .off()
        .on('click', async () => {
            checkedSickBeds.length = 0;
            _sickBedList = (await selectSickBedList()).sickBedList;
            if ($('input[name=sickBed_no]:checked').length) {
                $.each($('input[name=sickBed_no]:checked'), function () {
                    let checkedSickBed = _sickBedList.filter(
                        (bed) => bed.sickBedCode === $(this).attr('id')
                    )[0];
                    checkedSickBeds.push(checkedSickBed);
                });

                checkedSickBeds = checkedSickBeds.filter(
                    (bed) => bed.displayCode === null
                );

                for (let i = 0; i < checkedSickBeds.length; i++) {
                    if (
                        !arraySickBedCodesByDisplay.includes(
                            checkedSickBeds[i].sickBedCode
                        )
                    ) {
                        let newSickBed = {};
                        if (
                            arraySickBedCodesByDisplay.length <
                            Object.keys(sickBedsByDisplay).length *
                                DISPLAY_MAX_BED
                        ) {
                            if (sickBedsByDisplay[selected_display].length) {
                                if (
                                    sickBedsByDisplay[selected_display]
                                        .length !== DISPLAY_MAX_BED
                                ) {
                                    newSickBed = {
                                        ...checkedSickBeds[i],
                                        displayCode: selected_display,
                                    };
                                    arraySickBedCodesByDisplay.push(
                                        newSickBed.sickBedCode
                                    );
                                    sickBedsByDisplay[selected_display].push(
                                        newSickBed
                                    );
                                    updateSickBedDisplayCode([
                                        {
                                            sickbedCode: newSickBed.sickBedCode,
                                            displayCode: newSickBed.displayCode,
                                        },
                                    ]);
                                    sickBedsByDisplay[selected_display].sort(
                                        function (a, b) {
                                            if (a.wardCode < b.wardCode)
                                                return 1;
                                            if (a.wardCode > b.wardCode)
                                                return -1;
                                            if (a.sickRoomCode < b.sickRoomCode)
                                                return 1;
                                            if (a.sickRoomCode > b.sickRoomCode)
                                                return -1;
                                            if (a.orderNumber > b.orderNumber)
                                                return 1;
                                            if (a.orderNumber < b.orderNumber)
                                                return -1;
                                            return 0;
                                        }
                                    );
                                } else {
                                    for (let key in sickBedsByDisplay) {
                                        if (key !== selected_display) {
                                            if (
                                                sickBedsByDisplay[key].length <
                                                DISPLAY_MAX_BED
                                            ) {
                                                newSickBed = {
                                                    ...checkedSickBeds[i],
                                                    displayCode: key,
                                                };
                                                arraySickBedCodesByDisplay.push(
                                                    newSickBed.sickBedCode
                                                );
                                                sickBedsByDisplay[key].push(
                                                    newSickBed
                                                );
                                                updateSickBedDisplayCode([
                                                    {
                                                        sickbedCode:
                                                            newSickBed.sickBedCode,
                                                        displayCode:
                                                            newSickBed.displayCode,
                                                    },
                                                ]);
                                                sickBedsByDisplay[key].sort(
                                                    function (a, b) {
                                                        if (
                                                            a.wardCode <
                                                            b.wardCode
                                                        )
                                                            return 1;
                                                        if (
                                                            a.wardCode >
                                                            b.wardCode
                                                        )
                                                            return -1;
                                                        if (
                                                            a.sickRoomCode <
                                                            b.sickRoomCode
                                                        )
                                                            return 1;
                                                        if (
                                                            a.sickRoomCode >
                                                            b.sickRoomCode
                                                        )
                                                            return -1;
                                                        if (
                                                            a.orderNumber >
                                                            b.orderNumber
                                                        )
                                                            return 1;
                                                        if (
                                                            a.orderNumber <
                                                            b.orderNumber
                                                        )
                                                            return -1;
                                                        return 0;
                                                    }
                                                );
                                                selected_display = key;
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                newSickBed = {
                                    ...checkedSickBeds[i],
                                    displayCode: selected_display,
                                };
                                arraySickBedCodesByDisplay.push(
                                    newSickBed.sickBedCode
                                );
                                sickBedsByDisplay[selected_display].push(
                                    newSickBed
                                );
                                updateSickBedDisplayCode([
                                    {
                                        sickbedCode: newSickBed.sickBedCode,
                                        displayCode: newSickBed.displayCode,
                                    },
                                ]);
                                sickBedsByDisplay[selected_display].sort(
                                    function (a, b) {
                                        if (a.wardCode < b.wardCode) return 1;
                                        if (a.wardCode > b.wardCode) return -1;
                                        if (a.sickRoomCode < b.sickRoomCode)
                                            return 1;
                                        if (a.sickRoomCode > b.sickRoomCode)
                                            return -1;
                                        if (a.orderNumber > b.orderNumber)
                                            return 1;
                                        if (a.orderNumber < b.orderNumber)
                                            return -1;
                                        return 0;
                                    }
                                );
                            }
                        } else {
                            const { displayCode } = await insertDisplay(
                                displayList.length + 1
                            );
                            newSickBed = {
                                ...checkedSickBeds[i],
                                displayCode,
                            };
                            sickBedsByDisplay[displayCode] =
                                sickBedsByDisplay[displayCode] ?? [];
                            sickBedsByDisplay[displayCode].push(newSickBed);
                            arraySickBedCodesByDisplay.push(
                                newSickBed.sickBedCode
                            );

                            updateSickBedDisplayCode([
                                {
                                    sickbedCode: newSickBed.sickBedCode,
                                    displayCode: newSickBed.displayCode,
                                },
                            ]);
                            displayInfoUpdate();

                            selected_display =
                                displayList[displayList.length - 1].displayCode;
                            sickBedsByDisplay[selected_display].sort(function (
                                a,
                                b
                            ) {
                                if (a.wardCode < b.wardCode) return 1;
                                if (a.wardCode > b.wardCode) return -1;
                                if (a.sickRoomCode < b.sickRoomCode) return 1;
                                if (a.sickRoomCode > b.sickRoomCode) return -1;
                                if (a.orderNumber > b.orderNumber) return 1;
                                if (a.orderNumber < b.orderNumber) return -1;
                                return 0;
                            });
                            continue;
                        }
                    }
                    $('#ward_check:checked').prop('checked', false);
                    $('input[name=room_no]:checked').prop('checked', false);
                    $('input[name=sickBed_no]:checked').prop('checked', false);
                }
                await renderDisplayBtn();
                moveScrollBarByDisplayCode(selected_display);
                await renderDashboardScreen();
            }
        });
}

async function addEventToDeleteBtn() {
    $('.btn_delete')
        .off()
        .on('click', async () => {
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
                        let newSickBed = {
                            ...sickBedsByDisplay[selected_display][i],
                            displayCode: 'NONE',
                        };

                        updateSickBedDisplayCode([
                            {
                                sickbedCode: newSickBed.sickBedCode,
                                displayCode: newSickBed.displayCode,
                            },
                        ]);
                        sickBedsByDisplay[selected_display].splice(i, 1);
                        i--;
                    }
                }
            }
            moveScrollBarByDisplayCode(selected_display);
            await renderDashboardScreen();
            $('.btn_delete').prop('disabled', true);
        });
}

async function addEventToAddDisplayBtn() {
    $('.btn.btn_addView')
        .off()
        .on('click', async () => {
            await insertDisplay(displayList.length + 1);
            await displayInfoUpdate();
            selected_display = displayList[displayList.length - 1].displayCode;
            await renderDisplayBtn();
            moveScrollBarByDisplayCode(selected_display);
            await renderDashboardScreen();
        });
}

async function addEventToDeleteDisplayBtns() {
    $('.display_delete').click(async function () {
        const del_dis = displayList.filter(
            (display) => display.displayCode === $(this).data('dpid')
        )[0];
        $('.pop.delete .overlay .pop_cont').html(
            parseDisplayDeletePop(del_dis.displayNumber)
        );
        $('.pop.delete .overlay').fadeIn();

        $('.pop_cont .btn_cut').click(async function () {
            displayList.forEach((display, index) => {
                if (display.displayCode === del_dis.displayCode) {
                    selected_display = displayList[index - 1].displayCode;
                    return false;
                }
            });
            await deleteDisplay(del_dis.displayCode);
            await displayInfoUpdate();
            displayList.forEach(async (display, index) => {
                await updateDisplayNumber(display.displayCode, index + 1);
            });
            displayList = await getDisplayList(DISPLAY_START, DISPLAY_END);
            await renderDisplayBtn();
            moveScrollBarByDisplayCode(selected_display);
            await renderDashboardScreen();
            $('.pop.delete .overlay').fadeOut();
        });

        $('.pop_cont .btn_no').click(function () {
            $('.pop.delete .overlay').fadeOut();
        });
    });
}

function addEventToApplyBtn() {
    $('.btn.btn_state').on('click', function () {
        console.log(sickBedsByDisplay[selected_display]);
    });
}

function addEventToDashboardSickBeds() {
    $('.inpat_sickbed').each(function () {
        $(this)
            .off()
            .on('click', function () {
                if ($('.inpat_sickbed:checked').length) {
                    $('.btn_delete').prop('disabled', false);
                } else {
                    $('.btn_delete').prop('disabled', true);
                }
            });
    });
}

function addEventToChangeDisplayNameBtn() {
    const $name_change_pop = $('.dash_ward_name .overlay');
    const $ward_name = $('#ward_Name');

    $('.account')
        .off()
        .on('click', () => {
            $name_change_pop.fadeIn();
            $ward_name.val($(`.acc_${selected_display} p`).text());
        });

    $('.btn.blf.btn_check')
        .off()
        .on({
            click: function () {
                updateDisplayName(selected_display, $ward_name.val());
                $(`.account.acc_${selected_display} p`).text($ward_name.val());

                $name_change_pop.fadeOut(() => {
                    $ward_name.val('');
                });
            },
        });

    $('.btn.rd.btn_cancel')
        .off()
        .on('click', () => {
            $ward_name.val('');
            $name_change_pop.fadeOut(() => {
                $ward_name.val('');
            });
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
    selected_display = displayList[0].displayCode;
    Object.keys(sickBedsByDisplay).forEach(display => {
        sickBedsByDisplay[display].sort(
            function (a, b) {
                if (a.wardCode < b.wardCode)
                    return 1;
                if (a.wardCode > b.wardCode)
                    return -1;
                if (a.sickRoomCode < b.sickRoomCode)
                    return 1;
                if (a.sickRoomCode > b.sickRoomCode)
                    return -1;
                if (a.orderNumber > b.orderNumber)
                    return 1;
                if (a.orderNumber < b.orderNumber)
                    return -1;
                return 0;
            }
        );
    })
    await renderDisplayBtn();
    await renderDashboardScreen();

    addEventToApplyBtn();
}

firstRender();

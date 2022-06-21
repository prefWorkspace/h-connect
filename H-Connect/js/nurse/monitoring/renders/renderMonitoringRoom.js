const { monitorBlock_have, monitorBlock_none, monitorRoomBlock } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/monitoringPatientTml.js'
    )
);
const { selectSickBed, selectMeasurementInfoBioDataPage, selectSickRoom } =
    await import(
        importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
    );
const { sessionController } = await import(
    importVersion('/H-Connect/js/utils/controller/sessionController.js')
);
const { localStorageController } = await import(
    importVersion('/H-Connect/js/utils/controller/localStorageController.js')
);
const { CustomSocket } = await import(
    importVersion('/H-Connect/js/lib/socket/custom/customSocket.js')
);

const LOGIN_TOKEN = sessionController.getSession('accesToken');
const USER_CODE = localStorageController.getLocalS('userCode');
const headers = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    apiRoute: 'GWS-1',
    requester: USER_CODE,
};

async function renderMonitoringSickRoomList() {
    const { sickRoomList } = await selectSickRoom(); // 병실 리스트
    const { measurementInfoSimpleBioDataList: patientList } =
        await selectMeasurementInfoBioDataPage(); // 환자 측정 리스트
    let _html = '';
    for (let i = 0, len = sickRoomList?.length; i < len; i++) {
        const sickRoomItem = sickRoomList[i];
        _html += monitorRoomBlock({ sickRoomItem, patientList });
    }
    $('.nurse.patient_vital .wrap_inner .patient_room_wrap').html(_html);

    // 소켓 통신
    window.client = new CustomSocket();
    window.client.connect(
        headers,
        function () {
            // 이벤트 구독 추가
            client.addSubscribe('event', '/topic/public/event', function (res) {
                if (res) {
                    const data = JSON.parse(res.body);
                    const item = data.measurementInfo;

                    patientList.push(item);
                    updateMonitorRoomBlock(
                        sickRoomList.filter(
                            (room) => room.sickRoomCode === item.sickRoomCode
                        )?.[0],
                        patientList
                    );
                    // measurementInfo 체크
                    if (
                        data.eventType === 10 &&
                        data.measurementInfo.name &&
                        data.measurementInfo.patientCode
                    ) {
                        // 모니터링 리스트 구독 추가
                        client.addSubscribe(
                            'bioSignalSimpleData_' +
                                data.measurementInfo.measurementCode,
                            `/topic/public/bioSignalSimpleData/${data.measurementInfo.measurementCode}`,
                            function (res) {
                                updateMonitorRoomBlock(
                                    sickRoomList.filter(
                                        (room) =>
                                            room.sickRoomCode ===
                                            item.sickRoomCode
                                    )?.[0],
                                    patientList.map((patient) =>
                                        patient.measurementCode ===
                                        item.measurementCode
                                            ? {
                                                  ...item,
                                                  ...patientDataUpdate(res),
                                              }
                                            : patient
                                    )
                                );
                            }
                        );
                    }
                }
            });

            // 모니터링 리스트 구독 추가
            patientList.map((item) =>
                client.addSubscribe(
                    'bioSignalSimpleData_' + item.measurementCode,
                    `/topic/public/bioSignalSimpleData/${item.measurementCode}`,
                    function (res) {
                        updateMonitorRoomBlock(
                            sickRoomList.filter(
                                (room) =>
                                    room.sickRoomCode === item.sickRoomCode
                            )?.[0],
                            patientList.map((patient) =>
                                patient.measurementCode === item.measurementCode
                                    ? { ...item, ...patientDataUpdate(res) }
                                    : patient
                            )
                        );
                    }
                )
            );
        },
        function (error) {
            console.log(error);
        }
    );
}

await renderMonitoringSickRoomList();

const updateMonitorRoomBlock = (room, patientList) => {
    const $target = $(`#${room.sickRoomCode}`);
    $target.replaceWith(monitorRoomBlock({ sickRoomItem: room, patientList }));
};

const patientDataUpdate = (res) => {
    if (res) {
        const data = JSON.parse(res.body);
        return {
            measurementCode: data.measurementCode,
            bioSignalECGLastData: {
                ews: data.bioSignalSimpleData?.ews,
                heartRate: data.bioSignalSimpleData?.hr,
                resp: data.bioSignalSimpleData?.resp,
            },
            bioSignalSpO2LastData: { spO2: data.bioSignalSimpleData?.spo2 },
            bioSignalTempLastData: {
                temperature: data.bioSignalSimpleData?.temp,
            },
        };
    }

    return {};
};

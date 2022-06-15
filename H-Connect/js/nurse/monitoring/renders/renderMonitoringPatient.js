const { monitorBlock_have, monitorBlock_none } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/templates/monitoringPatientTml.js'
    )
);
const {
    selectSickBed,
    selectMeasurementInfoList,
    selectMeasurementInfoBioDataPage,
} = await import(
    importVersion('/H-Connect/js/nurse/monitoring/actions/monitoringAPI.js')
);
const { addMonitoringEmptyBedClickEvent } = await import(
    importVersion(
        '/H-Connect/js/nurse/monitoring/renders/addMonitoringEmptyBed.js'
    )
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

// 모니터링 > 전체환자 보기 렌더
async function renderMonitoringPatientList() {
    const { sickBedList } = await selectSickBed(); // 병상 리스트
    const { measurementInfoSimpleBioDataList: patientList } =
        await selectMeasurementInfoBioDataPage();
    const measurementCodes = [];
    let _html = '';
    let _temp_emptyBed = '';

    _html = sickBedList?.htmlFor((_sickBedItem, _index) => {
        const findPatient_in_sickBedList = patientList?.find((_patientItem) => {
            return _patientItem?.sickBedCode === _sickBedItem?.sickBedCode;
        });
        if (findPatient_in_sickBedList) {
            measurementCodes.push(findPatient_in_sickBedList.measurementCode);
            return monitorBlock_have(findPatient_in_sickBedList);
        } else {
            _temp_emptyBed += monitorBlock_none(_sickBedItem);
            return '';
        }
    });
    _html += _temp_emptyBed;
    $('.nurse.patient_vital .wrap_inner .all_patient').html(_html);

    // 소켓 통신
    window.client = new CustomSocket();
    window.client.connect(
        headers,
        function () {
            // 이벤트 구독 추가
            client.addSubscribe('event', '/topic/public/event', function (res) {
                if (res) {
                    const data = JSON.parse(res.body);

                    // measurementInfo 체크
                    if (
                        data.eventType === 10 &&
                        data.measurementInfo.name &&
                        data.measurementInfo.patientCode
                    ) {
                        const $firstEmptyBad = $(
                            '.patient_monitor.empty_bed'
                        ).eq(0);
                        const html = monitorBlock_have(data.measurementInfo);
                        $firstEmptyBad.replaceWith(html);

                        // 모니터링 리스트 구독 추가
                        client.addSubscribe(
                            'bioSignalSimpleData_' +
                                data.measurementInfo.measurementCode,
                            `/topic/public/bioSignalSimpleData/${data.measurementInfo.measurementCode}`,
                            function (res) {
                                updateMonitorBlock(res);
                            }
                        );
                    }
                }
            });

            // 모니터링 리스트 구독 추가
            measurementCodes.map((code) =>
                client.addSubscribe(
                    'bioSignalSimpleData_' + code,
                    `/topic/public/bioSignalSimpleData/${code}`,
                    function (res) {
                        updateMonitorBlock(res);
                    }
                )
            );
        },
        function (error) {
            console.log(error);
        }
    );
}

const updateMonitorBlock = (res) => {
    if (res) {
        const data = JSON.parse(res.body);
        const $patient = $('#' + data.measurementCode);
        const name = $patient.data('name');
        const patientCode = $patient.data('patientCode');
        const convertData = {
            measurementCode: data.measurementCode,
            patientCode,
            name,
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
        // 모니터 블록 교체
        $patient.replaceWith(monitorBlock_have(convertData));
    }
};

await renderMonitoringPatientList();

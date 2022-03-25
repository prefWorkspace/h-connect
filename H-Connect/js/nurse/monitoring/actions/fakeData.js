function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const patientInsertData = {
    eventType: 10,
    apiServerInfoList: null,
    gatewayFwInfo: null,
    measurementInfo: {
        measurementCode: 'SEERS_2203101132_082X',
        organizationCode: 'SEERS',
        wardCode: 'SEERS_W6GG',
        sickRoomCode: 'SEERS_SICK_ROOM_2431',
        sickBedCode: 'SEERS_SICK_BED_27J2',
        shard: '2022',
        part: 18,
        patientCode: '12343455',
        patientStatus: 1,
        measurementType: null,
        measurementStatus: 1,
        name: '11',
        gender: 0,
        birthday: null,
        ssn: null,
        foreigner: 0,
        phoneNumber: null,
        guardianPhoneNumber: null,
        address: null,
        startSystemTime: 1643075527177,
        endSystemTime: 1644371527177,
        startDateTime: '2022-01-25 10:52:06',
        endDateTime: '2022-02-09 10:52:06',
        duration: 360,
        elapsedTime: 1296000,
        gmtCode: 'GMT+0900',
        timezone: 'Asia/Seoul',
        dateTime: '2022-01-25 10:52:06',
        modifyDateTime: null,
        patientStatusDateTime: null,
        etc: null,
        apiRoute: 'GWS-1',
        ward: '응급실',
        sickRoom: '중증응급구역1',
        sickBed: '03',
        measurementSettingInfo: null,
        deviceInfoList: [
            {
                deviceInfoId: 1388,
                measurementCode: 'SEERS_2203101132_082X',
                deviceType: 1,
                deviceCode: 'C4005',
                serialNumber: '004005',
                macAddress: '08:D5:C0:50:0F:A5',
                dateTime: '2022-01-25 10:52:06',
            },
        ],
        wardInfo: '(응급실/ 중증응급구역1/ 03)',
        THEME: 'hconnect',
        ACCOUNT: {
            id: 'zaid.yoon',
            password: null,
            organizationCode: 'SEERS',
            userCode: 'SEERS_zaid.yoon',
            employeeCode: null,
            department: null,
            position: null,
            level: 8,
            name: 'zaid',
            phoneNumber: '01073665332',
            email: 'zaid.yoon@seerstech.com',
            status: 0,
            dateTime: '2021-12-09 13:15:55',
            gmtCode: 'GMT+0900',
            timezone: 'Asia/Seoul',
            updateDateTime: null,
            lastUpdatePwDateTime: '2021-12-09 13:15:55',
            modifyPwAlertDateTime: null,
            deactivateDateTime: null,
            organizationName: '씨어스테크놀로지',
            profilePhotoUrl: null,
            isZaid: true,
        },
        NOW_ACTION: 'index',
    },
    wardList: null,
};

export const bioSignalData = () => {
    return {
        deviceType: 1,
        serialNumber: '005811',
        macAddress: '08:D5:C0:50:16:B3',
        measurementCode: 'SEERS_2203101132_082X',
        bioSignalSimpleData: {
            activity: 1,
            hr: random(-1, 150),
            ews: random(-1, 150),
            temp: random(-1, 150),
            resp: random(-1, 150),
            spo2: random(-1, 150),
            pulse: 0,
            arrhythmiaCount: 0,
        },
        batteryValue: 85,
        deviceStatusInfo: null,
        dateTime: '2022-01-25 11:18:44',
    };
};

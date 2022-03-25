import { localStorageController } from './localStorageController.js';

export const request_Date_Data = () => {
    const today = new Date();

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = today.getDate().toString();

    const hour = today.getHours().toString();
    const min = today.getMinutes().toString();
    const seconds = today.getSeconds().toString();

    return `${year.padStart(2, '0')}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
    )} ${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${seconds.padStart(
        2,
        '0'
    )}`;
};

export const request_Data = () => {
    const userData = JSON.parse(localStorageController.getLocalS('userData'));
    return {
        requester: userData.userCode,
        organizationCode: userData.organizationCode,
    };
};

export const commonRequest = () => {
    return {
        ...request_Data(),
        requestDateTime: request_Date_Data(),
        gmtCode: 'GMT+0900',
        deviceKind: 3,
        timezone: 'Asia/Seoul',
        extra: '',
    };
};

export const timestamp = () => {
    let date = yyyymmddhhmmss;
    const res = date
        .replaceAll('-', '')
        .replaceAll(':', '')
        .replaceAll(' ', '');
    return res;
};
// export default commonRequest;


const commonRequest = () => {
    
    const today = new Date();

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = ((today.getDate())).toString();

    const hour = ((today.getHours())).toString();
    const min = ((today.getMinutes())).toString();
    const seconds = ((today.getSeconds())).toString();

    return {
        requestDateTime: `${year.padStart(2, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${seconds.padStart(2, "0")}`,
        gmtCode: "GMT+0900",
        deviceKind: 3,
        timezone: "Asia/Seoul",
        extra: ""
    }
}
// export default commonRequest;
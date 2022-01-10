const BASIC_SERVER_URL = "http://www.hconnect-test-api.mobicareconsole.com/mobiCAREConsole"

const para = {
    requester: "SEERS_admin",
    organizationCode: "SEERS",
    ward: "PET1",
    nickname: "Test",
    orderNumber: 1,
    etc: "1 층 PET1",
    gmtCode: "GMT+0900",
    timezone: "Asia/seoul",
    requestDateTime: "2020-10-29 10:04:24",
    deviceKind: 1
}

console.log(123);

let formData = new FormData();
formData.append("requester", "SEERS_admin" )
formData.append("organizationCode", "SEERS" )
formData.append("ward", "PET1" )
formData.append("nickname", "Test" )
formData.append("orderNumber", 1 )
formData.append("etc", "1 층 PET1" )
formData.append("gmtCode", "GMT+0900" )
formData.append("timezone", "Asia/seoul" )
formData.append("requestDateTime", "2020-10-29 10:04:24" )
formData.append("deviceKind",  1)

// const data = JSON.stringify(para);
const data = formData;

fetch(`${BASIC_SERVER_URL}/API/Manager/InsertWard`, {
    credentials: "include",
    method: "POST",
    body: data,
    mode: "no-cors",
    header:{
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    }
})
.then(res => {
    console.log(res);
    res.json()
}).then( (data) => {
    console.log('"data" -0-- qwejolk')
    console.log(data)
})
.catch( (err) => console.log(err));
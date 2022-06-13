const { CreateVitalLineD3 } = await import(
    importVersion('/H-Connect/js/utils/module/d3js/d3Module.js')
);
const { serverController } = await import(
    importVersion('/H-Connect/js/utils/controller/serverController.js')
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
const measurementCode = new URLSearchParams(location.search).get(
    'measurement_code'
);
const headers = {
    'SX-Auth-Token': LOGIN_TOKEN,
    deviceKind: 3,
    apiRoute: 'GWS-1',
    requester: USER_CODE,
};

let ecgLine = null;
let spO2Line = null;
let respLine = null;
const client = new CustomSocket();
client.connect(headers, function () {
    client.addSubscribe(
        'bioSignalData',
        `/topic/public/bioSignalData/${measurementCode}`,
        function (res) {
            if (res) {
                const data = JSON.parse(res.body);
                const { measurementCode, bioSignalData } = data || {};
                const { ecgDataList, spO2DataList, respDataList } =
                    bioSignalData;

                console.log(data);

                setUpdateTime(data.dateTime);
                ecgLine = chartCreateOrUpdate(
                    ecgLine,
                    'vital-ecg-graph',
                    ecgDataList,
                    measurementCode,
                    '#00FF19'
                );
                spO2Line = chartCreateOrUpdate(
                    spO2Line,
                    'vital-spO2-graph',
                    spO2DataList,
                    measurementCode,
                    '#00FFFF'
                );
                respLine = chartCreateOrUpdate(
                    respLine,
                    'vital-resp-graph',
                    respDataList,
                    measurementCode,
                    '#EEFF00'
                );

                setVitalData('.ecg > .bell', bioSignalData.heartRateDataList);
                setVitalData('.sp > .bell', bioSignalData.spO2DataList);
                setVitalData('.resp > .bell', bioSignalData.respDataList);
                setVitalData('.control > .temp', bioSignalData.tempDataList);
                setVitalData('.control > .ews', bioSignalData.ewsDataList);
            }
        }
    );
});

const setUpdateTime = (dateString) => {
    try {
        const date = new Date(dateString);
        const $chartTime = $('.chart_time');
        const $year = $chartTime.find('p:first-child > span:first-child');
        const $month = $chartTime.find('p:first-child > span:nth-child(2)');
        const $day = $chartTime.find('p:first-child > span:last-child');
        const $hour = $chartTime.find('p:last-child > span:first-child');
        const $minute = $chartTime.find('p:last-child > span:nth-child(2)');
        const $second = $chartTime.find('p:last-child > span:last-child');

        $year.text(date.getFullYear().toString().substring(2, 4));
        $month.text((date.getMonth() + 1).toString().padStart(2, '0'));
        $day.text(date.getDate().toString().padStart(2, '0'));
        $hour.text(date.getHours().toString().padStart(2, '0'));
        $minute.text(date.getMinutes().toString().padStart(2, '0'));
        $second.text(date.getSeconds().toString().padStart(2, '0'));
    } catch (e) {
        console.log(e);
    }
};

const setVitalData = (target, data) => {
    if (!data) return false;

    const items = data.map((item) => item.value);
    const $target = $(`${target}`);
    const $min = $target.find('.minMax > p:first-child');
    const $max = $target.find('.minMax > p:last-child');
    const $last = $max.parent().next();

    $min.text(Math.min(...items));
    $max.text(Math.max(...items));
    $last.text(items[items.length - 1]);
};

const chartCreateOrUpdate = (chart, target, data, measurementCode, color) => {
    if (data) {
        if (chart) {
            chart.chartUpdate(data);
        } else {
            chart = new CreateVitalLineD3({
                target,
                data,
                measurementCode: measurementCode,
                setting: {
                    strokeColor: color,
                    strokeWidth: 1,
                    duration: 3000,
                },
            });
        }
    }

    return chart;
};

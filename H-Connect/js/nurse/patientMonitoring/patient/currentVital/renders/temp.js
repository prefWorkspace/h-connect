console.log('load');
// const { Chart } = await import(
//     importVersion('/H-Connect/js/lib/chartjs/chartjs-3.7.0.js')
// );
const { socketGetPatientData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);

let data = [];
let myChart = {};
socketGetPatientData.update((_data) => {
    const { ecgDataList } = _data.bioSignalData;
    for (let i = 0, len = ecgDataList.length; i < len; i++) {
        const { value } = ecgDataList[i];
        data.push({ x: i, y: value });
    }
    // myChart.update();
});
const totalDuration = 3000;
const delayBetweenPoints = totalDuration / data.length;
// const previousY = (ctx) =>
//     ctx.index === 0
//         ? ctx.chart.scales.y.getPixelForValue(100)
//         : ctx.chart
//               .getDatasetMeta(ctx.datasetIndex)
//               .data[ctx.index - 1].getProps(['yAxes'], true);
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        },
    },
    y: {
        duration: false,
    },
    onProgress: function () {
        // console.log('test');
    },
    onComplete: function (e) {
        // console.log(e);
    },
    // loop: true,
    tension: {},
};

const config = {
    type: 'line',
    data: {
        datasets: [
            {
                borderColor: '#00FF19',
                borderWidth: 1,
                radius: 0,
                data: data,
            },
        ],
    },
    options: {
        responsive: false,
        animation,
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
            },
            hover: {
                mode: null,
            },
        },
        scales: {
            x: {
                type: 'linear',
                beginAtZero: true,
                display: false,
            },
            y: {
                beginAtZero: true,
                display: false,
            },
        },
    },
};

const ctx = $('#vital-ecg-graph canvas').get(0).getContext('2d');
console.log(ctx);
myChart = new Chart(ctx, config);

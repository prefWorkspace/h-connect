const { socketGetPatientData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
socketGetPatientData.update((_data) => {
    // const { ecgDataList } = _data.bioSignalData;
    // for (let i = 0, len = ecgDataList.length; i < len; i++) {
    //     const { value } = ecgDataList[i];
    //     data.push({ x: i, y: value });
    // }
    // myChart.update();
});
const data = [
    { value: 3, time: new Date('2019-03-22T03:00:00') },
    { value: 1, time: new Date('2019-03-22T03:05:00') },
    { value: 9, time: new Date('2019-03-22T03:10:00') },
    { value: 6, time: new Date('2019-03-22T03:15:00') },
    { value: 2, time: new Date('2019-03-22T03:20:00') },
    { value: 6, time: new Date('2019-03-22T03:25:00') },
];
const xScale = d3
    .scaleTime()
    .domain([new Date('2019-03-22T03:00:00'), new Date('2019-03-22T03:25:00')])
    .range([20, 330]);

const yScale = d3.scaleLinear().domain([1, 9]).range([330, 20]);

// //SVG 안에 G 태그를 생성한다.
// const xAxisSVG = d3.select('#vital-ecg-graph svg').append('g');
// const yAxisSVG = d3.select('#vital-ecg-graph svg').append('g');

// //축을 만드는 함수를 만든다.
// const xAxis = d3.axisBottom(xScale).tickSize(10).ticks(10);
// const yAxis = d3.axisRight(yScale).tickSize(10).ticks(10);
// xAxis(xAxisSVG); //x축을 만드는 함수로 SVG > G 태그에 축을 생성한다.
// yAxis(yAxisSVG); //y축을 만드는 함수로 SVG > G 태그에 축을 생성한다.

const lineGenerator = d3
    .line()
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.value));

d3.select('svg')
    .append('path') // SVG 태그 안에 path 속성을 추가한다.
    .attr('d', lineGenerator(data)) // - 라인 생성기로 'd' 속성에 들어갈 좌표정보를 얻는다.
    .attr('fill', 'none') // - 라인 안쪽 채우지 않음.
    .attr('stroke-width', 2) // - 굵기
    .attr('stroke', 'black'); // - 검정색

const { socketGetPatientData } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/currentVital/actions/fakeSocket.js'
    )
);
let data = [];
let secondsMinMax = [];
let valueMinMax = [];
const getDataMinMax = (_list, _key) => {
    return d3.extent(
        _list.map((_item) => {
            return _item[_key];
        })
    );
};
socketGetPatientData.update((_data) => {
    const { ecgDataList } = _data.bioSignalData;
    // console.log(ecgDataList);
    // data = ecgDataList;
    // let firstObj = ecgDataList[0];
    // let lastObj = ecgDataList[ecgDataList.length - 1];
    // firstSeconds = 0;
    // lastSeconds = lastObj.seconds - firstObj.seconds;

    // firstValue = firstObj.value;

    // lastValue = lastObj.value;

    secondsMinMax = getDataMinMax(ecgDataList, 'seconds');
    valueMinMax = getDataMinMax(ecgDataList, 'value');

    for (let i = 0, len = ecgDataList.length; i < len; i++) {
        const { value, seconds } = ecgDataList[i];
        data.push({ value: value, seconds: seconds });
        // if (firstValue < value) {
        //     firstValue = value;
        // }
        // if (lastValue > value) {
        //     lastValue = value;
        // }
    }
    // myChart.update();
});
const xScale = d3
    .scaleLinear()
    .domain([secondsMinMax[0], secondsMinMax[1]])
    .range([0, 1028]);

const yScale = d3
    .scaleLinear()
    .domain([valueMinMax[0], valueMinMax[1]])
    .range([0, 64]);

const lineGenerator = d3
    .line()
    .x((d) => xScale(d.seconds))
    .y((d) => yScale(d.value));

// d3.select('svg').append('path').attr('d');
const path = d3
    .select('svg')
    .append('path') // SVG 태그 안에 path 속성을 추가한다.
    .attr('d', lineGenerator(data)) // - 라인 생성기로 'd' 속성에 들어갈 좌표정보를 얻는다.
    .attr('fill', 'none') // - 라인 안쪽 채우지 않음.
    .attr('stroke-width', 1) // - 굵기
    .attr('stroke', '#00FF19');
// .attr('stroke-dasharray', '3, 3');

const pathLength = path.node().getTotalLength();

const transitionPath = d3.transition().ease(d3.easeSin).duration(3000);

path.attr('stroke-dashoffset', pathLength)
    .attr('stroke-dasharray', pathLength)
    .transition(transitionPath)
    .attr('stroke-dashoffset', 0);

// d3.select('svg').remove();

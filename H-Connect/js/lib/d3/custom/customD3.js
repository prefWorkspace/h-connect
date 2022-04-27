// d3 커스텀 모듈 line 최적화
/*
const ecgEventLine = new CustomD3();
ecgEventLine.init({
    wrap: `#event-ecg-chart-${_getEventId}`,
    id: _getEventId,
    width: 916,
    height: 36,
    settings: {
        strokeColor: 'rgba(0, 255, 25,100)',
    },
});
ecgEventLine.startLine({
    dataList: ecgJson,
});
*/
export class CustomD3 {
    constructor() {
        this.settings = null;
    }
    init(_initData) {
        const { wrap, id, width, height, settings } = _initData || {};
        this.settings = settings;
        $(wrap).css('position', 'relative');
        $(wrap).css('width', '100%');
        $(wrap).css('height', '100%');
        this.d3Obj = {
            wrapKey: wrap,
            wrapEl: $(wrap),
            id: id,
            chart: {},
            data: {
                list: [],
                lineGenerator: null,
            },
            size: {
                width: width || $(wrap).width(),
                height: height || $(wrap).height(),
            },
        };
        return this;
    }

    simpleLineDraw({ dataList = [] }) {
        this.createSvg();
        this.chartPathCreate();
        this.d3Obj.data.list = dataList;

        this.lineCreate(dataList);
    }

    createSvg() {
        const { wrapKey, wrapEl, size, id } = this.d3Obj;
        wrapEl.append(
            `<svg id="svg-${id}" style="width:${size.width}px; height:${size.height}px; position:absolute; left:0; top:0; background:transparent;"></svg>`
        );
        this.d3Obj.chart = d3.select(`${wrapKey} svg#svg-${id}`);
        return this.d3Obj.chart;
    }

    chartPathCreate() {
        this.d3Obj.chart = this.d3Obj.chart.append('path');
        return this.d3Obj.chart;
    }

    lineCreate(_dataList) {
        const xScale = d3
            .scaleLinear()
            .domain([
                this.getDataMinMax(_dataList, 'seconds')[0],
                this.getDataMinMax(_dataList, 'seconds')[1],
            ])
            .range([0, this.d3Obj?.size.width]);
        const yScale = d3
            .scaleLinear()
            .domain([
                this.getDataMinMax(_dataList, 'value')[0],
                this.getDataMinMax(_dataList, 'value')[1],
            ])
            .range([0, this.d3Obj?.size.height]);

        this.d3Obj.data.lineGenerator = d3.line();
        this.d3Obj.data.lineGenerator.x((d) => xScale(d.seconds));
        this.d3Obj.data.lineGenerator.y((d) => yScale(d.value));

        this.d3Obj.chart
            .attr('d', this.d3Obj.data.lineGenerator(_dataList))
            .attr('fill', 'none')
            .attr('stroke-width', this.settings?.strokeWidth || 1)
            .attr('stroke', this.settings?.strokeColor || '#ffffff');
    }

    getDataMinMax(_list, _key) {
        /* min max */
        return d3.extent(
            _list?.map((_item) => {
                return _item[_key];
            })
        );
    }
}

//ex
/*
new CustomD3({})

*/

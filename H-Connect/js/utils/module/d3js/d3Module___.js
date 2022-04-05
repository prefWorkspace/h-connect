export class CreateVitalLineD3 {
    constructor({ target, data, measurementCode, setting }) {
        this.setting = setting;
        this.init({
            _target: target,
            _data: data,
            _measurementCode: measurementCode,
        });
    }
    elementInit({ _target, _measurementCode }) {
        $(`#${_target}`).css('position', 'relative');
        this.elements = {
            wrap: _target,
            measurementCode: _measurementCode,
            chart: {},
            size: {
                width: $(`#${_target}`).width(),
                height: $(`#${_target}`).height(),
            },
        };
    }
    dataInit({ _data }) {
        const initNum = 0;
        const anotherNum = initNum + 1;
        this.data = {
            currentId: this.idSelector(initNum),
            list: {},
        };
        this.data.list[this.idSelector(initNum)] = this.listSetting(_data);
        this.data.list[this.idSelector(anotherNum)] = this.listSetting([]);
        this.chartSvgCreate(initNum);
        // this.chartSvgCreate(anotherNum);
        //
        // this.chartLineCreate(this.data.currentId);
    }
    listSetting(_list) {
        return {
            data: _list,
            minMax: {
                value: {
                    min: this.getDataMinMax(_list, 'value')[0],
                    max: this.getDataMinMax(_list, 'value')[1],
                },
                seconds: {
                    min: this.getDataMinMax(_list, 'seconds')[0],
                    max: this.getDataMinMax(_list, 'seconds')[1],
                },
            },
            line: () => {},
        };
    }
    chartSvgCreate(_num) {
        const { wrap, size } = this.elements;
        $(`#${wrap}`).append(
            `<svg id="${this.idSelector(_num)}" style="width:${
                size.width
            }px; height:${
                size.height
            }px; position:absolute; left:0; top:0; background:transparent;"></svg>`
        );
        this.elements.chart[this.idSelector(_num)] = d3.select(
            `#${wrap} svg#${this.idSelector(_num)}`
        );
        this.chartPathCreate(_num);
        this.chartLineCreate(this.data.currentId);
    }
    chartPathCreate(_num) {
        this.elements.chart[this.idSelector(_num)].append('path');
    }
    chartLineCreate(_id) {
        const targetData = this?.data.list[_id];
        this.lineGenerator(targetData);

        this.elements.chart[_id]
            .select('path')
            .attr('d', targetData.line(targetData.data))
            .attr('fill', 'none')
            .attr('stroke-width', this.setting.strokeWidth || 1)
            .attr('stroke', this.setting.strokeColor || '#ffffff');

        this.lineTransition(_id);
    }
    chartUpdate(_data) {
        let remainId = null;
        for (const [key] of Object.entries(this.data.list)) {
            if (this.data.currentId != key) {
                remainId = key;
                break;
            }
        }
        // this.lineErase(this.data.currentId);
        this.data.currentId = remainId;
        this.data.list[this.data.currentId] = this.listSetting(_data);
        this.chartSvgCreate(
            remainId.split('-')[remainId.split('-').length - 1]
        );
        // this.chartLineCreate(this.data.currentId);
        // this.lineTransition(this.data.currentId);
    }

    /* s: function */
    idSelector(_num) {
        return `${this.elements.wrap}-${this.elements.measurementCode}-${_num}`;
    }
    svgSelector(_id) {
        return $(`#${_id}`);
    }
    pathSelector(_id) {
        return this.elements.chart[_id].select(`path`);
    }
    getDataMinMax(_list, _key) {
        return d3.extent(
            _list.map((_item) => {
                return _item[_key];
            })
        );
    }

    lineGenerator(_targetData) {
        const xScale = d3
            .scaleLinear()
            .domain([
                _targetData.minMax.seconds.min,
                _targetData.minMax.seconds.max,
            ])
            .range([0, this.elements?.size.width]);
        const yScale = d3
            .scaleLinear()
            .domain([
                _targetData.minMax.value.min,
                _targetData.minMax.value.max,
            ])
            .range([0, this.elements?.size.height]);

        _targetData.line = d3
            .line()
            .x((d) => xScale(d.seconds))
            .y((d) => yScale(d.value));
    }

    lineTransition(_currentId) {
        const _id = _currentId;
        const currentPath = this.pathSelector(_currentId);
        const pathLength = currentPath.node().getTotalLength();
        const transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(this.setting.duration);
        this.elements.chart[_currentId]
            .attr('stroke-dasharray', pathLength)
            .attr('stroke-dashoffset', pathLength)
            .transition(transitionPath)
            .attr('stroke-dashoffset', 0)
            .transition(transitionPath)
            .attr('stroke-dashoffset', -pathLength)
            .on('end', () => {
                // this.svgSelector(_currentId).remove();
                // this.lineErase(_id);
            });
    }
    lineErase(_currentId) {
        console.log(_currentId);
        const currentPath = this.pathSelector(_currentId);
        const pathLength = Math.abs(currentPath.node().getTotalLength());
        const transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(this.setting.duration);

        this.elements.chart[_currentId]
            .attr('stroke-dasharray', pathLength)
            .attr('stroke-dashoffset', 0)
            .transition(transitionPath)
            .attr('stroke-dashoffset', -pathLength)
            .on('end', () => {
                this.svgSelector(_currentId).empty();
                // this.elements.chart[_currentId].remove();
                // .attr('stroke-dashoffset', pathLength)
                // .attr('stroke-dashoffset', pathLength);
            });
    }
    /* e: function */
    init({ _target, _data, _measurementCode }) {
        this.elementInit({ _target, _measurementCode });
        this.dataInit({ _data });
    }
}

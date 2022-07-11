export class D3VitalLine {

    constructor({ target, data, measurementCode, setting }) {
        this.inProgress = false;
        this.target = target;
        this.data = data;
        this.measurementCode = measurementCode;
        this.setting = setting;
        this.index = 0;
        this.charts = [];
        this.chartElements = [];
        this.chartElements.push(this.createChartElements(0));
        this.chartElements.push(this.createChartElements(1));

        this.create();
    }

    setProgress(progress) {
        this.inProgress = progress;
    }

    create(seq = 0) {
        this.inProgress = true;
        this.index = seq;
        this.chart = this.charts[seq];
        this.setPathData(this.chart);
        this.drawChart(this.chart);
    }

    update(data) {
        this.erase();
        this.data = data;
        this.create(this.index === 0 ? 1 : 0);
    }

    erase() {
        const pathLength = this.chart.select('path').node().getTotalLength();

        this.chart.attr('stroke-dashoffset', pathLength)
            .transition()
            .ease(d3.easeSin)
            .delay(0)
            .duration(this.setting.duration)
            .attr('stroke-dashoffset', -pathLength);
    }

    createChartElements(seq) {
        const $target = $(`#${this.target}`);
        const id = `${this.target}-${this.measurementCode}-${seq}`;

        $target.css('position', 'relative');
        $target.append(
            `<svg id='${id}' style='width:${
                $target.width()
            }px; height:${
                $target.height()
            }px; position:absolute; left:0; top:0; background:transparent;'></svg>`
        );

        const chart = d3.select(`#${this.target} svg#${id}`);
        chart.append('path');

        this.charts.push(chart);

        return id;
    }

    chartDataGenerator(data) {
        return {
            data: data,
            minMax: {
                value: {
                    min: this.getDataMinMax(data, 'value')[0],
                    max: this.getDataMinMax(data, 'value')[1]
                },
                seconds: {
                    min: this.getDataMinMax(data, 'seconds')[0],
                    max: this.getDataMinMax(data, 'seconds')[1]
                }
            },
            line: () => {
            }
        };
    }

    lineDataGenerator(data, width, height) {
        const xScale = d3
            .scaleLinear()
            .domain([
                data.minMax.seconds.min,
                data.minMax.seconds.max
            ])
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .domain([
                data.minMax.value.min,
                data.minMax.value.max
            ])
            .range([0, height]);

        return d3.line().x((d) => xScale(d.seconds)).y((d) => yScale(d.value));
    }

    setPathData(chart) {
        const $target = $(`#${this.target}`);
        const charData = this.chartDataGenerator(this.data);
        charData.line = this.lineDataGenerator(charData, $target.width(), $target.height());

        chart
            .select('path')
            .attr('d', charData.line(charData.data))
            .attr('fill', 'none')
            .attr('stroke-width', this.setting.strokeWidth || 1)
            .attr('stroke', this.setting.strokeColor || '#ffffff');
    }

    drawChart(chart) {
        const pathLength = chart.select('path').node().getTotalLength();

        chart
            .attr('stroke-dasharray', pathLength)
            .attr('stroke-dashoffset', pathLength)
            .transition()
            .ease(d3.easeSin)
            .delay(0)
            .duration(this.setting.duration)
            .attr('stroke-dashoffset', 0)
            .on('end', () => this.inProgress = false);
    }

    getDataMinMax(data, key) {
        return d3.extent(
            data.map((item) => {
                return item[key];
            })
        );
    }
}

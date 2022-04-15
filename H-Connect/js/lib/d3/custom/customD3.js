// d3 커스텀 모듈 line 최적화
export class CustomD3 {
    constructor() {
        this.svgObj = {};
    }
    init(_initData) {
        const { targetWrap, measurementCode } = _initData || {};
        $(`${targetWrap}`).css('position', 'relative');
        this.svgObj = {
            wrap: $(targetWrap),
            measurementCode: measurementCode,
            chart: {},
            size: {
                width: $(`#${targetWrap}`).width(),
                height: $(`#${targetWrap}`).height(),
            },
        };
    }

    createSvg() {
        const { wrap, size, measurementCode } = this.svgObj;
        wrap.append(
            `<svg id="${measurementCode}" style="width:${size.width}px; height:${size.height}px; position:absolute; left:0; top:0; background:transparent;"></svg>`
        );
    }
    lineGenerator() {
        const targetData = this?.data.list[_id];
        this.lineGenerator(targetData);

        this.svgObj
            .select('path')
            .attr('d', targetData.line(targetData.data))
            .attr('fill', 'none')
            .attr('stroke-width', this.setting.strokeWidth || 1)
            .attr('stroke', this.setting.strokeColor || '#ffffff');
    }
    chartUpdate() {}
    getDataMinMax(_list, _key) {
        return d3.extent(
            _list.map((_item) => {
                return _item[_key];
            })
        );
    }
}

//ex
/*
new CustomD3({})

*/

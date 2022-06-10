export class WhiteboardCreator {
    //state
    isDown = false;
    points = {
        down: {
            x: 0,
            y: 0,
        },
        move: {
            x: 0,
            y: 0,
        },
        up: {
            x: 0,
            y: 0,
        },
        temp: {
            x: 0,
            y: 0,
        },
    };
    constructor(stageStr, initOptions) {
        // 초기 세팅
        this.stage = {
            string: stageStr,
            element: null,
            rect: {
                width: null,
                height: null,
            },
        };
        this.canvas = {
            string: null,
            element: null,
            ctx: null,
            pixelRatio: null,
        };

        this.options = initOptions;

        // 캔버스 생성
        this.createCanvas().settingsCanvas().appendCanvas();

        // 캔버스 이벤트 등록
        this.addEventCanvas();
    }

    // 캔버스 세팅 메서드

    // 캔버스 생성
    createCanvas() {
        const canvasElementClassStr = 'whiteboard-canvas';
        this.stage.element = $(this.stage.string);
        this.stage.rect.width = this.stage.element.width();
        this.stage.rect.height = this.stage.element.height();

        this.canvas.element = document.createElement('canvas');
        this.canvas.element.classList.add(canvasElementClassStr);
        this.canvas.string = `.${canvasElementClassStr}`;
        return this;
    }
    // 캔버스 세팅
    settingsCanvas() {
        const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        //
        this.canvas.ctx = this.canvas.element.getContext('2d');
        this.canvas.pixelRatio = pixelRatio;

        //
        this.canvas.element.width = this.stage.rect.width * pixelRatio;
        this.canvas.element.height = this.stage.rect.height * pixelRatio;
        this.canvas.ctx.scale(pixelRatio, pixelRatio);

        //
        this.canvas.ctx.strokeStyle =
            this.options.palette.initialColor ?? '#000000';
        this.canvas.ctx.lineWidth = this.options.line.initialWidth ?? 1;
        this.canvas.ctx.lineJoin = 'round';
        this.canvas.ctx.lineCap = 'round';
        return this;
    }
    // 캔버스 붙이기
    appendCanvas() {
        this.stage.element.append(this.canvas.element);
    }
    removeCanvas() {}

    // 캔버스 이미지 등록
    async appendImageCanvas(imageUrl) {
        let baseImage = new Image();
        baseImage.src = imageUrl;
        // baseImage.crossOrigin = 'Anonymous';

        baseImage.onload = (e) => {
            // result
            let imgCanvasWidth = 0;
            let imgCanvasHeight = 0;

            let imgCanvasPositionX = 0;
            let imgCanvasPositionY = 0;

            // info
            const imgNaturalWidth = baseImage.naturalWidth;
            const imgNaturalHeight = baseImage.naturalHeight;

            const stageWidth = this.stage.rect.width;
            const stageHeight = this.stage.rect.height;

            //variable
            const percentImgWidth = stageWidth / imgNaturalWidth;
            const percentImgHeight = stageHeight / imgNaturalHeight;

            // 이미지 사이즈 가공
            if (imgNaturalWidth > imgNaturalHeight) {
                imgCanvasWidth = imgNaturalWidth * percentImgHeight;
                imgCanvasHeight = stageHeight;
            } else if (imgNaturalWidth < imgNaturalHeight) {
                imgCanvasWidth = stageWidth;
                imgCanvasHeight = imgNaturalHeight * percentImgWidth;
            } else {
                imgCanvasWidth = stageHeight;
                imgCanvasHeight = stageHeight;
            }

            // stage 사이즈보다 오버되었을 때 한번 더 가공
            let tempPercentImgWidth = stageWidth / imgCanvasWidth;
            let tempPercentImgHeight = stageHeight / imgCanvasHeight;

            if (imgCanvasWidth > stageWidth) {
                imgCanvasWidth = stageWidth;
                imgCanvasHeight = imgCanvasHeight * tempPercentImgWidth;
            } else if (imgCanvasHeight > stageHeight) {
                imgCanvasWidth = imgCanvasWidth * tempPercentImgHeight;
                imgCanvasHeight = stageHeight;
            }

            // 이미지 위치 중앙으로 보내기
            imgCanvasPositionX = (stageWidth - imgCanvasWidth) / 2;
            imgCanvasPositionY = (stageHeight - imgCanvasHeight) / 2;

            // 이미지 사이즈, 위치 최종 가공
            imgCanvasWidth = this.utils.toFixedFloat(imgCanvasWidth, 4);
            imgCanvasHeight = this.utils.toFixedFloat(imgCanvasHeight, 4);
            imgCanvasPositionX = this.utils.toFixedFloat(imgCanvasPositionX, 4);
            imgCanvasPositionY = this.utils.toFixedFloat(imgCanvasPositionY, 4);

            this.canvas.ctx.drawImage(
                baseImage,
                imgCanvasPositionX,
                imgCanvasPositionY,
                imgCanvasWidth,
                imgCanvasHeight
            );
        };
    }

    // 이벤트 메소드
    onDown(e) {
        this.isDown = true;
        const { x, y } = this.utils.eventPosition(e);

        this.points.down.x = x;
        this.points.down.y = y;

        // temp
        this.points.temp.x = x;
        this.points.temp.y = y;
    }
    onMove(e) {
        if (!this.isDown) return;
        const { x, y } = this.utils.eventPosition(e);

        this.points.move.x = x;
        this.points.move.y = y;

        this.drawCanvas(this.points.temp.x, this.points.temp.y, x, y);

        // temp
        this.points.temp.x = x;
        this.points.temp.y = y;
    }
    onUp(e) {
        const { x, y } = this.utils.eventPosition(e);
        this.points.up.x = x;
        this.points.up.y = y;

        this.isDown = false;
    }

    onChangeColorClick(paletteValue, e) {
        this.changeColorCanvas(paletteValue.color);
        if (typeof this.options.palette.onClick === 'function') {
            this.options.palette.onClick(e, paletteValue, this);
        }
    }
    onChangeLineWidthClick(widthValue, e) {
        this.changeLineWidthCanvas(widthValue.width);
        if (typeof this.options.line.onClick === 'function') {
            this.options.line.onClick(e, widthValue, this);
        }
    }

    // 이벤트 등록
    addEventCanvas() {
        // down event
        $(document).on(
            'pointerdown',
            `${this.stage.string} ${this.canvas.string}`,
            this.onDown.bind(this)
        );

        // move event
        $(document).on(
            'pointermove',
            `${this.stage.string} ${this.canvas.string}`,
            this.onMove.bind(this)
        );

        // up event
        $(document).on('pointerup', this.onUp.bind(this));

        // change color event
        if (
            this.options.palette.color &&
            this.options.palette.color.length > 0
        ) {
            const palettesColorList = this.options?.palette?.color;
            palettesColorList.forEach((colorValue) => {
                $(document).on(
                    'click',
                    colorValue.target,
                    this.onChangeColorClick.bind(this, colorValue)
                );
            });
        }

        // change line width event
        if (this.options.line.width && this.options.line.width.length > 0) {
            const lineWidthList = this.options?.line?.width;
            lineWidthList.forEach((lineWidthValue) => {
                $(document).on(
                    'click',
                    lineWidthValue.target,
                    this.onChangeLineWidthClick.bind(this, lineWidthValue)
                );
            });
        }
    }

    // <드로잉 메소드>

    // 드로잉 컬러 변경
    changeColorCanvas(color) {
        const ctx = this.canvas.ctx;
        if (!ctx) return;

        ctx.strokeStyle = color;
    }

    // 드로잉 두께 변경
    changeLineWidthCanvas(width) {
        const ctx = this.canvas.ctx;
        if (!ctx) return;

        ctx.lineWidth = width;
    }

    // 드로잉
    drawCanvas(sx, sy, ex, ey) {
        const ctx = this.canvas.ctx;
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
    }

    // 지우기
    eraseCanvas() {
        if (!this.isDown) return;

        // const ctx = this.canvas.ctx;
        // ctx.globalCompositeOperation = 'destination-out';
    }

    utils = {
        toFixedFloat: (value, digit) => parseFloat(value.toFixed(digit) ?? 0),
        eventPosition: (e) => {
            const x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            const y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
            return { x: x ?? 0, y: y ?? 0 };
        },
    };
}

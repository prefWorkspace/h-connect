class CanvasLayer {
    constructor() {
        this.layerArray = [];
    }
    createLayer(createLayerKey, createLayerValue) {
        const checkDuplicatedLayerKey = this.layerArray.filter(
            (layerList) => layerList.layerKey === createLayerKey
        );
        if (checkDuplicatedLayerKey?.length) {
            throw new Error(`Duplicated Layer Key : ${createLayerKey}`);
        }
        this.layerArray.push({
            layerKey: createLayerKey,
            layerValue: createLayerValue ?? null,
        });
    }
    readLayer(readLayerKey) {
        let findReadLayer = this.layerArray.filter(
            (layerList) => layerList.layerKey === readLayerKey
        )[0];
        return findReadLayer ?? null;
    }
    updateLayer(updateLayerKey, updateLayerInform) {
        let findUpdateLayerIndex = this.layerArray.findIndex(
            (layerList) => layerList.layerKey === updateLayerKey
        );
        if (findUpdateLayerIndex !== -1) {
            this.layerArray[findUpdateLayerIndex].layerValue =
                updateLayerInform;
        } else {
            throw new Error(`Can not find Update Layer : ${updateLayerKey}`);
        }

        return this;
    }
    deleteLayer() {}
}

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
    tempMovements = [];
    constructor(stageStr, initOptions) {
        // 초기 세팅
        this.options = initOptions;

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
            context: null,
            pixelRatio: null,
            style: {
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: this.options.line.initialWidth ?? 1,
                strokeStyle: this.options.palette.initialColor ?? '#000000',
            },
        };

        // layer 생성
        this.layer = new CanvasLayer();
        this.layer.createLayer('drawing', []);

        // 캔버스 생성
        this.createCanvas().settingsCanvas().appendCanvas();

        // 캔버스 이벤트 등록
        this.addEventCanvas();
    }
    // <레이어 세팅 메서드>

    // <캔버스 세팅 메서드>

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
        this.canvas.context = this.canvas.element.getContext('2d');
        this.canvas.pixelRatio = pixelRatio;

        //
        this.canvas.element.width = this.stage.rect.width * pixelRatio;
        this.canvas.element.height = this.stage.rect.height * pixelRatio;
        this.canvas.context.scale(pixelRatio, pixelRatio);

        this.setStyleCanvasWidthObject(this.canvas.style);
        this.canvas.context.save();
        return this;
    }
    // 캔버스 붙이기
    appendCanvas() {
        this.stage.element.append(this.canvas.element);
    }
    removeCanvas() {}

    // 캔버스 이미지 등록
    async appendImageCanvas(imageUrl, appendImgCanvasOptions) {
        const context = this.utils.contextValidate();

        const blobImgUrl = await this.utils.fetchImageUrlToBlob(imageUrl);

        let baseImage = new Image();
        baseImage.src = blobImgUrl;

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

            if (
                appendImgCanvasOptions &&
                appendImgCanvasOptions.fitImageSize === true
            ) {
                // 캔버스 사이즈 이미지 사이즈에 맞춤
                this.canvas.element.width =
                    imgCanvasWidth * this.canvas.pixelRatio;
                this.canvas.element.height =
                    imgCanvasHeight * this.canvas.pixelRatio;

                this.canvas.element.style.transform = `translate(${imgCanvasPositionX}px, ${imgCanvasPositionY}px)`;

                imgCanvasPositionX = 0;
                imgCanvasPositionY = 0;

                this.setStyleCanvasWidthObject(this.canvas.style);
            }

            context.drawImage(
                baseImage,
                imgCanvasPositionX,
                imgCanvasPositionY,
                imgCanvasWidth,
                imgCanvasHeight
            );

            try {
                const getImageData = context.getImageData(
                    0,
                    0,
                    this.stage.rect.width,
                    this.stage.rect.height
                );
                if (!this.layer.readLayer('image')) {
                    this.layer.createLayer('image', getImageData);
                } else {
                    this.layer.updateLayer('image', getImageData);
                    this.layer.updateLayer('drawing', []);
                }
            } catch {
                throw new Error('Failed installl image inform');
            }
        };
    }

    setStyleCanvasWidthObject(contextObjects) {
        const context = this.utils.contextValidate();
        for (const [contextKey, contextValue] of Object.entries(
            contextObjects
        )) {
            context[contextKey] = contextValue;
        }
    }

    // <이벤트 메소드>
    onPointerDown(e) {
        this.isDown = true;
        const { x, y } = this.utils.eventPointerPosition(e);

        this.points.down.x = x;
        this.points.down.y = y;

        // temp
        this.points.temp.x = x;
        this.points.temp.y = y;
    }
    onPointerMove(e) {
        if (!this.isDown) return;
        const { x, y } = this.utils.eventPointerPosition(e);

        this.points.move.x = x;
        this.points.move.y = y;

        this.drawCanvas(this.points.temp.x, this.points.temp.y, x, y);
        // temp movements
        this.tempMovements.push({
            sx: this.points.temp.x,
            sy: this.points.temp.y,
            ex: x,
            ey: y,
        });
        // temp
        this.points.temp.x = x;
        this.points.temp.y = y;
    }
    onPointerUp(e) {
        const { x, y } = this.utils.eventPointerPosition(e);
        this.points.up.x = x;
        this.points.up.y = y;

        if (this.isDown && this.tempMovements.length > 0) {
            let getDrawingLayer = [
                ...this.layer.readLayer('drawing').layerValue,
            ];
            getDrawingLayer.push({
                points: this.tempMovements,
                style: { ...this.canvas.style },
            });
            this.layer.updateLayer('drawing', getDrawingLayer);
            this.tempMovements = [];
        }

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
            this.onPointerDown.bind(this)
        );

        // move event
        $(document).on(
            'pointermove',
            `${this.stage.string} ${this.canvas.string}`,
            this.onPointerMove.bind(this)
        );

        // up event
        $(document).on('pointerup', this.onPointerUp.bind(this));

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
        const context = this.utils.contextValidate();

        this.canvas.style.strokeStyle = color;
        context.strokeStyle = color;
    }

    // 드로잉 두께 변경
    changeLineWidthCanvas(width) {
        const context = this.utils.contextValidate();

        this.canvas.style.lineWidth = width;
        context.lineWidth = width;
    }

    // 드로잉
    drawCanvas(sx, sy, ex, ey) {
        const context = this.utils.contextValidate();

        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(ex, ey);
        context.stroke();
    }

    // TODO : 지우기 : 필요하면 개발예정
    eraseCanvas() {
        // const context = this.utils.contextValidate();
        // context.globalCompositeOperation = 'destination-out';
    }

    // 드로잉 된 것 모두 지우기
    eraseAllDrawingCanvas() {
        this.eraseAllCanvas();
        const imageLayer = this.layer.readLayer('image');
        this.canvas.context.putImageData(imageLayer.layerValue, 0, 0);
    }
    // 캔바스 모두 지우기
    eraseAllCanvas() {
        const context = this.utils.contextValidate();

        context.clearRect(0, 0, this.stage.rect.width, this.stage.rect.height);
    }

    // <되돌리기>
    // 드로잉 된 것 되돌리기
    revertDrawingCanvas() {
        let getDrawingLayer = [...this.layer.readLayer('drawing').layerValue];
        getDrawingLayer.pop();
        this.layer.updateLayer('drawing', getDrawingLayer);
        this.eraseAllDrawingCanvas();

        getDrawingLayer.forEach((stepInfo) => {
            const { points, style } = stepInfo;
            if (!points && points.length <= 0) return;
            this.setStyleCanvasWidthObject(style);
            points.forEach((drawingInfo) => {
                const { sx, sy, ex, ey } = drawingInfo ?? {};
                this.drawCanvas(sx, sy, ex, ey);
            });
        });
        this.setStyleCanvasWidthObject(this.canvas.style);
    }

    // <캔버스 이미지 컨트롤>
    // 캔버스 이미지 URL 로 변환
    toDataUrlCanvas(type, quality) {
        const context = this.utils.contextValidate();

        const imgType = type ?? 'image/jpeg';
        const imgQuality = quality ?? 1.0;
        try {
            const dataURL = this.canvas.element.toDataURL(imgType, imgQuality);
            return {
                url: dataURL,
                type: imgType,
                quality: imgQuality,
            };
        } catch {
            throw new Error();
        }
    }
    // 캔버스 이미지 다운로드
    downloadImage(imgName, imgType, imgQuality) {
        const { url, type } = this.toDataUrlCanvas(imgType, imgQuality);

        try {
            const imgExtension = type.toString().trim(' ').split('/')[1];

            let link = document.createElement('a');
            link.download = `${imgName ?? 'download'}.${imgExtension}`;
            link.href = url;
            link.click();

            link = undefined;
        } catch {
            throw new Error('Failed to download img');
        }
    }

    utils = {
        toFixedFloat: (value, digit) => parseFloat(value.toFixed(digit) ?? 0),
        eventPointerPosition: (e) => {
            const x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            const y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
            return { x: x ?? 0, y: y ?? 0 };
        },
        fetchImageUrlToBlob: async (imageUrl) => {
            try {
                return fetch(imageUrl)
                    .then((res) => res.blob())
                    .then((blob) => {
                        return URL.createObjectURL(blob);
                    })
                    .catch((error) => {
                        throw new Error('failed url to blob');
                    });
            } catch {
                throw new Error('failed url to blob');
            }
        },
        contextValidate: () => {
            const context = this.canvas.context;
            if (!context) {
                throw new Error('Can Not Use Context');
            } else {
                return context;
            }
        },
    };
}

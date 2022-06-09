export class WhiteboardCreator {
    constructor(containerStr, initOptions) {
        /* 초기 세팅 */
        this.container = {
            string: containerStr,
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

        /* 캔버스 세팅 */
        this.createCanvas().settingsCanvas().appendCanvas();
        // this.();
    }
    createCanvas() {
        this.container.element = $(this.container.string);
        this.container.rect.width = this.container.element.width();
        this.container.rect.height = this.container.element.height();

        this.canvas.element = document.createElement('canvas');
        return this;
    }
    settingsCanvas() {
        const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.canvas.ctx = this.canvas.element.getContext('2d');
        this.canvas.pixelRatio = pixelRatio;

        this.canvas.element.width = this.container.rect.width * pixelRatio;
        this.canvas.element.height = this.container.rect.height * pixelRatio;
        this.canvas.ctx.scale(pixelRatio, pixelRatio);

        return this;
    }
    appendCanvas() {
        this.container.element.append(this.canvas.element);
    }
    removeCanvas() {}
}

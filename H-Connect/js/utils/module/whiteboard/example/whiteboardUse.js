const { WhiteboardCreator } = await import(
    importVersion('/H-Connect/js/utils/module/whiteboard/whiteboard.js')
);

const whiteboardCreatorOptions = {
    palette: {
        initialColor: '#ffffff',
        color: [
            {
                target: '.white',
                color: '#ffffff',
            },
            {
                target: '.pink',
                color: '#ff4685',
            },
            {
                target: '.red',
                color: '#d91010',
            },
            {
                target: '.blue',
                color: '#0043c9',
            },
            {
                target: '.green',
                color: '#00bc3f',
            },
            {
                target: '.yellow',
                color: '#ffaa17',
            },
        ],

        onClick: (e, module) => {
            $(e.currentTarget).addClass('on');
            $('.color button').not(e.currentTarget).removeClass('on');
        },
    },
    line: {
        initialWidth: 4,
        width: [
            {
                target: '.line_option.one',
                width: 1,
            },
            {
                target: '.line_option.two',
                width: 2,
            },
            {
                target: '.line_option.three',
                width: 3,
            },
            {
                target: '.line_option.four',
                width: 4,
            },
        ],
        onClick: (e, module) => {},
    },
};

const whiteboardCreatorModule = new WhiteboardCreator(
    '#whiteboard',
    whiteboardCreatorOptions
);

async function getImgAppendToCanvas() {
    // fakeImage parameter : 0 or 1
    const fetchImgUrl = await fakeImageAPI(0);
    whiteboardCreatorModule.appendImageCanvas(fetchImgUrl, {
        fitImageSize: true,
    });
}
// img 붙이기
getImgAppendToCanvas();

$('.btn_clear').on('click', function () {
    // 드로잉 모두 지우기
    whiteboardCreatorModule.eraseAllDrawingCanvas();
});
$('.btn_back').on('click', function () {
    // 드로잉 되돌리기
    whiteboardCreatorModule.revertDrawingCanvas();
});

// ! 다음 두 버튼은 해당 기능을 설명하기 위해 붙인 버튼 입니다.
$('.btn_check').on('click', function () {
    // 이미지 url 받아오기
    const { url } = whiteboardCreatorModule.toDataUrlCanvas();
    console.log('url: ', url);

    // 이미지 다운로드 시
    whiteboardCreatorModule.downloadImageCanvas('이미지이름', 'image/jpeg');
});

$('.btn_no').on('click', async function () {
    // fakeImage parameter : 0 or 1
    // 이미지 변경시
    const fetchImgUrl = await fakeImageAPI(1);
    whiteboardCreatorModule.appendImageCanvas(fetchImgUrl, {
        fitImageSize: true,
    });
});

// 선 두께 select box 토글
$('.selectBox2 .label').on('click', function () {
    $(this).parent().toggleClass('active');
});
$('.selectBox2 .optionList li').on('click', function () {
    const deviceName = $(this).html();
    $(this).addClass('active').siblings().removeClass('active');
    $('.selectBox2 .label').html(deviceName);
    $(this).parent().parent().toggleClass('active');
});

/*







*/

// fake img api
async function fakeImageAPI(id) {
    const timeoutSeconds = 250;
    const promise = new Promise((resolve, reject) => {
        let imgUrl = null;
        if (id === 0) {
            imgUrl =
                'http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg';
        } else if (id === 1) {
            imgUrl = '/H-Connect/img/remote/drawing.jpg';
        }
        setTimeout(function () {
            resolve(imgUrl);
        }, timeoutSeconds);
    }).then((success) => success);
    return promise;
}

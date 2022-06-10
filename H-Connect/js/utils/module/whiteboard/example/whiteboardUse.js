const { WhiteboardCreator } = await import(
    importVersion('/H-Connect/js/utils/module/whiteboard/whiteboard.js')
);

const fakeImageAPI = async () => {
    return;
};

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
        initialWidth: 10,
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
const imgUrl =
    'https://m.riposo.co.kr/web/product/big/202010/36e035793dc70f4d0c569ad1a07e87fb.jpg';
// const imgUrl =
//     'https://img.animalplanet.co.kr/news/2020/07/15/700/e05t9x1o0e3trklpwrr3.jpg';
// const imgUrl =
//     'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg';
// const imgUrl =
//     'https://img7.yna.co.kr/mpic/YH/2022/01/03/MYH20220103010500534.jpg';
// const imgUrl =
//     'http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg';
// const imgUrl = '/H-Connect/img/remote/drawing.jpg';
whiteboardCreatorModule.appendImageCanvas(imgUrl);

$('.selectBox2 .label').on('click', function () {
    $(this).parent().toggleClass('active');
});
$('.selectBox2 .optionList li').on('click', function () {
    const deviceName = $(this).html();
    $(this).addClass('active').siblings().removeClass('active');
    $('.selectBox2 .label').html(deviceName);
    $(this).parent().parent().toggleClass('active');
});

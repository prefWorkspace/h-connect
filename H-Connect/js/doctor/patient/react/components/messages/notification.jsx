const Notification = ({ chat }) => {
    let html = null;

    switch (chat.ntype) {
        case 'NOTI_START_SECTION':
            html = <div className='start_clinic' id='fourth_taget'>
                <p>${chat.user_info.user_nickname}님. 진료가 시작되었습니다.</p>
                <p>
                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                </p>
            </div>;
            break;
        case 'NOTI_END_SECTION':
            html = <div className='end_clinic' id='third_taget'>
                <p>${chat.user_info.user_nickname}님. 진료가 종료되었습니다.</p>
                <p>
                    <span>${date.shortYear}.${date.month}.${date.days}</span>

                    <span>${date.hours}:${date.minutes}:${date.seconds}</span>
                </p>
            </div>;
            break;
        case 'NOTI_PLAIN_MESSAGE':
            break;
    }

    return ({ html });
};

const Talk = ({ chat }) => {
    const data = ReactRedux.useSelector(state => state);
    const date = MessageDelegate.getDateFromTimestamp(chat.created_time);

    return (
        <React.Fragment>
            {data.message.userId === chat.user_id ?
                <div className='chat_me' id='fifth_taget'>
                    <div>
                        <div className='bubble'>
                            <p>
                                <pre>{chat.message}</pre>
                            </p>
                        </div>

                        <small>
                            <span>{date.shortYear}.{date.month}.{date.days}</span>

                            <span>{date.hours}:{date.minutes}:{date.seconds}</span>
                        </small>
                    </div>
                </div> :
                <div className='chat_you' id='fifth_taget'>
                    <div>
                        <div className='bubble'>
                            <p>
                                <pre>{chat.message}</pre>
                            </p>
                        </div>

                        <small>
                            <span>{date.shortYear}.{date.month}.{date.days}</span>

                            <span>{date.hours}:{date.minutes}:{date.seconds}</span>
                        </small>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

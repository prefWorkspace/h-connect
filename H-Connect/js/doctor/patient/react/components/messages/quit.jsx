const Quit = ({ chat }) => {
    return (
        <div style={{
            textAlign: 'center',
            color: 'gray',
            fontSize: '12px'
        }}>${chat.user_info.user_nickname}님이 퇴장하셨습니다.</div>
    );
};

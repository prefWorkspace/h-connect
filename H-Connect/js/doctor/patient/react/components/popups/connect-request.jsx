const ConnectRequest = () => {
    return (
        <div className='pop connect connect_para connect_doctor'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div>
                        <img
                            src='/H-Connect/img/logo_white.png'
                            alt='화이트 로고'
                        />
                    </div>

                    <h3>이연차 전공의로 부터 응급호출 요청을 받았습니다.</h3>
                    <h2>
                        김환자 (63. 남) Patient ID. 심장병동. 1308호실. 3병상
                    </h2>
                    <h1>연결 하시겠습니까?</h1>

                    <div className='btn_list'>
                        <div className='con_btn refuse'>
                            <button type='button' className='btn_refuse'>
                                <img
                                    src='/H-Connect/img/emergency/refuse.svg'
                                    alt='통화거절 아이콘'
                                />
                            </button>

                            <div className='layer refuse_layer'>
                                <p>대응불가</p>
                            </div>
                        </div>

                        <div className='con_btn mic'>
                            <button type='button' className='btn_mic'>
                                <img
                                    src='/H-Connect/img/emergency/mic.svg'
                                    alt='마이크 아이콘'
                                />
                            </button>

                            <div className='layer mic_layer'>
                                <p>마이크</p>
                            </div>

                            <div className='toggle_layer mic_off'>
                                <img
                                    src='/H-Connect/img/icon/mic_off.svg'
                                    alt='마이크 끄는 아이콘'
                                />
                            </div>
                        </div>

                        <div className='con_btn webcam'>
                            <button type='button' className='btn_cam'>
                                <img
                                    src='/H-Connect/img/emergency/cam.svg'
                                    alt='화상카메라 아이콘'
                                />
                            </button>

                            <div className='layer cam_layer'>
                                <p>화상캠</p>
                            </div>

                            <div className='toggle_layer cam_off'>
                                <img
                                    src='/H-Connect/img/icon/cam_off.svg'
                                    alt='캠끄는 아이콘'
                                />
                            </div>
                        </div>

                        <div className='con_btn accept'>
                            <button type='button' className='btn_accept'>
                                <img
                                    src='/H-Connect/img/icon/call.svg'
                                    alt='전화기 아이콘'
                                />
                            </button>

                            <div className='layer accept_layer'>
                                <p>연결</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

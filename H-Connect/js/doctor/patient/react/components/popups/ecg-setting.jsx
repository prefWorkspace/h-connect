const ECGSetting = () => {
    return (
        <div className='pop setting_menu ecg_set'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div className='title'>
                        <h2>ECG Setting menu</h2>
                    </div>

                    <div className='content'>
                        <div className='alarm'>
                            <p>Alarm</p>

                            <div className='container'>
                                <input
                                    type='radio'
                                    name='ecg_alarm'
                                    id='ecg_off'
                                    className='alarm_off'
                                />
                                <label htmlFor='ecg_off' className='btn_resp_alarm'
                                >Off</label
                                >

                                <input
                                    type='radio'
                                    name='ecg_alarm'
                                    id='ecg_on'
                                    className='alarm_on'
                                    checked
                                />
                                <label htmlFor='ecg_on' className='btn_resp_alarm'
                                >On</label
                                >
                            </div>
                        </div>

                        <div className='input_num hr'>
                            <p>HR</p>

                            <div className='container'>
                                <div className='num_wrap'>
                                    <input type='number' />

                                    <div className='num_control'>
                                        <button type='button' className='up'>
                                            <img
                                                src='/H-Connect/img/icon/black_up.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>

                                        <button type='button' className='down'>
                                            <img
                                                src='/H-Connect/img/icon/black_down.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className='num_wrap'>
                                    <input type='number' />

                                    <div className='num_control'>
                                        <button type='button' className='up'>
                                            <img
                                                src='/H-Connect/img/icon/black_up.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>

                                        <button type='button' className='down'>
                                            <img
                                                src='/H-Connect/img/icon/black_down.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='input_num exta'>
                            <p>Extreme Tachy</p>

                            <div className='container'>
                                <div className='num_wrap'>
                                    <input type='number' />

                                    <div className='num_control'>
                                        <button type='button' className='up'>
                                            <img
                                                src='/H-Connect/img/icon/black_up.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>

                                        <button type='button' className='down'>
                                            <img
                                                src='/H-Connect/img/icon/black_down.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='input_num exbr'>
                            <p>Extreme Brady</p>

                            <div className='container'>
                                <div className='num_wrap'>
                                    <input type='number' />

                                    <div className='num_control'>
                                        <button type='button' className='up'>
                                            <img
                                                src='/H-Connect/img/icon/black_up.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>

                                        <button type='button' className='down'>
                                            <img
                                                src='/H-Connect/img/icon/black_down.svg'
                                                alt='검은색 삼각형'
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='st_set'>
                            <p>ST Setting</p>

                            <div className='toggle_container'>
                                <input
                                    type='radio'
                                    name='st_alarm'
                                    id='st_off'
                                    className='alarm_off'
                                    checked
                                />
                                <label htmlFor='st_off' className='btn_resp_alarm'
                                >Off</label
                                >

                                <input
                                    type='radio'
                                    name='st_alarm'
                                    id='st_on'
                                    className='alarm_on'
                                />
                                <label htmlFor='st_on' className='btn_resp_alarm'
                                >On</label
                                >
                            </div>

                            <div className='input_num'>
                                <div className='container'>
                                    <div className='num_wrap'>
                                        <input type='number' />

                                        <div className='num_control'>
                                            <button type='button' className='up'>
                                                <img
                                                    src='/H-Connect/img/icon/black_up.svg'
                                                    alt='검은색 삼각형'
                                                />
                                            </button>

                                            <button type='button' className='down'>
                                                <img
                                                    src='/H-Connect/img/icon/black_down.svg'
                                                    alt='검은색 삼각형'
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='num_wrap'>
                                        <input type='number' />

                                        <div className='num_control'>
                                            <button type='button' className='up'>
                                                <img
                                                    src='/H-Connect/img/icon/black_up.svg'
                                                    alt='검은색 삼각형'
                                                />
                                            </button>

                                            <button type='button' className='down'>
                                                <img
                                                    src='/H-Connect/img/icon/black_down.svg'
                                                    alt='검은색 삼각형'
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='btn_list'>
                        <button type='button' className='btn rd btn_cancel'>
                            취소
                        </button>
                        <button type='button' className='btn blf btn_check'>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

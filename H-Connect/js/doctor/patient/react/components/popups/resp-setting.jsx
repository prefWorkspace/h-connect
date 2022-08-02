const RESPSetting = () => {
    return (
        <div className='pop setting_menu resp_set'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div className='title'>
                        <h2>RESP Setting menu</h2>
                    </div>

                    <div className='content'>
                        <div className='alarm'>
                            <p>Alarm</p>

                            <div className='container'>
                                <input
                                    type='radio'
                                    name='resp_alarm'
                                    id='btn_off'
                                    className='alarm_off'
                                />
                                <label htmlFor='btn_off' className='btn_resp_alarm'
                                >Off</label
                                >

                                <input
                                    type='radio'
                                    name='resp_alarm'
                                    id='btn_on'
                                    className='alarm_on'
                                    checked
                                />
                                <label htmlFor='btn_on' className='btn_resp_alarm'
                                >On</label
                                >
                            </div>
                        </div>

                        <div className='input_num resp'>
                            <p>RESP</p>

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

                        <div className='sweep'>
                            <p>Sweep Speed</p>

                            <div className='container'>
                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='sweep'
                                            id='first'
                                            className='radio_custom'
                                            checked
                                        />
                                        <label htmlFor='first'></label>
                                        <label htmlFor='first'>6.25 mm/s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='sweep'
                                            id='second'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='second'></label>
                                        <label htmlFor='second'>12.5 mm/s</label>
                                    </div>
                                </div>

                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='sweep'
                                            id='third'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='third'></label>
                                        <label htmlFor='third'>25.0 mm/s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='sweep'
                                            id='fourth'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='fourth'></label>
                                        <label htmlFor='fourth'>50.0 mm/s</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='apnea'>
                            <p>Apnea Alarm</p>

                            <div className='container'>
                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_first'
                                            className='radio_custom'
                                            checked
                                        />
                                        <label htmlFor='ap_first'></label>
                                        <label htmlFor='ap_first'>off</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_second'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_second'></label>
                                        <label htmlFor='ap_second'>10s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_third'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_third'></label>
                                        <label htmlFor='ap_third'>15s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_fourth'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_fourth'></label>
                                        <label htmlFor='ap_fourth'>20s</label>
                                    </div>
                                </div>

                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_fifth'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_fifth'></label>
                                        <label htmlFor='ap_fifth'>25s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_sixth'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_sixth'></label>
                                        <label htmlFor='ap_sixth'>30s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_seventh'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_seventh'></label>
                                        <label htmlFor='ap_seventh'>35s</label>
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='apnea'
                                            id='ap_eighth'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='ap_eighth'></label>
                                        <label htmlFor='ap_eighth'>40s</label>
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

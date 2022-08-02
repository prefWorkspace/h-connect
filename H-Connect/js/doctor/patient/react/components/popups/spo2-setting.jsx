const SPO2Setting = () => {
    return (
        <div className='pop setting_menu sp_set'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div className='title'>
                        <h2>SpO2 Setting menu</h2>
                    </div>

                    <div className='content'>
                        <div className='alarm'>
                            <p>Alarm</p>

                            <div className='container'>
                                <input
                                    type='radio'
                                    name='sp_alarm'
                                    id='sp_off'
                                    className='alarm_off'
                                />
                                <label htmlFor='sp_off' className='btn_resp_alarm'
                                >Off</label
                                >

                                <input
                                    type='radio'
                                    name='sp_alarm'
                                    id='sp_on'
                                    className='alarm_on'
                                    checked
                                />
                                <label htmlFor='sp_on' className='btn_resp_alarm'
                                >On</label
                                >
                            </div>
                        </div>

                        <div className='input_num spo2'>
                            <p>SpO2</p>

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

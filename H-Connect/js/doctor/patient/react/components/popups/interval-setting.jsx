const IntervalSetting = () => {
    return (
        <div className='pop setting_menu interval_set'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div className='title'>
                        <h2>Interval Setting menu</h2>
                    </div>

                    <div className='content'>
                        <div>
                            <p>Interval Setting</p>

                            <div className='container'>
                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_01'
                                            className='radio_custom'
                                            checked
                                        />
                                        <label htmlFor='interval_time_01'></label>
                                        <label htmlFor='interval_time_01'
                                        >15s</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_02'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_02'></label>
                                        <label htmlFor='interval_time_02'
                                        >1 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_03'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_03'></label>
                                        <label htmlFor='interval_time_03'
                                        >3 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_04'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_04'></label>
                                        <label htmlFor='interval_time_04'
                                        >10 m</label
                                        >
                                    </div>
                                </div>

                                <div>
                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_05'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_05'></label>
                                        <label htmlFor='interval_time_05'
                                        >15 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_06'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_06'></label>
                                        <label htmlFor='interval_time_06'
                                        >30 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_07'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_07'></label>
                                        <label htmlFor='interval_time_07'
                                        >60 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_08'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_08'></label>
                                        <label htmlFor='interval_time_08'
                                        >90 m</label
                                        >
                                    </div>

                                    <div className='input_wrap'>
                                        <input
                                            type='radio'
                                            name='interval'
                                            id='interval_time_09'
                                            className='radio_custom'
                                        />
                                        <label htmlFor='interval_time_09'></label>
                                        <label htmlFor='interval_time_09'
                                        >120 m</label
                                        >
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

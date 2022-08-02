const EWSSetting = () => {
    return (
        <div className='pop setting_menu ews_set'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div className='title'>
                        <h2>EWS Setting menu</h2>
                    </div>

                    <div className='content'>
                        <div className='alarm'>
                            <p>Alarm</p>

                            <div className='container'>
                                <input
                                    type='radio'
                                    name='alarm'
                                    id='ews_off'
                                    className='alarm_off'
                                />
                                <label htmlFor='ews_off' className='btn_resp_alarm'
                                >Off</label
                                >

                                <input
                                    type='radio'
                                    name='alarm'
                                    id='ews_on'
                                    className='alarm_on'
                                    checked
                                />
                                <label htmlFor='ews_on' className='btn_resp_alarm'
                                >On</label
                                >
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

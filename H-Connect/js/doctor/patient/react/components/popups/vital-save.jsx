const VitalSave = () => {
    return (
        <div className='pop record'>
            <div className='overlay'>
                <div className='pop_cont'>
                    <div>
                        <img src='/H-Connect/img/logo.png' alt='로고' />
                    </div>

                    <h2>김환자 (63. 남)님의 vital sign이 저장되었습니다.</h2>
                    <h2 className='color'>21.09.15 11:25:37</h2>
                    <h2>저장된 내용은 event 탭에서 확인하실 수 있습니다.</h2>

                    <button type='button' className='btn_check'>확인</button>
                </div>
            </div>
        </div>
    );
};

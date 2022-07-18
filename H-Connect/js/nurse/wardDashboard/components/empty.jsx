const Empty = () => {
    return (
        <div className='sys_vital empty'>
            <div className='vital_inner'>
                <div className='graph'>
                    <div className='data' style={{ display: 'none' }}>
                        <div className='graph_title'>
                            <p>Patient Type - Patient ID</p>
                            <p>EWS : 3</p>
                        </div>

                        <div className='img_container'>
                            <img
                                src='/H-Connect/img/graph/ECG.png'
                                alt='ecg그래프'
                            />
                        </div>
                    </div>

                    {/* 데이터가 없을때 보이게 해주세요! */}
                    <div className='no_data' style={{ display: 'block' }}>
                        <div>
                            <p>empty bed</p>
                            <p>EWS : -</p>
                        </div>
                    </div>
                </div>

                <div className='character'>
                    <div>
                        <div className='ecg'>
                            <div
                                className='bell'
                                style={{ display: 'none' }}
                            >
                                <div className='bell_name'>
                                    <p>HR. bpm</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>120</p>
                                        <p>50</p>
                                    </div>

                                    <p>108</p>
                                </div>
                            </div>

                            {/* 데이터가 없을때 no_bell을 보이게 해주세요 */}
                            <div
                                className='no_bell'
                                style={{ display: 'block' }}
                            >
                                <div className='bell_name'>
                                    <p>HR. bpm</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>

                                    <p>-</p>
                                </div>
                            </div>
                        </div>

                        <div className='sp'>
                            <div
                                className='bell'
                                style={{ display: 'none' }}
                            >
                                <div className='bell_name'>
                                    <p>SpO2. %</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>100</p>
                                        <p>90</p>
                                    </div>

                                    <p>98</p>
                                </div>
                            </div>

                            {/* 데이터가 없을때 no_bell을 보이게 해주세요 */}
                            <div
                                className='no_bell'
                                style={{ display: 'block' }}
                            >
                                <div className='bell_name'>
                                    <p>SpO2. %</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>

                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='resp'>
                            <div
                                className='bell'
                                style={{ display: 'none' }}
                            >
                                <div className='bell_name'>
                                    <p>RESP</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>30</p>
                                        <p>8</p>
                                    </div>

                                    <p>15</p>
                                </div>
                            </div>

                            {/* 데이터가 없을때 no_bell을 보이게 해주세요 */}
                            <div
                                className='no_bell'
                                style={{ display: 'block' }}
                            >
                                <div className='bell_name'>
                                    <p>RESP</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>

                                    <p>-</p>
                                </div>
                            </div>
                        </div>

                        <div className='temp'>
                            <div
                                className='bell'
                                style={{ display: 'none' }}
                            >
                                <div className='bell_name'>
                                    <p>Temp.°C</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>39.0</p>
                                        <p>36. 0</p>
                                    </div>

                                    <p>36.5</p>
                                </div>
                            </div>

                            {/* 데이터가 없을때 no_bell을 보이게 해주세요 */}
                            <div
                                className='no_bell'
                                style={{ display: 'block' }}
                            >
                                <div className='bell_name'>
                                    <p>Temp. °C</p>
                                </div>

                                <div className='bell_num'>
                                    <div>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>

                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

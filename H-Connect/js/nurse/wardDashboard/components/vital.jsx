const Vital = ({ data }) => {

    return (
        <div id={data.measurementCode} className='sys_vital'>
            <div className='vital_inner'>
                <div className='graph'>
                    <div className='data'>
                        <div className='graph_title'>
                            <p>{data.measurementType} - {data.patientCode}</p>
                            <p>EWS : 3</p>
                        </div>

                        <div id={`${data.measurementCode}-vital-ecg-graph`} style={{ width: 434, height: 45 }}></div>
                    </div>

                    {/* 데이터가 없을때 보이게 해주세요! */}
                    <div className='no_data'>
                        <div>
                            <p>empty bed</p>
                            <p>EWS : -</p>
                        </div>
                    </div>
                </div>

                <div className='character'>
                    <div>
                        <div className='ecg'>
                            <div className='bell'>
                                <div className='bell_name'>
                                    <p>HR. bpm</p>
                                </div>

                                <div className='bell_num'>
                                    <div className="minMax">
                                        <p>120</p>
                                        <p>50</p>
                                    </div>

                                    <p>108</p>
                                </div>
                            </div>

                            {/* 데이터가 없을때 no_bell을 보이게 해주세요 */}
                            <div className='no_bell'>
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
                            <div className='bell'>
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
                            <div className='no_bell'>
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
                            <div className='bell'>
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
                            <div className='no_bell'>
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
                            <div className='bell'>
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
                            <div className='no_bell'>
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

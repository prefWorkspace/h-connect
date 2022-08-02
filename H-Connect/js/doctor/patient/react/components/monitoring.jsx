const Monitoring = () => {
    return (
        <section className='section vital_chart'>
            <div className='container'>
                <div className='title'>
                    <div>
                        <p>vital moniter</p>

                        <p className='pati_info'>
                            <span>김환자</span>
                            (<span>63</span>.
                            <span>남</span>).
                            <span>Patient ID</span> -
                            <span>Patient type</span>
                        </p>
                    </div>

                    <div className='chart_time'>
                        <p>
                            마지막 업데이트 시간 :
                            <span>21</span>. <span>09</span>.
                            <span>15</span>
                        </p>
                        &nbsp;
                        <p>
                            <span>10</span>: <span>30</span>:
                            <span>15</span>
                        </p>
                    </div>
                </div>

                <div className='cont'>
                    <div className='container'>
                        <div className='btn_group'>
                            {/* 탭메뉴 */ }
                            <ul className='tabs'>
                                <li
                                    className='tab-link current'
                                    data-tab='tab-1'
                                >
                                    current vital
                                </li>
                                <li
                                    className='tab-link'
                                    data-tab='tab-2'
                                >
                                    Tabular Trend
                                </li>
                                <li
                                    className='tab-link'
                                    data-tab='tab-3'
                                >
                                    Graphical Trend
                                </li>
                                <li
                                    className='tab-link'
                                    data-tab='tab-4'
                                >
                                    Event
                                </li>
                            </ul>

                            <div className='btn_list'>
                                <button
                                    type='button'
                                    className='btn bl btn_set'
                                >
                                    Setting
                                </button>
                                <button
                                    type='button'
                                    className='btn bl btn_re'
                                >
                                    Record
                                </button>
                            </div>
                        </div>

                        {/* current vital */ }
                        <div id='tab-1' className='tab-content current'>
                            <div className='graph'>
                                <div className='ecg'>
                                    <div className='g_type ecg_graph'>
                                        <p>ECG</p>

                                        <div id='vital-ecg-graph' style={{ width: 1028, height: 64 }}></div>
                                    </div>

                                    <div className='bell'>
                                        <div className='bell_name'>
                                            <p>HR. bpm</p>

                                            <input
                                                type='checkbox'
                                                id='ecg_mute'
                                            />
                                            <label htmlFor='ecg_mute'>
                                                <span></span>
                                            </label>
                                        </div>

                                        <div className='bell_num'>
                                            <div>
                                                <p>120</p>
                                                <p>50</p>
                                            </div>

                                            <p>108</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='sp'>
                                    <div className='g_type sp_graph'>
                                        <p>SpO2</p>

                                        <div id='vital-spO2-graph'
                                             style={{ width: 1028, height: 64 }}></div>
                                    </div>

                                    <div className='bell'>
                                        <div className='bell_name'>
                                            <p>SpO2. %</p>

                                            <input
                                                type='checkbox'
                                                id='sp_mute'
                                            />
                                            <label htmlFor='sp_mute'>
                                                <span></span>
                                            </label>
                                        </div>

                                        <div className='bell_num'>
                                            <div>
                                                <p>100</p>
                                                <p>90</p>
                                            </div>

                                            <p>98</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='resp'>
                                    <div className='g_type resp_graph'>
                                        <p>RESP</p>

                                        <div id='vital-resp-graph'
                                             style={{ width: 1028, height: 64 }}></div>
                                    </div>

                                    <div className='bell'>
                                        <div className='bell_name'>
                                            <p>RESP</p>

                                            <input
                                                type='checkbox'
                                                id='resp_mute'
                                            />
                                            <label htmlFor='resp_mute'>
                                                <span></span>
                                            </label>
                                        </div>

                                        <div className='bell_num'>
                                            <div>
                                                <p>30</p>
                                                <p>8</p>
                                            </div>

                                            <p>15</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='control'>
                                <div>
                                    <div className='ews'>
                                        <div className='bell_name'>
                                            <p>EWS</p>

                                            <input
                                                type='checkbox'
                                                id='ews_mute'
                                            />
                                            <label htmlFor='ews_mute'>
                                                <span></span>
                                            </label>
                                        </div>

                                        <div className='bell_num'>
                                            <p>3</p>

                                            <div>
                                                <button
                                                    type='button'
                                                >
                                                    <img
                                                        src='/H-Connect/img/icon/up_white.svg'
                                                        alt='위를 향하는 화살표'
                                                    />
                                                </button>

                                                <button
                                                    type='button'
                                                >
                                                    <img
                                                        src='/H-Connect/img/icon/down_white.svg'
                                                        alt='아래를 향하는 화살표'
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mmhg'>
                                        <div className='bell_name'>
                                            <p>NBP.mmHg</p>
                                        </div>

                                        <div className='bell_num'>
                                            <div>
                                                <p>160</p>
                                                <p>90</p>
                                            </div>

                                            <p>128/77 (94)</p>
                                        </div>

                                        <div className='time'>
                                            <div>
                                                <img
                                                    src='/H-Connect/img/icon/clock.svg'
                                                    alt='시계 아이콘'
                                                />
                                            </div>

                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>

                                            <p>
                                                <span>21</span>:
                                                <span>10</span>:
                                                <span>25</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='pulse'>
                                        <div className='bell_name'>
                                            <p>Pulse.bpm</p>
                                        </div>

                                        <div className='bell_num'>
                                            <div>
                                                <p>120</p>
                                                <p>50</p>
                                            </div>

                                            <p>184</p>
                                        </div>

                                        <div className='time'>
                                            <div>
                                                <img
                                                    src='/H-Connect/img/icon/pulse_clock.png'
                                                    alt='시계 아이콘'
                                                />
                                            </div>

                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>

                                            <p>
                                                <span>21</span>:
                                                <span>10</span>:
                                                <span>25</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='temp'>
                                    <div className='bell_name'>
                                        <p>Temp.°C</p>

                                        <input
                                            type='checkbox'
                                            id='temp_mute'
                                        />
                                        <label htmlFor='temp_mute'>
                                            <span></span>
                                        </label>
                                    </div>

                                    <div className='bell_num'>
                                        <div>
                                            <p>39.0</p>
                                            <p>36.0</p>
                                        </div>

                                        <p>36.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabular Trend */ }
                        <div id='tab-2' className='tab-content'>
                            <div className='ecg'>
                                <div className='g_type ecg_graph'>
                                    <p>ECG</p>

                                    <div>
                                        <img
                                            src='/H-Connect/img/graph/ECG.png'
                                            alt='ecg그래프'
                                        />
                                    </div>
                                </div>

                                <div className='bell'>
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
                            </div>

                            <div className='tabular_table'>
                                <div className='table_title'>
                                    <p className='date_time'>
                                        date/time
                                    </p>
                                    <p className='hr'>HR (bpm)</p>
                                    <p className='temp'>Temp (°C)</p>
                                    <p className='ews'>EWS</p>
                                    <p className='spo'>SpO2 (%)</p>
                                    <p className='error'>Error</p>
                                </div>

                                <div className='table_body'>
                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>
                                </div>

                                {/* pagenation */ }
                                <div className='table_page'>
                                    <ul>
                                        <li><a href=''>
                                            &#60;&#60;
                                        </a></li>
                                        <li><a href=''>
                                            &#60;
                                        </a></li>
                                        <li className='active'>
                                            <a href=''>1.</a>
                                        </li>
                                        <li><a href=''>2.</a></li>
                                        <li><a href=''>3.</a></li>
                                        <li><a href=''>4.</a></li>
                                        <li><a href=''>5.</a></li>
                                        <li><a href=''>6.</a></li>
                                        <li><a href=''>7.</a></li>
                                        <li><a href=''>8.</a></li>
                                        <li><a href=''>9.</a></li>
                                        <li><a href=''>10.</a></li>
                                        <li><a href=''>...</a></li>
                                        <li><a href=''>52.</a></li>

                                        <li><a href=''>></a></li>
                                        <li><a href=''>>></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Graphical Trend */ }
                        <div id='tab-3' className='tab-content'>
                            <div className='ecg'>
                                <div className='g_type ecg_graph'>
                                    <p>ECG</p>

                                    <div>
                                        <img
                                            src='/H-Connect/img/graph/ECG.png'
                                            alt='ecg그래프'
                                        />
                                    </div>
                                </div>

                                <div className='bell'>
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
                            </div>

                            <div className='tabular_table graphical'>
                                <div className='table_title'>
                                    <p className='date_time'>
                                        date/time
                                    </p>
                                    <p className='hr'>HR (bpm)</p>
                                    <p className='temp'>Temp (°C)</p>
                                    <p className='ews'>EWS</p>
                                    <p className='spo'>SpO2 (%)</p>
                                    <p className='error'>Error</p>
                                </div>

                                <div className='table_body'>
                                    <div className='table_content'>
                                        <div className='date_time'>
                                            <p>
                                                <span>21</span>.
                                                <span>09</span>.
                                                <span>15</span>
                                            </p>
                                            &nbsp;

                                            <p>
                                                <span>01</span>:
                                                <span>44</span>:
                                                <span>37</span>
                                            </p>
                                        </div>

                                        <div className='hr'>
                                            <p>108</p>
                                        </div>

                                        <div className='temp'>
                                            <p>
                                                <span>36</span>.
                                                <span>5</span>
                                            </p>
                                        </div>

                                        <div className='ews'>
                                            <p>4</p>
                                        </div>
                                        <div className='spo'>
                                            <p>98</p>
                                        </div>
                                        <div className='error'>
                                            <p>-</p>
                                        </div>
                                    </div>
                                </div>

                                {/* graph_wrap */ }
                                <div className='graph_wrap'>
                                    {/* hr_chart */ }
                                    <div className='chart hr_chart'>
                                        {/* left */ }
                                        <div className='left'>
                                            <div className='index'>
                                                <p>HR<br />(bpm)</p>
                                            </div>

                                            <p className='bpm'>
                                                240<br />
                                                200<br />
                                                160<br />
                                                120<br />
                                                80<br />
                                                40<br />
                                                0
                                            </p>
                                        </div>

                                        <div className='right'>
                                            <div className='bg_graph'>
                                                <img
                                                    src='/H-Connect/img/graph/background.png'
                                                    alt='그래프 백그라운드 이미지'
                                                />
                                            </div>

                                            <div className='row_time'>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                            </div>

                                            <div className='time_line'>
                                                <p className='time'>
                                                    <span>00</span>:
                                                    <span>02</span>:
                                                    <span>00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* sp_chart */ }
                                    <div className='chart sp_chart'>
                                        {/* left */ }
                                        <div className='left'>
                                            <div className='index'>
                                                <p>SPO2<br />(%)</p>
                                            </div>

                                            <p className='bpm'>
                                                240<br />
                                                200<br />
                                                160<br />
                                                120<br />
                                                80<br />
                                                40<br />
                                                0
                                            </p>
                                        </div>

                                        <div className='right'>
                                            <div className='bg_graph'>
                                                <img
                                                    src='/H-Connect/img/graph/background.png'
                                                    alt='그래프 백그라운드 이미지'
                                                />
                                            </div>

                                            <div className='row_time'>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                            </div>

                                            <div className='time_line'>
                                                <p className='time'>
                                                    <span>00</span>:
                                                    <span>02</span>:
                                                    <span>00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* resp_chart */ }
                                    <div className='chart resp_chart'>
                                        {/* left */ }
                                        <div className='left'>
                                            <div className='index'>
                                                <p>RESP</p>
                                            </div>

                                            <p className='bpm'>
                                                240<br />
                                                200<br />
                                                160<br />
                                                120<br />
                                                80<br />
                                                40<br />
                                                0
                                            </p>
                                        </div>

                                        <div className='right'>
                                            <div className='bg_graph'>
                                                <img
                                                    src='/H-Connect/img/graph/background.png'
                                                    alt='그래프 백그라운드 이미지'
                                                />
                                            </div>

                                            <div className='row_time'>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                            </div>

                                            <div className='time_line'>
                                                <p className='time'>
                                                    <span>00</span>:
                                                    <span>02</span>:
                                                    <span>00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* temp_chart */ }
                                    <div className='chart temp_chart'>
                                        {/* left */ }
                                        <div className='left'>
                                            <div className='index'>
                                                <p>
                                                    TEMP<br />(°C)
                                                </p>
                                            </div>

                                            <p className='bpm'>
                                                240<br />
                                                200<br />
                                                160<br />
                                                120<br />
                                                80<br />
                                                40<br />
                                                0
                                            </p>
                                        </div>

                                        <div className='right'>
                                            <div className='bg_graph'>
                                                <img
                                                    src='/H-Connect/img/graph/background.png'
                                                    alt='그래프 백그라운드 이미지'
                                                />
                                            </div>

                                            <div className='row_time'>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                                <p>00:00:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:01:00</p>
                                                <p>00:02:00</p>
                                            </div>

                                            <div className='time_line'>
                                                <p className='time'>
                                                    <span>00</span>:
                                                    <span>02</span>:
                                                    <span>00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event */ }
                        <div id='tab-4' className='tab-content'>
                            <div className='ecg'>
                                <div className='g_type ecg_graph'>
                                    <p>ECG</p>

                                    <div>
                                        <img
                                            src='/H-Connect/img/graph/ECG.png'
                                            alt='ecg그래프'
                                        />
                                    </div>
                                </div>

                                <div className='bell'>
                                    <div className='bell_name'>
                                        <p>HR. bpm</p>
                                    </div>

                                    <div className='bell_num'>
                                        <div>
                                            <p>120</p>
                                            <p>50</p>
                                        </div>

                                        <p>216</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='tabular_table graphical event'
                            >
                                <div className='table_title'>
                                    <p className='date_time'>
                                        date/time
                                    </p>
                                    <p className='alarm_des'>
                                        Alarm Description
                                    </p>
                                    <p className='prior'>Priority</p>
                                </div>

                                <div className='table_body'>
                                    {/* 1 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='btn_list'>
                                                <button
                                                    type='button'
                                                    className='btn_confirm'
                                                >
                                                    confirm
                                                </button>
                                                <button
                                                    type='button'
                                                    className='btn_delete'
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 7 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 8 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 9 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 10 */ }
                                    <div className='table_wrap'>
                                        <div>
                                            <div className='date_time'>
                                                <p>
                                                    <span>21</span>.
                                                    <span>09</span>.
                                                    <span>15</span>
                                                </p>
                                                &nbsp;

                                                <p>
                                                    <span>01</span>:
                                                    <span>44</span>:
                                                    <span>37</span>
                                                </p>
                                            </div>

                                            <div className='alarm_des'>
                                                <p>Manual Event</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='more'>
                                                자세히
                                            </p>
                                            <p className='close'>
                                                닫기
                                            </p>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className='table_content'>
                                        <div className='cont_inner'>
                                            <div className='ecg'>
                                                <div
                                                    className='ecg_graph'
                                                >
                                                    <p>ECG</p>

                                                    <div>
                                                        <div
                                                            className='img_container'
                                                        >
                                                            <img
                                                                src='/H-Connect/img/graph/ECG.png'
                                                                alt='ecg그래프'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='bell'>
                                                    <div
                                                        className='bell_name'
                                                    >
                                                        <p>
                                                            HR. bpm
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='bell_num'
                                                    >
                                                        <div>
                                                            <p>
                                                                120
                                                            </p>
                                                            <p>
                                                                50
                                                            </p>
                                                        </div>

                                                        <p>216</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* pagenation */ }
                                    <div className='table_page'>
                                        <ul>
                                            <li>
                                                <a href=''>
                                                    &#60;&#60;
                                                </a>
                                            </li>
                                            <li>
                                                <a href=''>
                                                    &#60;
                                                </a>
                                            </li>
                                            <li className='active'>
                                                <a href=''>1.</a>
                                            </li>
                                            <li>
                                                <a href=''>2.</a>
                                            </li>
                                            <li>
                                                <a href=''>3.</a>
                                            </li>
                                            <li>
                                                <a href=''>4.</a>
                                            </li>
                                            <li>
                                                <a href=''>5.</a>
                                            </li>
                                            <li>
                                                <a href=''>6.</a>
                                            </li>
                                            <li>
                                                <a href=''>7.</a>
                                            </li>
                                            <li>
                                                <a href=''>8.</a>
                                            </li>
                                            <li>
                                                <a href=''>9.</a>
                                            </li>
                                            <li>
                                                <a href=''>10.</a>
                                            </li>
                                            <li>
                                                <a href=''>...</a>
                                            </li>
                                            <li>
                                                <a href=''>52.</a>
                                            </li>

                                            <li>
                                                <a href=''>></a>
                                            </li>
                                            <li>
                                                <a href=''>>></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

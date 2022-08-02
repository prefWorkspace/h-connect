const Lab = () => {
    return (
        <div>
            {/* lab 조회 목록 영역 */}
            <section className='section lab_list'>
                <div className='list_inner'>
                    <ul>
                        <li className='list on'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                        <li className='list'>
                            21.08.15
                            <span>10:35:25</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* lab 결과 표시 영역 */}
            <section className='section lab_result'>
                <div className='list_inner'>
                    <div className='title'>
                        <h3>김환자<span>(63 남)</span></h3>
                        <h3>21.06.30<span>18:20</span></h3>
                        <h3>Laboratory Tests Result</h3>
                    </div>

                    {/* chemi */}
                    <div className='chemi'>
                        <p>Chemistry</p>

                        <ul>
                            <li>
                                <div>
                                    <p>PH</p>
                                    <span>7.35 ~ 7.45</span>
                                </div>

                                <p>7.35</p>
                            </li>
                            <li>
                                <div>
                                    <p>PaCO2 (mmhg)</p>
                                    <span>38.00 ~ 42.00</span>
                                </div>

                                <p>38</p>
                            </li>
                            <li>
                                <div>
                                    <p>PaO2 (mmhg)</p>
                                    <span>60.00 ~ 100.00</span>
                                </div>

                                <p>90</p>
                            </li>
                            <li>
                                <div>
                                    <p>PCO2 (mmhg)</p>
                                    <span>41.00 ~ 51.00</span>
                                </div>

                                <p className='active'>39</p>
                            </li>
                            <li>
                                <div>
                                    <p>Sat O2.v (%)</p>
                                    <span>65.00 ~ 75.00</span>
                                </div>

                                <p>75</p>
                            </li>
                        </ul>
                    </div>

                    {/* hema */}
                    <div className='hema'>
                        <p>Hematology</p>

                        <ul>
                            <li>
                                <div>
                                    <p>WBC (x10^9 cell/L)</p>
                                    <span>4.00 ~ 12.00</span>
                                </div>

                                <p>6</p>
                            </li>
                            <li>
                                <div>
                                    <p>Hct (%)</p>
                                    <span>40.00 ~ 48.00</span>
                                </div>

                                <p className='active'>33</p>
                            </li>
                            <li>
                                <div>
                                    <p>Hb (g/dL)</p>
                                    <span>13.00 ~ 17.00</span>
                                </div>

                                <p className='active'>11</p>
                            </li>
                            <li>
                                <div>
                                    <p>Lymph (%)</p>
                                    <span>20.00 ~ 40.00</span>
                                </div>

                                <p className='active'>12</p>
                            </li>
                        </ul>
                    </div>

                    {/* infec */}
                    <div className='infec'>
                        <p>Infectious diseases</p>

                        <ul>
                            <li>
                                <div>
                                    <p>Procal (ng/ml)</p>
                                    <span>0.1 ~ 0.5</span>
                                </div>

                                <p className='pd_color'>Pending</p>
                            </li>
                        </ul>
                    </div>

                    {/* urine */}
                    <div className='urine'>
                        <p>Urine studies</p>

                        <ul>
                            <li>
                                <div>
                                    <p>Spec. grav</p>
                                    <span>1.003 ~ 1.030</span>
                                </div>

                                <p className='active'>1</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

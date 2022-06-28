const LabLayer = () => {
    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();
    const nodeRef = React.useRef(null);

    React.useEffect(() => {
        if (data.viewType !== 'default') {
            console.log(nodeRef.current.style.transform);
            if (data.transforms.lab === 'translate(0px, 0px)') {
                dispatch({
                    type: 'setLabTransform',
                    data: nodeRef.current.style.transform
                });
            }
            nodeRef.current.style.transform = 'translate(0px, 0px)';
        } else {
            nodeRef.current.style.transform = data.transforms.lab;
        }

    }, [data.viewType]);

    return (
        <ReactDraggable nodeRef={nodeRef} handle='.title' disabled={data.viewType !== 'default'}>
            <div ref={nodeRef} className='lab inner'>
                <div className='title'>
                    <p>
                        LAB 조회. 김환자 (63. 남). Patient ID -
                        Patient type
                    </p>

                    <div className='btn_list'>
                        <button type='button' className='btn_fold'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/fold.svg'
                                    alt='접는 아이콘'
                                />
                            </div>
                        </button>

                        <button type='button' className='btn_full'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/full.svg'
                                    alt='네모 아이콘'
                                />
                            </div>
                        </button>

                        <button type='button' className='btn_close'>
                            <div>
                                <img
                                    src='/H-Connect/img/icon/nurse/close.svg'
                                    alt='엑스 아이콘'
                                />
                            </div>
                        </button>
                    </div>
                </div>

                <div className='cont'>
                    <div className='title'>
                        <h2>
                            김환자 (63. 남). Patient ID -
                            Patient type
                        </h2>

                        <p>study list</p>
                    </div>

                    <div className='cont_wrap lab_wrap'>
                        <div className='list_wrap'>
                            <div className='list on'>
                                <p>21.08.15</p>
                                <p>10:35:25</p>
                            </div>

                            <div className='list'>
                                <p>21.08.15</p>
                                <p>10:35:25</p>
                            </div>

                            <div className='list'>
                                <p>21.08.15</p>
                                <p>10:35:25</p>
                            </div>

                            <div className='list'>
                                <p>21.08.15</p>
                                <p>10:35:25</p>
                            </div>
                        </div>

                        <div className='list_view'>
                            <div className='title'>
                                <h3>
                                    김환자<span>(63 남)</span>
                                </h3>
                                <h3>
                                    21.06.30<span>18:20</span>
                                </h3>
                                <h3>Laboratory Tests Result</h3>
                            </div>

                            {/* chemi */}
                            <div className='chemi'><p>Chemistry</p>
                                <ul>
                                    <li>
                                        <div><p>PH</p> <span>7.35 ~ 7.45</span></div>
                                        <p>7.35</p></li>
                                    <li>
                                        <div><p>PaCO2 (mmhg)</p> <span>38.00 ~ 42.00</span></div>
                                        <p>38</p></li>
                                    <li>
                                        <div><p>PaO2 (mmhg)</p> <span>60.00 ~ 100.00</span></div>
                                        <p>90</p></li>
                                    <li>
                                        <div><p>PCO2 (mmhg)</p> <span>41.00 ~ 51.00</span></div>
                                        {/* 이 수치가 div안에 span 보다 낮을 경우 addClass active */} <p
                                        className='active'>
                                        39</p></li>
                                </ul>
                            </div>

                            {/* hema */}
                            <div className='hema'><p>Hematology</p>
                                <ul>
                                    <li>
                                        <div><p> WBC (x10^9 cell/L) </p> <span>4.00 ~ 12.0</span></div>
                                        <p>6</p></li>
                                    <li>
                                        <div><p>Hct (%)</p> <span>40.00 ~ 48.00</span></div>
                                        <p className='active'>33</p></li>
                                    <li>
                                        <div><p>Hb (g/dL)</p> <span>13.00 ~ 17.00</span></div>
                                        <p className='active'>11</p></li>
                                    <li>
                                        <div><p>Lymph (%)</p> <span>20.00 ~ 40.00</span></div>
                                        <p className='active'>12</p></li>
                                </ul>
                            </div>

                            {/* infec */}
                            <div className='infec'><p>Infectious diseases</p>
                                <ul>
                                    <li>
                                        <div><p> Procal (ng/ml) </p> <span>0.1 ~ 0.5</span></div>
                                        <p className='pding'> Pending </p></li>
                                </ul>
                            </div>

                            {/* urine */}
                            <div className='urine'><p>Urine studies</p>
                                <ul>
                                    <li>
                                        <div><p>Spec. grav</p> <span>1.003 ~ 1.030</span></div>
                                        <p className='active'>1</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReactDraggable>
    );
};
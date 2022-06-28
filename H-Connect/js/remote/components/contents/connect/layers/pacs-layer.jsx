const PACSLayer = () => {
    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();
    const nodeRef = React.useRef(null);

    React.useEffect(() => {
        if (data.viewType !== 'default') {
            console.log(nodeRef.current.style.transform);
            if (data.transforms.pacs === 'translate(0px, 0px)') {
                dispatch({
                    type: 'setPACSTransform',
                    data: nodeRef.current.style.transform
                });
            }
            nodeRef.current.style.transform = 'translate(0px, 0px)';
        } else {
            nodeRef.current.style.transform = data.transforms.pacs;
        }

    }, [data.viewType]);

    return (
        <ReactDraggable nodeRef={nodeRef} handle='.title' disabled={data.viewType !== 'default'}>
            <div ref={nodeRef} className='pacs'>
                <div className='title'>
                    <p>
                        PACS. 김환자 (63. 남). Patient ID -
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
                    {/* pacs list */}
                    <div className='study_list'>
                        <div className='title'>
                            <h2>
                                김환자 (63.남). Patient ID -
                                Patient type
                            </h2>
                            <p>study list</p>
                        </div>

                        <div className='list'>
                            <div className='row'>
                                <p className='time'>
                                    21.08.15 10:35:25
                                </p>
                                <p>Wait</p>
                                <p>CR CHEST</p>
                                <p>CHEST</p>
                                <p>CR</p>

                                <div className='images'>
                                    <p>185 images</p>
                                    <div>
                                        <img
                                            src='/H-Connect/img/right_arrow.svg'
                                            alt='오른쪽 화살표'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <p className='time'>
                                    21.07.26 14:24:48
                                </p>
                                <p>Preliminary</p>
                                <p>CT Abdomen + Pelvis</p>
                                <p>Abdomen + Pelvis</p>
                                <p>CT / PR</p>

                                <div className='images'>
                                    <p>74 images</p>
                                    <div>
                                        <img
                                            src='/H-Connect/img/right_arrow.svg'
                                            alt='오른쪽 화살표'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <p className='time'>
                                    21.06.07 16:31:17
                                </p>
                                <p>Confirmed</p>
                                <p>US KIDNEY BOTH</p>
                                <p>OTHERS</p>
                                <p>US</p>

                                <div className='images'>
                                    <p>50 images</p>
                                    <div>
                                        <img
                                            src='/H-Connect/img/right_arrow.svg'
                                            alt='오른쪽 화살표'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <p className='time'>
                                    21.05.11 09:30:45
                                </p>
                                <p>Confirmed</p>
                                <p>CT CHEST</p>
                                <p>CHEST</p>
                                <p>CT / SC</p>

                                <div className='images'>
                                    <p>25 images</p>
                                    <div>
                                        <img
                                            src='/H-Connect/img/right_arrow.svg'
                                            alt='오른쪽 화살표'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* pacs view */}
                    <div className='pacs_view'>
                        <div className='list'>
                            <div>
                                <button
                                    type='button'
                                    className='back'
                                >
                                    <div>
                                        <img
                                            src='/H-Connect/img/right_arrow.svg'
                                            alt='오른쪽 화살표'
                                        />
                                    </div>
                                    List
                                </button>

                                <h3>
                                    <span>21.08.15</span>
                                    <span>10:35:25.</span>
                                    <span
                                    >CR
                                                        CHEST.CHEST.CR.</span
                                    >
                                    <span>185 imgages</span>
                                </h3>
                            </div>

                            <div className='view_inner'>
                                <div className='select_send'>
                                    <div className='select_inner'>
                                        <div>
                                            <div className='img_container'><img
                                                src='/H-Connect/img/doctor/pacs.jpg'
                                                alt='사진' /></div>
                                            <button type='button' className='delete'> X</button>
                                        </div>
                                        <div>
                                            <div className='img_container'><img
                                                src='/H-Connect/img/doctor/pacs.jpg'
                                                alt='사진' /></div>
                                            <button type='button' className='delete'> X</button>
                                        </div>
                                        <div>
                                            <div className='img_container'><img
                                                src='/H-Connect/img/doctor/pacs.jpg'
                                                alt='사진' /></div>
                                            <button type='button' className='delete'> X</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='btn_list'>
                                    <button type='button' className='send'> 대화창에 전송</button>
                                    <button type='button' className='full'>
                                        <div><img src='/H-Connect/img/icon/full.svg' alt='네모 아이콘' /></div>
                                        full screen
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 슬라이드 */}
                        <div className='slide'>
                            {/* 큰 사진 */}
                            <div className='swiper pacs_big'>
                                <div className='swiper-wrapper'>
                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 작은 사진 */}
                            <div className='swiper pacs_small'>
                                <div className='swiper-wrapper'>
                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>

                                    <div className='swiper-slide'>
                                        <img
                                            src='/H-Connect/img/doctor/pacs.jpg'
                                            alt='이미지'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* navi */}
                            <div className='control'>
                                <div
                                    className='swiper-button-next next'
                                ></div>
                                <div
                                    className='swiper-button-prev prev'
                                ></div>

                                <div className='swiper-scrollbar'>
                                    <div
                                        className='swiper-scrollbar-drag'
                                    >
                                        <div
                                            className='swiper-pagination'
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    type='button'
                                    className='last'
                                    onClick='test()'
                                ></button>
                                {/* <div class="last" onclick="test()"></div> */}
                                <div className='first'></div>
                                {/*
                                                <div class="swiper-button-next last"></div>
                                                <div class="swiper-button-prev first"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReactDraggable>
    );
};
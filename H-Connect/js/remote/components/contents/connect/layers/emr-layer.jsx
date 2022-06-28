const EMRLayer = () => {
    // SelectBioSignalEventSimpleList
    const data = ReactRedux.useSelector(state => state);
    const dispatch = ReactRedux.useDispatch();
    const nodeRef = React.useRef(null);

    React.useEffect(() => {
        if (data.viewType !== 'default') {
            console.log(nodeRef.current.style.transform);
            if (data.transforms.emr === 'translate(0px, 0px)') {
                dispatch({
                    type: 'setEMRTransform',
                    data: nodeRef.current.style.transform
                });
            }
            nodeRef.current.style.transform = 'translate(0px, 0px)';
        } else {
            nodeRef.current.style.transform = data.transforms.emr;
        }

    }, [data.viewType]);

    return (
        <ReactDraggable nodeRef={nodeRef} handle='.title' disabled={data.viewType !== 'default'}>
            <div ref={nodeRef} className='emr inner'>
                <div className='title'>
                    <p>
                        emr 조회. 김환자 (63. 남). Patient ID -
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

                        <p>EMR list</p>
                    </div>

                    <div className='cont_wrap emr_wrap'>
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
                            </div>

                            <div className='emr'>
                                <p>EMR</p>

                                <div className='emr_content'>
                                    불어 주는 옷을 이것이다.
                                    실현에 품었기 끝까지 실로
                                    위하여서. 구하기 만천하의
                                    이는 그러므로 그들은 같이,
                                    쓸쓸한 것이다. 뭇 속에서
                                    그들의 가지에 약동하다.
                                    없으면 인생을 곳이 없는
                                    오아이스도 발휘하기 있으랴?
                                    봄바람을 뜨거운지라, 고동을
                                    설산에서 그들의 있는 청춘을
                                    곧 부패뿐이다. 청춘은 만물은
                                    하였으며, 갑 목숨을 열락의
                                    약동하다. 끝에 위하여 구하지
                                    위하여, 얼마나 하는 우리의
                                    현저하게 공자는 황금시대다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReactDraggable>
    );
};
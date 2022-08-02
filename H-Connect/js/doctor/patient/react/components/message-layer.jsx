const MessageLayer = () => {
    return (
        <div className='pop nurse_view'>
            <div className='wrap_inner'>
                <div className='title'>
                    <div>
                        <p>강심장 교수님</p>

                        <div className='btn_list'>
                            <div className='btn_fold'>
                                <img
                                    src='/H-Connect/img/icon/nurse/fold.svg'
                                    alt='접는 아이콘'
                                />
                            </div>

                            <div className='btn_full'>
                                <img
                                    src='/H-Connect/img/icon/nurse/full.svg'
                                    alt='풀화면 아이콘'
                                />
                            </div>

                            <div className='btn_close'>
                                <img
                                    src='/H-Connect/img/icon/nurse/close.svg'
                                    alt='닫는 아이콘'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='search_container'>
                    <div>
                        <input
                            type='text'
                            placeholder='메세지 내용을 입력해주세요'
                        />

                        <button type='button' className='btn_search'>
                            <div>
                                <img
                                    src='/H-Connect/img/header/search.svg'
                                    alt='검색표시'
                                />
                            </div>
                        </button>
                    </div>

                    <div className='sort'>
                        <img
                            src='/H-Connect/img/icon/nurse/sorting.svg'
                            alt='정렬아이콘'
                        />
                    </div>

                    {/* 메세지 정렬 팝업 */}
                    <div className='pop chat_sort'>
                        <div className='wrap_inner'>
                            <p>전체 메세지 보기</p>
                            <p>진료 중 메세지 보기</p>
                            <p>진료 제외 메세지 보기</p>
                        </div>
                    </div>
                </div>

                <div className='chat_container'>
                    <div className='timeLine'>
                        <a className='first' href='#first_taget'></a>
                        <a className='second' href='#second_taget'></a>
                        <a className='third' href='#third_taget'></a>
                        <a className='fourth' href='#fourth_taget'></a>
                        <a className='fifth' href='#fifth_taget'></a>
                    </div>

                    <div className='chat_inner'>
                        {/* 상대방이 보낸 매세지 chat_you */}
                        <div className='chat_you' id='second_taget'>
                            <p>김심장 교수님</p>

                            <div className='bubble'>
                                <p>박입원님 병상연결 부탁드립니다.</p>
                            </div>

                            <small>
                                <span>21.09.15</span>

                                <span>09:48:43</span>
                            </small>
                        </div>

                        {/* 내가 보낸 메시지 chat_me */}
                        <div className='chat_me' id='fifth_taget'>
                            <div>
                                <div className='bubble'>
                                    <p>네 준비하겠습니다.</p>
                                </div>

                                <small>
                                    <span>21.09.15</span>

                                    <span>09:48:43</span>
                                </small>
                            </div>
                        </div>

                        <div className='chat_me'>
                            <div>
                                <div className='bubble'>
                                    <p>교수님 지금 연결하겠습니다.</p>
                                </div>

                                <small>
                                    <span>21.09.15</span>

                                    <span>09:48:43</span>
                                </small>
                            </div>
                        </div>

                        {/* 진료 시작 */}
                        <div className='start_clinic' id='fourth_taget'>
                            <p>박입원님. 진료가 시작되었습니다.</p>
                            <p>
                                <span>21.09.15</span>

                                <span>09:48:43</span>
                            </p>
                        </div>

                        {/* 상대방이 보낸 매세지 chat_you */}
                        <div className='chat_you'>
                            <p>김심장 교수님</p>

                            <div className='bubble'>
                                <p>환자 OOO 수치가 어떤가요?</p>
                            </div>

                            <small>
                                <span>21.09.15</span>

                                <span>09:48:43</span>
                            </small>
                        </div>

                        {/* 내가 보낸 메시지 chat_me */}
                        <div className='chat_me' id='first_taget'>
                            <div>
                                <div className='bubble'>
                                    <p>5분전에 쟀을때 ㅁㅁㅁ였습니다.</p>
                                </div>

                                <small>
                                    <span>21.09.15</span>

                                    <span>09:48:43</span>
                                </small>
                            </div>
                        </div>

                        {/* 진료 종료 */}
                        <div className='end_clinic' id='third_taget'>
                            <p>박입원님. 진료가 종료되었습니다.</p>
                            <p>
                                <span>21.09.15</span>

                                <span>09:48:43</span>
                            </p>
                        </div>

                        <div className='chat_me'>
                            <div>
                                <div className='bubble'>
                                    <p>고생하셨습니다.</p>
                                </div>

                                <small>
                                    <span>21.09.15</span>

                                    <span>09:48:43</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='chat_window'>
                    <textarea placeholder='메세지 입력'></textarea>
                    <button type='button' className='btn_send'>전송</button>
                </div>
            </div>
        </div>
    );
};

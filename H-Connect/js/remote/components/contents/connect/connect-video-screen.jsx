const ConnectVideoScreen = () => {
    /* 화상 화면 */
    return (
        <section className='section left cam'>
            <div className='cam_inner'>
                <div id='local-video' className='my_cam'>
                    {/* 캠 켰을때 */}
                    <div className='cam_parti'>
                        <img
                            src='/H-Connect/img/emergency/mycam.jpg'
                            alt='참여자 사진'
                        />
                    </div>

                    {/* 캠 껐을때 */}
                    <div className='nocam_parti'>
                        <div>
                            <img
                                src='/H-Connect/img/emergency/profile.svg'
                                alt='프로필 아이콘'
                            />
                        </div>
                    </div>

                    <div className='name my'>
                        <p>내 화면</p>
                    </div>
                </div>

                <div className='participant'>
                    {/* 캠 켰을때 */}
                    <div className='cam_parti'>
                        <img
                            src='/H-Connect/img/emergency/mycam.jpg'
                            alt='참여자 사진'
                        />
                    </div>

                    {/* 캠 껐을때 */}
                    <div className='nocam_parti'>
                        <div>
                            <img
                                src='/H-Connect/img/emergency/profile.svg'
                                alt='프로필 아이콘'
                            />
                        </div>
                    </div>

                    <p className='name'>김한림 교수</p>
                </div>

                <div className='participant'>
                    {/* 캠 켰을때 */}
                    <div className='cam_parti'>
                        <img
                            src='/H-Connect/img/emergency/mycam.jpg'
                            alt='참여자 사진'
                        />
                    </div>

                    {/* 캠 껐을때 */}
                    <div className='nocam_parti'>
                        <div>
                            <img
                                src='/H-Connect/img/emergency/profile.svg'
                                alt='프로필 아이콘'
                            />
                        </div>
                    </div>

                    <p className='name'>김한림 교수</p>
                </div>

                <div className='participant'>
                    {/* 캠 켰을때 */}
                    <div className='cam_parti' style={{ display: 'none' }}>
                        <img
                            src='/H-Connect/img/emergency/mycam.jpg'
                            alt='참여자 사진'
                        />
                    </div>

                    {/* 캠 껐을때 */}
                    <div className='nocam_parti' style={{ display: 'block' }}>
                        <div>
                            <img
                                src='/H-Connect/img/emergency/profile.svg'
                                alt='프로필 아이콘'
                            />
                        </div>
                    </div>

                    <p className='name'>김한림 교수</p>
                </div>

                <div className='participant'>
                    {/* 캠 켰을때 */}
                    <div className='cam_parti'>
                        <img
                            src='/H-Connect/img/emergency/mycam.jpg'
                            alt='참여자 사진'
                        />
                    </div>

                    {/* 캠 껐을때 */}
                    <div className='nocam_parti'>
                        <div>
                            <img
                                src='/H-Connect/img/emergency/profile.svg'
                                alt='프로필 아이콘'
                            />
                        </div>
                    </div>

                    <p className='name'>김한림 교수</p>
                </div>
            </div>
        </section>
    );
};
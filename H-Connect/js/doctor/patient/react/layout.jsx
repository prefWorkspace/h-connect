const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />

            <div
                id='wrap_content'
                className='doctor monitoring_patient doctor_patient'
            >
                <nav className='nav' id='nav'>
                    <ul className='main_depth gnb'>
                        <li className='gnb_list'>
                            <a className='link' href='index.html'> H-Works </a>
                        </li>

                        <li className='gnb_list'>
                            <a className='link' href='remote.html'> 원격협진 </a>
                        </li>

                        <li className='gnb_list active'>
                            <a className='link' href='monitoring.html'>
                                모니터링
                            </a>
                        </li>

                        <li className='gnb_list'>
                            <a className='link' href='screening.html'> 선별진료 </a>
                        </li>

                        <li className='gnb_list'>
                            <a className='link' href='message.html'> 메세지 </a>
                        </li>
                    </ul>
                </nav>

                <div className='wrap_inner'>
                    <LeftMenu />

                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export function coopRealTimeRemoteSectionTmpl() {
    // 실시간 원격 협진
    return `
    <div class="surgery_view rt_view">
        <div class="type">
            <label for="real" class="common_radio">
                <input type="radio" name="remote" id="real" class="radio" checked>
                <span>실시간 원격 협진</span>
            </label>

            <label for="multi" class="common_radio">
                <input type="radio" name="remote" id="multi" class="radio">
                <span>다학제 통합 진료</span>
            </label>
        </div>

        <div class="rt_time">
            <h2>협진 시간 선택</h2>

            <div class="1123">
                <div class="date">
                    <p>협진일자</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>월</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>일</p>
                    </div>
                </div>

                <div class="date_time">
                    <div>
                        <p>시작시간</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>시</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>분</p>
                        </div>
                    </div>

                    <div>
                        <p>종료시간</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>시</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>분</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export function coopOpinionSectionTmpl() {
    // 소견 요청 협진
    return `
    <div class="surgery_view ro_view">
        <h2>협진 시간 선택</h2>

        <div>
            <div class="date">
                <div>
                    <p>소견요청 협진 시작일</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>월</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>일</p>
                    </div>
                </div>

                <div>
                    <p>소견요청 협진 마감일</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>월</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>일</p>
                    </div>
                </div>
            </div>

            <div class="date_time">
                <div>
                    <p>시작시간</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>시</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>분</p>
                    </div>
                </div>

                <div>
                    <p>마감시간</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>시</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>분</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export function coopRequestScheduleSectionTmpl() {
    // 협진 일정 요청
    return `
    <div class="surgery_view t_view">
        <h2>일정 요청 마감 일자</h2>

        <div class="type">
            <div class="date">
                <div>
                    <p>마감일자</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>월</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>일</p>
                    </div>
                </div>
            </div>

            <div class="date_time">
                <div>
                    <p>마감시간</p>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>시</p>
                    </div>

                    <div class="input_wrap">
                        <input type="text" placeholder="00">
                        <p>분</p>
                    </div>
                </div>
            </div>
        </div>

        <h2>협진 가능시간 선택</h2>

        <div class="ut_wrap">
            <div class="up_box">
                <button type="button" class="btn_delete_time">
                    시간삭제
                    <img src="/H-Connect/img/icon/delete.svg" alt="시간삭제 버튼아이콘" />
                </button>

                <div class="up_time">
                    <div class="date">
                        <p>협진일자</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>월</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>일</p>
                        </div>
                    </div>

                    <div class="date_time">
                        <div>
                            <p>시작시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>

                        <div>
                            <p>종료시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>
                    </div>

                    <!-- 중복시 보여주세요 -->
                    <span class="repeat">※ 외래진료 일정과 중복됩니다.</span>
                </div>
            </div>

            <div class="up_box">
                <button type="button" class="btn_delete_time">
                    시간삭제
                    <img src="/H-Connect/img/icon/delete.svg" alt="시간삭제 버튼아이콘" />
                </button>

                <div class="up_time">
                    <div class="date">
                        <p>협진일자</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>월</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>일</p>
                        </div>
                    </div>

                    <div class="date_time">
                        <div>
                            <p>시작시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>

                        <div>
                            <p>종료시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>
                    </div>

                    <!-- 중복시 보여주세요 -->
                    <span class="repeat">※ 외래진료 일정과 중복됩니다.</span>
                </div>
            </div>

            <div class="up_box">
                <button type="button" class="btn_delete_time">
                    시간삭제
                    <img src="/H-Connect/img/icon/delete.svg" alt="시간삭제 버튼아이콘" />
                </button>

                <div class="up_time">
                    <div class="date">
                        <p>협진일자</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>월</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>일</p>
                        </div>
                    </div>

                    <div class="date_time">
                        <div>
                            <p>시작시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>

                        <div>
                            <p>종료시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>
                    </div>

                    <!-- 중복시 보여주세요 -->
                    <span class="repeat">※ 외래진료 일정과 중복됩니다.</span>
                </div>
            </div>

            <div class="up_box">
                <button type="button" class="btn_delete_time">
                    시간삭제
                    <img src="/H-Connect/img/icon/delete.svg" alt="시간삭제 버튼아이콘" />
                </button>

                <div class="up_time">
                    <div class="date">
                        <p>협진일자</p>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>월</p>
                        </div>

                        <div class="input_wrap">
                            <input type="text" placeholder="00">
                            <p>일</p>
                        </div>
                    </div>

                    <div class="date_time">
                        <div>
                            <p>시작시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>

                        <div>
                            <p>종료시간</p>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>시</p>
                            </div>

                            <div class="input_wrap">
                                <input type="text" placeholder="00">
                                <p>분</p>
                            </div>
                        </div>
                    </div>

                    <!-- 중복시 보여주세요 -->
                    <span class="repeat">※ 외래진료 일정과 중복됩니다.</span>
                </div>
            </div>

            <button type="button" class="btn_tadd">+ 시간추가</button>
        </div>
    </div>
    `;
}

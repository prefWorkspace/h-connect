export function coopRealTimeRemoteSectionTmpl() {
    // 실시간 원격 협진
    return `
    <div class="surgery_view rt_view" style="display:block;">
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
    <div class="surgery_view ro_view" style="display:block;">
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
    <div class="surgery_view t_view" style="display:block;">
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
export function coopSearchPatientBlock(_data) {
    const {
        measurementCode,
        name,
        age,
        gender,
        patientCode,
        ward,
        sickRoom,
        sickBed,
    } = _data ?? {};
    return `
    <p class='search-patient-list-item' data-name='${name}' data-patientCode='${patientCode}' data-measurementCode='${measurementCode}'>
        <span>${name}</span>
        (<span>${age}</span>.<span>${gender === 1 ? '남자' : '여자'}</span>).
        <span>${patientCode}</span>.
        <span>${ward ? ward : '-'}</span>.
        <span>${sickRoom ? sickRoom : '-'}</span>호실.
        <span>${sickBed ? sickBed : '-'}</span>병상
    </p>
    `;
}
export function coopContentCaseBlockTmpl() {
    // 협진 내용 블록
    return `
      <div class='content-caseblock'>
        <button class="btn_case_delete">
            Case 삭제
            <div>
                <img src="/H-Connect/img/icon/delete.svg" alt="케이스삭제 버튼 아이콘" />
            </div>
        </button>

        <div class='content-caseform'>
            <div class="case">
                <p>Case 명.</p>

                <div class="text_wrap">
                    <textarea placeholder="case 명을 작성해주세요"></textarea>
                </div>

                <!-- <input type="text" placeholder="case 명을 작성해주세요"> -->
            </div>

            <div class="patient_select">
                <p>환자 선택</p>

                <!-- 1. 검색 결과가 없을시 placehoder="찾을 수 없습니다" 로 표시-->
                <!-- 2. 검색 결과가 없을시 not_find 클래스를 붙여주세요-->
                <div class="search_container">
                    <input type="text" class='input_search' placeholder="환자명 혹은 환자번호를 입력해주세요.">

                    <button type="button" class="btn_search">
                        <img src="/H-Connect/img/header/search.svg" alt="검색표시">
                    </button>

                    <!-- 환자 검색 -->
                    <div class="pop remote_search">
                        <!-- 환자 리스트 -->
                        <div class="wrap_inner"></div>
                    </div>
                </div>

                <span class='patient-select-name'>환자명</span>
            </div>

            <div class="contents">
                <p>협진 내용</p>

                <div class="text_wrap">
                    <textarea placeholder="협진 내용을 입력해주세요"></textarea>
                </div>
            </div>
        </div>
      </div>
    `;
}

export function coopContentSectionTmpl() {
    // 협진 내용, 협진 참여자 정보
    return `
  <div class="content" style='display:block;'>
      <h2>협진 내용</h2>

      <div class='content-case-wrap'>
        ${coopContentCaseBlockTmpl()}
      </div>

      <button type="button" class="btn_add">+ Case 추가</button>

      <div class="participant">
          <div class="title">
              <h2>협진 참여자 정보</h2>
              <p>참여 요청 인원. <span>0명</span></p>
          </div>

          <div class="member">
              <div class="mem">
                  <p>김협진 교수님</p>
                  <button type="button" class="btn_del">
                      <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                  </button>
              </div>

              <div class="mem">
                  <p>다섯 글자자</p>
                  <button type="button" class="btn_del">
                      <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                  </button>
              </div>

              <div class="mem">
                  <p>다섯글자자</p>
                  <button type="button" class="btn_del">
                      <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                  </button>
              </div>

              <div class="mem">
                  <p>네 글자자</p>
                  <button type="button" class="btn_del">
                      <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                  </button>
              </div>

              <div class="mem">
                  <p>김협진 교수님</p>
                  <button type="button" class="btn_del">
                      <img src="/H-Connect/img/icon/delete.svg" alt="의료진삭제버튼아이콘" />
                  </button>
              </div>
          </div>
      </div>
  </div>
  `;
}

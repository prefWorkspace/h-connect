const { DoctorSearchModule } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/doctorSearch/doctorSearch.js'
    )
);
const { DoctorListModule } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/doctorList/doctorList.js'
    )
);
const { BookmarkModule } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/bookmark/bookmark.js'
    )
);
const { ChoiceDoctorModule } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/choiceDoctor/choiceDoctor.js'
    )
);

/* usage

  const doctorSelectorOptions = {
      choiceDoctor: {
          use: true,
          target: {
              container: '.select_list',
          },
          afterAddChoiceDoctor: () => {},
          afterRemoveChoiceDoctor: () => {},
      },
      doctorSearch: {
          use: true,
          target: {
              container: '.select_doctor .search_container',
              input: '.select_doctor .search_container input',
              searchBtn: '.select_doctor .search_container button.btn_search',
          },
          afterSearchDoctor: () => {},
      },
      doctorList: {
          use: true,
          target: {
              container: '.doctor_list .list_inner',
          },
          departmentRender: true,
      },
      bookmark: {
          use: true,
          tab: {
              target: {
                  container: '.favorite_list .group .group_list_inner',
                  nextBtn: '.favorite_list .group button.btn_next',
                  addBtn: '.favorite_list .group button.btn_add',
                  deleteBtn: '.favorite_list button.btn_del',
              },
          },
          list: {
              target: {
                  container: '.favorite_list .group_container',
              },
              allCheckRender: true,
          },
          popup: {
              target: {
                  container: '.bookmark_popup_wrap',
              },
          },
      },
  };

  const doctorSelectorModule = new DoctorSelector(doctorSelectorOptions);
 */

export class DoctorSelector {
    constructor(_initOptions) {
        this.options = _initOptions;
        this.choiceDoctorSettingInit(_initOptions);
        this.doctorSearchSettingInit(_initOptions);
        this.doctorListSettingInit(_initOptions);
        this.bookmarkSettingInit(_initOptions);

        this.shareModule();
    }
    choiceDoctorSettingInit(_initOptions) {
        if (!_initOptions?.choiceDoctor?.use === true) return;
        this.choiceDoctorModule = new ChoiceDoctorModule(_initOptions);
    }
    doctorSearchSettingInit(_initOptions) {
        if (!_initOptions?.doctorSearch?.use === true) return;
        this.doctorSearchModule = new DoctorSearchModule(_initOptions);
    }
    doctorListSettingInit(_initOptions) {
        if (!_initOptions?.doctorList?.use === true) return;
        this.doctorListModule = new DoctorListModule(_initOptions);
    }
    bookmarkSettingInit(_initOptions) {
        if (!_initOptions?.bookmark?.use === true) return;
        this.bookmarkModule = new BookmarkModule(_initOptions);
    }

    shareModule() {
        const { choiceDoctor, doctorSearch, doctorList, bookmark } =
            this.options ?? {};
        if (choiceDoctor?.use === true) {
            this.choiceDoctorModule.shareModule(this);
        }
        if (doctorSearch?.use === true) {
            this.doctorSearchModule.shareModule(this);
        }
        if (doctorList?.use === true) {
            this.doctorListModule.shareModule(this);
        }
        if (bookmark?.use === true) {
            this.bookmarkModule.shareModule(this);
        }
    }
}

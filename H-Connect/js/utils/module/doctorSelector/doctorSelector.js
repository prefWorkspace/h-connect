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
export class DoctorSelector {
    constructor(_initOptions) {
        this.options = _initOptions;
        const { choiceDoctor, doctorSearch, doctorList, bookmark } =
            this.options ?? {};
        this.choiceDoctorSettingInit(choiceDoctor);
        this.doctorSearchSettingInit(doctorSearch);
        this.doctorListSettingInit(doctorList);
        this.bookmarkSettingInit(bookmark);
    }
    choiceDoctorSettingInit(_choiceDoctorOptions) {
        if (!_choiceDoctorOptions?.use) return;
        this.choiceDoctorModule = new ChoiceDoctorModule(_choiceDoctorOptions);
    }
    doctorSearchSettingInit(_doctorSearchOptions) {
        if (!_doctorSearchOptions?.use) return;
        this.doctorSearchModule = new DoctorSearchModule(_doctorSearchOptions);
    }
    doctorListSettingInit(_doctorListOptions) {
        if (!_doctorListOptions?.use) return;
        this.doctorListModule = new DoctorListModule(_doctorListOptions);
    }
    bookmarkSettingInit(_bookmarkOptions) {
        if (!_bookmarkOptions?.use) return;
        this.bookmarkModule = new BookmarkModule(_bookmarkOptions);
    }
}

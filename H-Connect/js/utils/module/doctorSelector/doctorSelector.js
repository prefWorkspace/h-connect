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
export class DoctorSelector {
    constructor(_initOptions) {
        this.options = _initOptions;
        const { doctorSearch, doctorList, bookmark } = this.options ?? {};
        this.doctorSearchSetting(doctorSearch);
        this.doctorListSetting(doctorList);
        this.bookmarkSetting(bookmark);
    }

    doctorSearchSetting(_doctorSearchOptions) {
        this.doctorSearchModule = new DoctorSearchModule(_doctorSearchOptions);
    }
    doctorListSetting(_doctorListOptions) {
        this.doctorListModule = new DoctorListModule(_doctorListOptions);
    }
    bookmarkSetting(_bookmarkOptions) {
        this.bookmarkModule = new BookmarkModule(_bookmarkOptions);
    }
}

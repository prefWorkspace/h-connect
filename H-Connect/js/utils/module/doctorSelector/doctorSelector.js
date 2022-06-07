const { DoctorSearch } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/doctorSearch/doctorSearch.js'
    )
);
const { DoctorList } = await import(
    importVersion(
        '/H-Connect/js/utils/module/doctorSelector/doctorList/doctorList.js'
    )
);
export class DoctorSelector {
    constructor(_initOptions) {
        this.options = _initOptions;
        const { doctorSearch, doctorList } = this.options ?? {};
        this.doctorSearchSetting(doctorSearch);
        this.doctorListSetting(doctorList);
    }

    doctorSearchSetting(_doctorSearchOptions) {
        this.doctorSearchModule = new DoctorSearch(_doctorSearchOptions);
    }
    doctorListSetting(_doctorListOptions) {
        this.doctorListModule = new DoctorList(_doctorListOptions);
    }
}

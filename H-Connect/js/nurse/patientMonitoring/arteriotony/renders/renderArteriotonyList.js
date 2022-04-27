const { arteriotonyListItemTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/arteriotonyTmpl.js'
    )
);

const { selectBloodPressurePage } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/bloodPressureAPI.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const { CreatePagination } = await import(
    importVersion('/H-Connect/js/utils/module/pagination/pagination.js')
);

const arteriotonyListPagination = new CreatePagination({
    API: selectBloodPressurePage,
    target: {
        listWrap: '#wrap_content.arteriotony .table_body',
        pagination: '#wrap_content.arteriotony .table_page',
    },
    templates: {
        loading: true,
        error: true,
        listItem: arteriotonyListItemTmpl,
    },
    link: {
        keepParams: ['measurement_code'],
    },
});

'use strict';

const { pacsListHeaderTemplates, pacsListContentTemplates } =
    await import(
        importVersion(
            '/H-Connect/js/doctor/pacs/templates/pacsListTemplates.js'
        )
    );

const { errorText } = await import(
    importVersion('/H-Connect/js/common/text/validationText.js')
);

export function pacsListRender(list) {
    let html = '';

    if (!list || list.length === 0) {
        html = errorText();
        $('section.section.pacs').html(html);
        return;
    }

    html += pacsListHeaderTemplates();

    html += '<div class="list">';
    for (let inx = 0; inx < list.length; inx++) {
        console.log('list[inx]===');
        console.log(list[inx]);

        html += pacsListContentTemplates(list[inx]);
    }
    html += '</div>';

    $('section.section.pacs').html(html);
}

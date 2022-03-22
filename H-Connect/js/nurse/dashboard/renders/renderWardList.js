// jquery dom
const $ward_selectBox_el = $('.nurse.dashboard .taget_select .select_ward');
const $ward_selectBox_label_el = $(
  '.nurse.dashboard .taget_select .select_ward .ward_label'
);
const $ward_option_el = $(
  '.nurse.dashboard .taget_select .select_ward .ward_option'
);

const wardSelect = (item) => {
  $ward_selectBox_el.removeClass('active');
  $ward_selectBox_label_el.html(item.text());
};

if (Array.isArray($ward_option_el)) {
  console.log(1);
} else {
  console.log(2);
}

$ward_selectBox_label_el.on('click', () => {
  if ($ward_selectBox_el.hasClass('active')) {
    $ward_selectBox_el.removeClass('active');
  } else {
    $ward_selectBox_el.addClass('active');
  }
});

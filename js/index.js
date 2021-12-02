// 체크박스 전체선택
$(document).ready(function(){
    $('#check1').click(function(){
        if($('#check1').is(":checked")) $("input[name= doctor]").prop("checked", true);
        else $("input[name = doctor]").prop("checkd", false);
    });

    $("input[name = doctor]").click(function(){
        var total = $("input[name = doctor]").length;
        var checked = $("input[name = doctor]:checked").length;

        if(total != checked) $("#check1").prop("checked", false);
        else $("#check1").prop("checked", true);
    });
})
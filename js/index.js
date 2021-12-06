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

    // 간호사 대시보드
    // 1301호실
    $('#ward_1301').click(function(){
        if($('#ward_1301').is(":checked")) $("input[name= patient_no]").prop("checked", true);
        else $("input[name = patient_no]").prop("checkd", false);
    });

    $("input[name = patient_no]").click(function(){
        var total = $("input[name = patient_no]").length;
        var checked = $("input[name = patient_no]:checked").length;

        if(total != checked) $("#ward_1301").prop("checked", false);
        else $("#ward_1301").prop("checked", true);
    });

    // 1302호실
    $('#ward_1302').click(function(){
        if($('#ward_1302').is(":checked")) $("input[name= patient_no2]").prop("checked", true);
        else $("input[name = patient_no2]").prop("checkd", false);
    });

    $("input[name = patient_no2]").click(function(){
        var total = $("input[name = patient_no2]").length;
        var checked = $("input[name = patient_no2]:checked").length;

        if(total != checked) $("#ward_1302").prop("checked", false);
        else $("#ward_1302").prop("checked", true);
    });
        
    // 1303호실
    $('#ward_1303').click(function(){
        if($('#ward_1303').is(":checked")) $("input[name= patient_no3]").prop("checked", true);
        else $("input[name = patient_no3]").prop("checkd", false);
    });

    $("input[name = patient_no3]").click(function(){
        var total = $("input[name = patient_no3]").length;
        var checked = $("input[name = patient_no3]:checked").length;

        if(total != checked) $("#ward_1303").prop("checked", false);
        else $("#ward_1303").prop("checked", true);
    });

    // 1304호실
    $('#ward_1304').click(function(){
        if($('#ward_1304').is(":checked")) $("input[name= patient_no4]").prop("checked", true);
        else $("input[name = patient_no4]").prop("checkd", false);
    });

    $("input[name = patient_no4]").click(function(){
        var total = $("input[name = patient_no4]").length;
        var checked = $("input[name = patient_no4]:checked").length;

        if(total != checked) $("#ward_1304").prop("checked", false);
        else $("#ward_1304").prop("checked", true);
    });

    // 1305호실
    $('#ward_1305').click(function(){
        if($('#ward_1305').is(":checked")) $("input[name= patient_no5]").prop("checked", true);
        else $("input[name = patient_no5]").prop("checkd", false);
    });

    $("input[name = patient_no5]").click(function(){
        var total = $("input[name = patient_no5]").length;
        var checked = $("input[name = patient_no5]:checked").length;

        if(total != checked) $("#ward_1305").prop("checked", false);
        else $("#ward_1305").prop("checked", true);
    });

    // 1306호실
    $('#ward_1306').click(function(){
        if($('#ward_1306').is(":checked")) $("input[name= patient_no6]").prop("checked", true);
        else $("input[name = patient_no6]").prop("checkd", false);
    });

    $("input[name = patient_no6]").click(function(){
        var total = $("input[name = patient_no6]").length;
        var checked = $("input[name = patient_no6]:checked").length;

        if(total != checked) $("#ward_1306").prop("checked", false);
        else $("#ward_1306").prop("checked", true);
    });
        
    // 1307호실
    $('#ward_1307').click(function(){
        if($('#ward_1307').is(":checked")) $("input[name= patient_no7]").prop("checked", true);
        else $("input[name = patient_no7]").prop("checkd", false);
    });

    $("input[name = patient_no7]").click(function(){
        var total = $("input[name = patient_no7]").length;
        var checked = $("input[name = patient_no7]:checked").length;

        if(total != checked) $("#ward_1307").prop("checked", false);
        else $("#ward_1307").prop("checked", true);
    });

    // 1308호실
    $('#ward_1308').click(function(){
        if($('#ward_1308').is(":checked")) $("input[name= patient_no8]").prop("checked", true);
        else $("input[name = patient_no8]").prop("checkd", false);
    });

    $("input[name = patient_no8]").click(function(){
        var total = $("input[name = patient_no8]").length;
        var checked = $("input[name = patient_no8]:checked").length;

        if(total != checked) $("#ward_1308").prop("checked", false);
        else $("#ward_1308").prop("checked", true);
    });

    // 1309호실
    $('#ward_1309').click(function(){
        if($('#ward_1309').is(":checked")) $("input[name= patient_no9]").prop("checked", true);
        else $("input[name = patient_no9]").prop("checkd", false);
    });

    $("input[name = patient_no9]").click(function(){
        var total = $("input[name = patient_no9]").length;
        var checked = $("input[name = patient_no9]:checked").length;

        if(total != checked) $("#ward_1309").prop("checked", false);
        else $("#ward_1309").prop("checked", true);
    });

    // 1310호실
    $('#ward_1310').click(function(){
        if($('#ward_1310').is(":checked")) $("input[name= patient_no10]").prop("checked", true);
        else $("input[name = patient_no10]").prop("checkd", false);
    });

    $("input[name = patient_no10]").click(function(){
        var total = $("input[name = patient_no10]").length;
        var checked = $("input[name = patient_no10]:checked").length;

        if(total != checked) $("#ward_1310").prop("checked", false);
        else $("#ward_1310").prop("checked", true);
    });
        
    // 1311호실
    $('#ward_1311').click(function(){
        if($('#ward_1311').is(":checked")) $("input[name= patient_no11]").prop("checked", true);
        else $("input[name = patient_no11]").prop("checkd", false);
    });

    $("input[name = patient_no11]").click(function(){
        var total = $("input[name = patient_no11]").length;
        var checked = $("input[name = patient_no11]:checked").length;

        if(total != checked) $("#ward_1311").prop("checked", false);
        else $("#ward_1311").prop("checked", true);
    });

    //아코디언
    $(".table_wrap").click(function() {
        $(this).next(".table_content").stop().slideToggle(300);
        $(this).toggleClass('on').siblings().removeClass('on');
        $(this).next(".table_content").siblings(".table_content").slideUp(300);
    });

})
//login to the system
$('body').on('click', '#loginBtn_log', function() {

    var username=document.getElementById("username_log").value;
    var password=document.getElementById("password_log").value;
    //alert(username+" "+password);


    if(username===""||password===""){
        swal("خطأ!", "قم بتعبئة الحقول الفارغة!", "error");
    }
    else{
        var data="username="+username+"&password="+password+"&todo=login";
        //console.log(data);
        $.ajax({
            type: "POST",
            url: '../server/admin.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var result = JSON.parse(data);
                //my_type=result.type;
                console.log(result);
                //alert(data);
//                    var result = $.parseJSON(data);
                // data is ur summary
//                        $('#Edit').html(data);
                if(result!=="ERROR") {
                    swal({
                        title: "تم تسجيل الدخول بنجاح",
                        type: "success",
                        timer: 2000
                    });


                    localStorage.setItem("username",username);
                    localStorage.setItem("user_id",result.id);


                    setTimeout(function(){window.location="index.html#/"},2000);
                }else{
                    swal({
                        title: "خطأ في البيانات",
                        text: "خطأ في اسم المستخدم او كلمة المرور",
                        type: "error"
                    });
                }
            }
        });
    }
});


//logout from the system
function logout() {
    swal({
            title: "هل انت متأكد؟",
            text: "تسجيل الخروج",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "نعم, قم بتسجيل الخروج",
            cancelButtonText: "الغاء",
            closeOnConfirm: false },
        function(){
                    localStorage.removeItem("username");
                    localStorage.removeItem("user_id");


                    swal("تسجيل الخروج", "تم تسجيل الخروج بنجاح", "success");
                    window.location="login.html";


        }
    );
}




function addWord(){
    var word = $('#wordTxt').val();
    var root = $('#rootTxt').val();
    var rootDesc = $('#meanTxt').val();
    if(!word.length || !root.length || !rootDesc.length){
        swal({
            title: errTitle,
            text: "قم بتعبئة جميع الحقول رجاءا",
            type: "error"
        });
    }
    else{
        var data = "word=" + word + "&root=" + root + "&rootDesc=" + rootDesc + "&todo=addWord";
        console.log(data);

        $.ajax({
            type: "POST",
            url: '../server/admin.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);

                if (data !== "ERROR") {
                    $('#wordTxt').val("");
                    $('#rootTxt').val("");
                    $('#meanTxt').val("");
                } else {
                    swal({
                        title: errTitle,
                        text: "خطأ عند الارسال",
                        type: "error"
                    });
                }
            }
        });
    }
}



function editWord(){
    var word = $('#edwordTxt').val();
    var root = $('#edrootTxt').val();
    var rootDesc = $('#edmeanTxt').val();
    if(!word.length || !root.length || !rootDesc.length){
        swal({
            title: errTitle,
            text: "قم بتعبئة جميع الحقول رجاءا",
            type: "error"
        });
    }
    else{
        var data = "word=" + word + "&root=" + root + "&rootDesc=" + rootDesc + "&todo=editWord";
        console.log(data);

        $.ajax({
            type: "POST",
            url: '../server/admin.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);

                if (data !== "ERROR") {

                    $('#edwordTxt').val("");
                    $('#edrootTxt').val("");
                    $('#edmeanTxt').val("");
                    swal("تعديل", "تم تعديل بيانات الكلمة بنجاح", "success");
                } else {
                    swal({
                        title: errTitle,
                        text: "خطأ عند الارسال",
                        type: "error"
                    });
                }
            }
        });
    }
}



function addNoun(){
    var word = $('#nwordTxt').val();
    var noun = $('#nounTxt').val();
    var nounDesc = $('#nmeanTxt').val();
    if(!word.length || !noun.length || !nounDesc.length){
        swal({
            title: errTitle,
            text: "قم بتعبئة جميع الحقول رجاءا",
            type: "error"
        });
    }
    else{
        var data = "word=" + word + "&noun=" + noun + "&nounDesc=" + nounDesc + "&todo=addNoun";
        console.log(data);

        $.ajax({
            type: "POST",
            url: '../server/admin.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);

                if (data !== "ERROR") {
                    swal("اضافة", "تمت الاضافة بنجاح", "success");
                    $('#nwordTxt').val("");
                    $('#nounTxt').val("");
                    $('#nmeanTxt').val("");
                } else {
                    swal({
                        title: errTitle,
                        text: "خطأ عند الارسال",
                        type: "error"
                    });
                }
            }
        });
    }
}


function addVerb(){
    var word = $('#vwordTxt').val();
    var verb = $('#verbTxt').val();
    var verbDesc = $('#vmeanTxt').val();
    if(!word.length || !verb.length || !verbDesc.length){
        swal({
            title: errTitle,
            text: "قم بتعبئة جميع الحقول رجاءا",
            type: "error"
        });
    }
    else{
        var data = "word=" + word + "&verb=" + verb + "&verbDesc=" + verbDesc + "&todo=addVerb";
        console.log(data);

        $.ajax({
            type: "POST",
            url: '../server/admin.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);

                if (data !== "ERROR") {
                    swal("اضافة", "تمت الاضافة بنجاح", "success");
                    $('#vwordTxt').val("");
                    $('#verbTxt').val("");
                    $('#vmeanTxt').val("");
                } else {
                    swal({
                        title: errTitle,
                        text: "خطأ عند الارسال",
                        type: "error"
                    });
                }
            }
        });
    }
}
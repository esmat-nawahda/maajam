function chatLogin(){
    var username = $('#username').val();
    if(!username.length){
        swal({
            title: errTitle,
            text: "قم بأدخال اسمك الشخصي او المستعار فضلا وليس امرا",
            type: "error"
        });
    }
    else{
        page = 0;
        window.localStorage.setItem("username", username);
        window.location = '#/chat/main/';
    }
}

function greeting(){
    var username = localStorage.username;
    $('#greeting').html("اهلا " + username);
}

function showMsgs(){
    var data = "page=" + page + "&todo=getMsgsByPage";
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'server/chat.php',
        data: data, // appears as $_GET['id'] @ ur backend side
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);

            if (data !== "ERROR") {
                //Fill Data
                $('#wordToSearch').val('');

                $.each(jsonData, function(i, item) {
                    // var item=JSON.parse(jsonData[i]);
                    var msgType = 'info';
                    if(localStorage.username === item.username){
                        msgType = 'success';
                    }
                    console.log(item);
                    $.ajax({
                        url:"views/templates/message.html",
                        success: function(tpl){
                            $("#msgsContainer").append(tplawesome(tpl, [{"msgType":msgType,"msgContent":item.message,"username":item.username,"sentDate":item.sentDate}]));
                        }
                    });
                });

                page++;
            } else {
                swal({
                    title: errTitle,
                    text: returnErr,
                    type: "error"
                });
            }
        }
    });
}


function sendMsg(){
    var msgContent = $('#msgContentId').val();
    if(!msgContent.length){
        swal({
            title: errTitle,
            text: "قم بأدخال الرسالة اولا",
            type: "error"
        });
    }
    else{
        var data = "msgContent=" + msgContent + "&username=" + localStorage.username + "&todo=sendMsg";
        console.log(data);
        $.ajax({
            url:"views/templates/message.html",
            success: function(tpl){
                $("#msgsContainer").prepend(tplawesome(tpl, [{"msgType":'success',"msgContent":msgContent,"username":localStorage.username,"sentDate":"قبل بضع ثوان"}]));
                $('#msgContentId').val("");
            }
        });
        $.ajax({
            type: "POST",
            url: 'server/chat.php',
            data: data, // appears as $_GET['id'] @ ur backend side
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);

                if (data !== "ERROR") {

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



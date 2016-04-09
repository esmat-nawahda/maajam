//get word root and meaning
function getWordInfo(word) {
    //alert(last_id);
    var data = "word=" + word + "&todo=getWordInfo";
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'server/words.php',
        data: data, // appears as $_GET['id'] @ ur backend side
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            $('#search').removeClass('open');
            $('#wordToSearch').val('');
            $('#mainCont').load('views/main.html').show();

            if (data !== "ERROR") {
                //Fill Data
                setTimeout(function(){
                    $('#wordId').html(jsonData.word);
                    $('#rootId').html('الجذر: ' + jsonData.root);
                    $('#descId').html(jsonData.rootDesc);
                    lastWord = jsonData.word;
                },500);


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



function getWordNouns() {
    //alert(last_id);
    var word = lastWord;
    var data = "word=" + word + "&todo=getWordNouns";
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'server/words.php',
        data: data, // appears as $_GET['id'] @ ur backend side
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);

            if (data !== "ERROR") {
                //Fill Data
                for(var i=0;i<jsonData.length;i++) {
                    $('#wordNounsCont').append('<li>' + (jsonData[i].noun + ':' + jsonData[i].noundesc) + '</li>');
                }
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


function getWordVerbs() {
    //alert(last_id);
    var word = lastWord;
    var data = "word=" + word + "&todo=getWordVerbs";
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'server/words.php',
        data: data, // appears as $_GET['id'] @ ur backend side
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);

            if (data !== "ERROR") {
                //Fill Data
                for(var i=0;i<jsonData.length;i++) {
                    $('#wordVerbsCont').append('<li>' + (jsonData[i].verb + ':' + jsonData[i].verbDesc) + '</li>');
                }
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


function getLast10(){
    var data = "todo=getLast10";
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'server/words.php',
        data: data, // appears as $_GET['id'] @ ur backend side
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData);

            if (data !== "ERROR") {
                //Fill Data
                $('#wordToSearch').val('');


                $.each(jsonData, function(i, item) {

                    console.log(item);
                    $.ajax({
                        url:"views/templates/lastWord.html",
                        success: function(tpl){
                            $("#lastWords").append(tplawesome(tpl, [{"word":item.word}]));
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


$('#verbsId').hide();
$('#nounsId').hide();

$('body').on('click', '#searchBtn', function() {
    var word = $('#wordToSearch').val();
    alert(word);
    getWordInfo(word);
});


$('body').on('click', '#wordVerbBtn', function() {
    $('#verbsId').css("display", "block");
    getWordVerbs();
});

$('body').on('click', '#wordNounBtn', function() {
    $('#nounsId').css("display", "block");
    getWordNouns();
});

//    When a href clicked
$('a').click(function(e){

    var href = this.href;  // get href from link
    e.preventDefault();  // don't follow the link
    //alert(href);
    document.location = href;  // redirect browser to link

});

$('#mainCont').load('views/body.html').show();

//Modules
var homeModule = {
    goHome: function() {
        $('#mainCont').load('views/body.html').show();

    }
};

var settingsModule = {
    about: function() {
        $('#mainCont').load('views/about.html').show();
    },
    contact: function() {
        $('#mainCont').load('views/contact.html').show();
    },
    questions: function() {
        $('#mainCont').load('views/questions.html').show();
    },
    lastResults: function() {
        $('#mainCont').load('views/lastResults.html').show();
        getLast10();
    }
};

var chatModule = {
    login: function() {
        $('#mainCont').load('views/chatLogin.html').show();
    },
    main: function() {
        $('#mainCont').load('views/chatMain.html').show();
        setTimeout(function(){
            greeting();
            showMsgs();
        },500);
    }
};


var adminModule = {
    addWord: function() {
        $('#mainCont').load('views/addWord.html').show();
    },
    editWord: function() {
        $('#mainCont').load('views/editWord.html').show();
    },
    addVerb: function() {
        $('#mainCont').load('views/addVerb.html').show();
    },
    addNoun: function() {
        $('#mainCont').load('views/addNoun.html').show();
    }

};




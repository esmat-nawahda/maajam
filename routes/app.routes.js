$.routes.add('/', homeModule.goHome);
$.routes.add('/#', homeModule.goHome);
$.routes.add('#', homeModule.goHome);
$.routes.add('', homeModule.goHome);
$.routes.add('/main', homeModule.goHome);


$.routes.add('/about', settingsModule.about);
$.routes.add('/contact', settingsModule.contact);
$.routes.add('/lastwords', settingsModule.lastResults);

$.routes.add('/chat/login', chatModule.login);
$.routes.add('/chat/main', chatModule.main);



//admin
$.routes.add('/addWord', adminModule.addWord);
$.routes.add('/editWord', adminModule.editWord);
$.routes.add('/addVerb', adminModule.addVerb);
$.routes.add('/addNoun', adminModule.addNoun);


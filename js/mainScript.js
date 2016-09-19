var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj;
var translation;
var messageform;
var character;
var URL;
var characterSelection;
var myTranslator;
 


$('#characterSelection').change(function () {
    var characterSelection = $(this).find("option:selected").text();
    console.log("changed to " + characterSelection);
    if (characterSelection == "Pirate") {
        document.getElementById('theBod').style.background="url(../images/pirate.png)";
        }  
    else if (characterSelection == "Minion") {
        document.getElementById('theBod').style.background="url(../images/Banana.jpg)";
        }  
    else if (characterSelection == "Dothraki") {
        document.getElementById('theBod').style.background="url(../images/horse.jpg)";
        }  
    else if (characterSelection == "Gungan") {
        document.getElementById('theBod').style.background="url(../images/water.jpg)";
        }  
    else if (characterSelection == "Shakespeare") {
        document.getElementById('theBod').style.background="url(../images/Fool.jpg)";
        }      
     else {
         document.getElementById('theBod').style.background="url(../images/space.jpg)";
        }

});



function updateUI(obj) {
  //  output.innerHTML = "The Translation for that is<br>" + messageObj;
    document.getElementById("AnOutputbox").innerHTML = messageObj;
    responsiveVoice.speak(messageObj, "UK English Male", {rate: 0.85});
};





function getCharacter(characterSelection, callback) {
        
    if (characterSelection == "Pirate") {
        charcter ="Pirate";
        URL = "http://api.funtranslations.com/translate/pirate.json";
        responsiveVoice.speak("It's a pirates Life for me!", "UK English Male", {rate: 0.8});
        }  
    else if (characterSelection == "Minion") {
        character = "Minion";
        URL = "http://api.funtranslations.com/translate/minion.json";
        responsiveVoice.speak("pik modohs meeno ex deep pik ex gib banana", "UK English Male", {rate: 0.8});
        }  
    else if (characterSelection == "Dothraki") {
        character = "Dothraki";
        URL = "http://api.funtranslations.com/translate/dothraki.json";
        responsiveVoice.speak("The Stallion that mounts the world has no need for iron chairs", "UK English Male", {rate: 0.8});
        }  
    else if (characterSelection == "Gungan") {
        character = "Gungan";
        URL = "http://api.funtranslations.com/translate/gungan.json";
        responsiveVoice.speak("How rude", "UK English Male", {rate: 0.8});
        }  
    else if (characterSelection == "Shakespeare") {
        character = "Shakespeare";
        URL = "http://api.funtranslations.com/translate/shakespeare.json";
        responsiveVoice.speak("Have more than you show, speak less than you know", "UK English Male", {rate: 0.8});
        }      
     else {
        character = "Yoda";
        responsiveVoice.speak("Do, or do not, There is no try", "UK English Male", {rate: 0.8});
        }
    callback(character, URL);
        };




tbtn.on("click", function () {

    var message = textareabox.value;


    //Only detects after the Translate button has been clicked once, need to alter this
    $('#characterSelection').change(function (theSelection) {
    var characterSelection = $(this).find("option:selected").text();
    console.log("changed to " + characterSelection);
    

        getCharacter(characterSelection, function(character, URL){
        console.log("is this fuction running")
        myTranslator = character;
        myURL = URL;
        console.log(myTranslator);
        console.log(myURL);
    })
     })



    if (myTranslator == "Pirate" || myTranslator == "Minion" || myTranslator == "Dothraki" || myTranslator == "Gungan" || myTranslator== "Shakespeare"){
    translateText(message, URL, function (textconversion) {       
        messageObj = textconversion;
        console.log (translation);
        console.log (messageObj);
        updateUI(messageObj);
    });
    }
    else {
    yodaTranslateText(message, function (textconversion) {       
        messageObj = textconversion;
        console.log (messageObj);
        updateUI(messageObj);
    });
    }
});

function translateText(message, URL, callback) {
    $.ajax({
       url: "http://api.funtranslations.com/translate/pirate.json",
     // beforeSend: function (xhrObj) {
     //    xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF");
    //   },
        type: 'POST',
        data: 'text=' + message,
        processData: false
    }).done(function (data) {
        if (data.length != 0) {
            //alert(data.contents.translated);
            var translation = data.contents.translated;
            console.log (translation);      
            callback(translation);
        }
        else {
            alert("No text detected");
        }
    })
    .fail(function (error) {
        alert("Data hasn't come in!, perhaps just try using the yoda translation as I don't have keys for the others as that would cost me too much. Pretty sure others work but its hard to test when it gets blockeded all the time");
        console.log(error.getAllResponseHeaders());
    })
}

function yodaTranslateText(message, callback) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
       beforeSend: function (xhrObj) {
           xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF");
       },
        type: 'POST',
        data: 'text=' + message,
        processData: false
    }).done(function (data) {
        if (data.length != 0) {
          //  alert(data.contents.translated);
            var translation = data.contents.translated;
            //console.log (translation);      
            callback(translation);
        }
        else {
            alert("No text detected");
        }
    })
    .fail(function (error) {
        alert("Data hasn't come in");
        console.log(error.getAllResponseHeaders());
    })
}



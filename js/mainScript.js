var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj;
var translation;
var messageform;
 


function updateUI(obj) {
  //  output.innerHTML = "The Translation for that is<br>" + messageObj;
    document.getElementById("AnOutputbox").innerHTML = messageObj;
};


tbtn.on("click", function () {

    var message = textareabox.value; 
    var messageform = new FormData();
    messageform.append("text", "randomcrap");

    translateText(message, function (textconversion) {
        messageObj = textconversion;
        console.log (translation);
        console.log (messageObj);
        updateUI(messageObj);
    });
});









function translateText(message, callback) {
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
            alert(data.contents.translated);
            var translation = data.contents.translated;
            console.log (translation);      
            callback(translation);
        }
        else {
            alert("No text detected");
        }
    })
    .fail(function (error) {
        alert("Data hasn't come in!, perhaps just try using the yoda translation as I don't have keys for the others as that would cost me too much");
        console.log(error.getAllResponseHeaders());
    })
}



/*


function translateText(message, callback) {
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
            alert(data.contents.translated);
            var translation = data.contents.translated;
            console.log (translation);      
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



*/
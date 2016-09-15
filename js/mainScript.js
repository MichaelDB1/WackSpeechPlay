var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj;
var translation;
var messageform;
 


function updateUI(obj) {
    output.innerHTML = "The Translation for that is><br>" + messageObj;
};


tbtn.on("click", function () {

    var message = textareabox.value; 
    var messageform = new FormData();
    messageform.append("text", "randomcrap");

    translateText(messageform, function (response) {
        messageObj = translation;
        updateUI(messageObj);
    });
});



function translateText(messageform, response) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
       // beforeSend: function (xhrObj) {
         //   xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF");
      //  },
        type: 'POST',
        data: messageform,
        // JSON.stringify({'text': message }),
        processData: false
    }).done(function (data) {
        if (data.length != 0) {
          //  JSON.stringify({ 'text': message });
            var translation = data.contents.translated
            response(translation);
        }
        else {
            pageheader.innerHTML = "No text detected";
        }
    })
    .fail(function (error) {
        alert("Data hasn't come in");
        console.log(error.getAllResponseHeaders());
    })
}




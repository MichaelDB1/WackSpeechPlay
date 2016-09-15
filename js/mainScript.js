var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj;
var test =$("#test");

function formatData(text) {
    return "{\"documents\": [{"
        + "\"language\": \"en\","
        + "\"id\": \"1\","
        + "\"text\": \"" + text + "\"}]}";
}

tbtn.on("click", function () {

    var message = textareabox.value;
    translateText(message, function (response) {
        messageObj = new TranslatedMessage(textBox.value, response);
        updateUI(messageObj);
    });
});


function translateText(message, response) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json?text="+message,
        beforeSend: function(xhrObj) { 
        xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF"); 
        },
        type: 'POST',
        data: message,
        processData: false,
        success: function (data) {

            var translation = data.contents.translated;
            response(translation);
        },
            error: function(){
                alert("Data hasn't come in...");             
            }
        });



function updateUI(obj) {
    output.innerHTML = messageObj;
}





var AnalysedMessage = (function () {
    function AnalysedMessage(text, sentiment) {
        this.text = text;
        this.sentiment = sentiment;
        this.text = text;
        this.sentiment = sentiment;
    }
    return AnalysedMessage;
}())};
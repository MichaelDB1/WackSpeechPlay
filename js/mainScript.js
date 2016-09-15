var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj;
var test =$("#test");
var translation;

function updateUI(obj) {
    output.innerHTML = "The Translation for that is><br>" + messageObj;
};


tbtn.on("click", function () {

    var message = textareabox.innerText;
console.log (message);
    translateText(message, function (response) {
        messageObj = translation;
        updateUI(messageObj);
    });
});


/*
function translateText(message, response) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json?text="+message,
        
        success: function (data) {
            console.log(data);
            var holder = data.contents;
            var translation = holder[0].translated;
            console.log(translation);

        },
            error: function(){
                alert("Data hasn't come in...");             
            }
        });

        */

function translateText(message) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF");
        },
        type: 'POST',
        data: message,
        processData: false
    }).done(function (data) {
        if (data.length != 0) {
            JSON.stringify({ 'text': message });
            var translation = data.contents.translated
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

        


/*
function translateText(message) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
        beforeSend: function(xhrObj) { 
        xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF"); 
        },
        type: 'POST',
        data: message,
        processData: false,
    })
        .done(function (data) {
        if (data.length != 0) {
            var translation = data.contents.translated
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
*/
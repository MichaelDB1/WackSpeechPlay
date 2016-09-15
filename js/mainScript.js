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

    var message = textareabox.value;
    translateText(message, function (response) {
        messageObj = translation;
        updateUI(messageObj);
    });
});



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

        /*

function translateText(message, response) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
        beforeSend: function(xhrObj) { 
        xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF"); 
        },
        type: 'POST',
        data: message,
        processData: false,
        success: function (data) {

            var translation = data.contents.translated;
            response(translation);
            console.log  ("translation is equal to "+translation);
        },
            error: function(){
                alert("Data hasn't come in...");             
            }
        });
*/

function speak(messageObj, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d342c8d19d4e4aafbf64ed9f025aecc8");
        },
        type: "POST",
        data: messageObj,
        processData: false
    })
        .done(function (data) {
        if (data.length != 0) {
            // Get the emotion scores
            var scores = data[0].scores;
            callback(scores);
        }
        else {
            pageheader.innerHTML = "Hmm, we can't detect a human face in that photo. Try another?";
        }
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });
}




    var ivona = new Ivona({
        accessKey: 'GDNAIPKHQUXJOXRGVIFQ',
        secretKey: 'xO9i/w4YVBdu62Vuh2B+u0ku6SnoDoBb4eHJHTzT'
    });

    ivona.listVoices()
        .on('complete', function(voices) {
            console.log(voices);
        });

    //  ivona.createVoice(text, config)
    //  [string] text - the text to be spoken
    //  [object] config (optional) - override Ivona request via 'body' value
    ivona.createVoice('Testing for sound.' + messageObj, {
        body: {
            voice: {
                name: 'Salli',
                language: 'en-US',
                gender: 'Female'
            }
        }
    }).pipe(fs.createWriteStream('text.mp3'));


}


var tbtn = $("#tbtn");
var textareabox = $("#comment") [0];
var output = $("#output")[0];
var messageObj : String;
var translation : String;
var messageform: Object;
 



function updateUI(obj) : void {
    output.innerHTML = "The Translation for that is><br>" + messageObj;
};


tbtn.on("click", function () {

    var message : String = textareabox.value;
    //form.append("text", message);
   
   
    console.log (message);
    var messageform = {'text' : message}
  
  
  
   // messageform= "text:" + message;
    //var messageform = new FormData();
   // messageform.append("text", message)

   // console.log (messageform);
  //  console.log (messageform);

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



function translateText(message, response) {
    $.ajax({
        url: "http://api.funtranslations.com/translate/yoda.json",
        beforeSend: function (xhrObj) {
            
            xhrObj.setRequestHeader("X-FunTranslations-Api-Secret", "bgC3XPappgOdv2oYE07dzgeF");
        },
        type: 'POST',
       
        data:  message,
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
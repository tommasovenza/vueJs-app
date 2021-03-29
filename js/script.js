$(document).ready(function( ) {
    
    // event click on bottom icon
    $(document).on('click', '#icon', function() {
        // call a message @click
        sendMessage();    
    });

    $(document).on('click', '.fa-chevron-down.active', function() {
        // show dropdown
        $(this).siblings('.with-drop').toggleClass('active');

        // solutions with .not( )
        // $('.fa-chevron-down').not(this).parent('.message').find('.with-drop').removeClass('active');

        // hide other dropdown at every click on chevron in the app
        $(this).parent().siblings('.message').find('.with-drop').removeClass('active');
        
    });
    // event deleting click
    $(document).on('click', '.delete', function() {
        $(this).parents('.message').remove();
    });

    // event press on keyboard for writing a message 
    $(document).keyup(function(event) {
        // take input value
        var inputMessage = $('#message').val();
        // call function in there's a value inside the input text
        if((inputMessage != '') && (event.which == '13')) {
            // writing a message
            sendMessage(inputMessage);
            // set and answer message after 1 second
            setTimeout(answerMessage, 1000);
        } 
    });
    // keyboard input events for researching contacts
    $(".search input").keyup(function() {
        searchContacts();
    });
    
    // show chevron down at mouseover on ballon message
    $(document).on('mouseover', '.message.sent', function() {
        $(this).find('.fa-chevron-down').addClass('active');
    });
    $(document).on('mouseleave', '.message.sent', function() {
        $(this).find('.fa-chevron-down').removeClass('active');
    });
    $(document).on('mouseover', '.message.received', function() {
        $(this).find('.fa-chevron-down').addClass('active');
    });
    $(document).on('mouseleave', '.message.received', function() {
        $(this).find('.fa-chevron-down').removeClass('active');
    });
});

// function input message
// ->input message: string
function sendMessage() {
    var inputMessage = $('#message').val();
    // call function in there's a value inside the input text
    if(inputMessage != '') {
        let clone = $('#template').children().clone();
        // add class sent to set a background color and add shape to text
        clone.addClass('sent');
        // creating a new object date
        var dateTime = new Date();
        var hour = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var currentTime = addZeroToHour(hour) + ':' + addZeroToHour(minutes);
        // appending message to board
        $('.message-table').append(clone);
        // appending time to message
        $('.message-table span').text(currentTime);
        // do not overriding other message's text
        $('.message-table p').last().text(inputMessage);
        // cleaning input field
        $('#message').val('');

        // set an answer message reply after a send message
        setTimeout(answerMessage, 1000);
    } 
}
// bugfixing javascripts hours
function addZeroToHour(number) {
    if(number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}
// answerMessage is identical to sendMessage apart for the class 
// that is add to message template
function answerMessage() {
    var clone = $('#template').children().clone();
    clone.addClass('received');
    // creating a new object date
    var dateTime = new Date();
    var hour = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    // fixing date
    var currentTime = addZeroToHour(hour) + ':' + addZeroToHour(minutes);
    $('.message-table').append(clone);
    $('.message-table span').text(currentTime);
    // svuoto il campo ricerca
    $('#message').val('');
}

// questa funzione ricerca i contatti a cui inviare un messaggio
// vado a cercare il testo degli h3 presente in ogni contacts-item
// per cercare il nome che mi interessa trovare
function searchContacts() {
    
    $('.contacts-item').each(function() {
        
        var userResearch = $('.search input').val();

        // prendi gli h3 all'interno dello stesso contacts-item
        // se non usi this qui non trova gli h3
        // IMPORTANTE
        // this all'interno di questo each è contacts-item
        // difatti each è un ciclo che cicla i contacts-item
        var nameToFind = $(this).find('h3').text().toLowerCase();
        
        if(nameToFind.includes(userResearch)) {
            // se il nome include la mia ricerca lo mostro
            $(this).show();
        } else {
            // altrimenti lo nascondo
            $(this).hide();
        }
    });

}

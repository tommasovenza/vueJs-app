$(document).ready(function( ) {
    
    // event click on bottom icon
    $(document).on('click', '#icon', function() {
        // call sendMessage function
        sendMessage();
        // set an answer message reply after a send message
        setTimeout(answerMessage, 1000);
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

    // event click on chevron down for deleting a message
    $(document).on('click','.message.sent i',function() {
        $(this).parents('.message').remove();
    });
    $(document).on('click','.message.received i', function() {
        $(this).parents('.message').remove();
    });
});

// function input message
// ->input message: string
function sendMessage(inputMessage) {
    // take input value
    var inputMessage = $('#message').val();
    console.log(inputMessage);
    // call function in there's a value inside the input text
    if(inputMessage != '') {
        var clone = $('#template').children().clone();
        console.log(clone);
    
        var dateTime = new Date();
        var hour = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var currentTime = addZeroToHour(hour) + ':' + addZeroToHour(minutes);
    
        $('.message-table').append(clone);
        $('.message').addClass('sent');
        $('.message-table span').text(currentTime);
        $('.message-table p').last().text(inputMessage);
    
        $('#message').val('');
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
    var clone = $('#template-received').children().clone();
    var dateTime = new Date();
    var hour = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    console.log(minutes);
    var currentTime = addZeroToHour(hour) + ':' + addZeroToHour(minutes);
    console.log(currentTime);
    $('.message-table').append(clone);
    $('#template-received .message').addClass('received');
    $('.message-table span').text(currentTime);
    $('.message-table p').last().text(inputMessage);
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
 

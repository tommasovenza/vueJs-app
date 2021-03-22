$(document).ready(function( ) {
    
    // click on icon
    $(document).on('click', '#icon', function() {
        sendMessage();
        setTimeout(answerMessage, 1000);
    });
    // event press on keyboard
    $(document).keyup(function(event) {
        // take input value
        var inputMessage = $('#message').val();
        // call function in there's a value inside the input text
        if((inputMessage != '') && (event.which == '13')) {
            sendMessage(inputMessage);
            setTimeout(answerMessage, 1000);
        }
        
    });
    
    //mostra la freccina al mouseover
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

    // click sulla freccina per cancellare il messaggio
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
    
    $('#message').val('');
}
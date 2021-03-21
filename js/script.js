$(document).ready(function( ) {
    
    // click on icon
    $(document).on('click', '#icon', function() {
        // take input value
        var inputMessage = $('#message').val();
        console.log(inputMessage);
        // call function in there's a value inside the input text
        if(inputMessage != '') {
            sendMessage(inputMessage);
        }
    });

    $(document).keyup(function(event) {
        // take input value
        var inputMessage = $('#message').val();
        // call function in there's a value inside the input text
        if((inputMessage != '') && (event.which == '13')) {
            sendMessage(inputMessage);
        }
    });
    
    //mostra la freccina al mouseenter
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

    // click sulla freccina pere cancellare il messaggio
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
    var clone = $('#template').children().clone();
    console.log(clone);
    $('.message-table').append(clone);
    $('.message-table p').last().text(inputMessage);

    $('#message').val('');
}
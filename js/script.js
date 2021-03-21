$(document).ready(function( ) {
   

    $(document).on('click', '#icon', function() {
        var clone = $('#template').children().clone();
        console.log(clone);

        var inputMessage = $('#message').val();
        console.log(inputMessage);

        $('.message-table').append(clone);
        $('.message-table p').last().text(inputMessage);
        
        $('#message').val('');

    });
});
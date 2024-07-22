



$(document).ready(function () {
    $('.add-button').click(function () {
        $(this).hide();
        $(this).siblings('#spinner-container').show();
        $(this).siblings('#spinner-container').find('.spinner').val(1);
    });

    $('.plus').click(function () {
        let spinner = $(this).siblings('.spinner');
        spinner.val(parseInt(spinner.val()) + 1);
    });

    $('.minus').click(function () {
        let spinner = $(this).siblings('.spinner');
        if (spinner.val() > 1) {
            spinner.val(parseInt(spinner.val()) - 1);
        } else {
            $(this).parent('#spinner-container').hide();
            $(this).parent().siblings('.add-button').show();
        }
    });
});

// slider





// $(document).ready(function () {
//     $('.add-button').click(function () {
//         $(this).hide();
//         $('#spinner-container').show();
//         $('.spinner').val(1);
//     });

//     $('.plus').click(function () {
//         let spinner = $('.spinner');
//         spinner.val(parseInt(spinner.val()) + 1);
//     });

//     $('.minus').click(function () {
//         let spinner = $('.spinner');
//         if (spinner.val() > 1) {
//             spinner.val(parseInt(spinner.val()) - 1);
//         } else {
//             $('#spinner-container').hide();
//             $('.add-button').show();
//         }
//     });
// });




// $(document).ready(function() {
//     $('#add-button').click(function() {
//         $(this).hide();
//         $('#spinner-container').show();
//         $('#spinner').val(1);
//     });

//     $('#plus').click(function() {
//         let spinner = $('#spinner');
//         spinner.val(parseInt(spinner.val()) + 1);
//     });

//     $('#minus').click(function() {
//         let spinner = $('#spinner');
//         if (spinner.val() > 1) {
//             spinner.val(parseInt(spinner.val()) - 1);
//         } else {
//             $('#spinner-container').hide();
//             $('#add-button').show();
//         }
//     });
// });

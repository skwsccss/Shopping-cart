Stripe.setPublishableKey('pk_test_Ee5qETWEDckjKFanHa8qrkGp00JKDgft5j');

var $form = $('#checkout-form');
$form.submit(function (event) {
        $form.find('#charge-error').addClass('hidden');
        $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        console.log('-------', response.error);
        $form.find('#charge-error').text(response.error.message);
        $form.find('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    } else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        $form.get(0).submit();
    }
}
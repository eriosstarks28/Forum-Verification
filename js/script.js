$(document).ready(function () {
    //focus on the name input field 
    $('#name').focus();
    $('#colors-js-puns').hide();
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#other-title').hide();



});
//CONSTANTS USED IN FIRST PORTION
const $designThemeSelect = $('#design');
const $designSelectOption = $('#design option');
const name = document.getElementById("name");
const email = document.getElementById("mail")
$designSelectOption.eq(0).hide();
const $color = $('#color');
const $colorSelect = $('#color option');
const $colorPuns = $("#color option:contains('Puns')");
const $colorNotPuns = $("#color option:not(:contains('Puns'))");
const $title = $('#title');
let selectedTtile = title.options[title.selectedIndex].value;

//SHOW JOB ROLE BOX IS OTHER IS SELECTED 
$title.on('change', function (event) {
    if ($(event.target).val() === 'other') {
        $('#other-title').show();
    }else{
        $('#other-title').hide();
    }
});


//change color dropdown options when design is chosen
$designThemeSelect.on('change', function (event) {
    $('#colors-js-puns').show();
    if ($(event.target).val() === 'js puns') {
        $colorPuns.eq(0).prop('selected', true);
        $colorPuns.show();
        $colorNotPuns.hide();

    } else {
        $colorNotPuns.eq(0).prop('selected', true);
        $colorNotPuns.show();
        $colorPuns.hide();
    }
});


//create an element to display the total activity cost
let $storeTotal = 0;
let totalCost = document.createElement("span");
$('.activities').append(totalCost);

//ESTABLISH CONFLICTING ACTIVITIES

let $checkbox = $('.activities input[type="checkbox"]');
$('.activities').on('change', function (event) {
    for (i = 0; i < $checkbox.length; i++) {

        let $clickedBox = ($(event.target));
        let $boxCost = parseInt($clickedBox.attr('data-cost'));
        let $boxTime = $clickedBox.attr('data-day-and-time');
        console.log($boxTime);
        console.log($boxCost);
        // add the total a 
        if ($clickedBox.eq(i).prop('checked')) {
            $storeTotal = $storeTotal + $boxCost;
        } else if ($clickedBox.eq(i).prop('checked') === false) {
            $storeTotal = $storeTotal - $boxCost;
        }

        $(totalCost).html('<span>Total Cost: $' + $storeTotal + '</span>');

        let $checkboxDayTime = $checkbox.eq(i).data('day-and-time');


        if ($boxTime === $checkboxDayTime) {
            if ($clickedBox.prop('checked')) {
                $checkbox.eq(i).prop('disabled', true);
            } else {
                $checkbox.eq(i).prop('disabled', false);
            }
        }
        $clickedBox.prop('disabled', false);
    }
});


//ORGANIZE PAYMENT SECTION
const $payment = $('#payment');
const $paymentOptions = $('#payment option');
$paymentOptions.eq(0).hide();
$paymentOptions.eq(1).prop('selected', true);
let $paymentSel = $("#payment option:selected").val();

//global var that will return true/false depending on whether ccValidation was called
let ccCalled = true;


//payment input/text shown/hidden on change event of $payment dropdown//
$payment.on('change', function (event) {
    if ($(event.target).val() === 'credit card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if ($(event.target).val() === 'paypal') {
        ccCalled = false;
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else {
        ccCalled = false;
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
    $paymentSel = $(event.target).val();
})



// VALIDATION FUNCTIONS\\

function nameValidation() {


    if (name.value.length == 0) {
        console.log('name invalid')
        name.style.borderColor = 'red';
        return false;

    } else {
        name.style.border = ""
        return true;
    }
}


function emailValidation() {


    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        email.style.borderColor = ""
        return true;
    } else {
        console.log("enter a valid emial");
        email.style.borderColor = 'red';
        return false;
    }
}
const activities = document.getElementsByClassName("activities");
const activitiesBox = activities.item(0);

function checkboxValidation() {




    if ($storeTotal == 0) {

        activitiesBox.style.color = 'red';
        return false;

    } else {
        activitiesBox.style.color = "";
        return true;

    }
}

function paymentValidation() {

    const paymentType = document.getElementById("payment");
    const creditBox = document.getElementById("cc-num");
    const zipBox = document.getElementById("zip");
    const cvvBox = document.getElementById("cvv");
    let isValid = true;
    let selectedType = paymentType.options[paymentType.selectedIndex].value;


    if (selectedType == "credit card") {


        if (/^[\d]{13,16}$/.test(creditBox.value)) {
            creditBox.style.borderColor = ""
            isValid = true;

        } else {
            console.log("credit card error")
            creditBox.style.borderColor = 'red'
            isValid = false;

        } if (/^[\d]{5}$/.test(zipBox.value)) {
            zipBox.style.borderColor = "";
            isValid = true;

        } else {
            console.log("zipbox error")
            zipBox.style.borderColor = 'red'
            isValid = false;

        } if (/^[\d]{3}$/.test(cvvBox.value)) {
            cvv.style.borderColor = "";
            isValid = true;



        } else {
            console.log("cvv error")
            isValid = false;
            cvv.style.borderColor = 'red'

        }
        return isValid;
    }

    return isValid;

}


function masterFunction(event) {

    nameValidation();
    emailValidation();
    checkboxValidation();
    paymentValidation();

    if (nameValidation() && emailValidation() && checkboxValidation() && paymentValidation()) {
        return true;

    } else {

        return false;


    }
}



const form = document.querySelector("form");

form.addEventListener('submit', function (event) {

    if (!masterFunction()) {
        event.preventDefault();
    }

});









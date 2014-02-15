(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getUsers();
    getGadgets();
    $('#save-user').click(submitUser);
    $('#save-gadget').click(submitGadget);
    $('#gadgets').on('click', '.checkout-purchase',  displayCheckout);
    $('#gadgets').on('click', '.checkout-button',  processOrder);
  }

///////////// USERS //////////////
// ---------- CREATE ---------- //
  function submitUser(event){
    var data = $('#user').serialize();
    var url = window.location.origin.replace(/3000/, '4000') + '/users';
    var type = 'POST';
    var success = newUser;

    $.ajax({url:url, type:type, data:data,  success:success});
    event.preventDefault();
  }

  function newUser(){
    $('#user input').val('');
    getUsers();
  }

// ---------- READ ---------- //
  function getUsers(){
    var url = window.location.origin.replace(/3000/, '4000') + '/users';
    $.getJSON(url, displayUsers);
  }

  function displayUsers(data){
    console.log(data);
    $('#users > tbody').empty();
    for (var i = 0; i < data.users.length; i++){
      var $name = $('<td class="name"></td>');
      var $balence = $('<td class="balence"></td>');
      var $purchases = $('<td class="purchses"></td>');

      $name.text(data.users[i].name);
      $balence.text(data.users[i].balence);
      $purchases.text(data.users[i].purchases.join(', '));

      var $row = $('<tr>').attr('data-id', data.users[i]._id);
      $row.append($name, $balence, $purchases);
      $('#users > tbody').prepend($row);
    }
  }

// ---------- UPDATE ---------- //
/*
  function editUser(){
    alert('edit user');
    var rowId = $(this).closest('tr').data('id');
    var $row = $(this).closest('tr');

    var name = $row.find('.name').text();
    var balence = $row.find('.balence').text();
    var length = $row.find('.purchases').text();
  }

  function updateUser(){
    var data = $('#user').serialize();
    var rowId = $('input[name=id]').val();
    var url = window.location.origin.replace(/3000/, '4000') + '/users/';
    url += rowId;
    var type = 'PUT';
    var success = changeUser;

    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function changeUser(data){
    if (data.deleted === 1){
      console.log(data);
    }
  }
*/


///////////// GADGETS /////////////
// ---------- CREATE ---------- //
  function submitGadget(event){
    var data = $('#gadget').serialize();
    var url = window.location.origin.replace(/3000/, '4000') + '/gadgets';
    var type = 'POST';
    var success = newGadget;

    $.ajax({url:url, type:type, data:data,  success:success});
    event.preventDefault();
  }

  function newGadget(){
    $('#gadget input').val('');
    getGadgets();
  }

// ---------- READ ---------- //
  function getGadgets(){
    var url = window.location.origin.replace(/3000/, '4000') + '/gadgets';
    $.getJSON(url, displayGadgets);
  }

  function displayGadgets(data){
    console.log(data);
    $('#gadgets > tbody').empty();
    for (var i = 0; i < data.gadgets.length; i++){
      var $name = $('<td class="name"></td>');
      var $cost = $('<td class="cost"></td>');
      var $amount = $('<td class="amount"></td>');

      var $purchase = $('<td class="purchase"></td>');
      var $username = $('<td class="username"></td>');
      var $totalpurchased = $('<td class="totalpurchased"></td>');
      var $checkout = $('<td class="checkout"></td>');

      var $chPurchase = $('<button class="checkout-purchase tiny radius">Purchase</button>');
      var $chUser = $('<select class="checkout-user"></select>');
      var $chTotal = $('<select class="checkout-total"></select>');
      var $chButton = $('<button class="checkout-button tiny radius">Checkout</button>');

      $purchase.append($chPurchase);
      $username.append($chUser);
      $totalpurchased.append($chTotal);
      $checkout.append($chButton);

      $name.text(data.gadgets[i].name);
      $cost.text(data.gadgets[i].cost);
      $amount.text(data.gadgets[i].amount);

      var $row = $('<tr>').attr('data-id', data.gadgets[i]._id);
      $row.append($purchase, $name, $cost, $amount, $username, $totalpurchased, $checkout);
      $('#gadgets > tbody').prepend($row);
    }
  }

  function displayCheckout(){
    var userDropDown = $('.checkout-user');
    var totalDropDown = $('.checkout-total');

    $('#users .name').each(function(){
      var text = $(this).text();
      var $option1 = $('<option>');
      $option1.text(text);
      userDropDown.append($option1);
    });

    var high = $(this).parent('.purchase').siblings('.amount').text() * 1;
    var range = _.range(high + 1);
    console.log(range);

    for (var i = 0; i < range.length; i++){
      var $option2 = $('<option>');
      $option2.text(i);
      totalDropDown.append($option2);
    }
  }

// ---------- DESTROY ---------- //
/*
  function deleteGadget(event){
    var rowId = $(this).closest('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/gadgets/';
    url += rowId;
    var type = 'DELETE';
    // node sends back the number of gadgets deleted and the gadget id
    var success = removeGadget;

    $.ajax({url:url, type:type, success:success});
    event.preventDefault();
  }

  function removeGadget(data){
    if (data.deleted === 1){
      $('tr[data-id="'+data.id+'"]').remove();
    }
  }
*/

  function processOrder(){
    //var cost = $(this).parent('.checkout').siblings('.cost').text() * 1;
    //var amount = $(this).parent('.checkout').siblings('.totalpurchased').find('.checkout-total').find(':selected').text() * 1;
    var user = $(this).parent('.checkout').siblings('.username').find('.checkout-user').find(':selected').text();
    var userRow = $('#users .name:contains('+user+')');
    var userId = userRow.closest('tr').data('id');
    //var total = cost * amount;
    //var gadgetAmount = gadgetAmount - amount;

    var gadgetId = $(this).parent('.checkout').parent('tr').data('id');
    var url = window.location.origin.replace(/3000/, '4000') + '/gadgets/';
    url += gadgetId;
    console.log(userId);
    //var type = 'PUT';
    //var data = total;
    //var success = updateUserandGadget;

    //$.ajax({url:url, type:type, data:data, success:success});
  }

  //function updateUserandGadget(data){
    //console.log(data);
  //}

})();

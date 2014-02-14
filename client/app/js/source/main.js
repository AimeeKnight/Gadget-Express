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

      var $chPurchase = $('<button class="checkout-purchase">Purchase</button>');
      var $chUser = $('<select class="checkout-user"></select>');
      var $chTotal = $('<select class="checkout-total-purchased"></select>');
      var $chButton = $('<button class="checkout-button">Checkout</button>');

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
    var userDropDown = $('checkout-user');
    $('#users tr').each(function(){
      var text = $(this).find('td:first').text();
      var $option = $('<option>');
      $option.text(text);
      userDropDown.append($option);
    });
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

})();

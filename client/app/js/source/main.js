(function(){
/*jshint validthis: true */


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
    //var url = window.location.origin.replace(/3000/, '4000') + '/users';
    var url = window.location.origin + '4000/users';
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
    //var url = window.location.origin.replace(/3000/, '4000') + '/users';
    var url = window.location.origin + '4000/users';
    $.getJSON(url, displayUsers);
  }

  function displayUsers(data){
    console.log(data);
    $('#users > tbody').empty();
    for (var i = 0; i < data.users.length; i++){
      var $name = $('<td class="name"></td>');
      var $balance = $('<td class="balance"></td>');
      var $purchases = $('<td class="purchases"></td>');

      $name.text(data.users[i].name);
      $balance.text(data.users[i].balance);
      if (data.users[i].purchases.length > 0){
        $purchases.text(data.users[i].purchases.join(', '));
      }else{
        $purchases.text(data.users[i].purchases);
      }
      var $row = $('<tr>').attr('data-id', data.users[i]._id);
      $row.append($name, $balance, $purchases);
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
    var balance = $row.find('.balance').text();
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
    //var url = window.location.origin.replace(/3000/, '4000') + '/gadgets';
    var url = window.location.origin + '4000/gadgets';
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
    //var url = window.location.origin.replace(/3000/, '4000') + '/gadgets';
    var url = window.location.origin + '4000/gadgets';
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
      var $chUser = $('<select class="checkout-user"></select>').hide();
      var $chTotal = $('<select class="checkout-total"></select>').hide();
      var $chButton = $('<button class="checkout-button tiny radius">Checkout</button>').hide();

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
    $(this).parent('.purchase').siblings('.username').find('.checkout-user').show();
    $(this).parent('.purchase').siblings('.totalpurchased').find('.checkout-total').show();
    $(this).parent('.purchase').siblings('.checkout').find('.checkout-button').show();
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

    for (var i = 0; i < range.length; i++){
      var $option2 = $('<option>');
      $option2.text(i);
      totalDropDown.append($option2);
    }
  }

// ---------- DESTROY ---------- //
  function deleteGadget(gadgetId){
    //var url = window.location.origin.replace(/3000/, '4000') + '/gadgets/';
    var url = window.location.origin + '4000/gadgets';
    url += gadgetId;
    var type = 'DELETE';
    // node sends back the number of gadgets deleted and the gadget id
    var success = removeGadget;

    $.ajax({url:url, type:type, success:success});
  }

  function removeGadget(){
    getGadgets();
  }

  function buildList(name, purchasedAmount){
    var names = '';
    var gadget = name + ', ';

    for(var i = 1; i < purchasedAmount; i++){
      names += gadget;
    }
    return names.concat(name);
  }

  function processOrder(){
    $(this).parent('.checkout').siblings('.username').find('.checkout-user').hide();
    $(this).parent('.checkout').siblings('.totalpurchased').find('.checkout-total').hide();
    $(this).parent('.checkout').siblings('.checkout').find('.checkout-button').hide();

    var name = $(this).parent('.checkout').siblings('.name').text();
    var cost = $(this).parent('.checkout').siblings('.cost').text() * 1;
    var startingAmount = $(this).parent('.checkout').siblings('.amount').text() * 1;
    var purchasedAmount = $(this).parent('.checkout').siblings('.totalpurchased').find('.checkout-total').find(':selected').text() * 1;
    var username= $(this).parent('.checkout').siblings('.username').find('.checkout-user').find(':selected').text();
    var userRow = $('#users .name:contains('+username+')');
    var startingBalance = userRow.siblings('.balance').text() * 1;
    var total = cost * purchasedAmount;
    var amount = startingAmount - purchasedAmount;
    var balance = startingBalance - total;

    var purchases = userRow.siblings('.purchases').text();
    purchases = setPurchases(purchasedAmount, name, purchases);

    var type = 'PUT';
    var success = updateUserandGadget;
    var obj = {name:name, cost:cost, amount:amount};
    var data = obj;
    var obj2 = {name:username, balance:balance, purchases:purchases};
    var data2 = obj2;

    var gadgetId = $(this).parent('.checkout').parent('tr').data('id');
    //var url = window.location.origin.replace(/3000/, '4000') + '/gadgets/' + gadgetId;
    var url = window.location.origin + '4000/gadgets/' + gadgetId;
    var userId = userRow.closest('tr').data('id');
    //var url2 = window.location.origin.replace(/3000/, '4000') + '/users/' + userId;
    var url2 = window.location.origin + '4000/users/' + userId;

    if (amount <= 0){deleteGadget(gadgetId);}
    $.ajax({url:url, type:type, data:data, success:success});
    $.ajax({url:url2, type:type, data:data2, success:success});
  }

  function setPurchases(purchasedAmount, name, purchases){
    var names;
    if (purchasedAmount > 1){
      names = buildList(name, purchasedAmount);

      if (purchases === ''){
        purchases = names;
      }else{
        purchases = purchases.concat(', ' + names);
      }
    }else{
      if (purchases === ''){
        purchases = name;
      }else{
        purchases = purchases.concat(', ' + name);
      }
    }
    return purchases;
  }

  function updateUserandGadget(){
    getUsers();
    getGadgets();
  }

})();

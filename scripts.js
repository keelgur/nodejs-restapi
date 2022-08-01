$(function() {
    //READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/materials',
            contentType: 'application/json',
            success: function(response){
               var tbodyEl = $('tbody');

               tbodyEl.html('');

               response.materials.forEach(function(material) {
                   tbodyEl.append('\
                       <tr>\
                           <td class="id">' + material.id + '</td>\
                           <td><input type="text" class="name" value="' + material.name + '"</td>\
                           <td>\
                               <button class="update-button">\
                                   UPDATE</button>\
                               <button class="delete-button">DELETE</button>\
                           </td>\
                       </tr>\
                   ');
               });
           }
       });
    });

    $('#frm').on('submit', function(event) {
         event.preventDefault();

         var createInpt = $('#inpt');
         
         $.ajax({
             url: '/materials',
             method: 'POST',
             contentType: 'application/json',
             data: JSON.stringify({ name: createInpt.val() }),
             success: function(response) {
                 console.log(response);
                 createInpt.val('');
                 $('#get-button').click();
             }
         });
    });
  
    
    $('table').on('click', '.update-button', function() {
       var rowEl = $(this).closest('tr');
       var id = rowEl.find('.id').text();
       var newName = rowEl.find('.name').val();

       $.ajax({
           url: '/materials/' + id,
           method: 'PUT',
           contentType: 'application/json',
           data: JSON.stringify({ newName: newName}),
           success: function(response) {
               console.log(response);
               $('#get-button').click();
           }
       });  
    });

    
    $('table').on('click', '.delete-button', function() {
       var rowEl = $(this).closest('tr');
       var id = rowEl.find('.id').text();

       $.ajax({
           url: '/materials/' + id,
           method: 'DELETE',
           contentType: 'application/json',
           success: function(response) {
               console.log(response);
               $('#get-button').click();
           }
       });
    });
});

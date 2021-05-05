//JS to add to make materialize functional
M.AutoInit();
$(document).ready(function(){
    $('.materialboxed').materialbox();
  });
  $(document).ready(function(){
             
    $('.modal').modal();
   $('#modal1').modal('open');
  $('#cls').click(function(){
      $('#modal1').modal('close');                   
  });
});
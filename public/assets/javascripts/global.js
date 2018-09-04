$(function(){
  showPassword()
});

function showPassword(){
  $("input[type = password]").hover(function(){
    $(this).attr("type","text");
  },function(){
    $(this).attr("type","password");
  });
}
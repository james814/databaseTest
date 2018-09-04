var firebaseReg = {
  account: $("#account").val(),
  pwd: $("#pwd").val(),
  user: firebase.auth().currentUser,
  init: function(){
    self = this;
    firebase.auth()
      .createUserWithEmailAndPassword(self.account, self.pwd)
      .then(function(result){
        //驗證信
        self.user.sendEmailVerification()
          .then(function(){
            self.regSuccess();
          })
          .catch(function(error){
            self.emailVerifyFail();
          });
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMsg = error.message; 
        self.regFail(errorCode);
      });
  },
  regSuccess: function(){
    //認證信已寄出
  },
  regFail: function(){
    //form錯誤處理
    //可用JS先擋
  },
  emailVerifyFail: function(){
    //出了一點錯誤請稍後在試
  },
  checkRegForm: function(){
    self = this;
    self.account.indexOf('@') = -1 && setErrorHtml(self.account, "The email address is badly formatted.");//auth/invalid-email
    self.pwd.length <= 6 && setErrorHtml(self.pwd, "Password should be at least 6 characters.");//auth/weak-password
    //callback: The email address is already in use by another account.  auth/email-already-in-use
  },
  setErrorHtml: function(e, text){
    e.wrap('<div class="input-wrap"></div>')
     .append('<div class="err-text-wrap"><div class="err-text-area"><span class="err-text"></span></div></div>');
    $(".err-text").html(text);
  },
  clearError: function(){
    $(".err-text-wrap").remove();
  }
}
const person = (function(arg){
  const name = arg;
  return{
    getName:function(){
      return name;
    }
  }
})();
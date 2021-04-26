module.exports = {
  copyObject: function(object){
    const ret = {};
  
    for(const key in object){
      if(typeof object[key] === 'object'){
        ret[key] = this.copyObject(object[key]);
      }else{
        ret[key] = object[key];
      }
    }

    return ret;
  }
}
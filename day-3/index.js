var options = {
  'hummus': 1,
  'hamotzim': 2,
  'salat':4,
  'chips':8
};

var pita = 9;

function is(obj, option){
    return !!(obj & options[option]);
}

function set(obj, option){
    if(is(obj, option)){
     return obj;
    }
    return(obj | options[option]);
}

function setOff(obj, option){
    if(is(obj, option)){
        return(obj ^ options[option]);
    }
    return obj;
}

is(pita, 'hummus');
set(pita, 'salat');
setOff(pita, 'chips');

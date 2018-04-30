function logging(log, extra, level) {
    var myLog = log;
    if(level >=1){
        myLog = log + extra;
    }
    console.log(myLog);
}

logging('error:', 'we have addToSide wrong with the server', 1);


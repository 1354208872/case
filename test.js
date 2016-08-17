/**
 * Created by momo on 2016/7/15.
 */
var name='Word';
(function () {
    if(typeof name==='undefined'){
        var name='Jack';
        console.log('Goodbye'+name);
    }
    else{
        console.log('Hello'+name);
    }
})();
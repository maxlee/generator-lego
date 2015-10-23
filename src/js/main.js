"use strict";

(function( M ) {

    var name = 'IIFE';
    M.type = 'Red';
    M.say = function(){
        console.log( M.type + ' say is ' + name );
    }

}( window.M = window.M || {} ));
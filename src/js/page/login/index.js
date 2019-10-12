var $=require('jquery');

var login = function(){
    console.log('hello login');
    $('div').css('background-color','orange');
    $('body').append("<div>hello login</div>");
}

module.exports = login;

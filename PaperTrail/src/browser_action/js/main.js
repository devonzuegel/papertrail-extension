window.addEventListener('DOMContentLoaded', function() {
    var target = document.querySelector('#target');

    // target.addEventListener('click', function() {
    	alert('HI!');
    // });
});


$(document).ready(function(){
    $(":button").click(function(){
        alert("test");
//         //more code here...
    });
});


chrome.browserAction.onClicked.addListener(function() {
  // alert('The browser action was clicked! Yay!');
  console.log('xxx');
});

//     $('#target').click(function() {
// 	  	alert('target clicked!');
//     });


// (function(window, document, undefined) {

//   /* MainView handles all the logic. */
//   $(document).ready(function() {
//     CompanyProfile.render($(document.body));
//     console.log('xxx');
//   });

// })(this, this.document);
// Question:  I understand this is a IEFE.  We're padding jQuery to it.  The $(function() { part i'm trying to figure out what is going on.
// (function() {
//     $(function() {
//         // jQuery code
//     });
// })(jQuery);

/* global $ */  // Ths stops cloud9 from barking at jQuery's $ being not defined.
/* global jQuery */  // Ths stops cloud9 from barking at jQuery's $ being not defined.

(function() {
    $(function() {
        $("#tabs").tabs({
            event: "mouseover"
        });

        // Storage Object

        var util = {

            dataStore: function() {

                var isActive = false;
                var players = []; // blank array

                for (var i = 0; i < 12; i++) {
                    var player = {
                        fullName: 'Player ' + (i + 1),
                        jerseyNumber: i + 1,
                        isActive: !isActive,
                        onField: false
                    }
                    isActive = !isActive;
                    players.push(player);
                }
                console.dir(players);
                return players;
            }
        };

        // App Object
        var App = {

            init: function() {
                this.players = util.dataStore();
                this.renderTabs();
            },
            bind: function() {

            },
            renderTabs: function() {
                var allPlayerHtml = $('#div-all-players');
                var activePlayers = $('#div-active-players');
                this.players.forEach(function(player) {
                    allPlayerHtml.append('<li>( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( ' + (player.isActive ? 'Active' : 'Inactive') + ' )</li>');
                    
                });
                
            }
        };

        App.init();
    });


    $('body')
    .on('mouseover', "#tabs a", function(e) {
        console.log('hovered');
        console.log($(this));
    });

})(jQuery);

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
                        id: i,
                        fullName: 'Player ' + i,
                        jerseyNumber: i,
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
                this.bind();
                this.renderTabs();
            },
            bind: function() {
                console.log('bind things');
                $('#tabs').on('click', '.toggle-player', this.togglePlayer.bind(this));
            },
            togglePlayer: function(e) {
                var playerIndex = this.getPlayerIndexFromEl(e.target);
                
                this.players[playerIndex].isActive = !this.players[playerIndex].isActive;
                console.log(this.players);
                this.renderTabs();
            },
            getPlayerIndexFromEl: function(el) {
                var clickedPlayerId = $(el).closest('li').data('id'); 
                console.log(clickedPlayerId);
                var players = this.players;
                var i = players.length;
                var playerId;
                
                while(i--) {
                    playerId = 'player-' + players[i].id;
                    if(playerId === clickedPlayerId) {
                        return i;
                    }
                }
                // return playerIndex;
            },
            
            renderTabs: function() {
                var allPlayersDiv = $('#div-all-players').html(''),
                    activePlayersDiv = $('#div-active-players').html(''),
                    inactivePlayersDiv = $('#div-inactive-players').html('');
                    
                this.players.forEach(function(player) {
                    
                    if(player.isActive) {
                        allPlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + '</span> )</li>');                                                
                        activePlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + ' )</span></li>');                        
                    } else if(!player.isActive) {
                        allPlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + '</span> )</li>');                                                
                        inactivePlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + ' )</span></li>');                                                
                    } 
                });
            }
        };
        App.init();
    });


    // $('body')
    // .on('mouseover', "#tabs a", function(e) {
    //     console.log('hovered');
    //     console.log($(this));
    // });

})(jQuery);

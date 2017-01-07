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

                for (var i = 0; i < 10; i++) {
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
                debugger
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
                    inactivePlayersDiv = $('#div-inactive-players').html(''),
                    allPlayersCountSpan = $('.span-all-players-count'),
                    activePlayersCountSpan = $('.span-active-players-count'),
                    inactivePlayersCountSpan = $('.span-inactive-players-count'),
                    allPlayersCount = this.players.length,
                    activePlayersCount = 0,
                    inactivePlayersCount = 0;
                    
                this.players.forEach(function(player) {
                    
                    if(player.isActive) {
                        allPlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + '</span> )</li>');                                                
                        activePlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + ' )</span></li>');                        
                        activePlayersCount++;
                    } else if(!player.isActive) {
                        allPlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + '</span> )</li>');                                                
                        inactivePlayersDiv.append('<li data-id="player-' + player.jerseyNumber + '">( Jersey #' + player.jerseyNumber + ' ) - ' + player.fullName + ' - ( <span class="toggle-player">' + (player.isActive ? 'Active' : 'Inactive') + ' )</span></li>');                                                
                        inactivePlayersCount++;
                                            } 
                });

                if(activePlayersCount === 0) {
                    $('.active-player-error').css('display','block');
                } else {
                    $('.active-player-error').css('display','none');                    
                }
                

                if(inactivePlayersCount === 0) {
                    $('.inactive-player-notification').css('display','block');
                } else {
                    $('.inactive-player-notification').css('display','none');                    
                }
                
                
                allPlayersCountSpan.html(allPlayersCount);
                activePlayersCountSpan.html(activePlayersCount);
                inactivePlayersCountSpan.html(inactivePlayersCount);
    
    
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

if (Meteor.isClient) {

  function getPlayer() {
    return window.location.href.split("/").slice(-1)[0];
  };

  Template.rowshambow.events({
    'click #rock': function () {
      Meteor.call("setPlayerChoice", getPlayer(), "rock");
    },
    'click #paper': function () {
      Meteor.call("setPlayerChoice", getPlayer(), "paper");
    },
    'click #scissors': function () {
      Meteor.call("setPlayerChoice", getPlayer(), "scissors");
    },
    'click #check': function () {
      Meteor.call("getWinner", getPlayer(), function(err, res) {
        alert(res);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    player1Choice = "none";
    player2Choice = "none";
  });
}

Meteor.methods({
  setPlayerChoice: function (player, choice) {
    if (player == "player1")
      player1Choice = choice;
    else if (player == "player2")
      player2Choice = choice;
  },
  getWinner: function () {
    if (player1Choice == "rock" && player2Choice == "paper")
      return "player1: rock\nplayer2: paper\nwinner: player2";
    else if (player1Choice == "rock" && player2Choice == "scissors")
      return "player1: rock\nplayer2: scissors\nwinner: player1";
    else if (player1Choice == "paper" && player2Choice == "rock")
      return "player1: paper\nplayer2: rock\nwinner: player1";
    else if (player1Choice == "paper" && player2Choice == "scissors")
      return "player1: paper\nplayer2: scissors\nwinner: player2";
    else if (player1Choice == "scissors" && player2Choice == "rock")
      return "player1: scissors\nplayer2: rock\nwinner: player2";
    else if (player1Choice == "scissors" && player2Choice == "paper")
      return "player1: scissors\nplayer2: paper\nwinner: player1";
    else
      return "no winner";
  }
});
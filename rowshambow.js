Rounds = new Mongo.Collection("rounds");

if (Meteor.isClient) {

  function getPlayer() {
    return window.location.href.split("/").slice(-1)[0];
  };

  Template.rowshambow.events({
    "click #rock": function () {
      alert("You chose rock!");
      Meteor.call("setPlayerChoice", getPlayer(), 0);
    },
    "click #paper": function () {
      alert("You chose paper!");
      Meteor.call("setPlayerChoice", getPlayer(), 1);
    },
    "click #scissors": function () {
      alert("You chose scissors!");
      Meteor.call("setPlayerChoice", getPlayer(), 2);
    }
  });
  
  Template.rowshambow.helpers({
    rounds: function () {
      return Rounds.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    player1Value = -1;
    player2Value = -1;
    roundNo = 1;
  });
}

Meteor.methods({
  setPlayerChoice: function (player, choice) {
    if (player == "player1")
      player1Value = choice;
    else if (player == "player2")
      player2Value = choice;
    if (player1Value >= 0 && player2Value >= 0) {
      winnerValue = (player1Value - player2Value + 3) % 3;
      switch (player1Value) {
        case 0:
          player1 = "rock";
          break;
        case 1:
          player1 = "paper";
          break;
        case 2:
          player1 = "scissors";
      }
      switch (player2Value) {
        case 0:
          player2 = "rock";
          break;
        case 1:
          player2 = "paper";
          break;
        case 2:
          player2 = "scissors";
      }
      switch (winnerValue) {
        case 0:
          winner = "none";
          break;
        case 1:
          winner = "Player 1";
          break;
        case 2:
          winner = "Player 2";
      }
      Rounds.insert({
        roundNo: roundNo++,
        player1: player1,
        player2: player2,
        winner: winner
      });
      player1Value = -1;
      player2Value = -2;
    }
  }
});
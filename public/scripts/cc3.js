$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: '/getJokes',
    success: function(response){
      console.log('AJAX GET success.');
      var jokeArray = response.jokeArray;
      updateDisplay(jokeArray);
    },
    error: function(){
      console.log('AJAX error in GET method.');
    }
  });
});

$(document).on('click', '#addJokeButton', function(){
  console.log('addJokeButton on click');
  var newJoke = assembleNewJoke();
  $.ajax({
    type: "POST",
    data: newJoke,
    url: '/postJoke',
    success: function(response){
      console.log('AJAX POST success. Response: ', response);
      var newJokeArray = response.jokeArray;
      updateDisplay(newJokeArray);
    },
    error: function(){
      console.log('AJAX error in POST method.');
    }
  });
});

var assembleNewJoke = function(){
  var newAuthor = $('#whoseJokeIn').val();
  var newQuestion = $('#questionIn').val();
  var newPunchline = $('#punchlineIn').val();
  return {
    whoseJoke: newAuthor,
    jokeQuestion: newQuestion,
    punchLine: newPunchline
  };
};

var updateDisplay = function(array){
  var outputText = '<table><tr><th class="author-column">Author</th><th class="question-column">Question</th><th class="punchline-column">Punchline</th></tr>';
  for (var i = 0; i < array.length; i++) {
    outputText += '<tr><td>' + array[i].whoseJoke + '</td><td>' + array[i].jokeQuestion + '</td><td>' + array[i].punchLine + '</td></tr>';
  }
  outputText += '</table>';
  $('#outputDiv').html(outputText);
};

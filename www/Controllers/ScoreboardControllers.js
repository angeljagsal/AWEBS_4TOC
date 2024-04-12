function showScoreboard() {
    $.ajax({
        url: getScoreboard,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var scoreboardDiv = $('#scoreboard');
            $.each(data, function(index, score) {
                var position = index + 1;
                scoreboardDiv.append('<p>' + position + '. ' + score.Username + ': ' + score.Score + '</p>');
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud:', textStatus, errorThrown);
        }
    });
}

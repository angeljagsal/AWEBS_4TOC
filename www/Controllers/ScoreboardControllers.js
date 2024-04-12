function showScoreboard() {
    $.ajax({
        url: getScoreboard,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var scoreboardDiv = $('#scoreboard');
            $.each(data, function(index, score) {
                scoreboardDiv.append('<p>' + score.Username + ': ' + score.Score + '</p>');
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud:', textStatus, errorThrown);
        }
    });
}

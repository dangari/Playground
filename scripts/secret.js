var matrixShow = false;
$(document).ready(function() {
    var s = window.screen;
    var width = q.width = s.width;
    var height = 280;
    var yPositions = Array(300).join(0).split('');
    var ctx = q.getContext('2d');
    var draw = function() {
        ctx.fillStyle = 'rgba(0,0,0,.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#0F0';
        ctx.font = '10pt Georgia';
        yPositions.map(function(y, index) {
            text = String.fromCharCode(1e2 + Math.random() * 33);
            x = (index * 10) + 10;
            q.getContext('2d').fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                yPositions[index] = 0;
            } else {
                yPositions[index] = y + 10;
            }
        });
    };
    RunMatrix();

    function RunMatrix() {
        if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
        Game_Interval = setInterval(draw, 33);
    }

    function StopMatrix() {
        clearInterval(Game_Interval);
    }
    $("#footer").click(function() {
        if (matrixShow) {
            $('header').hide();
            $("#nav").attr("data-offset-top", -10);
            $(".secret").hide();
            StopMatrix();
            matrixShow = false;
        } else {
            $(".secret").show();
            $('header').show();
            var headerheigt = $('header').height();
            $("#nav").attr("data-offset-top", headerheigt);
            RunMatrix();
            matrixShow = true;
        }
    });
});

//No-To-Vote-Buying Game


whack_game();

function whack_game() {

  var zone_a = 0;
  var zone_b = 0;
  var zone_c = 0;
  $('#score').data('score', 0);
  $('#star-holder').data('missed', 0);
  var hand_a;
  var hand_b;
  var hand_c;
  var pop_timeout_a;
  var pop_timeout_b;
  var pop_timeout_c;
  var wacked_timeout_a;
  var wacked_timeout_b;
  var wacked_timeout_c;
  var score;
  var level;
  var round_2_started = false;
  var round_3_started = false;
  var round_4_started = false;
  var audio_intro = $("#audio-intro");
  var audio_in_game = $("#audio-in-game");
  audio_intro[0].volume = 0.3;
  audio_in_game[0].volume = 0.3;

  var isTouch = true;
  window.addEventListener('mousemove', function mouseMoveDetector() {
    isTouch = false;
    window.removeEventListener('mousemove', mouseMoveDetector);
  });

  $('#confetti').hide();

  /* game_speed */
  var control_timeout = 2700;
  var control_delay = 1500;
  var control_motion = 500;

  /*
  $('#game-intro').hide();
  round_1();
  */

  intro();

  function intro() {
    
    var elem = $('#progress-bar');
    var width = 1;
    $('.btn-intro').hide();
    
    audio_intro.get(0).play();
    var id = setInterval(bar, 50);
    
    function bar() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.css( 'width', width + '%' ); 
      }
    }

    var start_delay_2 = setTimeout(function(){
      $("#loading").html("&nbsp");
      $('.btn-intro').show();
      
      setInterval( function() {
      $('.btn-intro').toggleClass("blinker");
      }, 300);
    }, 5000);
  }

  $('.btn-intro').click(function() {
    audio_intro.animate({volume: 0}, 1000);
    $("#game-intro").fadeOut(1000);
    
    var intro_out = setTimeout( function () {
      audio_intro.get(0).pause();
      audio_in_game.get(0).play();
      round_1();  
    }, 1500);
  });

  $('.btn-play').click(function() {
    zone_a = 0;
    zone_b = 0;
    zone_c = 0;
    round_2_started = false;
    round_3_started = false;
    round_4_started = false;
    $('#score').data('score', 0);
    $('#star-holder').data('missed', 0);
    $('#confetti').hide();
    $('#game-level').html("Level 1");
    $("#star-1").css('background-image','url(img/star.png)');
    $("#star-2").css('background-image','url(img/star.png)');
    $("#star-3").css('background-image','url(img/star.png)');
    /* game_speed */
    control_timeout = 2700;
    control_delay = 1500;
    control_motion = 500;
    audio_in_game[0].volume = 0.3;
    $('#info-educate').hide();
    audio_intro.get(0).pause();
    audio_in_game.get(0).play();
    round_1();

  });

  var applause = new Audio("audio/applause.wav");
  var whack = new Audio("audio/whack.wav");
  var game_over = new Audio("audio/game_over.wav");
  var max = 40;



  function round_1(){
    score = $('#score').data('score');
    if( !won() && $('#star-holder').data('missed') < 3){
      level = 1;
      randomizer_a(zone_a);
    }
    if(score >= 10 && round_2_started == false){
      round_2_started = true;
      round_2();
    }

    if(score >= 20 && round_3_started == false){
      level = 3;
      $('#game-level').html("Level " + level);
      blink();
      round_3_started = true;
      round_3();
    }

    if(score >= 30 && round_4_started == false){
        round_4_started = true;
        level = 4;
        $('#game-level').html("Level " + level);
        blink();
        control_timeout = 2000;
        control_delay = 1000;
        control_motion = 400;
    }

  }

  // make this work
  // make this work
  // make this work
  // make this work

  function round_2(){
    score = $('#score').data('score');
    if( !won() && $('#star-holder').data('missed') < 3){
      if(score == 10){
        level = 2;
        $('#game-level').html("Level " + level);
        blink();
        }
      randomizer_b(zone_b);
    }
    if(score >= 20 && round_3_started == false){
      level = 3;
      $('#game-level').html("Level " + level);
      blink();
      round_3_started = true;
      round_3();
    }
    if(score >= 30 && round_4_started == false){
        round_4_started = true;
        level = 4;
        $('#game-level').html("Level " + level);
        blink();
        control_timeout = 2000;
        control_delay = 1000;
        control_motion = 400;
    }
  }

  function round_3(){
    score = $('#score').data('score');
    if( !won() && $('#star-holder').data('missed') < 3){
      randomizer_c(zone_c);
      if(score >= 30 && round_4_started == false){
        round_4_started = true;
        level = 4;
        $('#game-level').html("Level " + level);
        blink();
        control_timeout = 2200;
        control_delay = 1200;
        control_motion = 700;
      }
    }
  }

  function blink(){
    var blinking = $('#game-level');
          var blink_time1 = setTimeout(function() {
            blinking.css("color", "#68a4ff");
            var blink_time2 = setTimeout(function() {
              blinking.css("color", "white");
              var blink_time3 = setTimeout(function() {
                blinking.css("color", "#68a4ff");
                var blink_time4 = setTimeout(function() {
                  blinking.css("color", "white");
                },150);
              },150);
            },150);
          },150);
  }

  function blink_ending(){
    var blinking = $('#game-level');
    blinking.fadeTo(100, 0.1).fadeTo(200, 1.0).fadeTo(100, 0.1).fadeTo(200, 1.0);
  }

  function won(){
    if( $('#star-holder').data('missed') < 3 && $('#score').data('score') >= max ) {
      hand_a.stop(true, false);
      hand_b.stop(true, false);
      hand_c.stop(true, false);
      
      applause.play();
      $('#game-level').html("You Won!");
      $('#score').html(max);

      blink_ending();
          
      $('#confetti').show(); // Confetti

      hand_a.hide();
      hand_b.hide();
      hand_c.hide();
      $(".info-top-para").hide();
      $(".money-pair-1").hide();
      $(".money-pair-2").hide();
      $(".money-pair-3").hide();
      $("#imprisonment").hide();
      $(".info-mid-para").hide();
      $(".btn-play").hide();
      $('#win-message').html("Game won<br>Hope for the nation has been restored!");

      var pop_timeout_won = setTimeout(function() {
        //audio_in_game.animate({volume: 0}, 2000);

        var pop_timeout_won_2 = setTimeout(function() { 
          audio_in_game.get(0).pause();
          audio_in_game.get(0).currentTime = 0;
          audio_intro.get(0).currentTime = 0;
          audio_intro.volume = 0.3;
          audio_intro.get(0).play();
          $("#info-educate")
          .slideDown({ duration: 1000, queue: false })
          ;

          var pop_timeout_won_3 = setTimeout(function() { 
            $(".info-top-para")
              .fadeIn({ duration: 1500, queue: false })
            ;
            $(".money-pair-1")
              .delay({ duration: 1000 })
              .show()
            ;
            var pop_timeout_won_5 = setTimeout(function() { 
              $(".money-pair-2")
                .delay({ duration: 500})
                .show()
              ;
              var pop_timeout_won_6 = setTimeout(function() { 
                $(".money-pair-3")
                  .delay({ duration: 500})
                  .show()
                ;
                var pop_timeout_won_7 = setTimeout(function() { 
                  $(".info-mid-para")
                  .fadeIn({ duration: 1000, queue: false })
                  ;
                  var pop_timeout_won_8 = setTimeout(function() { 
                    $("#imprisonment")
                    .fadeIn({ duration: 1000, queue: false })
                    ;
                    var pop_timeout_won_8 = setTimeout(function() { 
                      $(".btn-play")
                      .fadeIn({ duration: 1000, queue: false })
                      ;
                      },2000);
                  },1000);
                },1000);
              },500);
            },500);
          },1500);
        },1000);
      }, 4000);
      
      return true;
    }
    return false;
  }

  $('#play-game').click(function() {
      whack.play();
  });

  function missed(){

    var miss = $('#star-holder').data('missed');
    miss++;
    $('#star-holder').data('missed', miss);
    if( !won() && miss == 1) {
      $("#star-1").css('background-image','url(img/star_blank.png)');
    }
    if( !won() && miss == 2) {
      $("#star-1").css('background-image','url(img/star_blank.png)');   
      $("#star-2").css('background-image','url(img/star_blank.png)');
    }
    if( !won() && miss == 3 ) {

      if (hand_a) {
      hand_a.stop(true, false);
      }
      if (hand_b) {
        hand_b.stop(true, false);
      }
      if (hand_c) {
        hand_c.stop(true, false);
      }

      $(".hand-row-a").css('display','none');
      $(".hand-row-b").css('display','none');
      $(".hand-row-c").css('display','none');
      $("#star-1").css('background-image','url(img/star_blank.png)');
      $("#star-2").css('background-image','url(img/star_blank.png)');
      $("#star-3").css('background-image','url(img/star_blank.png)');
      $('#game-level').html("Game Over");
      game_over.play();
      blink_ending();
      // restart
      $(".info-top-para").hide();
      $(".money-pair-1").hide();
      $(".money-pair-2").hide();
      $(".money-pair-3").hide();
      $("#imprisonment").hide();
      $(".info-mid-para").hide();
      $(".btn-play").hide();
      $('#win-message').html("Don't sell your vote!");

      
       
      var pop_timeout_won = setTimeout(function() {
        audio_in_game.animate({volume: 0}, 2000);
      
        var pop_timeout_won_2 = setTimeout(function() { 
        
          audio_in_game.get(0).pause();
          audio_in_game.get(0).currentTime = 0;
          audio_intro.get(0).currentTime = 0;
          audio_intro.volume = 0.3;
          audio_intro.get(0).play();
          $("#info-educate")
          .slideDown({ duration: 1000, queue: false })
          ;

          var pop_timeout_won_3 = setTimeout(function() { 
            $(".info-top-para")
              .fadeIn({ duration: 1500, queue: false })
            ;
            $(".money-pair-1")
              .delay({ duration: 1000 })
              .show()
            ;
            var pop_timeout_won_5 = setTimeout(function() { 
              $(".money-pair-2")
                .delay({ duration: 500})
                .show()
              ;
              var pop_timeout_won_6 = setTimeout(function() { 
                $(".money-pair-3")
                  .delay({ duration: 500})
                  .show()
                ;
                var pop_timeout_won_7 = setTimeout(function() { 
                  $(".info-mid-para")
                  .fadeIn({ duration: 1000, queue: false })
                  ;
                  var pop_timeout_won_8 = setTimeout(function() { 
                    $("#imprisonment")
                    .fadeIn({ duration: 1000, queue: false })
                    ;
                    var pop_timeout_won_8 = setTimeout(function() { 
                      $(".btn-play")
                      .fadeIn({ duration: 1000, queue: false })
                      ;
                      },2000);
                  },1000);
                },1000);
              },500);
            },500);
          },1500);
        },1000);
      }, 4000);

      return true;

    }
    else {
      return false;
    }
  }


  //level 1
  function motion_a(zone_a){
    var score_now = $('#score').data('score');
    if(zone_a == 1) {
      hand_a = $("#hand-a-1");
      whack_mobile_a = $("#whack-mobile-a-1");
    }
    if(zone_a == 2) {
      hand_a = $("#hand-a-2");
      whack_mobile_a = $("#whack-mobile-a-2");
    }
    if(zone_a == 3) {
      hand_a = $("#hand-a-3");
      whack_mobile_a = $("#whack-mobile-a-3");
    }
    whack_mobile_a.hide();
    $(".hand-row-a").css('display','none');  

  //animation with interval
    
    if(score_now <= max) {
      hand_a.children('.clicked-no').hide();
      hand_a
        .css({
          top: 0, marginTop: 0, display: 'block'
          })
        .animate({
          top : -142} //moves up
          , control_motion
          )
        .animate({
          'Opacity' : 1} //delay
          , control_delay
          )
        .animate({
          top : 0} //moves down
          , control_motion
          )
        .queue(function(){
          missed();
          round_1();
        })  
        ;
      //randomizer(zone_a);

      pop_timeout_a = setTimeout(function() { 
        
      }, control_timeout);
    }

  // When hand_a is clicked
    hand_a.one( "click", function() {
      if(isTouch){
        whack_mobile_a.show();
      }
      else {
        hand_a.children('.clicked-no').show();
      }
      hand_a.stop().clearQueue();
      score = $('#score').data('score');
      if (score <= max) {
        score++;
        $('#score').data('score', score);
        $('#score').html(score);

        wacked_timeout_a = setTimeout(function() {
          hand_a
            .animate({marginTop : 142}, 500) //moves down fast
            .queue(function(){
              whack_mobile_a.hide();
              won();
              round_1();
            });
        }, 500);
      }
    });
  }

  //level 2
  function motion_b(zone_b){
    var score_now = $('#score').data('score');
    if(zone_b == 4) {
      hand_b = $("#hand-b-1");
      whack_mobile_b = $("#whack-mobile-b-1");
    }
    if(zone_b == 5) {
      hand_b = $("#hand-b-2");
      whack_mobile_b = $("#whack-mobile-b-2");
    }
    if(zone_b == 6) {
      hand_b = $("#hand-b-3");
      whack_mobile_b = $("#whack-mobile-b-3");
    }
    whack_mobile_b.hide();
    $(".hand-row-b").css('display','none');
    

  //animation with interval

    if(score_now <= max) {
      hand_b.children('.clicked-no').hide();
      hand_b
        .css({
          top: 0, marginTop: 0, borderColor: 'blue', display: 'block'
          })
        .animate({
          top : -142} //moves up
          , control_motion
          )
        .animate({
          'Opacity' : 1} //delay
          , control_delay
          )
        .animate({
          top : 0} //moves down
          , control_motion
          )
        .queue(function(){
          missed();
          round_2();
        })  
        ;
      //randomizer(zone_a);

      pop_timeout_b = setTimeout(function() { 
        
      }, control_timeout);
    }

  // When hand is clicked
    hand_b.one( "click", function() {
      if(isTouch){
        whack_mobile_b.show();
      }
      else {
        hand_b.children('.clicked-no').show();
      }
      hand_b.stop().clearQueue();

      score = $('#score').data('score');
      if (score <= max) {
        score++;
      
        $('#score').data('score', score);
        $('#score').html(score);

        wacked_timeout_b = setTimeout(function() {
          hand_b
            .animate({marginTop : 142}, 500) //moves down fast
            .queue(function(){
              whack_mobile_b.hide();
              won();
              round_2();
            });
        }, 500)
      }
    });
  }

  //level 3
  function motion_c(zone_c){
    var score_now = $('#score').data('score');
    if(zone_c == 7) {
      hand_c = $("#hand-c-1");
      whack_mobile_c = $("#whack-mobile-c-1");
    }
    if(zone_c == 8) {
      hand_c = $("#hand-c-2");
      whack_mobile_c = $("#whack-mobile-c-2");
    }
    if(zone_c == 9) {
      hand_c = $("#hand-c-3");
      whack_mobile_c = $("#whack-mobile-c-3");
    }
    whack_mobile_c.hide();
    $(".hand-row-c").css('display','none');
    

  //animation with interval
    if(score_now <= max) {
      hand_c.children('.clicked-no').hide();
      hand_c
        .css({
          top: 0, marginTop: 0, display: 'block'
          })
        .animate({
          top : -142} //moves up
          , control_motion
          )
        .animate({
          'Opacity' : 1} //delay
          , control_delay
          )
        .animate({
          top : 0} //moves down
          , control_motion
          )
        .queue(function(){
          missed();
          round_3();
        })  
        ;

      pop_timeout_c = setTimeout(function() { 
      }, control_timeout);
    }

  // When hand is clicked
    hand_c.one( "click", function() {
      if(isTouch){
        whack_mobile_c.show();
      }
      else {
        hand_c.children('.clicked-no').show();
      }
      hand_c.stop().clearQueue();

      score = $('#score').data('score');
      if (score <= max) {
        score++;
      
        $('#score').data('score', score);
        $('#score').html(score);

        wacked_timeout_c = setTimeout(function() {
          hand_c
            .animate({marginTop : 142}, 500) //moves down fast
            .queue(function(){
              whack_mobile_c.hide();
              won();
              round_3();
            });
        }, 500)
      }
    });
  }

  // Level 1
  var random_local_a;
  var random_local_b;
  var random_local_c;
  function randomizer_a(random_local_a){
    clearTimeout(pop_timeout_a);
    clearTimeout(wacked_timeout_a);
    if(hand_a) {
      hand_a.clearQueue();
    }
    do{
      random_local_a = Math.floor((Math.random() * 3) + 1);
      }
    while(random_local_a == zone_a)

    zone_a = random_local_a;
    motion_a(zone_a); 
  }

  //Level 2
  function randomizer_b(random_local_b){
    clearTimeout(pop_timeout_b);
    clearTimeout(wacked_timeout_b);
    if(hand_b) {
      hand_b.clearQueue();
    }
    do{
      random_local_b = Math.floor((Math.random() * 3) + 4);
      }
    while(random_local_b == zone_b)

    zone_b = random_local_b;
    motion_b(zone_b);
  }

  //Level 3
  function randomizer_c(random_local_c){
    clearTimeout(pop_timeout_c);
    clearTimeout(wacked_timeout_c);
    if(hand_c) {
      hand_c.clearQueue();
    }
    do{
      random_local_c = Math.floor((Math.random() * 3) + 7);
      }
    while(random_local_c == zone_c)
   
    zone_c = random_local_c;
    motion_c(zone_c);
  }

}






//confetti

win_confetti()

function win_confetti() {

  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

  NUM_CONFETTI = 350;

  COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.5;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti);
    }
    return results;
  })();

  window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();

}
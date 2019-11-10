
$(document).ready(function () {
  var mycolors = ['rgba(85, 139, 255, 1)', 
  '#48ffc4',
  'rgba(255, 231, 76, 1)',
  'rgba(166, 130, 255, 1)',
  'rgba(12, 10, 62, 1)'];
  var footercolor = "#3E3750";
  $(".infobox").on("mouseenter", function () {
    TweenMax.to($(this).find(".outline"), 0.3, { transform: "translate(5px, 5px)" });
  }).on("mouseleave", function () {
    TweenMax.to($(this).find(".outline"), 0.3, { transform: "translate(0, 0)" });
  });
  var $social = $(".sociallist i");
  $($social).hover(function () {
    if ($(this).hasClass("fa-facebook-f")) {
      TweenMax.to(this, 0.2, { color: "#3b5998", transform: "scale(1.1)" });
    } else if ($(this).hasClass("fa-instagram")) {
      TweenMax.to(this, 0.2, { color: "#8a3ab9", transform: "scale(1.1)" });
    } else if ($(this).hasClass("fa-linkedin-in")) {
      TweenMax.to(this, 0.2, { color: "#0077B5", transform: "scale(1.1)" });
    }

  }, function () {
    TweenMax.to(this, 0.2, { color: "#fff", transform: "scale(1)" });
  });

  $(".links .level-item").hover(function () {
    TweenMax.to($(this).find(".navbox"), 0.5, { top: '0', ease: Expo.easeOut });
    TweenMax.to($(this).find("a"), 0.15, { color: 'white' });
  }, function () {
    TweenMax.to($(this).find(".navbox"), 0.7, { top: '-112px', ease: Expo.easeOut });
    TweenMax.to($(this).find("a"), 0.25, { color: 'black', delay: 0.05 });
  });
  $(".links .level-item .navbox").click(function () {
    var sscrollto = "#" + $(this).attr('data-scroll');
    TweenMax.to(window, 1.5, { scrollTo: sscrollto, ease: Power2.easeOut });
  });
  $(".bg-text:not(.noanim)").paroller({
    factor: 0.15,            // multiplier for scrolling speed and offset
    type: 'foreground',     // background, foreground
    direction: 'vertical', // vertical, horizontal
    transition: 'transform 0.4s ease' // CSS transition, added on elements where type:'foreground'
  });
  /*  $(".sidetext p").paroller({
               factor: 0.4,            // multiplier for scrolling speed and offset
               type: 'foreground',     // background, foreground
               direction: 'vertical', // vertical, horizontal
               transition: 'transform 1s ease' // CSS transition, added on elements where type:'foreground'
           });*/
    $("#about .info").paroller({
            factor: 0.07,            // multiplier for scrolling speed and offset
            type: 'foreground',     // background, foreground
            direction: 'vertical', // vertical, horizontal
            transition: 'transform 0.6s ease' // CSS transition, added on elements where type:'foreground'
        });
  var controller = new ScrollMagic.Controller();
  new ScrollMagic.Scene({ // FADE WORK INTO VIEW
    triggerElement: "#work"
  })
    .setTween("#work .bg-text", 0.3, { opacity: 1 }) // trigger a TweenMax.to tween
    .offset(130)
  //  .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

  new ScrollMagic.Scene({ // CHANGE FOOTER COLOR TO DARK
    triggerElement: "#footer"
  })
    .on('enter', footerenter)
    .on('leave', footerleave)
   .triggerHook(0.3)
   // .addIndicators()
    .addTo(controller);
    var index = 0;
    var lastsection = null;
      $('.section').each(function(){ // EACH SECTION PIN SIDETEXT
        var $elm = this;
        var $sidetext = $($elm).find('.sidetext p');
        var scene = new ScrollMagic.Scene({triggerElement: $elm, duration: $($elm).height()})
          // .addIndicators()
           .on('enter', function(event) { // === START === UPON ENTERING SCENE, FROM EITHER DIRECTION
              var smod = 1;
              if(event.scrollDirection == "REVERSE") {
                smod = -1;
                
              }
              if(lastsection != $elm)
              {
                 index += smod;
                 lastsection = $elm;
              }
             // recolorLogo(mycolors[index-1], 0.4);
              TweenMax.to('.sidestripe', 0.65, { backgroundColor: mycolors[index-1]});
              TweenMax.set($($sidetext), {clearProps: "y"});
            TweenMax.from($($sidetext), 1, { ease: Power2.easeOut, y: smod*$(window).height()/2,onStart: function() { // STARTING ANIM
              $($sidetext).addClass('active');
            }, onComplete: function() {
             
            } });
           }) // === END  === 
           .on('leave', function(event) { // == LEAVING THE SCENE
            var smod = 1;
            if(event.scrollDirection == "REVERSE") {
              smod = -1;
            }
         //   index -= smod;
             TweenMax.to($($sidetext), 1 , {y: smod*-$(window).height()/2-100, onComplete: function() { 
               $($sidetext).removeClass('active');
              TweenMax.set($($sidetext), {clearProps: "y"});
            }});
             
           })
            .addTo(controller);
    });

});

var tweens = new TimelineMax({ paused: true});
tweens.to("body", 0.4, { backgroundColor: "#3E3750" },0)
.to(".sidebar>.topbar", 0.4, {backgroundImage: "linear-gradient(to top, rgba(255,0,0,0) 0%, rgba(62,55,80,1) 40%)"},0)
.to(".sidebar>.bottombar", 0.4, {backgroundImage: "linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(62,55,80,1) 35%)"},0)
.to(".sidebar a, .sidetext p", 0.4, {color: 'white'}, 0);

function footerenter() {
 recolorLogo('white', 0.4);
  tweens.play();
}
function footerleave() {
  recolorLogo('black', 0.4);
  tweens.reverse();
}
function recolorLogo(clr = 'black', anim = 0) {
  TweenMax.to(".logo", anim, {color: clr, borderColor: clr});
}
$("*[data-anim*=fade], *[data-anim=totop]").each(function() {
  $(this).css("opacity", "0");
});
var mycolors = ['rgba(72, 255, 196, 1)', // F84525
'rgba(85, 139, 255, 1)',
'rgba(255, 231, 76, 1)',
'rgba(166, 130, 255, 1)',
'rgba(12, 10, 62, 1)'];
let current_color = "rgba(72, 255, 196, 1)";
var matchbganim = [];
var fadeelements = [];
let loaded = false;
let sections_visited = [];
let uri = window.location.href;
if(uri.indexOf(":8080") == true)
{
  uri = true;
}
function homeAnims() {
  /*      for(var i = 0; i < fadeelements.length; i++) {
    fadeelements[i].play();
  }*/
  loaded = true;
  
  TweenMax.staggerFrom("#codebars rect", 0.2, {attr: {width: 0}, ease: Linear.easeNone, onStart: () => {
    
  }}, 0.3);
  $(".codebars").css("opacity", "0.17");
}

$(".project-info h3").each(function() {
  $(this).attr('data-anim', 'slideup');
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
$(document).ready(function () {
  // REMOVING LOAD LOGO, SETTING NEW
  let dashloader = $(".logo-loader rect");
  $(dashloader).css("-webkit-animation", "none");
  $(dashloader).css("-moz-animation", "none");
  $(dashloader).css("-ms-animation", "none");
  $(dashloader).css("animation", "none");
  TweenMax.to(".logo-loader rect", 1, {strokeDashoffset: 0, onComplete: function() {
    TweenMax.to("#loader", 1.2, {width: 0, ease:Power4.easeOut, onComplete: homeAnims});
    var pos_top = "57px";
    var pos_left = "85px";
    if(minDevice('md'))
    {
      pos_top = "76px";
      pos_left = "110px";
    }
    TweenMax.to("#loader-logo", 2, {delay: 0.2, top:  pos_top, left:  pos_left,ease: Power3.easeOut, onStart: function() { TweenMax.to(".logo-loader", 1, {width: "140px"});},
    onComplete: function() {
      TweenMax.to(".topbar .logo", 0.1, {opacity: 1});
      TweenMax.to(".logo-loader", 0.1, {opacity: 0, delay: 0.06});
    }});
  }}); 
  
  TweenMax.from(".homebgtext", 2.2, {transform: "translateY(160%) translateX(-20%) rotate(-70deg)", opacity: 0, ease: Power3.easeOut, delay: 0.7, onComplete: function() {
    $(".homebgtext").css("animation", "homebg 120s linear infinite");
  }});
  //   alert($('.sidebar .logo').offset().top);
  /*
  let lastScrollTop = 0;
  $(window).scroll(function(e) {
    let st = $(this).scrollTop();
    clearTimeout($.data(this, 'scrollTimer'));
    if (st > lastScrollTop){
      TweenMax.to('.sidebutton', 0.5, {transform: "translateY(-20px)", ease: Power2.easeOut});
    } else {
      TweenMax.to('.sidebutton', 0.5, {transform: "translateY(20px)", ease: Power2.easeOut});
    }
    lastScrollTop = st;
    $.data(this, 'scrollTimer', setTimeout(function() {
      TweenMax.to('.sidebutton', 0.7, {transform: "translateY(0)", ease: Power2.easeOut});
    }, 150));
  });*/
  if(uri != true) {
    let rightclicked = false;
    $( "body" ).contextmenu(function() {
      if(rightclicked == false)
      {
        gtag('event', 'rightclick', {
          'event_category' : 'engagement' });
          rightclicked = true;
        }
      });
    }
    if(isDevice('xs')){
      $(".about_modal-avatar").prependTo($('.about_modal .columns'));
    }
    $('#service_develop .rect_bar').each(function() {
      let h = $(this).attr('height');
      let y = $(this).attr('y');
      let tl = new TimelineMax({ repeat: -1, repeatDelay: 1, delay: Math.random()*2});
      let pixel_change = h * Math.random();
      let y_change = +y + +pixel_change;
      tl.to($(this), 1.3, {attr: {height: h-pixel_change,'y': y_change}})
      .to($(this), 1.3, {attr: {height: h, 'y':y}, delay: Math.random()});
    });
    
    $("#service_maintenance .rect_bar").each(function() {
      let w = $(this).attr('width');
      let tl = new TimelineMax({repeat: -1, repeatDelay: 1, delay: Math.random()*2});
      let pixel_change = w * Math.random();
      tl.to($(this), 1.3, {attr: {width: w-pixel_change}})
      .to($(this), 1.3, {attr: {width: w}});
    });
    
    
    
    
    
    $('.project.mine').click(function() {
      TweenMax.to(window, 1, {scrollTo: "#home-wrapper"});
    });
    let toggler = 0;
    let aboutmodal = {
      elm: $('.sidestripe .aboutme'),
      active: false,
      getProperWidth: (vw = false) => {
        if(isDevice('xs'))
        {
          if(vw == true)
          {
            return jQuery(window).width()-4;
          }
          return '100vw';
        }
        if(vw == true) {
          return '646px';
        }
        return '650px';
      },
      toggle: () => {
        let del = 0.7;
        let stripe = (minDevice('sm')) ? $('.animated_stripe') : $('.sidestripe');
        let stripe_width = (minDevice('sm')) ? 0 : '4px';
        if(aboutmodal.active == false)
        {
          $('body').addClass('noscroll').bind('touchmove', function(e){e.preventDefault()});
          let tl = new TimelineMax();
          tl.set(stripe, {css: {zIndex: 9}}).set('.sidebutton',{css: {zIndex: 10}})
          .to(stripe, 0.9, {width: aboutmodal.getProperWidth(),ease: Power3.easeOut})
          .to('.about_modal', 0.8, {width: aboutmodal.getProperWidth(true), ease: Power3.easeOut, delay: 0.3}, 0);
          setTimeout(()=>{ aboutmodal.active = true;
            $('.about_modal_stripe').addClass('active');
            $('.about_modal *[data-anim]').each(function() {
              startAnimating(this);
            });
          }, 700);
          
        } else {
          $('body').removeClass('noscroll').unbind('touchmove');
          TweenMax.staggerTo('.about_modal *[data-anim]', 1, {opacity: 0});
          let tl_rev = new TimelineMax({ delay: 0.3});
          
          tl_rev.to('.about_modal', 0.8, {width: 0, ease: Power3.easeInOut})
          .to(stripe, 0.9, {width: stripe_width,ease: Power3.easeOut, delay: 0.4}, 0);
          setTimeout(()=>{ aboutmodal.active = false; $('.about_modal_stripe').removeClass('active'); }, 1000);
        }
      }
      
    };
    $('.sidebutton, .tocontact').click(function() {
      // aboutmodal.toggle();
      TweenMax.to(window, 1, {scrollTo: "#footer"});
    });
    $('.btn.more').click(function()
    {
      aboutmodal.toggle();
    });
    $('.close_modal, .sidestripe, section, .sidebutton').click(function() {
      if(aboutmodal.active == true)
      {
        aboutmodal.toggle();
      }
    });
    if(isDevice('xs') || isDevice('sm'))
    {
      let onexit = false;
      $('.about_modal').click(function() {
        if(aboutmodal.active == true && onexit == false)
        {
          aboutmodal.toggle();
          onexit = true;
          setTimeout(()=>{onexit = false;}, 1000);
        }
      });
    }
    
    var footercolor = "#3E3750";
  //  if(!isDevice("xs")) {
      $(".bg-text:not(.noanim) p").paroller({
        factor: 0.3,
        factorXs: 0.1,
        type: 'foreground',     // background, foreground
        direction: 'vertical', // vertical, horizontal
        transition: 'transform 0.4s ease' // CSS transition, added on elements where type:'foreground'
      });
  //  }
    $(".btn").each(function() {
      var btnanim = new TimelineMax({paused: true});
      var arrow = $(this).find("i");
      btnanim.to(arrow, 0.1, {transform: "translateX(20px)", opacity: 0, ease: Power0.easeNone})
      .to($(this).find(".circle"), 0.2, {width: "100%", ease: Power1.ease})
      .set(arrow, {transform: "translateX(-200px)"})
      
      .to($(this).find("span"), 0.1, {marginLeft: "20px"})
      .to(arrow, 0.1, {opacity: 1, transform: "translateX(-180px)"});
      $(this).hover(function() {
        btnanim.restart();
      }, function() {
        btnanim.reverse();
      });
    });
    var controller = new ScrollMagic.Controller();
    
    
    new ScrollMagic.Scene({ // CHANGE FOOTER COLOR TO DARK
      triggerElement: "#footer"
    })
    .on('enter', footerenter)
    .on('leave', footerleave)
    .triggerHook(0.3)
    // .addIndicators()
    .addTo(controller);
    if(!isDevice("xs")) 
    {
      var matchid = 0;
      $('.matchbgcolor').each(function() 
      {
        var $elm = this;
        var pos = $($elm).offset();
        var triggerpos = (pos.top/$(window).height());
        if($($elm).hasClass("logo")) {
          triggerpos = 0.1;
        }
        matchbganim[matchid] = new ScrollMagic.Scene({
          triggerElement: "#about",
          triggerHook: triggerpos
        })
        .on("leave", function() {
          matchBgColor($elm, "white");
          
        })
        .on("enter", function() {
          matchBgColor($elm, "black");
        })
        .addTo(controller);
        matchid++;
      });
      
      new ScrollMagic.Scene({ 
        triggerElement: ".home-wrapper",
        triggerHook: 0
      })
      .on("enter", function() {
        shortenLogo();
      })
      .on("leave", function() {
        widenLogo();
      })
      .offset(20)
      .addTo(controller);
      
    }
    
    var index = 0;
    var $sidetexts = [];
    var lastsection = "home";
    $('.section').each(function()
    { // EACH SECTION PIN SIDETEXT
      var $elm = this;
      var $sidetext = $($elm).find('.sidetext p');
      $sidetexts[parseInt($sidetext.attr('key'))] = $sidetext;
      console.log(parseInt($sidetext.attr('key'))+ ' ' + $sidetext.html());
      var sectionname = $(this).attr('id');
      var scene = new ScrollMagic.Scene({triggerElement: $elm, triggerHook: 0.6})
      // .addIndicators()
      .on('enter', function(event) { // === START === UPON ENTERING SCENE, FROM EITHER DIRECTION
        
        var smod = event.scrollDirection == "REVERSE" ? -1 : 1;
        if(smod == 1 && sections_visited.indexOf(sectionname) == -1)
        {
          startAnims($elm);
        }
        switch(sectionname) {
          case 'about':
          TweenMax.to("#about .bg-text", 0.6, {opacity: 1});
          break;
          case 'work':
          TweenMax.to("#work .bg-text", 0.6, {opacity: 1});
          break;
          case 'footer':
          TweenMax.to("#work .bg-text", 0.6, {opacity: 0});
          break;
        }
        //  alert(sectionname);
        index++;
        sections_visited.push(sectionname);
        lastsection = sectionname;
        sidetextShow($sidetext, smod, index-1);
        if(index != 1)
        {
          sidetextHide($sidetexts[index-1], smod, index-1);
        }
        
      }) // === END  === 
      .on('leave', function(event) { // == LEAVING THE SCENE
        switch(sectionname) {
          case 'footer':
          TweenMax.to("#work .bg-text", 0.6, {opacity: 1});
          break;
          case 'work':
          TweenMax.to("#work .bg-text", 0.6, {opacity: 0});
          break;
        }
        var smod = -1;
        sidetextShow($sidetexts[index-1], -1, index-2);
        sidetextHide($sidetext, -1, index);
        index--;
        
      })
      // .addIndicators()
      .addTo(controller);
    });
    
    var $cursor = $("#cursor");
    
    $("body").on('mousemove', function(e) {
      if(!isDevice("xs")) {
        
        TweenMax.to($cursor, 0.2, {left: e.clientX-10, top: e.clientY-10});
      }
      
    });
    $("#work .project").hover(function() {
      TweenMax.to($(this).find('.project-link .fas'), 0.3, {rotation: -20, delay: 0.1});
    }, function() {
      TweenMax.to($(this).find('.project-link .fas'), 0.3, {rotation: 0, delay: 0.1});
    });
    $("a, .pointer,#work .project, .sidebutton").on('mouseenter', function() {
      TweenMax.to("#cursor", 0.2, {transform: "scale(2.5)", opacity: 0.5});
    }).on('mouseleave', function() {
      TweenMax.to("#cursor", 0.2, {transform: "scale(1)", opacity: 1});
    });
    
    $('.sendbtn').on('click', function (e) {
      $(this).html('Sending..');
      $.post("post.php", $('form').serialize(), function(result){
        $(".sendbtn").html(result).addClass('hover');
        gtag('event', 'form_sent', {
          'event_category' : 'engagement',
          'event_label' : 'NAME: '+$('form *[name=name]').val()+' EMAIL: '+$('form *[name=email]').val()+' TEXT: '+$('form textarea').val()
        });
        
      });
    });
    
    if(isDevice('xs') || isDevice('sm'))
    {
      let infos = [];
      $('.footer-info h3').click(function() {
        if(infos.indexOf(this) == -1)
        {
          TweenMax.to($(this).find('i'), 0.5, {rotation: 180});
          TweenMax.to($(this).next(), 0.6, {height: $(this).next().attr('dheight')});
          infos.push(this);
        } else {
          TweenMax.to($(this).find('i'), 0.5, {rotation: 0});
          TweenMax.to($(this).next(), 0.6, {height: 0});
          infos.splice(infos.indexOf(this), 1);
        }
      });
    }
    
    
  });
  // END OF DOCUMENT READY
  
  let logo = {
    elm: $(".sidebar .logo"),
    rect: $(".sidebar .logo").find("rect"),
    text: [],
    state: {wide: true, white: true}
  };
  //        var $logo = $(".logo");
  //     var $logo_rect = $($logo).find("rect");
  //        var $logo_text = [];
  $(logo.elm.find("text")).each(function() {
    logo.text[$(this).attr("num")] = this;
  });
  var tween_logo = new TimelineMax({paused: true});
  
  for(var i = 6; i>0; i--)
  {
    tween_logo.to(logo.text[i], 0.07, {opacity: 0});
  }
  tween_logo.to(logo.text[7], 0.5, {x: "38px", delay: 0.2},0);
  tween_logo.to(logo.rect, 0.33, {attr: {width: "44"}, ease: Power1.ease, onStart: ()=>console.log('start')});
  function shortenLogo()
  {
    logo.state.wide = false;
    tween_logo.restart();
  }
  function widenLogo()
  {
    logo.state.wide = true;
    tween_logo.reverse();
  }
  function matchBgColor(elm, col)
  {
    TweenMax.to(elm, 0.4, {color: col, onComplete: ()=> { if($(elm).parent(".topmenu")) { if(col == "white") { $(elm).removeClass("black"); } else { $(elm).addClass("black"); } }}});
    if($(elm).hasClass("logo")) 
    {
      recolorLogo(col, 0.5);
    }
  }
  function startAnims(parent)
  {
    if(loaded == false && $(parent).attr("id") == "home-wrapper")
    {
      setTimeout(startAnims, 100, parent);
      return;
    }
    if($(parent).attr('id') == 'home-wrapper')
    {
      $(parent).find("*[data-anim]").each(function() {
        startAnimating(this);
      });
    }
    
    
    
    
  }
  function startAnimating(elm)
  {
    let del = $(elm).attr('data-anim-delay') == undefined ? 0 : $(elm).attr('data-anim-delay');
    let dur = $(elm).attr('data-anim-dur') == undefined ? 1 : $(elm).attr('data-anim-dur');
    let dataanim = $(elm).attr('data-anim');
    switch(dataanim) {
      case 'fade':
      TweenMax.to(elm, dur, { opacity: 1, delay: del});
      break;
      case 'block':
      let obj = anim_block.find(x => $(elm).is(x.elm));
      setTimeout(obj.start, del*1000);
      break;
      case 'slideup':
      TweenMax.to($(elm).find('.anim-slideup-div'), dur, {height: 0, ease: Power2.easeOut, delay: del});
      break;
      case 'totop':
      if($(elm).attr('data-anim-dur') == undefined)
      {
        dur = 0.7;
      }
      TweenMax.from(elm, dur, {y: '100px', ease: Power1.easeOut, delay: del});
      TweenMax.to(elm, dur, {opacity: 1, delay: del});
      break;
      default:
      console.log('oops!');
    }
    
  }
  var animcontrol = new ScrollMagic.Controller();
  $("*[data-anim]:not([data-anim-link]").each(function() {
    let element = this;
    let visited = false;
    if($(this).parents('.home-wrapper').length || $(this).parents('#footer').length || $(this).parents('.about_modal').length)
    {
      return;
    }
    var scene = new ScrollMagic.Scene({
      triggerHook: 0.9,
      triggerElement: this
    })
    .on('enter', function() {
      if(visited == false)
      {
        startAnimating($(element));
        
        if($(element).attr('id') != undefined) {
          var id = $(element).attr('id');
          if($('*[data-anim-link='+ id + ']').length)
          {
            $('*[data-anim-link='+ id + ']').each(function() {
              startAnimating(this);
            });
          }
        }
        visited = true;
      }
      
    })
    //    .addIndicators()
    .addTo(animcontrol);
  });
  
  $("*[data-anim=slideup]").each(function() {
    $(this).html("<div class='anim-slideup-text'>"+$(this).html()+"</div>");
    $(this).prepend("<div class='anim-slideup-div'></div>");
    $(this).css('height', $(this).find('.anim-slideup-text').height());
    $(this).find('.anim-slideup-div').css('height', $(this).find('.anim-slideup-text').height());
    //   TweenMax.to('.anim-slideup-div', 1, {height: 0});
  });
  
  
  
  let anim_block = [];
  // APPEND DIV, STORE VALUES
  $("*[data-anim=block]").each(function() {
    $(this).append("<div class='anim-block-div'></div>");
    let block = new AnimBlock($(this));
    anim_block.push(block);
    
  });
  
  function AnimBlock(elm) {
    this.elm = elm;
    this.textcolor = $(elm).css('color');
    this.block = {
      elm: $(this.elm).find('.anim-block-div'),
      color: () => { 
        let colorattr = $(elm).attr('data-anim-color');
        if(jQuery.isNumeric(colorattr))
        {
          return mycolors[colorattr-1];
        }
        return colorattr;
      }
    };
    this.spancolor = $(elm).find('span').css('color');
    this.start = (fcomplete) => {
      $(this.block.elm).css('background-color', this.block.color());
      
      $(this.elm).css('color', 'rgba(1,1,1,0)').css('opacity', '1');
      if(this.spancolor != undefined)
      {
        $(this.elm).find('span').css('color', 'rgba(1,1,1,0)');
      }
      let wid = $(this.elm).width()+3;
      let tlanim = new TimelineMax();
      tlanim.to(this.block.elm, 0.5, {width: "100%", ease:Power2.easeInOut, onComplete:() => {$(this.elm).css('color', this.textcolor);
      if(this.spancolor != undefined) { $(this.elm).find('span').css('color', this.spancolor); } }})
      .to(this.block.elm, 0.4, {transform: `translateX(${wid}px)`, ease:Power2.easeInOut, onComplete: fcomplete})
      .to(this.block.elm, 0.1, {opacity: '0'});
    };
  }
  
  var tweens = new TimelineMax({ paused: true}); // 3E3750
  tweens.to("body", 0.4, { backgroundColor: "#231B37" },0)
  .to(".sidebar>.topbar", 0.4, {backgroundImage: "linear-gradient(to top, rgba(255,0,0,0) 0%, rgba(62,55,80,0) 40%)"},0)
  .to(".sidebar>.bottombar", 0.4, {backgroundImage: "linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(62,55,80,0) 40%)"},0)
  .to(".sidebar a, .sidetext p", 0.4, {color: 'white'}, 0)
  .to(".sidebutton", 0.25, {opacity: '0',onComplete: ()=> {$('.sidebutton').css('display', 'none');}}, 0)
  .to('#footer textarea,input,.sendbtn', 0.3, {opacity: '1'}, 0);
  
  function footerenter() {
    recolorLogo('white', 0.3);
    for(var i = 0; i< matchbganim.length; i++)
    {
      matchbganim[i].trigger("leave");
    }
    tweens.play();
    $("#footer").find("*[data-anim]").each(function() {
      setTimeout(()=> { startAnimating(this); },250);
    });
    
  }
  function footerleave() {
    recolorLogo('black', 0.3);
    for(var i = 0; i< matchbganim.length; i++)
    {
      matchbganim[i].trigger("enter");
    }
    $('.sidebutton').css('display', 'block');
    tweens.reverse();
  }
  function recolorLogo(clr = 'black', anim = 0.2, del = 0, overridemobile = false) {
    //  TweenMax.to(".logo", anim, {color: clr, borderColor: clr});
    if(!isDevice("xs") || overridemobile == true) {
      logo.state.white = (clr == "black") ? false : true;
      TweenMax.to(".logo text", anim, {css: {"fill": clr}, delay: del});
      TweenMax.to(".logo rect", anim, {css: {"stroke": clr}, delay: del});
    }
    
  }
  
  function getDevice(num = false){
    var width = document.body.clientWidth;
    var tablet = 768;
    var desktop = 960;
    var widescreen = 1152;
    var fullhd = 1344;
    var dev = 'xs';
    if(width >= fullhd) {
      dev = 'xl';
    }
    else if(width >= widescreen)
    {
      dev = 'lg';
    }
    else if(width >= desktop)
    {
      dev = 'md';
    }
    else if(width >= tablet)
    {
      dev = 'sm';
    }
    return dev;
  }
  function isDevice(dev) {
    return getDevice() == dev ? true : false;
  }
  function minDevice(dev)
  {
    var width = document.body.clientWidth;
    var tablet = 768;
    var desktop = 960;
    var widescreen = 1152;
    var fullhd = 1344;
    switch(dev)
    {
      case 'sm':
      if(width >= tablet)
      {
        return true;
      }
      break;
      case 'md':
      if(width >=desktop)
      {
        return true;
      }
      break;
      case 'lg':
      if(width >=widescreen)
      {
        return true;
      }
      break;
      case 'xl':
      if(width >=fullhd)
      {
        return true;
      }
      break;
      default:
      return false;
      
    }
    return false;
  }
  
  function sidetextShow($elm, dir, index)
  {
    current_color = mycolors[index];
    TweenMax.to('.sidestripe,.matchsidecolor', 0.65, { backgroundColor: mycolors[index]});
    TweenMax.set($($elm), {clearProps: "y, opacity"});
    TweenMax.from($($elm), 1, { opacity: 1, ease: Power2.easeOut, y: dir*($(window).height()/2),onStart: function() { // STARTING ANIM
      $($elm).addClass('active');
    }});
    
  }
  function sidetextHide($elm, dir,index)
  { 
    TweenMax.to($($elm), 1 , {opacity: 0, y: dir*-$(window).height()/2-80, onComplete: function() { 
      $($elm).removeClass('active');
      //  console.log($sidetext.html()+' is not active anymore. LEAVING');
      TweenMax.set($($elm), {clearProps: "y, opacity"});
    }});
  }
 $('a[href*=#]:not([href=#])').click(function () {
     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

         if (target.length || this.hash == "#top") {
             var marginTop = $('body').css('margin-top').slice(0, -2);
             //marginTop = new Number(marginTop);
             $('html,body').animate({
                 scrollTop: target.length ? target.offset().top - marginTop : 0
             }, 500);
             return false;
         }
     }
 });

 var navAdded = false;

 $(window).on('scroll', function () {
     addScrollNav();
     var scroll_top = $(window).scrollTop();
     var percentFade = 1.0 - ((scroll_top * 2.5) / $(window).height());
     $('.logo-container').fadeTo(0, percentFade);
 }).resize(function () {
     setSplashHeight();
     addScrollNav();
 });

 function setSplashHeight() {
     $('.splash').css('height', function () {
         return $(window).height();
     });
 }

 function addScrollNav() {
     var scroll_top = $(window).scrollTop();
     if ($(window).width() >= 768) {
         if (scroll_top >= 200) {
             if (!navAdded) {
                 $('body').css('margin-top', '50px');
                 $(window).scrollTop(scroll_top + 50);
                 $('.navbar-scrolled').fadeIn(200);
                 navAdded = true;
             }

         } else if (scroll_top <= 200) {
             if (navAdded) {
                 $('body').css('margin-top', '0');
                 $(window).scrollTop(scroll_top - 50);
                 $('.navbar-scrolled').fadeOut(200);
                 navAdded = false;
             }
         }
     } else if (navAdded && $(window).width() >= 768) {
         $('body').css('margin-top', '0');
         $(window).scrollTop(scroll_top - 50);
         $('.navbar-scrolled').fadeOut(200);
         navAdded = false;
     }
 }

//setSplashHeight();
//addScrollNav();

// Everything below involves error handling for the add to email list api

var ajaxFooterOptions = {
    error: submitFooterErrorHandler,
    success: submitFooterSuccessHandler,
    resetForm: true
};

function placeFooterErrors(error, element) {
    var attr = $(element).attr('data-original-title');
    if (!(typeof attr !== 'undefined' && attr !== false)) {
        if ($(window).width() > 600) {   
            $(element).tooltip({placement:'bottom', title:error[0].textContent, trigger:'manual'});
            $(element).tooltip('show');
        } else {
            error.insertAfter(element);
        }
    }
}

function removeFooterErrors(label, element) {
    if ($(window).width() > 600) {   
            $(element).tooltip('destroy').removeAttr('data-original-title');
        } else {
            label.remove();
        }
}

function submitFooterForm() {
    $('body').css({'cursor' : 'wait'});
    $('#add-to-contacts').ajaxSubmit(ajaxFooterOptions);
}

function submitFooterErrorHandler() {
    showFooterModal('error');
}

function submitFooterSuccessHandler() {
    showFooterModal('success');
}

function showFooterModal(type) {
    var title;
    var body;
    switch (type) 
    {
        case 'success':
            title = "Email Added";
            body = "Thanks for signing up to our mailing list.";
            break;
        default:
            title = "Error";
            body = "Oops, something went wrong, please try again.";
            break;
    }
    $('body').css({'cursor' : 'default'});
    $('#myModalLabel').text(title);
    $('div.modal-body p').text(body);
    $('#altBtn').text('ok');
    $('#sendAnyway').hide();
    $('#myModal').modal('show');
    setTimeout(function () {
        $('#myModal').modal('hide');
    }, 3000); 
}  

$(function()
{ 
    setSplashHeight();
    addScrollNav();
    $.validator.methods.equal = function(value, element, param) {
		return value == param;
	};
    
    $("#add-to-contacts").validate({
        rules: {
            firstName: "required",
            email: {
                required: true,
                email: true,
            }
        },
        messages: {
            firstName: "Please enter your firstname",
            email: {
                required: "Please enter a valid email address",
                email: "Please enter a valid email address",
            }
        },
        submitHandler: submitFooterForm,
        errorPlacement: placeFooterErrors,
        success: removeFooterErrors
    });
});

window.sr = ScrollReveal({mobile: false});

// Customizing a reveal set
sr.reveal('.reveal-app', { duration: 1000 }, 200)
.reveal('.reveal-price', { duration: 1000 }, 200)
.reveal('.reveal-features', { duration: 1000 }, 200)
.reveal('.reveal-left-mixer', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-left-theka', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-left-sessions', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-left-presets', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-left-gats', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-left-alap', { duration: 1000, origin: 'left'}, 500)
.reveal('.reveal-right-theka', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-right-sessions', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-right-presets', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-right-alap', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-right-mixer', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-right-gats', { duration: 1000, origin: 'right'}, 500)
.reveal('.reveal-studio', { duration: 1000 })
.reveal('.reveal-video', { duration: 1000 })
.reveal('.reveal-bio-one', { duration: 1000 }, 500)
.reveal('.reveal-bio-two', { duration: 1000 }, 500)
.reveal('.reveal-contact', { duration: 1000 }, 500);

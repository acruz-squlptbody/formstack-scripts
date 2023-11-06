/*** Welcome 1 Form */
// Inital Lead Form

// Google Tag Manager
(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-MGW98ZF');

// Helper function to fire-off ad conversion tags for various platforms
function sendConversionEventTags() {

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'AW-413469477');

    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '926990124420281');
    fbq('track', 'Lead');

    (function (w, d, t, r, u) { var f, n, i; w[u] = w[u] || [], f = function () { var o = { ti: "187020126" }; o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad") }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () { var s = this.readyState; s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null) }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i) })(window, document, "script", "//bat.bing.com/bat.js", "uetq");

    !function (s, a, e, v, n, t, z) { if (s.saq) return; n = s.saq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!s._saq) s._saq = n; n.push = n; n.loaded = !0; n.version = '1.0'; n.queue = []; t = a.createElement(e); t.async = !0; t.src = v; z = a.getElementsByTagName(e)[0]; z.parentNode.insertBefore(t, z) }(window, document, 'script', 'https://tags.srv.stackadapt.com/events.js'); saq('conv', 'ZN0unntlNxgFvtbgi32F7J');


    !function (e) {
        if (!window.pintrk) {
            window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments))
            }; var
                n = window.pintrk; n.queue = [], n.version = "3.0"; var
                    t = document.createElement("script"); t.async = !0, t.src = e; var
                        r = document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t, r)
        }
    }("https://s.pinimg.com/ct/core.js");
    pintrk('load', '2614283579419', { em: '<user_email_address>' });
    pintrk('track', 'lead', {
        lead_type: 'Form 1'
    });

}


/********** Core Form Logic **************/

var last_valid_selection = null;

// Dictionary of eligible short codes for lead source
var leadSourceDict = {};
leadSourceDict["ig"] = "Instagram";
leadSourceDict["fb"] = "Facebook";
leadSourceDict["an"] = "Meta Other";
leadSourceDict["msg"] = "Meta Other";

function FF_OnBeforeRender() {

    if (urlParams.has("squlptmiami")) {
        fs('#Account\\.Location_of_Interest__c').val("Miami");
    }

    return true;
}

function validateFirstNameField() {
    var re = new RegExp("^[a-zA-Z ]*$");
    // Display alert window and focus on field if input does not meet reg ex criteria
    if (!re.test(fs('#Account\\.FirstName').val())) {
        alert('Please enter a valid name. Note that numbers, accents, and special characters are not supported.');
        fs('#Account\\.FirstName').focus();
    }
}

function validateLastNameField() {
    var re = new RegExp("^[a-zA-Z ]*$");
    // Display alert window and focus on field if input does not meet reg ex criteria
    if (!re.test(fs('#Account\\.LastName').val())) {
        alert('Please enter a valid name. Note that numbers, accents, and special characters are not supported.');
        fs('#Account\\.LastName').focus();
    }
}

function FF_OnAfterRender() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("Account.PersonLeadSource")) {
        var leadSourceFull =
            leadSourceDict[urlParams.get('Account.PersonLeadSource')] ? leadSourceDict[urlParams.get('Account.PersonLeadSource')] : urlParams.get('Account.PersonLeadSource');
        console.log(leadSourceFull);
        fs('#Account\\.PersonLeadSource').val(leadSourceFull);
    }

    FFEvaluateRules();
    
    window.scrollTo(0, 0);
    
    // Custom field validations
    
    fs('#Account\\.FirstName').attr('pattern', '^[a-zA-Z ]*$');
    fs('#Account\\.FirstName').change(function() {
        validateFirstNameField();
    });

    fs('#Account\\.LastName').attr('pattern', '^[a-zA-Z ]*$');
    fs('#Account\\.LastName').change(function() {
        validateLastNameField();
    });

    fs('#Account\\.Areas_to_Improve__pc')
        .change(function (e) {
            if (fs(this).val().length > 4) {
                fs(this).val(last_valid_selection);
                alert("You have selected more than 4 options. Please note that only your first 4 selected options will be recorded.");
            } else {
                last_valid_selection = fs(this).val();
            }
        });

}

function FF_OnBeforeSave() {
    sendConversionEventTags();
    return true;
}

function FF_OnAfterSave() {

    var contactEmail = document.getElementById("Account.PersonEmail").value;
    var leadSource = document.getElementById("Account.PersonLeadSource").value;
    var firstName = document.getElementById("Account.FirstName").value;
    var lastName = document.getElementById("Account.LastName").value;
    var contactGender = document.getElementById("Account.Gender__pc").value;
    var preAssignedOwnerEmail = document.getElementById("Account.Pre_Assigned_Owner_Email__c").value;
    var campaign = document.getElementById("Account.Campaign__c").value;
    var phoneNumber = document.getElementById("Account.PersonMobilePhone").value;

    document.getElementById("form1").setAttribute("action", "");
    document.getElementById("form1").submit();
    if (preAssignedOwnerEmail) {
        window.location = "https://squlpt.secure.force.com/apex/VisualAntidote__HostedFastForm?h=F39UV"
            + "&Account.PersonEmail=" + contactEmail
            + "&Account.LastName=" + lastName
            + "&Account.FirstName=" + firstName
            + "&Account.Gender__pc=" + contactGender
            + "&Account.PersonLeadSource=" + leadSource
            + "&Account.Campaign__c=" + campaign
            + "&Account.PersonMobilePhone=" + phoneNumber
            + "&preassigned";

    } else {
        window.location = "https://squlpt.secure.force.com/apex/VisualAntidote__HostedFastForm?h=F39UV"
            + "&Account.PersonEmail=" + contactEmail
            + "&Account.LastName=" + lastName
            + "&Account.FirstName=" + firstName
            + "&Account.Gender__pc=" + contactGender
            + "&Account.PersonLeadSource=" + leadSource
            + "&Account.Campaign__c=" + campaign
            + "&Account.PersonMobilePhone=" + phoneNumber
            + "";
    }

}

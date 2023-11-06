/*** Welcome 2 Form */
// Medical History Form

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
    fbq('track', 'Purchase', { value: 50.00, currency: 'USD' });

    (function (w, d, t, r, u) { var f, n, i; w[u] = w[u] || [], f = function () { var o = { ti: "187020126" }; o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad") }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () { var s = this.readyState; s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null) }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i) })(window, document, "script", "//bat.bing.com/bat.js", "uetq");

    !function (s, a, e, v, n, t, z) { if (s.saq) return; n = s.saq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!s._saq) s._saq = n; n.push = n; n.loaded = !0; n.version = '1.0'; n.queue = []; t = a.createElement(e); t.async = !0; t.src = v; z = a.getElementsByTagName(e)[0]; z.parentNode.insertBefore(t, z) }(window, document, 'script', 'https://tags.srv.stackadapt.com/events.js'); saq('conv', 'UnwydZuKlPTpQoKtnyF6TE');

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
    pintrk('track', 'checkout', {
        value: 50,
        currency: 'USD'
    });
}

/********** Core Form Logic **************/

function calcBMI(height_feet, height_in, weight_lbs) {
    if (height_feet > 0 && weight_lbs > 0 && height_in >= 0) {
        var height = parseFloat(height_feet) * 12 + parseFloat(height_in);
        var bmi = (parseFloat(weight_lbs) / (height * height)) * 703;
        return bmi.toFixed(2);
    } else {
        return 0;
    }
}

function updateBMIField() {
    console.log("updating BMI");
    var hf = document.getElementById(
        "Account.Medical_History__c.A.Height_Feet__c"
    ).value;
    var hin = document.getElementById(
        "Account.Medical_History__c.A.Height_Inches__c"
    ).value;
    var wt = document.getElementById(
        "Account.Medical_History__c.A.Weight_lbs__c"
    ).value;
    var bmi = calcBMI(hf, hin, wt);
    fs("#Account\\.Medical_History__c\\.A\\.BMI__c").val(bmi);
    document.getElementById("Account.Medical_History__c.A.BMI__c").value = bmi;
}

// Dictionary of eligible short codes for lead source
var leadSourceDict = {};
leadSourceDict["ig"] = "Instagram";
leadSourceDict["fb"] = "Facebook";
leadSourceDict["an"] = "Meta Other";
leadSourceDict["msg"] = "Meta Other";

function FF_OnAfterRender() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("Account.PersonLeadSource")) {
        var leadSourceFull =
            leadSourceDict[urlParams.get('Account.PersonLeadSource')] ? leadSourceDict[urlParams.get('Account.PersonLeadSource')] : urlParams.get('Account.PersonLeadSource');
        console.log(leadSourceFull);
        fs("#Account\\.PersonLeadSource").val(leadSourceFull);
    }

    FFEvaluateRules();

    //Bind to all elements that have the ff-ext-radio-css class
    fs(".ff-ext-radio-css").each(function () {
        fs(this).bind("click", function () {
            //Only perform this action is the radio button has already been selected
            if (fs(this).attr("class") == "ff-ext-radio-css ff-ext-selected") {
                //Remove that ff-ext-selected CSS Class
                fs(this).removeClass("ff-ext-selected");
                // Clear the value of the selected item from the picklist
                fs(this).parent().parent().parent().next().val("");
                // Stop any additional events from being triggered on this action
                event.stopImmediatePropagation();
            }
        });
    });

    if (fs("#Account\\.PersonLeadSource").val() == "Facebook"
        || fs("#Account\\.PersonLeadSource").val() == "Google"
        || fs("#Account\\.PersonLeadSource").val() == "Google Ads"
        || fs("#Account\\.PersonLeadSource").val() == "Instagram Ads"
        || fs("#Account\\.PersonLeadSource").val() == "Instagram"
        || fs("#Account\\.PersonLeadSource").val() == ""
    ) {
        // Unhide Email field
        document.getElementById("Account.PersonEmail").parentElement.parentElement.style = "";
        // Unhide Mobile phone field
        document.getElementById("Account.PersonMobilePhone").parentElement.parentElement.style = "";
    }

    fs("#Account\\.Medical_History__c\\.A\\.Height_Feet__c").change(function (e) {
        updateBMIField();
    });
    fs("#Account\\.Medical_History__c\\.A\\.Height_Inches__c").change(function (e) {
        updateBMIField();
    });
    fs("#Account\\.Medical_History__c\\.A\\.Weight_lbs__c").change(function (e) {
        updateBMIField();
    });

    fs("#Account\\.Direct_to_Free_Consult__c").val("No");
    document.getElementById("Account.Direct_to_Free_Consult__c").value = "No";

    fs('#Account\\.PersonBirthdate').change(function (e) {
        console.log('Account.PersonBirthdate changed');
        var dobString = fs(this).val();
        var dob = new Date(dobString);
        console.log(dob);
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);
        var age_num = Math.abs(age_dt.getUTCFullYear() - 1970);
        if (isNaN(age_num)) {
            age_num = -1;
        }
        if (age_num < 18) {
            alert("Note: We can only accept patients over the age of 18. Your selected birthdate indicates that your age is less than 18. You will not be able to proceed further in our process.");
            fs('#Account\\.PersonBirthdate').focus();
        }
        fs('#Account\\.Patient_Age__c').val(age_num.toString());
    });

}

function FF_OnBeforeSave() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Calculate if BMI is a disqualifier
    updateBMIField();
    if (fs("#Account\\.Medical_History__c\\.A\\.BMI__c").val() >= 38) {
        fs("#Account\\.Medical_History__c\\.A\\.Absolute_Contraindication__c").val("Yes");
        document.getElementById("#Account\\.Medical_History__c\\.A\\.Absolute_Contraindication__c").value = "Yes";
    }
    // Trigger photo upload send
    if (!urlParams.has("noredirect")) {
        fs("#Account\\.Send_Photo_Upload_Form__c").val("Send");
        document.getElementById("Account.Send_Photo_Upload_Form__c").value = "Send";
    }
    // Send Ad tags
    sendConversionEventTags();

    return true;
}

function FF_OnAfterSave() {

    var personAge = document.getElementById("Account.Patient_Age__c").value;
    var contactEmail = document.getElementById("Account.PersonEmail").value;
    var patientId = document.getElementById("Account.Patient_Record_Id__c").value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("noredirect")) {

        alert("Thank you for updating your medical information.");
        window.location = "https://squlptbody.com";

    } else {

        if (personAge === null || personAge < 18) {
            alert("Note: We can only accept patients over the age of 18. Your selected birthdate indicates that your age is less than 18. You will not be able to proceed further in our process.");
            window.location = "https://squlptbody.com/";
        }
        if (fs("#Account\\.Medical_History__c\\.A\\.Absolute_Contraindication__c").val() == "Yes") {
            alert("Based on your current medical history, we are unable to accept you as a patient at this time. Thank you for considering Squlpt.");
            window.location = "https://squlptbody.com";
        } else {
             alert("Thank you for submittiing your medical history! You should receive an email with a link to your secure photo upload and next steps shortly.");
            window.location = "https://squlptbody.com";

                //window.location = "https://squlptbodyshaping.my.salesforce-sites.com/apex/VisualAntidote__HostedFastForm?h=3HYLY&Account.Patient_Record_Id__c=" + patientId + "&Account.PersonEmail=" + contactEmail;

                // window.location = "https://hipaa.jotform.com/213258586519163?emailAddress=" +
                // contactEmail +
                // "";
        }

    }

}

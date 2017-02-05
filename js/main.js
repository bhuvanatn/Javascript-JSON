var xmlhttpObject = new XMLHttpRequest();
xmlhttpObject.open('GET', 'test.json');
xmlhttpObject.send();
xmlhttpObject.addEventListener('load', function(e) {

    var input = e.target.response;
    pushtoDom(input);
});
window.onload = function() {
    document.getElementById("loader").style.display = "none";
};

function pushtoDom(input) {
    try {
        var response = JSON.parse(input);
        var Len = Object.keys(response).length;
        if (Len != 0) {
            response.forEach(function(e) {
                console.log("test:", e);
                console.log("began At:", e.beganAt);
                var beagntime = e.beganAt;

                var result = document.getElementById('results');

                var issueTemplate = document.createElement('div');
                issueTemplate.classList.add("issue-template");


                var h3 = document.createElement('h3');
                if (e.status === "Resolved") {
                    // h3.innerHTML = "Issue Title - Resolved 10 minutes ago";
                } else {
                    // h3.innerHTML = "Issue Title - Begin 10 minutes ago";

                }
                issueTemplate.appendChild(h3);

                var pIssDesHeading = document.createElement('p');
                pIssDesHeading.innerHTML = "Issue description";
                issueTemplate.appendChild(pIssDesHeading);


                var pIssDes = document.createElement('p');
                var nodeDesc = document.createTextNode(e.description);
                pIssDes.appendChild(nodeDesc);

                issueTemplate.appendChild(pIssDes);

                var updateTemplate1div = document.createElement('div');
                updateTemplate1div.style.padding = "0px 0px 0px 50px";

                var pUpdateTemplateHeading = document.createElement('p');
                pUpdateTemplateHeading.innerHTML = "Update:";
                updateTemplate1div.appendChild(pUpdateTemplateHeading);

                var updateTemplate2div = document.createElement('div');
                updateTemplate2div.classList.add("update-template");

                var update = e.updates;
                update.forEach(function(e) {
                    d1 = new Date(beagntime);
                    d2 = new Date(e.at);
                    var milliseconds = d2 - d1;
                    var seconds = milliseconds / 1000;
                    var minutes = seconds / 60;

                    var pUpdates = document.createElement("p");
                    var nodeUpdates = document.createTextNode(e.update);
                    pUpdates.appendChild(nodeUpdates);

                    updateTemplate2div.appendChild(pUpdates);
                    updateTemplate1div.appendChild(updateTemplate2div);
                    issueTemplate.appendChild(updateTemplate1div);

                    var em = document.createElement('em');
                    em.innerHTML = "By " + e.by + "  " + minutes + " minutes ago";
                    updateTemplate2div.appendChild(em);

                    var hor = document.createElement('hr');
                    hor.style.width = "50%";
                    updateTemplate2div.appendChild(hor);
                });

                result.appendChild(issueTemplate);
            });
        } else {
            var divHappy = document.createElement("div");
            divHappy.classList.add("no-issue-template");
            var nodeHappy = document.createTextNode("Everybody is happy");
            divHappy.appendChild(nodeHappy);
            result.appendChild(divHappy);
        }

    } catch (err) {
        // I am assuming that there would be only JSON Malformed error. So, I am not handling other errors.
        alert("JSON is Malformed, Please fix JSON.");
    }
}

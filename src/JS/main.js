window.document.addEventListener("DOMContentLoaded", function( e ) {
    [].slice.call( this.querySelectorAll(".outer") ).forEach( function( elems ) {
        elems.addEventListener("click", function() {
            var sourceCode = "<span>" + this.querySelector(".inner").innerHTML + "</span>";
            sourceCode = sourceCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            document.querySelector(".prefix").style.display = "flex";
            document.querySelector(".html-code").innerHTML = sourceCode;
        } );
    } );
    this.querySelector(".x").addEventListener("click", function() {
        document.querySelector(".prefix").style.display = "none";
    } );

    this.querySelector(".search-btn").addEventListener("click", function() {
        var notAvailableContent,
            searchData = document.querySelector("#search").value;
            searchData = searchData.replace(/\s+/g, "-").replace(/\-(icons|icon)/gi, "").toUpperCase();

        notAvailableContent = true;

        [].slice.call( document.querySelectorAll(".outer") ).forEach( function( elems ) {
            var matched = elems.dataset && ( elems.dataset["icon"] + "" ).toUpperCase();
            var regex = new RegExp("^" + searchData + "?icons|icon" );

            if ( !!searchData ) {
                elems.style.display = "none";

                if ( matched.match( new RegExp( "\\b" + searchData + "\\b", "g" ) ) || regex.test( matched ) ) {
                    elems.style.display = "";
                    document.querySelector(".not-found").style.display = "none";
                    notAvailableContent = false;
                }
            } else {
                elems.style.display = "";
            }
        } );

        if ( notAvailableContent ) {
            document.querySelector(".not-found").style.display = "flex";
        } else {
            document.querySelector(".not-found").style.display = "none";
        }
    } );

    this.querySelector("#search").addEventListener("input", function() {
        var searchData = this.value;
        [].slice.call( document.querySelectorAll(".outer") ).forEach( function( elems ) {
            !searchData ? elems.style.display = "" : null;
            !searchData ? document.querySelector(".not-found").style.display = "none" : null;
        } );
    } );

    window.addEventListener("keypress", function(e) {
        if ( e.keyCode === 13 ) {
            this.document.querySelector(".search-btn").click();
        }
    } );

    function copytoClipboard() {
        var range = document.createRange();
        range.selectNode(document.querySelector(".html-code"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange( range );
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }

    this.querySelector(".copy").addEventListener("click", function() {
        var target = this;
        target.innerHTML = "Copied";
        copytoClipboard();

        setTimeout( function() { 
            target.innerHTML = "Copy";
            document.querySelector(".prefix").style.display = "none";
        }, 1000 );
    } );
} );
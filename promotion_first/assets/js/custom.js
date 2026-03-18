$(function () {
    $("#header").load("header.html");
    $("#header_inside").load("header_inside.html", function () {
        updateHeaderAuthState();
        $(document).off("click.headerlogout").on("click.headerlogout", ".header-logout", function (e) {
            e.preventDefault();
            sessionStorage.setItem("isLoggedIn", "false");
            updateHeaderAuthState();
            if (typeof console !== "undefined" && console.log) {
                console.log("Logged out");
            }
        });
    });
    $("#footer").load("footer.html");
    $("#modalPage").load("modal-page.html");
});

function updateHeaderAuthState() {
    window.isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    var $guest = $("#header-auth-guest, #header-auth-guest-mob");
    var $loggedin = $("#header-auth-loggedin, #header-auth-loggedin-mob");
    if ($guest.length && $loggedin.length) {
        if (window.isLoggedIn) {
            $guest.hide();
            $loggedin.show();
        } else {
            $guest.show();
            $loggedin.hide();
        }
    }
    if (typeof console !== "undefined" && console.log) {
        console.log("Header auth state updated, isLoggedIn:", window.isLoggedIn);
    }
}
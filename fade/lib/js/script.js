
window.onload = function(){

    // FadeIn FadeOut: Direct Use
    jsBoost("#element1", {
        timeout: 4500
    }).fadeIn();

    // FadeIn FadeOut: Callback Use
    jsBoost("#btfadeIn", {
        element: "#element1",
        effect: "fadein",
        timeout: 0
    }).fade();

    jsBoost("#btfadeOut", {
        element: "#element1",
        effect: "fadeout"
    }).fade();
}

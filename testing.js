var random_color = function () {
    return "#" + Math.floor(Math.random() * 16777216).toString(16);
};

style_manager.add("p", {
    "color":  "#BADA55",
    "font-family": "Helvetica",
    "background-color": "#C0FFEE"
});

style_manager.add(".foo", "color", "red");
style_manager.add({
    ".bar": {
        "background-color": random_color(),
        "color": random_color(),
    },
    ".baz": {
        "width": (window.innerHeight / 3) + "px"
    }
});
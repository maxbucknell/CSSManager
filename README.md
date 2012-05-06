# Style Manager

A module I wrote for setting dynamic CSS rules. I think it's more efficient than the way jQuery does things, especially when setting a class rule. I create a style node in the head and edit that with CSS, meaning only one node is touched, rather than every element in a list of matches to a selector.

This system is very basic and very stupid. It exists only in one node and will not touch any other styling information.

## Usage

### Adding Rules
    
Add styles one at a time:

    style_manager.add(".foo", "color", "red");

Add many styles to one selector:

    style_manager.add("p", {
        "color": "#BADA55",
        "font-family": "Helvetica",
        "background-color": "#C0FFEE"
    });
    
Add many selectors at once:

    var random_color = function () {
        return "#" + Math.floor(Math.random() * 16777216).toString(16);
    };
    
    style_manager.add({
        ".bar": {
            "background-color": random_color(),
            "color": random_color()
        },
        ".baz": {
            "width": (innerHeight / 3) + "px"
        }
    });

### Removing Rules

Remove an entire selector:

    style_manager.remove('.foo');

Remove one or many rules from one selector:

    style_manager.remove('p', 'margin-top');
    style_manager.remove('td', 'padding', 'border', 'color');
    
Send a map of properties to be removed:

    style_manager.remove({
        "a:hover": [
            "text-decoration",
            "font-size"
        ],
        "*": [
            "background-image",
            "text-align",
            "margin"
        ]
    });

## License

It's all yours, licensed under [Creative Commons CC0](http://creativecommons.org/publicdomain/zero/1.0/).
/*jslint devel: true, browser: true, forin: true, maxerr: 50, indent: 4 */
var style_manager = (function () {
    "use strict";
    var rules = {},
        parse_rules = function () {
            var selector_index, property_index, selector_properties,
                result = "";
            for (selector_index in rules) {
                result += selector_index + " {\n";
                selector_properties = rules[selector_index];
                for (property_index in selector_properties) {
                    result += "    " + property_index + ": "
                            +  selector_properties[property_index] + ";\n";
                }
                result += "}\n\n";
            }
            return result;
        },
        add_rule = function (selector, property, value) {
            rules[selector] = rules[selector] || {};
            rules[selector][property] = value;
        },
        add_rules_for_one_selector = function (selector, property_map) {
            var properties = Object.keys(property_map),
                i,
                l;
            for (i = 0, l = properties.length; i < l; i += 1) {
                add_rule(selector, properties[i],
                        property_map[properties[i]]);
            }
        },
        add_many_rules = function (selector_map) {
            var selectors = Object.keys(selector_map),
                i,
                l;
            console.log(selector_map);
            for (i = 0, l = selectors.length; i < l; i += 1) {
                add_rules_for_one_selector(selectors[i],
                        selector_map[selectors[i]]);
            }
        },
        delete_selector = function (selector) {
            delete rules[selector];
        },
        delete_rules_from_selector = function (selector) {
            var properties = Array.prototype.slice.call(arguments),
                i,
                l;
            if (rules[selector] === undefined) {
                return;
            }
            if (properties.length === 0) {
                delete_selector(selector);
            }
            for (i = 0, l = properties.length; i < l; i += 1) {
                delete rules[selector][properties[i]];
            }
        },
        delete_many_rules = function (selector_map) {
            var selectors = Object.keys(selector_map),
                i,
                l,
                p;
            for (i = 0, l = selectors.length; i < l; i += 1) {
                p = [selectors[i]].concat(selector_map[selectors[i]]);
                delete_rules_from_selector.apply(null, p);
            }
        },
        style_element = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(style_element);
    return {
        "add": function (s, p, v) {
            if (typeof s === "object") {
                add_many_rules(s);
            } else if (typeof s === "string" && typeof p === "object") {
                add_rules_for_one_selector(s, p);
            } else if (typeof s === "string" &&
                        typeof p === "string" && typeof v === "string" ) {
                add_rule(s, p, v);
            } else {
                console.log(typeof s);
                throw {
                    "name": "TypeError",
                    "message": "Bad arguments."
                };
            }
            style_element.textContent = parse_rules(rules);
        },
        "remove": function (s) {
            if (typeof s === "string") {
                delete_rules_from_selector.apply(null, arguments);
            } else if (typeof s === "object") {
                delete_many_rules(s);
            } else {
                throw {
                    "name": "TypeError",
                    "message": "Bad arguments."
                };
            }
            style_element.textContent = parse_rules(rules);
        },
        "rules" : function () {
            return rules;
        }
    };
}());

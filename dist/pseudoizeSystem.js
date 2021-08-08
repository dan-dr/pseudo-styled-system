"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pseudoizeSystem = void 0;
var styled_system_1 = require("styled-system");
function capitalize(s, lowerRest) {
    if (lowerRest === void 0) { lowerRest = false; }
    return (s &&
        s.charAt(0).toUpperCase() +
            (lowerRest ? s.slice(1).toLowerCase() : s.slice(1)));
}
var pseudoizeSystem = function (existingSystem, pseudo) {
    var list = [].concat(pseudo);
    var result = list.reduce(function (newSystem, pseudoSelector) {
        var _a;
        var pseudoProp = pseudoSelector.replace(/:|-([a-z])/g, function (g) {
            return g === ':' ? '' : g[1].toUpperCase();
        });
        var pseudoSystemConfig = Object.entries((_a = existingSystem.config) !== null && _a !== void 0 ? _a : {}).reduce(function (acc, _a) {
            var propName = _a[0], config = _a[1];
            acc["" + pseudoProp + capitalize(propName)] = {
                property: pseudoSelector,
                scale: config.scale,
                transform: function (value, scale) {
                    var _a;
                    var result = "{} " + pseudoSelector + " { " + propName + ": " + ((_a = scale === null || scale === void 0 ? void 0 : scale[value]) !== null && _a !== void 0 ? _a : value) + "}";
                    return result;
                },
            };
            return acc;
        }, {});
        return styled_system_1.compose(newSystem, styled_system_1.system(pseudoSystemConfig));
    }, styled_system_1.system({}));
    return result;
};
exports.pseudoizeSystem = pseudoizeSystem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const defaultOptions = {
    inversifyOptions: {
        defaultScope: 'Singleton',
    },
};
class IApplication {
    constructor(options = defaultOptions) {
        this._container = new inversify_1.Container(Object.assign(Object.assign({}, defaultOptions.inversifyOptions), options.inversifyOptions));
        this.configureService();
        this.setup(options);
    }
}
exports.default = IApplication;

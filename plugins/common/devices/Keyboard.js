const Event = require('../../../core/Event');

module.exports = class Keyboard extends Event.Emitter {

    constructor (name) {
        super(name);

        this.keys = { };
        this.modifiers = { };
    }

    key (key) {
        return this.keys[ key.toLowerCase() ];
    }

    modifier (modifier) {
        return this.modifiers[ modifier.toLowerCase() ];
    }

    connect () {
        window.addEventListener('keydown', event => this.down(event));
        window.addEventListener('keyup', event => this.up(event));
    }

    down (event) {
        const { keys, modifiers } = this;
        const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
        const normalized = key.toLowerCase().trim() || 'space';

        if (keys[ normalized ]) {
            return;
        }

        keys[ normalized ] = true;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;

        this.emit('down', [ event ]);
    }

    up (event) {
        const { keys, modifiers } = this;
        const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
        const normalized = key.toLowerCase().trim() || 'space';

        if (!keys[ normalized ]) {
            return;
        }

        keys[ normalized ] = false;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;

        this.emit('up', [ event ]);
    }
}

var app = new Vue({
    el: '#app',
    data() {
        return {
            currentLayerClass: 'layer_current__1y7nK',
            layerLayerClass: 'layer_layer__1L3ov',
            shiftRight: 0,
            shiftDown: 0,
            spread: 0,
            blur: 0,
            opacity: 0,
            inset: false,
            layers: [],
            currentLayer: 0,
            boxColor: '#3D9DF6',
            shadowColor: "#000000",
            previewBoxBackgroundColor: "#ffffff",
        }
    },
    mounted() {
        console.log("mouted")
        this.layers.push(this.shadowValue);
    },

    computed: {
        boxShadow() {
            var inset = this.inset ? " inset" : "";
            return `rgba(0,0,0,${this.opacity}) ${this.shiftRight}px ${this.shiftDown}px ${this.blur}px ${this.spread}px${inset}`
        },
        layersCss() {
            return this.layers.map((layer) => {
                var inset = layer[5] ? " inset" : "";
                return `rgba(${layer[0]}) ${layer[1]}px ${layer[2]}px ${layer[3]}px ${layer[4]}px${inset}`
            });
        },

        shadowLayersCss(){
            return `box-shadow: ${this.layersCss.join(",")};`;
        },
        shadowRbgaColor(){
            return `${this.hexToRgba(this.shadowColor.slice(1), this.opacity/ 100)}`;
        },

        shadowValue() {
            return [
                this.shadowRbgaColor,
                this.shiftRight,
                this.shiftDown,
                this.blur,
                this.spread,
                this.inset
            ]
        },

        shiftRightStyle() {
            return this.rangeSliderStyle(-50, 50, this.shiftRight);
        },

        shiftDownStyle() {
            return this.rangeSliderStyle(-50, 50, this.shiftDown);
        },

        spreadBarStyle() {
            return this.rangeSliderStyle(0, 100, this.spread);
        },

        opacityBarStyle() {
            return this.rangeSliderStyle(0, 100, this.opacity);
        },

        blurBarStyle() {
            return this.rangeSliderStyle(0, 100, this.blur);
        }
    },

    methods: {
        setShadowValue(shadowValue) {
            this.shadowColor = shadowValue[0];
            this.shiftRight = shadowValue[1];
            this.shiftDown = shadowValue[2];
            this.blur = shadowValue[3];
            this.spread = shadowValue[4];
            this.inset = shadowValue[5];
        },

        rangeSliderStyle(min, max, current) {
            var outputFactor = ((50 -(current - min))/100).toFixed(1);
            return `--Polaris-RangeSlider-min:${min}; --Polaris-RangeSlider-max:${max}; --Polaris-RangeSlider-current:${current}; --Polaris-RangeSlider-progress:${current - min}%; --Polaris-RangeSlider-output-factor:${outputFactor};`;
        },

        addLayerHandler() {
            this.layers.push([this.hexToRgba(0,0,0,0), 0, 5, 3, 0.2]);
        },

        setCurrentLayer(index) {
            this.currentLayer = index;
            this.setShadowValue(this.layers[index]);
        },

        delLayerHandler(index) {
            if(this.layers.length == 1) return;
            this.layers.splice(index, 1);
        },

        hexToRgba(hex, opacity) {
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            return r + "," + g + "," + b + "," + opacity;
        }

    },

    watch: {
        shadowValue() {
            this.$set(this.layers, this.currentLayer, this.shadowValue);
        }
    }
});
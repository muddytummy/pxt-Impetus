/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

/// <reference types='../shared/impetus.enums'/>

import * as RT from './_runtime';
import { Color } from './color';
import { Object3dMixin } from './object';

export function LightMixin<T extends RT.ObjectConstructor<THREE.Light>>(base: T) {
    return class extends base {
        public static distFrustum = 100;

        public get intensity_() {
            return this.intensity;
        }

        public set intensity_(value: number) {
            this.intensity = Math.max(0, value);
        }

        constructor(...args: any[]) {
            super(...args);

            if (undefined !== this.shadow) {
                if (undefined !== this.shadow.camera && this.shadow.camera instanceof THREE.OrthographicCamera) {
                    (this.shadow.camera as THREE.OrthographicCamera).left = -Light.distFrustum;
                    (this.shadow.camera as THREE.OrthographicCamera).right = Light.distFrustum;
                    (this.shadow.camera as THREE.OrthographicCamera).top = Light.distFrustum;
                    (this.shadow.camera as THREE.OrthographicCamera).bottom = -Light.distFrustum;
                }

                this.shadow.bias = 0.0001;
                this.shadow.mapSize.width = 2048;
                this.shadow.mapSize.height = 2048;
            }
        }
    };
}

export class Light extends LightMixin(Object3dMixin(THREE.Light)) { }

export class AmbientLight extends LightMixin(Object3dMixin(THREE.AmbientLight)) {
    constructor(color?: Color, intensity?: number) {
        super(color || Palette.SoftWhite, intensity || 1);
    }
}

export class DirectionalLight extends LightMixin(Object3dMixin(THREE.DirectionalLight)) {
    constructor(color?: Color, intensity?: number) {
        super(color || Palette.White, intensity || 1);
    }
}

export class HemisphereLight extends LightMixin(Object3dMixin(THREE.HemisphereLight)) {
    constructor(colorSky?: Color, colorGround?: Color, intensity?: number) {
        super(colorSky || NaturePalette.Sky, colorGround || NaturePalette.Ground, intensity || 0.6);
    }
}

export class PointLight extends LightMixin(Object3dMixin(THREE.PointLight)) {
    constructor(
        color?: Color, intensity?: number,
        distance?: number,
        decay?: number,
    ) {
        super(color || Palette.White, intensity || 1, distance || 0, decay || 2);
    }
}

export class SpotLight extends LightMixin(Object3dMixin(THREE.SpotLight)) {
    constructor(
        color?: Color, intensity?: number,
        distance?: number, angle?: number,
        penumbra?: number, decay?: number,
    ) {
        super(
            color || Palette.White, intensity || 1,
            distance || 0, angle || Math.PI / 3,
            penumbra || 0, decay || 2,
        );
    }
}

namespace pxsimImpetus.light {
    export function ambientLight(color?: Color, intensity?: number): DirectionalLight  {
        return new DirectionalLight(color, intensity);
    }

    export function directionalLight(color?: Color, intensity?: number): DirectionalLight  {
        return new DirectionalLight(color, intensity);
    }

    export function hemisphereLight(colorSky?: Color, colorGround?: Color, intensity?: number): HemisphereLight  {
        return new HemisphereLight(colorSky, colorGround, intensity);
    }

    export function pointLight(color?: Color, intensity?: number): PointLight  {
        return new PointLight(color, intensity);
    }

    export function spotLight(color?: Color, intensity?: number): SpotLight  {
        return new SpotLight(color, intensity);
    }
}

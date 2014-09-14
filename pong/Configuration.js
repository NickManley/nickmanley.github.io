//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Configuration settings for the Pong game.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//
 
/** @namespace Pong */
var Pong = Pong || {};

/**
 * @class Configuration
 * @description Configuration settings. The values defined here are the
 * default settings.
 */
Pong.Configuration = function() {
    "use strict";

    /** Ball configuration. */
    this.ball = {
        width: 10,
        height: 10,
        posX: 400,
        posY: 300,
        speedX: 400,
        speedY: 0,
        color: "#FFF"
    };

    /** Left Paddle configuration. */
    this.leftPaddle = {
        width: 15,
        height: 100,
        posX: 10,
        posY: 250,
        moveSpeed: 500,
        color: "#FFF"
    };

    /** Right Paddle configuration. */
    this.rightPaddle = {
        width: 15,
        height: 100,
        posX: 775,
        posY: 250,
        moveSpeed: 500,
        color: "#FFF"
    };

    /** Scoreboard configuration. */
    this.scoreboard = {
        fontFace:  "Arial",
        fontSize:  "20px",
        fontColor: "#FFF",
        leftPos:   { x: 200, y: 30 },
        rightPos:  { x: 600, y: 30 }
    };

    /** Keyboard controls. */
    this.controls = {
        upKey: "w",
        downKey: "s",
        pauseKey: "p",
        resetKey: "r"
    };
};

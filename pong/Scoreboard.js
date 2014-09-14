//=========================================================================//
//                              HTML5 Pong
//=========================================================================//
/**
 * @file Represents the scoreboard for the pong game.
 * This class includes the scores for both the player on the left
 * and on the right.
 * @author Nick Manley
 * @copyright The Unlicense
 */
//-------------------------------------------------------------------------//

/** @namespace Pong */
var Pong = Pong || {};

/**
 * @class ScoreBoard
 * @param {object} context
 * @param {Pong.Configuration#scoreboard} scoreboardConfig
 */
Pong.Scoreboard = function (context, scoreboardConfig) {
    "use strict";
    this.context = context;
    this.leftScore = 0;
    this.rightScore = 0;
    this.fontFace = scoreboardConfig.fontFace;
    this.fontSize = scoreboardConfig.fontSize;
    this.fontColor = scoreboardConfig.fontColor;
    this.leftPos = scoreboardConfig.leftPos;
    this.rightPos = scoreboardConfig.rightPos;
};

Pong.Scoreboard.prototype.draw = function () {
    "use strict";
    // Update the score's font size, face, and color.
    this.context.font = this.fontSize + " " + this.fontFace;
    this.context.fillStyle = this.fontColor;

    // Update score for player on the left side of the board.
    this.context.fillText(
        String(this.leftScore), this.leftPos.x, this.leftPos.y);

    // Update score for player on the right side of the board.
    this.context.fillText(
        String(this.rightScore), this.rightPos.x, this.rightPos.y);
};

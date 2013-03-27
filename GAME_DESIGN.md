Simon game design
=================

Game start
----------
The game starts as soon as the web page is loaded.

Initial state
-------------
Initially, Simon's color/sound sequence is empty.
The current round number is 0.

Game mechanics
--------------
At the beginning of each new round, Simon:
- pick a color/sound randomly among the 4 possible colors
- append it to its current color/sound sequence
- replay the entire sequence from the beginning
Then, the player tries to reproduce the color/sound sequence
in its entirety using the 4 colored controls at its disposal.
If successful, the game moves on to the next round.

Game end
--------
The game ends as soon as the player diverges from Simon's color/sound sequence.

Game tuning variables
---------------------
- list of possible colors/sound:
    - blue/E-note
    - yellow/C#-note
    - red/A-note
    - green/E-note (an octave lower than blue)
- color/sound play speed: 0.5s per sequence entry with 0.25s between each entry

Game entities & properties
--------------------------
- color/sound sequence object

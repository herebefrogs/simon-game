Simon game design
=================

Game start
----------
The game starts as soon as the web page is loaded.

On game start
-------------
- Simon's color sequence is empty.
- We're on turn #0

Game mechanics
--------------
On a new turn, Simon:
- pick a color randomly among the 4 possible colors
- add it to the end of his color sequence
- replay the entire sequence from the beginning
Then, the player use 4 colored tiles to match Simon's color sequence in the same order
If he succeeds, we start a new turn

Game end
--------
The game ends as soon as the player makes a mistake while matching Simon's color sequence

Game tuning variables
---------------------
- list of possible colors:
    - blue/E-note
    - yellow/C#-note
    - red/A-note
    - green/E-note (an octave lower than blue)
- color/sound play speed: 1s per color in Simon's sequence with a pause of 0.25s between each color

Game entities & properties
--------------------------
- Simon's color sequence
- player's color sequence

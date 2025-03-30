# Memory Game

A simple browser-based memory game built with HTML, CSS, and JavaScript. The objective is to match pairs of cards by flipping them over.

## How to Play

- The game starts with cards placed face down.
- Click on a card to flip it over and reveal its color.
- Click on a second card. If it matches the first one, both cards stay face up. If not, they will flip back after 1 second.
- The goal is to match all the pairs.

## How It Works

1. **Game Setup**: 
   - The game uses an array of colors, shuffles them, and creates 10 card elements.
   - Each card is added to the DOM and given a class based on its color.

2. **Gameplay**:
   - Clicking a card reveals its color by changing its background.
   - Players can only flip two cards at a time.
   - If the cards match, they remain face up; otherwise, they flip back after 1 second.

3. **Restrictions**:
   - Players can’t click the same card twice in one turn.
   - Only two cards can be flipped at a time, preventing rapid guessing.

## How to Run

- `git clone https://github.com/katiejnete/MemoryGame.git`
- `cd MemoryGame`
- Open `index.html` in your browser to play the game.  

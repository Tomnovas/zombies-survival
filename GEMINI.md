# Zombies Survival

A MakeCode Arcade game where players must survive against waves of zombies. This project is designed to be used both as a standalone game and as an extension in MakeCode Arcade.

## Project Overview

- **Technologies:** MakeCode Arcade (PXT), TypeScript, Python, Blocks.
- **Core Logic:** The game features waves of enemies, different zombie types (e.g., `mega_zombie`, `gros_zombie`), power-ups (`med_kit`, `amobox`), and special events like nuke attacks.
- **Multiplayer:** Supports multiplayer modes (as seen in `pxt.json` and logic for multiple players).
- **Localization:** Includes support for both French and English.

## Building and Running

This project uses the `pxt` (Microsoft MakeCode) CLI for development.

- **Build:** `pxt build` (or `make build`)
- **Deploy:** `pxt deploy` (or `make deploy`)
- **Test:** `pxt test` (or `make test`)

To edit the project, you can import it into the [MakeCode Arcade editor](https://arcade.makecode.com/) using the repository URL: `https://github.com/tomnovas/zombies-survival`.

## Key Files

- `main.ts`: The primary TypeScript source file containing the game logic.
- `main.py`: The Python version of the game logic (synchronized with `main.ts`).
- `main.blocks`: The visual programming (Blocks) representation.
- `pxt.json`: Project configuration, including dependencies and file list.
- `tilemap.g.ts` / `tilemap.g.jres`: Tilemap definitions and assets.
- `images.g.ts` / `images.g.jres`: Image assets and sprite definitions.

## Development Conventions

- **Sprite Categorization:** Uses `SpriteKind` to define various game entities (med_kit, munition, amobox, mega_zombie, etc.).
- **Extensions:** Relies on several community and official extensions:
    - `pxt-button-combos`: For cheat codes and special inputs.
    - `pxt-color`: For color fading effects.
    - `pxt-status-bar`: For player health and other indicators.
    - `arcade-timers`: For handling timed events.
    - `arcade-text`: For advanced text rendering.
- **Language:** The codebase contains some French identifiers (`joueur`, `langue`) but provides in-game support for multiple languages.
- **Animation:** Uses a custom `defeatAnimation` function for game-over sequences.

## Architecture

The project follows the standard MakeCode Arcade extension structure. Assets are managed through `.jres` and `.g.ts` files, which are automatically generated or updated by the MakeCode editor. The `pxt.json` file is the source of truth for project structure and dependencies.

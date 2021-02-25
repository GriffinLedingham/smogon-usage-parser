# Smogon Usage Parser

A Node CLI [Smogon Usage Stats](https://www.smogon.com/stats) parser built in TypeScript, which outputs Usage Stats data in the format required for the [Pikalytics](https://www.pikalytics.com) API. Use this parser as you please, credit is always appreciated if this parser is used in any cool projects!

## Requirements

- Node 10.16.3+

## Setup

- `npm install`
- `npm run tsc`

## Usage

- `node dist/index.js -f <format> -d <date> -r <rating> -o <output directory> [-l <local>]`

`format` should be formatted as `gen7vgc2017`, `date` as `2017-10`, `rating` as `1760`, `output` as `./data`.

The `-l` flag will force the parser to utilize local data, instead of fetching from the Smogon servers. This should reference the directory where the chaos .json & .txt files to parse reside.

## Example

- `node dist/index.js -d 2019-08 -f gen7vgc2019ultraseries -r 1760 -o ./`

## Output

When Smogon Usage Parser finishes a run, it will output a .json file to specified output directory, along with CSV's for items, abilities, moves, etc. The output JSON data will be in the following format:

```json
[
    {
        "name": "Incineroar",
        "types": [
            "fire",
            "dark"
        ],
        "stats": {
            "hp": 95,
            "atk": 115,
            "def": 90,
            "spa": 80,
            "spd": 90,
            "spe": 60
        },
        "abilities": [
            {
                "ability": "Intimidate",
                "percent": "99.915"
            },
            ...
        ],
        "raw_count": "492",
        "percent": 86,
        "ranking": 1,
        "viability": "B+",
        "items": [
            {
                "item": "Figy Berry",
                "item_us": "Figy_Berry",
                "percent": "31.073"
            },
            ...
        ],
        "spreads": [
            {
                "nature": "Careful",
                "ev": "236/4/4/0/236/28",
                "percent": "8.263"
            },
            ...
        ],
        "moves": [
            {
                "move": "Fake Out",
                "type": "normal",
                "percent": "99.970"
            },
            ...
        ],
        "team": [
            {
                "pokemon": "Rayquaza-Mega",
                "percent": "47.043",
                "types": [
                    "dragon",
                    "flying"
                ]
            },
            ...
        ]
    },
    ...
]
```

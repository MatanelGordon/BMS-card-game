# card-manager

Card manager game

## Usage

```shell
npm i
npm run dev
```

## About the Task

This is a simpel guessing game where in a given deck,
you pick a card and guess whether the next card is of greater or worse value than yours

This excercises SOLID design patterns and strengthen typescript comperhension among beginner to intermidiate levels.

## the Design

![card game UML](./assets/CardGame.jpg)

The Game's logic has 2 major factors:

- Card Picking at the beginning
- Card Comparison algorithm

Thus, these parts are being abstracted using interfaces `IPickStrategy<T>` and `IComperator<T>`.
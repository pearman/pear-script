# In Progress
## Redesign Interpreter Core

* Make all objects flat — no special keys.
  * Make memory address able with `_.get( . . . )` 
* Make a method wrapping function to transform JS functions into the appropriate data structure to be executed by the interpreter.
* Try not to deviate to far from the raw parse tree, make dynamic code easily executable.
  * Match type interfaces with parser output.xs

# Overview

## Key Concepts

* **Everything is an object (table)**, including primitives and blocks
* **Only one data-structure**, the table, removing the confusion between arrays and maps
* **Inspired by**  Javascript, Smalltalk, Lisp, and Lua

## Language Description
### All Primitives are Tables

All primitives including numbers, strings, and booleans are tables. That means that in order to operate on them we need to call their encapsulated methods. For example `sqrt(1 + 2 - 3)` would translate to`1.+(2).-(3).sqrt()`.


### Table Creation and Local Variable Assignment

Tables are like λ functions in other languages. In the example bellow we have assigned the "function", ``λ(x) = ((x + 1) * 2) ^ 2`` , to the key `math`. 

```typescript
math : (x){ x.+(1).*(2).squared()) }
```
Executing ` math(5)` returns `144`.
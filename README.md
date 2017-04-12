# In Progress
* Implment proper closures
* Make value accessable via data

# Overview

## Key Concepts

* **Everything is an object (table)**, including primitives
* **Memory is a table**, defying the traditional notion of scope and increasing flexibility
* **Only one data-structure**, the table, removing the confusion between arrays and maps
* **Inspired by**  Javascript, Smalltalk, Lisp, and Lua

## Language Description
### All Primitives are Tables

All primitives including numbers, strings, and booleans are tables. That means that in order to operate on them we need to call their encapsulated methods. For example `sqrt(1 + 2 - 3)` would translate to `1.+(2).-(3).sqrt()`. 

Since all operators are methods, an editor would be able to **auto-complete all the things.**


### Table Creation and Local Variable Assignment

Tables are like λ functions in other languages. In the example bellow we have assigned the block, ``λ(x) = ((x + 1) * 2) ^ 2`` , to the key `math`. 

```typescript
math: (x){ x.+(1).*(2).squared() }
```
Executing ` math(5)` returns `144`.

### Implementing a Class

```typescript
Point: (x, y) {
  dist: (p2) { x.-(p2.x).squared().+(y.-(p2.y).squared()).sqrt() }
  this.new() // Return a copy of this object
}
p1: Point(1, 2)
p2: Point(3, 2)
p1.dist(p2).print()
```


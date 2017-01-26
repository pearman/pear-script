# Gabe's Language

## Key Concepts

* **Everything is an object (table) **, including primitives and blocks
* **Only one data-structure**, the table, removing the confusion between arrays and maps
* **Immutability**, everything is pass-by-value
* **All blocks return the value of the last statement**
* **Inspired by**  Javascript, Smalltalk, Lisp, and Lua

## Language Description
### All Primitives are Tables

All primitives including numbers, strings, and booleans are tables. That means that in order to operate on them we need to call their encapsulated methods. For example ``sqrt(1 + 2 - 3)`` would translate to ``1.+(2).-(3).sqrt()``. 

Since all operators are methods, an editor would be able to **auto-complete all the things.**


### Block Creation and Local Variable Assignment

Blocks are like λ functions in other languages except for they themselves are tables. In the example bellow we have assigned the block, ``λ(x,y) = x / y`` , to the key ``div``.

```typescript
div: (x y){ x./(y) }
```
To call the block we can use the syntax bellow. Notice that the arguments can be **entered in order** or **by key**.
```typescript
div(3 4) // => 0.75
div(y: 4 x: 3) // => 0.75
```
This enables us to "**curry**" the block -- since a block will only execute once all of the keys in its input table have a value associated with them.
```typescript
curried: div(y: 4)
curried(x: 3) // => 0.75
```
### A Simple "Class" Using Tables

Let's use tables to create a typical "class." This can be achieved by creating a block (similar to a constructor) that returns a table.

```typescript
Point: (x y) {
  // Table literal
  [ x: x
    y: y
    dist: (p2) {
      Number.sqrt(
    	x.-( p2.x ).squared()
    	y.-( p2.y ).squared()
      )
    }
  ]
}
```
Since all blocks are themselves tables, the code above can be simplified to this. Notice that bellow we are using the ``this`` key. ``this`` enables us to return a copy of the encapsulating block.
```typescript
Point: (x y) {
  dist: (p2) {
    Number.sqrt(
      x.-( p2.x ).squared()
      y.-( p2.y ).squared()
    )
  }
  this
}
```
With our class defined we can create a new object and call the ``dist`` method.
```typescript
p1: Point(3 4)
result: p1.dist(Point(5 6))
```

### A Tables "Value"

Since a number is an object, we can extend its functionality by adding additional methods. Notice that we are using the ``value`` key in our ``plus1`` and ``div2`` blocks. ``value`` is the key associated with the object's surface level value.

```typescript
3.assign([ 
  plus1: (){ value.+(1) }
  div2:  (){ value./(2) }
])

Console.log(num.plus1()) // Prints "4"
Console.log(num.div2())  // Prints "1.5"
```


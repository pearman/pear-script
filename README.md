# Language Description
## All Primitives are Tables

All primitives including numbers, strings, and booleans are tables. That means that in order to operate on them we need to call their encapsulated methods. For example `sqrt(1 + 2 - 3)` would translate to `1.+(2).-(3).sqrt()`. 

Since all operators are methods, an editor would be able to **auto-complete all the things.**


## Table Creation and Local Variable Assignment

Tables are like λ functions in other languages. In the example bellow we have assigned the block, ``λ(x) = ((x + 1) * 2) ^ 2`` , to the key `math`. 

```ruby
math: (x){ x.+(1).*(2).squared() }
```
Executing `math(5)` returns `144`.

## Implementing a Class

```ruby
Point: (x, y) {
  dist: (p2) { x.-(p2.x).squared().+(y.-(p2.y).squared()).sqrt() }
  this.new() # Return a copy of this object
}
p1: Point(1, 2)
p2: Point(3, 2)
p1.dist(p2).print()
```

## Addressable Memory

In the example bellow we use `\` to jump one level up in scope enabling us to access the globally defined `x`.

```ruby
x: 1
example: (x) { x.+(\.x) }
```


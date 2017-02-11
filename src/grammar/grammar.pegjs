
Prog "prog"
  = Chain*

Table "table"
  = "(" _ args:Object* _ ")" _ "{" _ block:Prog _ "}" { return {type: "table", args, block} }

Chain "chain"
  = parent:Statement _ "." _ child:Chain { return [].concat(parent).concat(child) }
  / statement:Statement

Statement "statement"
  = statement:Object _ { return statement }
  / statement:Table _  { return statement }

PropertyObject "propertyObject"
  = Method
  / Property

Object "object"
  = Method
  / Atom
  / Table

Method "method"
  = method:Property "(" _ args:Chain*  _ ")" { return { type: "method", method, args } }

Atom "atom"
  = value:Integer _   { return {type: "number", value } }
  / value:Decimal _   { return {type: "number", value } }
  / value:Property _  { return {type: "property", value } }

Property "property"
  = [a-zA-Z+-/%*]+[0-9]*   { return text() }

Decimal "decimal"
  = Integer "." Integer

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*

Prog
  = _ block:Block* { return block }

Block
  = Assignment
  / Chain
  / Comment

Table
  = "(" _ args:Object* _ ")" _ "{" _ block:Prog _ "}" { return {type: "table", args, block} }

Assignment
  = parent:Chain _ ":" _ child:Chain { return {type: "assignment", parent, child} }

Chain
  = parent:Statement _ "." _ child:Chain { return [].concat(parent).concat(child) }
  / statement:Statement
  
Comment
  = _ "#" comment:[^\n]* _ { return {type: "comment", value: comment.join('')} }

Statement
  = statement:Object _ { return statement }
  / statement:Table _  { return statement }

PropertyObject
  = Method
  / Property

Object
  = Method
  / Atom
  / Table

Method
  = method:Property "(" _ args:Chain*  _ ")" { return { type: "method", method, args } }

Atom
  = value:Decimal _   { return value }
  / value:Integer _   { return value } 
  / value:Boolean _ { return (value === 'true') ? true : false }
  / value:Property _  { return {type: "property", value } }
  / value:String _ { return value }

Boolean
  = "true"
  / "false"

Property
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* { return text() }

Decimal
  = int1:Integer "." int2:Integer { return parseFloat(`${int1}.${int2}`) }

Integer
  = [0-9]+ { return parseInt(text(), 10); }
  
String
  = '"' chars:DoubleStringCharacter* '"' { return chars.join(''); }
  / "'" chars:SingleStringCharacter* "'" { return chars.join(''); }

DoubleStringCharacter
  = !('"' / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

SingleStringCharacter
  = !("'" / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

EscapeSequence
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b";   }
  / "f"  { return "\f";   }
  / "n"  { return "\n";   }
  / "r"  { return "\r";   }
  / "t"  { return "\t";   }
  / "v"  { return "\x0B"; }

_ "whitespace"
  = [ \t\n\r]*
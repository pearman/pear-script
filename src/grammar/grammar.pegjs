
{
  let _ = require('lodash');

  function buildTable(p, t, args, block) {
    return (argsIn) => {
      let sequence = [];
      // Load arguments
      let argMap = {};
      let argKeys = args(p, t);
      for (i = 1; i < argsIn.length; i++)
        argMap[argKeys[i - 1]] = argsIn[i];
      let newParent = p.concat(argMap);
      // Execute table
      for (var i = 0; i < block.length; i++)
        sequence.push(block[i](newParent, t));
      let result = newParent[newParent.length - 1];
      // Set table value
      result.value = sequence[sequence.length - 1];
      // Assign numeric values
      sequence.forEach((value, i) => result[i] = value);
      return Object.assign(t.Table(), result);
    };
  }
}

Prog
  = _ block:Block* { return block }

Block
  = Assignment
  / Chain
  / Object
  / Comment

Table
  = args:ArgBlock _ "{" _ block:Prog _ "}" _ { return (p, t) =>  buildTable(p, t, args, block) } 
  / "{" _ block:Prog _ "}" _ { return (p, t) => buildTable(p, t, [], block) }
  
ArgBlock
	= "(" _ args:RawProperty* _ ")" { return (p, t) => args }

Assignment
  = parent:Property _ ":" _ child:Chain { return (p, t) => p[p.length - 1][parent(p, t)] = child(p, t) }

Chain
  = parent:Object _ "." _ child:Chain {
    return (p, t) => {
      const newParent = p.concat(parent(p, t));
      console.log('New Parent', newParent);
      return child(newParent, t);
    }
  }
  / property:Object _ { return property }
  
Comment
  = _ "#" comment:[^\n]* _ { return (p, t) => {} }

Object
  = Method
  / Atom
  / Table

Method
  = method:Property "(" _ args:Chain*  _ ")" { return (p, t) => {
    args.unshift((_, t) => p[p.length - 1]);
    let result =  method(p, t)(args.map(arg => arg(p, t)));
    console.log('Result', result);
    return result;
   } 
  }

Atom
  = value:Decimal _   { return (p, t) => t.Number(value) }
  / value:Integer _   { return (p, t) => t.Number(value) } 
  / value:Boolean _   { return (p, t) => t.Boolean((value === 'true') ? true : false) }
  / value:Property _  { return value }
  / value:String _    { return (p, t) => t.String(value) }

Boolean
  = "true"
  / "false"
  
RawProperty
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* _ { return text() }
  
Property
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* {
    const value = text();
    return (p, t) => {
      for (var i = p.length - 1; i >= 0; i--)
        if (p[i][value]) return p[i][value];
      return value;
    }
  }

Decimal
  = int1:Integer "." int2:Integer { return parseFloat('' + int1 + '.' + int2) }

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
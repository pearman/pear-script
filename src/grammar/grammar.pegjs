
{
  let _ = require('lodash');

  function buildTable(p, t, args, block) {
    return (argsIn) => {
      if (argsIn.length - 1 < args.length) 
        throw `Not enough arguments for table execution`;
      // Load arguments
      let argMap = args.reduce((acc, value, i) => {
        acc[value] = argsIn[i+1];
        return acc;
      }, {});
      let parentIndex = p.length;
      let newParent = p.concat(argMap);
      // Execute table
      let outputByIndex = block.map(statement => statement(newParent, t));
      let index = 0;
      let outputTable = outputByIndex.reduce((acc, value) => {
          if (_.has(value, 'value')) {
            acc[index] = value;
            index++;
          }
          return acc;
        }, {});
      // console.log(JSON.stringify(_.last(newParent), null, 2));
      let value = _.isUndefined(_.last(outputByIndex).value) ? _.last(outputByIndex) : _.last(outputByIndex).value;
      // Set table value
      let result = _.merge(t.Table(), newParent[parentIndex], outputTable, _.isObject(value) ? value : { value });
      // console.log(result);
      return result;
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
  = args:ArgBlock _ "{" _ block:Prog _ "}" _ { 
    return (p, t) => buildTable(p, t, args, block) 
  } 
  / "{" _ block:Prog _ "}" _ { 
    return (p, t) => buildTable(p, t, [], block)(p, t)
  }
  
ArgBlock
	= "(" _ args:RawProperty* _ ")" { return args }

Assignment
  = parent:RawProperty _ ":" _ child:Chain { return (p, t) => {
      p[p.length - 1][parent] = child(p, t);
      return p[p.length - 1];
    }
  }

Chain
  = parent:Object _ "." _ child:Chain {
    return (p, t) => {
      const newParent = p.concat(parent(p, t));
      //console.log('New Parent', newParent);
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
    let argsWithContext = [(p2, t) => _.last(p)].concat(args);
    let fun = method(p, t);
    if (!_.isFunction(fun)) throw `'${fun}' is not a method`;
    let result =  fun(argsWithContext.map(arg => arg(p, t)), p, t);
    //console.log('Result', result);
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
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* _ { return text().trim() }
  
Property
  = [a-zA-Z+\-/%*?=\^<>]+[0-9]* {
    const value = text();
    return (p, t) => {
      for (var i = p.length - 1; i >= 0; i--)
        if (p[i][value]) return p[i][value];
      throw `Could not find key '${value}'`;
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
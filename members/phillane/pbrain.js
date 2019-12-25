function verify(script)
{
	let bracketcount = 0;
	let parencount = 0;
	let error = 0;
	
	script.split("").forEach(c =>
	{
		if (c === '[')
			bracketcount++;
		else if (c === ']')
			bracketcount--;
		else if (c === '(')
			parencount++;
		else if (c === ')')
			parencount--;
		
		if (bracketcount < 0) //verify no ] without [
			error = 1;
		
		if (parencount < 0) //verify no ) without (
			error = 2;
		
		if (parencount > 1) //verify no nested procedures
			error = 3;
	});
	
	if (error !== 0)
		return error;
	
	if (bracketcount !== 0) //verify no unclosed [
		return 4;
	
	if (parencount !== 0) //verify no unclosed (
		return 5;
	
	return 0; //all good!
}

function execute(script, input)
{
	let tape = new Array(30000); //allocate tape
	for (let i = 0; i < 30000; i++)
		tape[i] = 0; //set to 0
	
	let ptr = 0;
	let output = "";
	let procedures = {};
	
	for (let i = 0; i < script.length; i++) //main interpreter loop
	{
		if (script[i] === '+') //addition to cell
		{
			tape[ptr] = (tape[ptr] + 1) % 256; //overflow protection
		}
		else if (script[i] === '-') //subtraction from cell
		{
			tape[ptr]--;
			if (tape[ptr] < 0)
				tape[ptr] = 255; //overflow protection
		}
		else if (script[i] === '>') //shift cell pointer right
		{
			ptr = (ptr + 1) % 30000; //overflow protection
		}
		else if (script[i] === '<') //shift cell pointer left
		{
			ptr--;
			if (ptr < 0)
				ptr = 29999; //overflow protection
		}
		else if (script[i] === '[') //while !== 0
		{
			let brackets = 1; //start with one open bracket
			if (tape[ptr] === 0) //if we are not !== 0
			{
				i++; //bump to next instruction
				while (i < script.length) //iterate without risk of out-of-range exception
				{
					if (script[i] === '[') //if we see a [ then increment nesting
						brackets++;
					else if (script[i] === ']') //if we see a ] then decrement nesting
						brackets--;
					
					if (brackets === 0) //if we have no more brackets then exit the loop
						break;
					
					i++; //try next instruction
				}
			}
		}
		else if (script[i] === ']') //wend
		{
			let brackets = 1; //start with one open bracket
			if (tape[ptr] !== 0) //if we are !== 0
			{
				i--;
				while (i >= 0) //iterate without risk of out-of-range exception
				{
					if (script[i] === '[') //if we see a [ then increment nesting
						brackets--;
					else if (script[i] === ']') //if we see a ] then decrement nesting
						brackets++;
					
					if (brackets === 0) //if we have no more brackets then exit the loop
						break;
					
					i--; //try next instruction
				}
			}
		}
		else if (script[i] === '.') //output character
		{
			let char_ = String.fromCharCode(tape[ptr])
			console.log(char_); //output to console
			output += char_;
		}
		else if (script[i] === ',')
		{
			if (input.length > 0)
			{
				tape[ptr] = input.slice(0, 1).charCodeAt(0); //input from input string
				input = input.slice(1); //shift off
			}
			else
			{
				console.log("Runtime error: No more input");
			}
		}
		else if (script[i] === '(') //declaration of procedure
		{
			let procedurenum = tape[ptr]; //get procedure ID
			let procedure = "";
			i++;
			while (script[i] !== ')') //iterate until closing delimiter found
			{
				procedure += script[i]; //add to procedure declaration
				i++;
			}
			
			procedures[procedurenum] = procedure; //add to list of procedures
			console.log(procedures);
		}
		else if (script[i] === ':') //call to procedure
		{
			try
			{
				let [retinput, retoutput] = execute(procedures[tape[ptr]], input); //recursively execute procedure
				input = retinput;
				output += retoutput;
			}
			catch (e)
			{
				console.log("Runtime error: unknown procedure with ID " + tape[ptr]);
			}
		}
	}
	
	return [input, output];
}

function error(id)
{
	let error = "Error while preparsing: ";
	switch (id)
	{
		case 1:
			error += "found unexpected ]";
			break;
		case 2:
			error += "found unexpected )";
			break;
		case 3:
			error += "found nested procedure";
			break;
		case 4:
			error += "did not find expected ]";
			break;
		case 5:
			error += "did not find expected )";
			break;
	}
	
	document.getElementById("output").innerHTML = error;
}

function interpret()
{
	let script = document.getElementById("input").value;
	let input = document.getElementById("prginput").value;
	script = script.replace(/&lt;/g, "<");
	script = script.replace(/&gt;/g, ">");
	
	let verification = verify(script);
	if (verification === 0)
	{
		let [retinput, retoutput] = execute(script, input);
		document.getElementById("output").innerHTML = retoutput;
	}
	else
	{
		error(verification);
	}
}
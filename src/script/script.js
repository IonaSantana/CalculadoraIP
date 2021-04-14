
bin = true;
function decbin()
{
	// Escolha do usuário digitar em binário ou em decimal, aqui ele escolhe um desses modos
	// Validar se o que o usuário digitou é válido dentro das especificações do IPV4

	let modo = document.getElementById('modo');
	if (modo.value == "Binário") 
	{
		bin = false;
		modo.value = "Decimal";
	}else
	{
		bin = true;
		modo.value = "Binário";
	}
	
}

function mascara()
{
	let rede = document.getElementById('masc');
	let subrede = document.getElementById('mascSub');

}

function calcula()
{

	let um = document.getElementById('1');
	let dois = document.getElementById('2');
	let tres = document.getElementById('3');
	let quatro = document.getElementById('4');
	if (bin == true) 
	{
		var primeira = um.value;
		if (primeira.length == 8) 
		{
			
		}else
		{
			alert("O tamanho deve ser 8!");
		}
	}else
	{
		
	}
}
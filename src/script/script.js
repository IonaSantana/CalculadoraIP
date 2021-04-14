
bin = true;
pode = true;
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

	let um = document.getElementById('um');
	let dois = document.getElementById('dois');
	let tres = document.getElementById('tres');
	let quatro = document.getElementById('quatro');
	pode = true;
	// ||
	if (bin == true) 
	{
		var primeira = (um.value).toString();
		var segundo = (dois.value).toString();
		var terceiro = (tres.value).toString();
		var quarto = (quatro.value).toString();
		if (primeira.length == 8 && segundo.length == 8 && terceiro.length == 8 && quarto.length == 8) 
		{
			
			for (var i = 0; i < 8; i++) 
			{
				if((primeira[i]!='1' && primeira[i]!='0') || (segundo[i]!='1' && segundo[i]!='0') || (terceiro[i]!='1' && terceiro[i]!='0') ||(quarto[i]!='1' && quarto[i]!='0'))
				{
					pode = false;
					
				}		
			}

			if (pode == false) 
			{
				alert("Números 0 e 1 permitidos!");
			}else
			{
				alert("Deu certo!");

				
				
			}
		}else
		{
			alert("O tamanho deve ser 8 em cada um!");
		}
	}else
	{
		
	}
}
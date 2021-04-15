
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
				//Descobrir de que classe é
				classe(primeira);
				//alert("Deu certo!");
				//Deu certo, agora verificamos as máscaras de rede e de subrede 
				var masc = document.getElementById('masc');
				var mascSub = document.getElementById('mascSub');

				var valuem = masc.options[masc.selectedIndex].value;
				
				var valuesub = mascSub.options[mascSub.selectedIndex].value;

				//Aqui veremos se o usuário escolheu as máscaras
				if (valuem!=0) 
				{	

					var IP = primeira + segundo + terceiro + quarto;
					if (valuesub!=0) 
					{
						//Com subrede
						alert("aqui amigos");
						
					}else
					{
						
						//Sem subrede
						let rede = document.getElementById('rede1');
						let broad = document.getElementById('broad1');
						
						//Endereço de rede -> Endereço do primeiro host
						// Calculo do Endereço de rede
						var endRede = enderecorede(IP, valuem);
						rede.innerHTML = endRede;

						//Endereço de broacast -> Endereço do último host
						// Calculo do Endereço de broadcast			
						var endBroad = enderecobroad(IP, valuem);
					    broad.innerHTML = endBroad;

					}
				}
			}
		}else
		{
			alert("O tamanho deve ser 8 em cada um!");
		}
	}else
	{
		
	}
}

//Descobre de que classe o IPV4 é
function classe(primeira)
{
	let atrclass = document.getElementById('letra');

	if (primeira[0] == '0')
	{
		atrclass.innerHTML = "A";
	}else if(primeira[0] == '1' && primeira[1] == '0')
	{
		atrclass.innerHTML = "B";
	}
	else if(primeira[0] == '1' && primeira[1] == '1' && primeira[2] == '0')
	{
		atrclass.innerHTML = "C";
	
	}else if (primeira[0] == '1' && primeira[1] == '1' && primeira[2] == '1' && primeira[3] == '0') 
	{
		atrclass.innerHTML = "D";
	}else
	{
		atrclass.innerHTML = "E";
	}

}
// Calcula o endereço da rede
function enderecorede(IP, valuem)
{
	var endRede = '';
						
	for (var i = 0; i < valuem; i++) 
	{
		endRede = endRede + IP[i];
	}	

	for (var i = valuem; i < 32; i++) 
	{
		endRede = endRede + '0';
	}
	return endRede;
}
// Calcula o endereco de broadcast
function enderecobroad(IP, valuem)
{
	var endBroad = '';
						
	for (var i = 0; i < valuem; i++) 
	{
		endBroad = endBroad + IP[i];
	}	

	for (var i = valuem; i < 32; i++) 
	{
		endBroad = endBroad + '1';
	}	

	return endBroad;
}
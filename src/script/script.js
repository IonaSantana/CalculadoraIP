
bin = true;
pode = true;
function mododecbin()
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
					// Visivel para quem é de fora
					let rede = document.getElementById('rede1');
					let broad = document.getElementById('broad1');
					let primHost = document.getElementById('primeiro1');
					let ultHost = document.getElementById('ultimo1');
					let qtsHosts = document.getElementById('qtHost');
					
					//Sem subrede								
					//Endereço de rede -> Endereço do primeiro host
					// Calculo do Endereço de rede
					var endRede = enderecorede(IP, valuem);
					rede.innerHTML = endRede;

					//Calculo do endereço do primeiro host
					var primeiroHost = primeiroEnd(endRede);
					primHost.innerHTML = primeiroHost;
					//Endereço de broacast -> Endereço do último host
					// Calculo do Endereço de broadcast			
					var endBroad = enderecobroad(IP, valuem);
				    broad.innerHTML = endBroad;

				    //Calculo do endereço do ultimo host
					var ultimoHost = ultimoEnd(endBroad);
					ultHost.innerHTML = ultimoHost;

					//Hosts possíveis da rede
					var qts = qtsHost(32-valuem);
					qtsHosts.innerHTML = qts-2 +`</br>` +`</br>`;
					
					if (valuesub!=0) 
					{		
						//Com subrede
						if (valuesub >= valuem) 
						{
							let subredeImprime = document.getElementById('subrede');
							var imprime = '';
							
							//Endereço de rede -> Endereço do primeiro host
							// Calculo do Endereço de rede da primeira subrede
							var endRede = enderecorede(IP, valuem);
							var endRedeSub = enderecorede(endRede, valuesub).toString();
							imprime = imprime + "Endereço subrede " + endRedeSub +`</br>` +`</br>`;
							
							//Calculo do endereço do primeiro host
							var primeiroHost = primeiroEnd(endRedeSub).toString();
						    imprime = imprime + "Primeiro endereço de host " + primeiroHost +`</br>` +`</br>`;
							
							//Calculo do broadcast
							var endBroad = enderecobroad(endRedeSub, valuesub).toString();

							//Calculo do endereço do ultimo host
							var ultimoHost = ultimoEnd(endBroad).toString();
							
						    imprime = imprime + "Último endereço de host " + ultimoHost +`</br>` +`</br>`;
					   	    imprime = imprime + "Endereço de broacast " + endBroad +`</br>` +`</br>`;
							
					   		//Quantidade de hosts válidos na subrede
							var qts = parseInt(qtsHost(32-valuesub));
							var qtsTotal = parseInt(qtsHost(32 -valuem));
							
							var numSubredes = qtsTotal/qts;
							var  q = '';
							qts = qts-2;
							q = qts.toString();
							imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
							imprime = imprime +`</br>` +`</br>`; 

							numSubredes = numSubredes - 1;
							
							for (var i = 0; i < numSubredes; i++) 
							{							
								endRedeSub = primeiroEnd(endBroad, valuesub).toString();
								imprime = imprime + "Endereço subrede" + endRedeSub +`</br>` +`</br>`;
								
								primeiroHost = primeiroEnd(endRedeSub).toString();
								imprime = imprime + "Primeiro endereço de host" + primeiroHost +`</br>` +`</br>`;

								//Calculo do broadcast
								var endBroad = enderecobroad(endRedeSub, valuesub).toString();

								//Calculo do endereço do ultimo host
								var ultimoHost = ultimoEnd(endBroad).toString();
							
								imprime = imprime + "Último endereço de host" + ultimoHost +`</br>` +`</br>`;
					   			imprime = imprime + "Endereço de broacast" + endBroad +`</br>` +`</br>`;
				
						   		// Quantidade de hosts válidos na subrede
								imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
								imprime = imprime +`</br>` +`</br>`; 
								
							}
							
							subredeImprime.innerHTML = imprime;

						}else
						{
							alert("Mais endereço do que você tem");
						}	
					}
				}
			}
		}else
		{
			alert("O tamanho deve ser 8 em cada um!");
		}
	}else
	{
		//Modo decimal, verifica se valores escritos são válidos

		var validapri = parseInt(um.value);
		var validaseg = parseInt(dois.value);
		var validater = parseInt(tres.value);
		var validaquar = parseInt(quatro.value);

		if ((validapri >=0 && validapri <=255) && (validaseg >=0 && validaseg <=255) && (validater >=0 && validater <=255) && (validaquar >=0 && validaquar <=255))
		{
			//Transformar o decimal em binário porque já foi resolvido em binário
			var primeira = decbin(validapri).toString();
			var segundo = decbin(validaseg).toString();
			var terceiro = decbin(validater).toString();
			var quarto = decbin(validaquar).toString();

			//Descobrir de que classe é
			classe(primeira);
			
			//Deu certo, agora verificamos as máscaras de rede e de subrede 
			let masc = document.getElementById('masc');
			let mascSub = document.getElementById('mascSub');

			let valuem = masc.options[masc.selectedIndex].value;
			
			let valuesub = mascSub.options[mascSub.selectedIndex].value;
			alert("Deu certo!");
			//Aqui veremos se o usuário escolheu as máscaras
			if (valuem!=0) 
			{						
				var IP = primeira + segundo + terceiro + quarto;
				var IP = primeira + segundo + terceiro + quarto;
				// Visivel para quem é de fora
				let rede = document.getElementById('rede1');
				let broad = document.getElementById('broad1');
				let primHost = document.getElementById('primeiro1');
				let ultHost = document.getElementById('ultimo1');
				let qtsHosts = document.getElementById('qtHost');
				
				//Sem subrede								
				//Endereço de rede -> Endereço do primeiro host
				// Calculo do Endereço de rede
				var endRede = enderecorede(IP, valuem);
				rede.innerHTML = endRede;

				//Calculo do endereço do primeiro host
				var primeiroHost = primeiroEnd(endRede);
				primHost.innerHTML = primeiroHost;
				//Endereço de broacast -> Endereço do último host
				// Calculo do Endereço de broadcast			
				var endBroad = enderecobroad(IP, valuem);
			    broad.innerHTML = endBroad;

			    //Calculo do endereço do ultimo host
				var ultimoHost = ultimoEnd(endBroad);
				ultHost.innerHTML = ultimoHost;

				//Hosts possíveis da rede
				var qts = qtsHost(32-valuem);
				qtsHosts.innerHTML = qts-2 +`</br>` +`</br>`;
				if (valuesub!=0) 
				{
					//Com subrede
					if (valuesub >= valuem) 
					{
						let subredeImprime = document.getElementById('subrede');
						var imprime = '';
						
						//Endereço de rede -> Endereço do primeiro host
						// Calculo do Endereço de rede da primeira subrede
						var endRede = enderecorede(IP, valuem);
						var endRedeSub = enderecorede(endRede, valuesub).toString();
						imprime = imprime + "Endereço subrede " + endRedeSub +`</br>` +`</br>`;
						
						//Calculo do endereço do primeiro host
						var primeiroHost = primeiroEnd(endRedeSub).toString();
					    imprime = imprime + "Primeiro endereço de host " + primeiroHost +`</br>` +`</br>`;
						
						//Calculo do broadcast
						var endBroad = enderecobroad(endRedeSub, valuesub).toString();

						//Calculo do endereço do ultimo host
						var ultimoHost = ultimoEnd(endBroad).toString();
						
					    imprime = imprime + "Último endereço de host " + ultimoHost +`</br>` +`</br>`;
				   	    imprime = imprime + "Endereço de broacast " + endBroad +`</br>` +`</br>`;
						
				   		//Quantidade de hosts válidos na subrede
						var qts = parseInt(qtsHost(32-valuesub));
						var qtsTotal = parseInt(qtsHost(32 -valuem));
						
						var numSubredes = qtsTotal/qts;
						var  q = '';
						qts = qts-2;
						q = qts.toString();
						imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
						imprime = imprime +`</br>` +`</br>`; 

						numSubredes = numSubredes - 1;
						
						for (var i = 0; i < numSubredes; i++) 
						{							
							endRedeSub = primeiroEnd(endBroad, valuesub).toString();
							imprime = imprime + "Endereço subrede" + endRedeSub +`</br>` +`</br>`;
							
							primeiroHost = primeiroEnd(endRedeSub).toString();
							imprime = imprime + "Primeiro endereço de host" + primeiroHost +`</br>` +`</br>`;

							//Calculo do broadcast
							var endBroad = enderecobroad(endRedeSub, valuesub).toString();

							//Calculo do endereço do ultimo host
							var ultimoHost = ultimoEnd(endBroad).toString();
						
							imprime = imprime + "Último endereço de host" + ultimoHost +`</br>` +`</br>`;
				   			imprime = imprime + "Endereço de broacast" + endBroad +`</br>` +`</br>`;
			
					   		// Quantidade de hosts válidos na subrede
							imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
							imprime = imprime +`</br>` +`</br>`; 
							
						}
						
						subredeImprime.innerHTML = imprime;
					}	
				}	
			}	

		}else
		{
			alert("Cada parte deve estar entre valores de 0 a 255");
		}
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

function primeiroEnd(rede)
{
	var sobe = 1, primeiro = '';

	for (var i = 31; i >= 0; i--) 
	{
		if (sobe == 1) 
		{
			if (rede[i] == '1') 
			{
				primeiro = '0' + primeiro;
			
			}else
			{
				primeiro = '1' + primeiro;
				sobe = 0;
			}
		}else
		{
			primeiro = rede[i] + primeiro;
		}
	}
	return primeiro;
}

function ultimoEnd(broacast)
{
	var ultimo = '';

	ultimo = '0';
	// alert(broacast);
	for (var i = 30; i >= 0; i--) 
	{
		ultimo = broacast[i] + ultimo;
	}
	return ultimo;
}

function qtsHost(valuem)
{
	var qts = 1, mult = 1;
	for (var i = 0; i < valuem; i++) 
	{
		qts = qts + mult;
		mult = mult * 2;
	}
	return qts;
}

function decbin(num)
{
	var transformado = '';

	num = parseInt(num);
	while (num!=0)
	{
		alert(num%2);
		transformado = (num%2).toString() + transformado;
		num = Math.trunc(num / 2);
	}

	var tam = 8 - transformado.length;
	alert(transformado.length);
	for (var i = 0; i < tam; i++) 
	{
		transformado = '0' + transformado;
	}
	alert(transformado);
	return transformado;
}
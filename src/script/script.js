bin = true;
pode = true;
// Escolha do usuário digitar em binário ou em decimal, aqui ele escolhe um desses modos -> o botão troca os modos
function mododecbin()
{
	
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
//Valida os números binários ou decimal digitados
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
		let primeira = (um.value).toString();
		let segundo = (dois.value).toString();
		let terceiro = (tres.value).toString();
		let quarto = (quatro.value).toString();
		if (primeira.length == 8 && segundo.length == 8 && terceiro.length == 8 && quarto.length == 8) 
		{
			
			for (let i = 0; i < 8; i++) 
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
				resposta(primeira,segundo,terceiro,quarto);
			}
		}else
		{
			alert("O tamanho deve ser 8 em cada um!");
		}
	}else
	{
		//Modo decimal, verifica se valores escritos são válidos

		let validapri = parseInt(um.value);
		let validaseg = parseInt(dois.value);
		let validater = parseInt(tres.value);
		let validaquar = parseInt(quatro.value);

		if ((validapri >=0 && validapri <=255) && (validaseg >=0 && validaseg <=255) && (validater >=0 && validater <=255) && (validaquar >=0 && validaquar <=255))
		{
			//Transformar o decimal em binário porque já foi resolvido em binário
			let primeira = decbin(validapri).toString();
			let segundo = decbin(validaseg).toString();
			let terceiro = decbin(validater).toString();
			let quarto = decbin(validaquar).toString();

			resposta(primeira,segundo,terceiro,quarto);

		}else
		{
			alert("Cada parte deve estar entre valores de 0 a 255");
		}
	}
}
//Calcula todos os pontos importantes da rede e da subrede se houver
function resposta(primeira,segundo,terceiro,quarto)
{
	let subredeImprime = document.getElementById('subrede');
	let subdecImprime = document.getElementById('subdec');
	let masc = document.getElementById('masc');
	let mascSub = document.getElementById('mascSub');
	let rede = document.getElementById('rede1');
	let broad = document.getElementById('broad1');
	let primHost = document.getElementById('primeiro1');
	let ultHost = document.getElementById('ultimo1');
	let qtsHosts = document.getElementById('qtHost');
	//Descobrir de que classe é
	classe(primeira);
	//alert("Deu certo!");
	//Deu certo, agora verificamos as máscaras de rede e de subrede 
	let valuem = parseInt(masc.options[masc.selectedIndex].value);
	let valuesub = parseInt(mascSub.options[mascSub.selectedIndex].value);

	//Aqui veremos se o usuário escolheu as máscaras
	if (valuem!=0) 
	{						
		let IP = primeira + segundo + terceiro + quarto;
		// Visivel para quem é de fora
		//Sem subrede								
		//Endereço de rede -> Endereço do primeiro host
		// Calculo do Endereço de rede
		let endRede = enderecorede(IP, valuem);
		rede.innerHTML = ponto(endRede) + " ------------------ " + bindec(endRede);
		//Calculo do endereço do primeiro host
		let primeiroHost = primeiroEnd(endRede);
		primHost.innerHTML = ponto(primeiroHost) + " ------------------ " + bindec(primeiroHost);
		//Endereço de broacast -> Endereço do último host
		// Calculo do Endereço de broadcast			
		let endBroad = enderecobroad(IP, valuem);
	    broad.innerHTML = ponto(endBroad) + " ------------------ " + bindec(endBroad);

	    //Calculo do endereço do ultimo host
		let ultimoHost = ultimoEnd(endBroad);
		ultHost.innerHTML = ponto(ultimoHost) + " ------------------ " + bindec(ultimoHost);

		//Hosts possíveis da rede
		let qts = qtsHost(32-valuem);
		qtsHosts.innerHTML = qts-2 +`</br>` +`</br>`;
		
		if (valuesub!=0) 
		{		
			//Com subrede
			if (valuesub >= valuem) 
			{
				// console.log(typeof valuesub)
				// console.log(typeof valuem)
				// alert("aaaaa")
				
				let imprime = '', imprimedec = '';
				
				//Endereço de rede -> Endereço do primeiro host
				// Calculo do Endereço de rede da primeira subrede
				endRede = enderecorede(IP, valuem);
				let endRedeSub = enderecorede(endRede, valuesub).toString();
				imprime = imprime + "Endereço subrede " + ponto(endRedeSub) +`</br>` +`</br>`;
				imprimedec = imprimedec + "Endereço subrede " + bindec(endRedeSub).toString() +`</br>` +`</br>`;
				//Calculo do endereço do primeiro host
				primeiroHost = primeiroEnd(endRedeSub).toString();
			    imprime = imprime + "Primeiro endereço de host " + ponto(primeiroHost) +`</br>` +`</br>`;
				imprimedec = imprimedec + "Primeiro endereço de host " + bindec(primeiroHost).toString() +`</br>` +`</br>`;
				//Calculo do broadcast
				endBroad = enderecobroad(endRedeSub, valuesub).toString();

				//Calculo do endereço do ultimo host
				ultimoHost = ultimoEnd(endBroad).toString();
				
			    imprime = imprime + "Último endereço de host " + ponto(ultimoHost) +`</br>` +`</br>`;
		   	    imprime = imprime + "Endereço de broacast " + ponto(endBroad) +`</br>` +`</br>`;
				
				imprimedec = imprimedec + "Último endereço de host " + bindec(ultimoHost).toString() +`</br>` +`</br>`;
				imprimedec = imprimedec + "Endereço de broacast " + bindec(endBroad).toString() +`</br>` +`</br>`;
		   		//Quantidade de hosts válidos na subrede
				let qts = parseInt(qtsHost(32-valuesub));
				let qtsTotal = parseInt(qtsHost(32 -valuem));
				
				let numSubredes = qtsTotal/qts;
				let  q = '';
				qts = qts-2;
				q = qts.toString();
				imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
				imprime = imprime +`</br>` +`</br>`; 

				imprimedec = imprimedec + "Quantidade de host disponível na subrede "  + q +`</br>` +`</br>`;
				imprimedec = imprimedec +`</br>` +`</br>`; 

				numSubredes = numSubredes - 1;
				
				for (let i = 0; i < numSubredes; i++) 
				{	
					console.log(endBroad)					
					endRedeSub = primeiroEnd(endBroad, valuesub).toString();
					imprime = imprime + "Endereço subrede" + ponto(endRedeSub) +`</br>` +`</br>`;
					imprimedec = imprimedec + "Endereço subrede" + bindec(endRedeSub).toString() +`</br>` +`</br>`;
					
					primeiroHost = primeiroEnd(endRedeSub).toString();
					imprime = imprime + "Primeiro endereço de host " + ponto(primeiroHost) +`</br>` +`</br>`;
					imprimedec = imprimedec + "Primeiro endereço de host " + bindec(primeiroHost).toString() +`</br>` +`</br>`;

					//Calculo do broadcast
					endBroad = enderecobroad(endRedeSub, valuesub).toString();

					//Calculo do endereço do ultimo host
					ultimoHost = ultimoEnd(endBroad).toString();
				
					imprime = imprime + "Último endereço de host " + ponto(ultimoHost) +`</br>` +`</br>`;
		   			imprime = imprime + "Endereço de broacast " + ponto(endBroad) +`</br>` +`</br>`;

		   			imprimedec = imprimedec + "Último endereço de host " + bindec(ultimoHost).toString() +`</br>` +`</br>`;
					imprimedec = imprimedec + "Endereço de broacast " + bindec(endBroad).toString() +`</br>` +`</br>`;
	
			   		// Quantidade de hosts válidos na subrede
					imprime = imprime + "Quantidade de host disponível na subrede " + q +`</br>` +`</br>`;
					imprime = imprime +`</br>` +`</br>`; 
					imprimedec = imprimedec + "Quantidade de host disponível na subrede "  + q +`</br>` +`</br>`;
					imprimedec = imprimedec +`</br>` +`</br>`;		
				}
				
				subredeImprime.innerHTML = imprime;
				subdecImprime.innerHTML = imprimedec;
								
			}else
			{
				alert("Mais endereço do que você tem");
			}
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
function enderecorede(IP, valuem1)
{
	let endRede1 = '';
						
	for (let i = 0; i < valuem1; i++) 
	{
		endRede1 = endRede1 + IP[i];
	}	

	for (let i = valuem1; i < 32; i++) 
	{
		endRede1 = endRede1 + '0';
	}
	return endRede1;
}
// Calcula o endereco de broadcast
function enderecobroad(IP, valuem1)
{
	let endBroad1 = '';
						
	for (let i = 0; i < valuem1; i++) 
	{
		endBroad1 = endBroad1 + IP[i];
	}	

	for (let i = valuem1; i < 32; i++) 
	{
		endBroad1 = endBroad1 + '1';
	}	

	return endBroad1;
}
//Calculo primeiro host válido
function primeiroEnd(rede)
{
	let sobe = 1, primeiro1 = '';

	for (let i = 31; i >= 0; i--) 
	{
		if (sobe == 1) 
		{
			if (rede[i] == '1') 
			{
				primeiro1 = '0' + primeiro1;
			
			}else
			{
				primeiro1 = '1' + primeiro1;
				sobe = 0;
			}
		}else
		{
			primeiro1 = rede[i] + primeiro1;
		}
	}
	return primeiro1;
}
//Calculo último host válido
function ultimoEnd(broacast)
{
	let ultimo = '';

	ultimo = '0';
	// alert(broacast);
	for (let i = 30; i >= 0; i--) 
	{
		ultimo = broacast[i] + ultimo;
	}
	return ultimo;
}
//Quantidade de hosts com broadcast e o de rede, retirado 2 quando chama depois
function qtsHost(valuem)
{
	let qts1 = 1, mult = 1;
	for (let i = 0; i < valuem; i++) 
	{
		qts1 = qts1 + mult;
		mult = mult * 2;
	}
	return qts1;
}
//Transforma número decimal para binário
function decbin(num)
{
	let transformado = '';

	num = parseInt(num);
	while (num!=0)
	{
		transformado = (num%2).toString() + transformado;
		num = Math.trunc(num / 2);
	}

	let tam = 8 - transformado.length;

	for (let i = 0; i < tam; i++) 
	{
		transformado = '0' + transformado;
	}
	return transformado;
}
//Transforma número binario para decimal
function bindec(num)
{
    
    let aux = '', resp= "";
    let n = 0, mult = 1;
    for (let i = 31; i >=0; i--) 
    {
        aux = num[i] + aux;    
        if ((i)%8 == 0) 
        {
            resp = parseInt(aux,2).toString() + "." + resp
            console.log(resp)
            aux = ""
        }
                 
    }

    return resp;
}
//Adiciona ponto no endereço binário, para ter maior legibilidade
function ponto(bin)
{
	let resp = '';
	for (let i = 0; i < 32; i++) 
	{
		resp = resp + bin[i];
		if ((i+1)%8 == 0) 
		{
			resp = resp + '.';
		}	
	}
	return resp;
}

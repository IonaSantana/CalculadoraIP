let modo = document.getElementById('modo');

function decbin()
{
	if (document.getElementById('modo').value == "Binário") 
	{
		document.getElementById('modo').value = "Decimal";
	}else
	{
		document.getElementById('modo').value = "Binário";
	}
	
}
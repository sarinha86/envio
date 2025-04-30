document.getElementById('cepForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido. Deve conter 8 dígitos.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro) {
            document.getElementById('resultado').innerHTML = `<p>CEP não encontrado.</p>`;
        } else {
            document.getElementById('resultado').innerHTML = `
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = `<p>Erro ao buscar o CEP.</p>`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Controle de navegação
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Remove classes ativas
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Adiciona classes ativas
            btn.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Exemplo de dados mockados
    const noticias = [
        {
            id: 1,
            titulo: "Assalto ao Banco Fleeca",
            descricao: "Grupo armado realiza assalto espetacular ao Banco Fleeca...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-20",
            conteudoCompleto: `
                <p>Na manhã desta quarta-feira, um grupo fortemente armado realizou um assalto 
                espetacular ao Banco Fleeca, localizado no centro de Los Santos. Segundo 
                testemunhas, os criminosos utilizaram explosivos para acessar o cofre e 
                fugiram em veículos de alta performance.</p>
                
                <p>A polícia foi acionada imediatamente e iniciou uma perseguição pelas ruas 
                da cidade. Durante a fuga, os assaltantes dispersaram tachinhas na via, 
                causando acidentes e dificultando o trabalho das autoridades.</p>
                
                <p>O Departamento de Polícia de Los Santos está investigando o caso e pede 
                que qualquer pessoa com informações entre em contato através do número de 
                emergência.</p>
            `
        },
        {
            id: 2,
            titulo: "Chefe de polícia preso por estelionato", 
            descricao: "O chefe de polícia de Los Santos foi preso por ...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-20"
        },
        {
            id: 3,
            titulo: "Corrida ilegal termina em tragédia",
            descricao: "Uma corrida de rua clandestina na Vinewood Boulevard resultou em múltiplos acidentes...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-21"
        },
        {
            id: 4,
            titulo: "Novo cassino inaugura em Los Santos",
            descricao: "O Diamond Casino & Resort abre suas portas prometendo entretenimento de luxo...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-21"
        },
        {
            id: 5,
            titulo: "Manifestação pacífica no centro da cidade",
            descricao: "Moradores protestam contra aumento de impostos em frente à prefeitura...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-22"
        },
        {
            id: 6,
            titulo: "Galeria de arte sofre tentativa de roubo",
            descricao: "Criminosos tentaram roubar obras de arte valiosas da Galeria de Los Santos...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-22"
        },
        {
            id: 7,
            titulo: "Novo sistema de transporte público",
            descricao: "Prefeitura anuncia modernização da frota de ônibus e novos trajetos...",
            imagem: "../ui/img/weazel-logo.png",
            data: "2024-03-23"
        }
        // Adicione mais notícias aqui
    ];

    // Função para renderizar notícias
    function renderizarNoticias() {
        const noticiaPrincipal = document.querySelector('.noticia-principal');
        const listaNoticias = document.querySelector('.lista-noticias');

        // Renderiza notícia principal
        if (noticias.length > 0) {
            noticiaPrincipal.innerHTML = `
                <div class="noticia-item" data-id="${noticias[0].id}">
                    <h2>${noticias[0].titulo}</h2>
                    <p>${noticias[0].descricao}</p>
                    <span class="data">${noticias[0].data}</span>
                </div>
            `;
        }

        // Renderiza lista de notícias
        listaNoticias.innerHTML = noticias.slice(1).map(noticia => `
            <div class="noticia-item" data-id="${noticia.id}">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao}</p>
                <span class="data">${noticia.data}</span>
            </div>
        `).join('');

        // Adiciona eventos de clique nas notícias
        document.querySelectorAll('.noticia-item').forEach(item => {
            item.addEventListener('click', () => {
                const noticiaId = parseInt(item.dataset.id);
                mostrarNoticiaDetalhada(noticiaId);
            });
        });
    }

    // Função para mostrar notícia detalhada
    function mostrarNoticiaDetalhada(id) {
        const noticia = noticias.find(n => n.id === id);
        if (!noticia) return;

        const noticiaDetalhada = document.getElementById('noticia-detalhada');
        const conteudoNoticia = noticiaDetalhada.querySelector('.noticia-conteudo');

        conteudoNoticia.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.titulo}">
            <h1>${noticia.titulo}</h1>
            <div class="meta">
                <span><i class="far fa-calendar"></i> ${noticia.data}</span>
                <span><i class="far fa-user"></i> Weazel News</span>
            </div>
            <div class="conteudo">
                <p>${noticia.descricao}</p>
                ${noticia.conteudoCompleto || ''}
            </div>
        `;

        // Esconde todas as seções e mostra a notícia detalhada
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        noticiaDetalhada.classList.add('active');
    }

    // Adiciona evento ao botão voltar
    document.querySelector('.voltar-btn').addEventListener('click', () => {
        document.getElementById('noticia-detalhada').classList.remove('active');
        document.getElementById('noticias').classList.add('active');
    });

    // Player de Rádio
    const playBtn = document.querySelector('.play-btn');
    let playing = false;

    playBtn.addEventListener('click', () => {
        playing = !playing;
        playBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        
        // Aqui você pode adicionar a lógica para tocar/pausar o áudio
        fetch(`https://${GetParentResourceName()}/toggleRadio`, {
            method: 'POST',
            body: JSON.stringify({
                playing: playing
            })
        });
    });

    // Inicialização
    renderizarNoticias();
});

// Receber mensagens do lado do cliente
window.addEventListener('message', function(event) {
    const data = event.data;

    if (data.action === "updateNoticias") {
        // Atualizar notícias
    } else if (data.action === "updateRadioInfo") {
        // Atualizar informações do rádio
    }
}); 
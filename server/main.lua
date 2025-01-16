local QBX = exports['qbx_core']:GetCoreObject()

-- Armazenar notícias (idealmente deveria usar banco de dados)
local Noticias = {}

-- Verificar se jogador é jornalista
local function IsJornalista(source)
    local Player = QBX.Functions.GetPlayer(source)
    return Player and Player.PlayerData.job.name == "reporter"
end

-- Eventos do cliente para o servidor
RegisterNetEvent("lb-weazel:server:getNoticias", function()
    local source = source
    TriggerClientEvent("lb-weazel:client:updateNoticias", source, Noticias)
end)

RegisterNetEvent("lb-weazel:server:publicarNoticia", function(noticia)
    local source = source
    
    if not IsJornalista(source) then
        return
    end
    
    -- Adicionar nova notícia
    table.insert(Noticias, {
        id = #Noticias + 1,
        titulo = noticia.titulo,
        conteudo = noticia.conteudo,
        autor = noticia.autor,
        data = os.date("%d/%m/%Y %H:%M")
    })
    
    -- Atualizar todos os jogadores
    TriggerClientEvent("lb-weazel:client:updateNoticias", -1, Noticias)
end) 
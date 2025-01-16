local QBX = exports['qbx_core']:GetCoreObject()

-- Registrar o app no LB Phone
CreateThread(function()
    Wait(1000) -- Aguardar o LB Phone inicializar
    
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = "weazel-news",
        name = "Weazel News",
        description = "Fique por dentro das últimas notícias da cidade",
        developer = "The Rabbit",
        ui = GetCurrentResourceName() .. "/ui/index.html",
        icon = "nui://lb-weazel/ui/assets/icon.png", -- Ícone local é mais recomendado
        defaultApp = true, -- App já vem instalado por padrão
        size = 2048, -- Tamanho em KB
    })

    if not added then
        print("^1Erro ao registrar Weazel News no LB Phone: ^7" .. errorMessage)
    end
end)

-- Callbacks do NUI
RegisterNUICallback("weazel-news", function(data, cb)
    if data.action == "getNoticias" then
        -- Solicitar notícias ao servidor
        TriggerServerEvent("lb-weazel:server:getNoticias")
        
    elseif data.action == "publicarNoticia" then
        -- Enviar nova notícia para o servidor
        TriggerServerEvent("lb-weazel:server:publicarNoticia", data.noticia)
    end
    
    cb("ok")
end)

-- Eventos do servidor para o cliente
RegisterNetEvent("lb-weazel:client:updateNoticias", function(noticias)
    exports["lb-phone"]:SendCustomAppMessage("weazel-news", {
        action = "updateNoticias",
        data = noticias
    })
end) 
local added, errorMessage = exports["lb-phone"]:AddCustomApp({
    identifier = "weazel-news", -- Identificador único
    name = "Weazel News", -- Nome exibido
    description = "APP da Weazel News",
    developer = "The Rabbit",
    ui = GetCurrentResourceName() .. "/ui/index.html",
    icon = "https://url-do-seu-icone.png"
})

if not added then
    print("Erro ao adicionar app:", errorMessage)
end 

exports["lb-phone"]:SendCustomAppMessage("weazel-news", {
    action = "updateNoticias",
    data = {
        noticias = {
            {
                id = 1,
                titulo = "Primeira notícia",
                descricao = "Descrição da notícia...",
                data = "2024-03-20"
            }
            -- Adicione mais notícias aqui
        }
    }
}) 

RegisterNUICallback("weazel-news", function(data, cb)
    if data.action == "toggleRadio" then
        -- Lógica para controlar o rádio
        if data.playing then
            -- Iniciar rádio
        else
            -- Parar rádio
        end
    end
    cb("ok")
end) 
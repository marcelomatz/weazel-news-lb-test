-- Pegar dados do jogador
local function GetPlayerData(source)
    local Player = exports.qbx_core:GetPlayer(source)
    if Player then
        return Player.PlayerData
    end
    return nil
end

-- Exemplo de evento do servidor
RegisterNetEvent('meu-app:server:action', function()
    local source = source
    local Player = exports.qbx_core:GetPlayer(source)
    
    if Player then
        -- Sua lógica aqui
    end
end) 
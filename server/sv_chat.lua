RegisterServerEvent('chat:init')
RegisterServerEvent('chat:addTemplate')
RegisterServerEvent('chat:addMessage')
RegisterServerEvent('chat:addSuggestion')
RegisterServerEvent('chat:removeSuggestion')
RegisterServerEvent('_chat:messageEntered')
RegisterServerEvent('chat:clear')
RegisterServerEvent('__cfx_internal:commandFallback')
RegisterServerEvent('chat:commandEntered')
AddEventHandler('_chat:messageEntered', function(author, color, message)
    if not message or not author then
        return
    end

    TriggerEvent('chatMessage', source, author, message)

    if not WasEventCanceled() then
        --TriggerClientEvent('chatMessage', -1, 'OOC | '..author,  false, message)
    end
end)

AddEventHandler('__cfx_internal:commandFallback', function(command)
    local name = GetPlayerName(source)

    CancelEvent()
end)
local fountCommands = {}

local function refreshCommands(player)
    if GetRegisteredCommands then
        local registeredCommands = GetRegisteredCommands()  
        for _, command in ipairs(registeredCommands) do
            fountCommands[command.name] = command

            if IsPlayerAceAllowed(player, ('command.%s'):format(command.name)) then
                TriggerEvent('chat:addSuggestion', '/' .. command.name, '', {});
            end
        end
    end
end

AddEventHandler('chat:commandEntered', function(cmd) 
    refreshCommands(source)

    if not fountCommands[cmd] then
        TriggerClientEvent('chat:cl_command:check', source, cmd)
    end
end)

AddEventHandler('onServerResourceStart', function(resName)
    Wait(500)
    for _, player in ipairs(GetPlayers()) do
        refreshCommands(player)
    end
end)

-- Here you can WORK other parts of the code i do not recommend you to change something !

AddEventHandler('chat:init', function()
    refreshCommands(source)
    TriggerClientEvent('chat:addMode', source, {
            name = 'ooc',
            displayName = 'OOC', -- Here you can Translate to your Language
            color = '#e0e0e0',
            hidden = false,
            isGlobal = false,
            isChannel = true,
    });
    TriggerClientEvent('chat:addMode', source, {
            name = 'game',
            displayName = 'Game', -- Here you can Translate to your Language
            color = '#e0e0e0',
            hidden = false,
            isGlobal = false,
            isChannel = true,
    });
    TriggerClientEvent('chat:addMode', source, {
            name = 'hidden',
            displayName = 'Hidden', -- Here you can Translate to your Language
            color = '#e0e0e0',
            hidden = true,
            isGlobal = false,
            isChannel = true,
    });
    TriggerClientEvent('chat:addMode', source, {
            name = 'dispatch',
            displayName = 'Dispatch', -- Here you can Translate to your Language
            color = '#e0e0e0',
            hidden = false,
            isGlobal = false,
            isChannel = true,
    });
    TriggerClientEvent('chat:addMode', source, {
            name = 'staff',
            displayName = 'Staff', -- Here you can Translate to your Language
            color = '#e0e0e0',
            hidden = false,
            isGlobal = false,
            isChannel = true,
    });
end)
-- Command to clear the CHAT Messages

RegisterCommand("clear", function(source)
    TriggerClientEvent("chat:clear", source)
end)

-- Command to talk /ooc (General) with players

RegisterCommand('ooc', function(source, args)
    if not args[1] then return end
    local src = source
    local msg = ""
    for i = 1, #args do
        msg = msg .. " " .. args[i]
    end
    local name = GetPlayerName(source)
    TriggerClientEvent( "chatMessage",-1 , "OOC | " .. name ,2 , msg, 'ooc')
end)
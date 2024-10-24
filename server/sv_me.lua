RegisterServerEvent('3dme:shareDisplay')
AddEventHandler('3dme:shareDisplay', function(text,Coords)
	TriggerClientEvent('Do3DText', -1, text, source, Coords)
	if logEnabled then
		setLog(text, source)
	end
end)
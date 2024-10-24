local isRDR = not TerraingridActivate and true or false

local chatInputActive = false
local chatInputActivating = false
local chatLoaded = false
local _oocMuted = false

RegisterNetEvent('chatMessage')
RegisterNetEvent('chat:addTemplate')
RegisterNetEvent('chat:addMessage')
RegisterNetEvent('chat:addSuggestion')
RegisterNetEvent('chat:addSuggestions')
RegisterNetEvent('chat:addMode')
RegisterNetEvent('chat:removeMode')
RegisterNetEvent('chat:removeSuggestion')
RegisterNetEvent('chat:clear')
RegisterNetEvent('chat:muteOoc')
RegisterNetEvent('chat:cl_command:check')

-- internal events
RegisterNetEvent('__cfx_internal:serverPrint')
RegisterNetEvent('_chat:messageEntered')

TriggerServerEvent('chat:init')

local colorTable = {}
colorTable[1] = {147, 62, 47}
colorTable[2] = {51, 112, 165}
colorTable[3] = {163, 62, 48}
colorTable[4] = {190, 97, 18}
colorTable[5] = {135, 103, 150}
colorTable[6] = {77, 36, 92}
colorTable[7] = {158, 71, 158}

local adminMessageChannels = {'feed', 'game', 'ooc', 'hidden', 'dispatch'}

local routedMessages = {
  {
    keywords = "dispatch",
    channel = "dispatch"
  },
  {
    keywords = {"system", "status"},
    channel = "game"
  }
}

local function checkRoutedMessage(msg)
  local msg = string.lower(msg)
  local match = false

  for _, route in ipairs(routedMessages) do
    if (type(route.keywords) == "table") then
      for _, keyword in ipairs(route.keywords) do
        if (string.find(msg, keyword)) then
          match = route.channel
        end
      end
    else
      if (string.find(msg, route.keywords)) then
        match = route.channel
      end
    end
  end

  return match
end

-- Channels: feed, game, ooc
-- authors: 
local i18nAuthors = {
  "SYSTEM",
  "PLAYER REPORT",
  "Admin",
  "Removed",
  "Owner",
  "Instructions",
  "Tenants",
  "Diamond Casino & Resort",
  "BILL",
  "Magic Effect",
  "Hospital",
  "Patients",
  "LS Water & Power",
  "DOC",
  "JAILED",
  "PAROLE",
  "State Alert",
  "EMAIL",
  "DISPATCH",
  "SEARCH - WEAPONS",
  "Evidence - WEAPONS",
  "console",
  "Goverment",
  "Driving History for",
  "SEARCH",
  "State Announcement",
  "STATUS",
  "Service",
  "BANKING",
}

Citizen.CreateThread(function() 
  TriggerServerEvent('chat:init')

end)
Citizen.CreateThread(function()
  Wait(math.random(30000, 90000))
  for _, author in pairs(i18nAuthors) do
    TriggerEvent("i18n:translate", author, "chatMessageAuthor")
    Wait(500)
  end
end)
function chatMessage(author, color, text, channel, isAdminMessage)
  if (channel == 'ooc') and _oocMuted then return end

  local args = { text }
  local _author = author
  if author ~= "" then
    table.insert(args, 1, author)
  end

  -- local hud = exports["isPed"]:isPed("hud")
  -- if (color == 8) then
  --   TriggerEvent("phone:addnotification", author, text)
  --   return
  -- end

  local matchChannel = checkRoutedMessage(_author)
  
  if (matchChannel) then
    channel = matchChannel
  end

  channel = channel or 'feed'

  if (type(color) == "number") then
    if (colorTable[color]) then
      color = colorTable[color]
    else
      color = colorTable[2]
    end
  end

  if (isAdminMessage) then
    for _, v in pairs(adminMessageChannels) do
      SendNUIMessage({
        action = 'ON_MESSAGE',
        data = {
          message = {
            color = color,
            multiline = true,
            args = args,
            mode = v,
            channel = v
          }
        }
      })
    end
  end 

  -- Append always to the main feed channel
      if (channel ~= 'feed') then
        SendNUIMessage({
          action = 'ON_MESSAGE',
          data = {
            message = {
              color = color,
              multiline = true,
              args = args,
              mode = 'feed',
              channel = channel
            }
          }
        })

      SendNUIMessage({
        action = 'ON_MESSAGE',
        data = {
          message = {
            color = color,
            multiline = true,
            args = args,
            mode = channel,
            channel = channel
          }
        }
      })
  end
end
exports('chatMessage', chatMessage)
AddEventHandler('chatMessage', chatMessage)

AddEventHandler('chat:muteOoc', function()
  _oocMuted = not _oocMuted
end)

RegisterNetEvent('chat:showCID')
AddEventHandler('chat:showCID', function(cidInformation)
  SendNUIMessage({
    action = 'ON_SHOWID',
    data = {
      message = {
        multiline = true,
        licenseInfo = cidInformation,
        mode = 'feed',
        channel = 'feed'
      }
    }
  })
  SendNUIMessage({
    action = 'ON_SHOWID',
    data = {
      message = {
        multiline = true,
        licenseInfo = cidInformation,
        mode = 'game',
        channel = 'game'
      }
    }
  })
end)

TriggerEvent("chatMessage", "OOC Firstname Lastname [123]", 2 , 'OOC Message here', 'feed')

RegisterCommand('chat_demo', function()
  TriggerEvent("chatMessage", "OOC Firstname Lastname [123]", 2 , 'OOC Message here', 'ooc')
end, false)

AddEventHandler('__cfx_internal:serverPrint', function(msg)
  if (msg == "") then return end
  SendNUIMessage({
    action = 'ON_MESSAGE',
    data = {
      message = {
        color = {255,50,50},
        multiline = true,
        args = {"Print", msg},
      }
    }
  })
end)

-- addMessage
local addMessage = function(message)
  local hud = exports["isPed"]:isPed("hud")
  if hud then
    local msg = type(message) == 'table' and (message.args[2]) or message
    local author = type(message) == 'table' and message.args[1] or 'SYSTEM'
    local color = type(message) == 'table' and message.color or colorTable[2]
    local channel = type(message) == 'table' and message.channel or 'feed'
    local isAdminMessage = type(message) == 'table' and message.isAdminMessage or false

    chatMessage(author, color, msg, channel, isAdminMessage)
  end
end
-- exports('addMessage', addMessage)
AddEventHandler('chat:addMessage', addMessage)

-- addSuggestion
local addSuggestion = function(name, help, params)
  SendNUIMessage({
    action = 'ON_SUGGESTION_ADD',
    data = {
      suggestions = {
        {
          name = name,
          help = help,
          params = params or nil
        }
      }
    }
  })
end
exports('addSuggestion', addSuggestion)
AddEventHandler('chat:addSuggestion', addSuggestion)

AddEventHandler('chat:addSuggestions', function(suggestions)
  for _, suggestion in ipairs(suggestions) do
    -- print(json.encode(suggestion))
    SendNUIMessage({
      action = 'ON_SUGGESTION_ADD',
      data = {
        suggestion = suggestion
      }
    })
  end
end)

TriggerEvent("chat:addSuggestions", {
  {
    name = "/hud",
    help = "Toggle the visibility of the HUD.",
    params = {}
  },
  {
    name = "/hudsettings",
    help = "Open the HUD settings.",
    params = {}
  }
})

AddEventHandler('chat:removeSuggestion', function(name)
  SendNUIMessage({
    action = 'ON_SUGGESTION_REMOVE',
    data = {
      name = name
    }
  })
end)

AddEventHandler('chat:addMode', function(mode)
  SendNUIMessage({
    action = 'ON_MODE_ADD',
    data = mode
  })
end)

AddEventHandler('chat:removeMode', function(name)
  SendNUIMessage({
    action = 'ON_MODE_REMOVE',
    data = {
      name = name
    }
  })
end)

AddEventHandler('chat:addTemplate', function(id, html)
  SendNUIMessage({
    action = 'ON_TEMPLATE_ADD',
    data = {
      template = {
        id = id,
        html = html
      }
    }
  })
end)

AddEventHandler('chat:clear', function(name)
  SendNUIMessage({
    action = 'ON_CLEAR'
  })
end)

local function stringSplit(inputstr, sep)
  if sep == nil then
    sep = "%s"
  end
  local t={}
  for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
    table.insert(t, str)
  end
  return t
end
local function stringJoin(tbl)
  local str = tbl[1]
  for k, v in pairs(tbl) do
    if k ~= 1 then
      str = str .. " " .. v
    end
  end
  return str
end
RegisterNUICallback('chatResult', function(data, cb)
  chatInputActive = false
  SetNuiFocus(false)

  if not data.canceled then
    local id = PlayerId()

    --deprecated
    local r, g, b = 0, 0x99, 255

    local message = data.message
    if string.sub(message, 1, 1) ~= "/" then
        message = "/" .. message
    end
    local args = stringSplit(message, " ")
    local cmd = args[1]
    cmd = string.lower(cmd)
    args[1] = cmd
    message = stringJoin(args)

    if message:sub(1, 1) == '/' then
      ExecuteCommand(message:sub(2))
      TriggerServerEvent('chat:commandEntered', string.gsub(cmd, "/", ""))
    else
      TriggerServerEvent('_chat:messageEntered', GetPlayerName(id), { r, g, b }, message, data.mode)
    end
  end

  cb('ok')
end)

--[[ 'chatMessage', source, "Invalid Command: '" .. cmd .. "'", 1, '', 'feed'
 ]]

AddEventHandler('chat:cl_command:check', function(cmd) 
  local cmd = string.lower(cmd)
  local found = false
  for _, command in pairs(GetRegisteredCommands()) do
    if (command.name == cmd) then
      found = true
    end
  end
  if (not found) then
    TriggerEvent('chatMessage', "Invalid Command: '" .. cmd .. "'", 1, '', 'feed')
  end
end)

RegisterNUICallback('loaded', function(data, cb)
  TriggerServerEvent('chat:init')

  chatLoaded = true

  cb('ok')
end)

local CHAT_HIDE_STATES = {
  SHOW_WHEN_ACTIVE = 0,
  ALWAYS_SHOW = 1,
  ALWAYS_HIDE = 2
}

Citizen.CreateThread(function()
  SetTextChatEnabled(false)
  local lastChatHideState = -1
  local origChatHideState = -1

  while true do
    Wait(0)

    if not chatInputActive then
      if IsControlPressed(0, isRDR and `INPUT_MP_TEXT_CHAT_ALL` or 245) --[[ INPUT_MP_TEXT_CHAT_ALL ]] then
        chatInputActive = true
        chatInputActivating = true

        SendNUIMessage({
          action = 'ON_OPEN'
        })
      end
    end

    if chatInputActivating then
      if not IsControlPressed(0, isRDR and `INPUT_MP_TEXT_CHAT_ALL` or 245) then
        SetNuiFocus(true, true)

        chatInputActivating = false
      end
    end

    if chatLoaded then
      local forceHide = IsScreenFadedOut() or IsPauseMenuActive()
      local wasForceHide = false

      if chatHideState ~= CHAT_HIDE_STATES.ALWAYS_HIDE then
        if forceHide then
          origChatHideState = chatHideState
          chatHideState = CHAT_HIDE_STATES.ALWAYS_HIDE
        end
      elseif not forceHide and origChatHideState ~= -1 then
        chatHideState = origChatHideState
        origChatHideState = -1
        wasForceHide = true
      end

      if chatHideState ~= lastChatHideState then
        lastChatHideState = chatHideState

        SendNUIMessage({
          action = 'ON_SCREEN_STATE_CHANGE',
          data = {
            hideState = chatHideState,
            fromUserInteraction = not forceHide and not isFirstHide and not wasForceHide  
          }
        })

        isFirstHide = false
      end
    end
  end
end)

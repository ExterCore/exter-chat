# exter-chat
## CHAT SYSTEM LIKE NOPIXEL 4.0

## NEW VERSION OUT NOW WE FIXED STATUS CHECK PLAYER

## UPDATE V1.5

- remove client dispatch | https://github.com/ExterCore/exter-chat/commit/cd9f324591833a787becdab12b6f93b63afb37a1
- adding server side diaptach police & ambulance | https://github.com/ExterCore/exter-chat/commit/4714778727503e4d7d1c71d5dd7d3766f38e1f5a
- javascript fixed double open and close brackets | https://github.com/ExterCore/exter-chat/commit/5e379e2f06a40d02f60c332acf8ee1c3984bfbe2

[DOWNLOAD](https://github.com/ExterCore/exter-chat/releases/tag/exter-chat-v1.5)

[IsPed](https://github.com/CtrlAltDelete4413/IsPed)

## UPDATE V1.4
- DISPATCH FOR POLICE
- DISPATCH FOR AMBULANCE/EMS
- FIXED CHAT INPUT & ADD CONTAINER MESSAGE FOR DISPATCH IN CSS
- ADD HANDLER COMMAND FOR DISPATCH AND HOSPITAL

# PREVIEW v1.4
![UPDATE](https://github.com/user-attachments/assets/44afc89a-6833-493a-b248-148326d8158b)


# PREVIEW v1.3
![prew](https://github.com/user-attachments/assets/4bcf733a-b0e2-4b55-a686-0b25dd795d7b)

[video](https://streamable.com/mwsh29)

# Commands Avaiables : 
- /ooc (Global OOC)
- /clear (Clear Chat (only client))
- /me
- /do

# Here is a short tutorial how to use our chatmessages with our channels/categories

- TriggerEvent("chatMessage", "OOC EXTERCITY [123]", 2 , 'OOC Message goes here', 'ooc')
- TriggerEvent('chatMessage', "SYSTEM", { 0, 141, 155 }, "You have been banned from OOC\nReason: Annoying", 'game')
- TriggerEvent('chatMessage', 'DISPATCH ', 2, 'The VIN is scratched off.', 'dispatch')
- TriggerEvent('chatMessage', 'PLAYER REPORT ', {255, 255, 255}, 'Someone reported nobody?', 'staff')



# TUTORIAL : 

## To add the chat suggestions on your register command do like this :

    RegisterCommand('me', function(source, args, rawCommand)

## Then, add this trigger bellow in every RegisterCommand

    TriggerEvent('chat:addSuggestion', '/me', 'Just a /me', {
      { name = 'me', help = 'Write what do you want.' }
    })

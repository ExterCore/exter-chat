fx_version "cerulean"
game "gta5"
lua54 "yes"

author "sobing"

description "EXTER-CHAT NOPIXEL DESIGN 4.0"

version "1.0"

ui_page 'web/dist/index.html'

client_scripts {
  "client/*.lua"
}

server_scripts {
  "server/*.lua",
  "server/sv_open.lua"
}

shared_script {
  "shared/*.lua"
}

files {
    "web/dist/**/*",
}

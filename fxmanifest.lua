fx_version "cerulean"
games {"gta5"}

description "rep-loading"
author "Q4D + BahnMiFPS"
version '1.0.0'

loadscreen {'web/build/index.html'}
-- Tell server we will close the loading screen resource ourselves
loadscreen_cursor 'yes'
loadscreen_manual_shutdown "yes"

-- Client Script
client_scripts {'@hotp/build/client/token.lua', 'client/*.lua'}

files {'web/build/index.html', 'web/build/**/*'}

lua54 'yes'

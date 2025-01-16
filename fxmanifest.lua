fx_version 'cerulean'
game 'gta5'

author 'The Rabbit'
description 'Weazel News APP'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua',
    '@qbx_core/modules/lib.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua'
}

ui_page 'ui/index.html'

files {
    'ui/*'
} 
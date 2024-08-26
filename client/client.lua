local Ran = false

AddEventHandler("playerSpawned", function()
    SendLoadingScreenMessage(json.encode({'playerReady'}))
    SetNuiFocus(true, true)
end)

RegisterNUICallback('init', function(_, cb)
    cb(1)

    SendNUIMessage({
        action = 'loadLocales',
        data = {}
    })

    local JSON = LoadResourceFile(cache.resource, ('locales/%s.json'):format(GetConvar('ox:locale', 'en'))) or
                     LoadResourceFile(cache.resource, 'locales/en.json')
    SendNUIMessage({
        action = 'setLocale',
        data = JSON and json.decode(JSON) or {}
    })
end)

RegisterNUICallback('getConfig', function(_, cb)
    cb({
        primaryColor = GetConvar('ox:primaryColor', 'blue'),
        primaryShade = GetConvarInt('ox:primaryShade', 8)
    })
end)

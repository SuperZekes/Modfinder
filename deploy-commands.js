const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'modfinder',
        description: 'Find mods on Modrinth based on your search query.',
        options: [
            {
                name: 'query',
                type: 3, // STRING type
                description: 'The search term for mods',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

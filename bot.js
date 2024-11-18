require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const MODRINTH_API_URL = 'https://api.modrinth.com/v2/search';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'modfinder') {
        const query = options.getString('query');

        try {
            const response = await axios.get(MODRINTH_API_URL, {
                params: { query }
            });

            console.log(response.data); // Log the entire response for debugging

            const mods = response.data.hits || []; // Adjust based on actual structure

            if (mods.length === 0) {
                return interaction.reply('No mods found for your search.');
            }

            // Create hyperlinks for mod titles, ensuring title and url are defined
            const modLinks = mods.map(mod => {
                const title = mod.title || 'Unknown Title'; // Fallback for undefined title
                const url = mod.url || '#'; // Fallback for undefined URL
                return `[${title}](${url})`;
            }).join('\n');

            interaction.reply(`Here are the mods I found:\n${modLinks}`);
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while searching for mods.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

const SlackBot  = require('slackbots');
const axios = require('axios');

const bot = new SlackBot ({
    token: 'agregue aqui su token',
    name: 'Bot'
});

bot.on('open', () => console.log('Bot en la onda!'))

bot.on('start', () => {
    bot.postMessageToChannel('general', 'Hola soy el bot mas cabron del mundo! :smiley: Me acaba de programar RichardDev :smiley:');
    bot.postMessageToChannel('general', "Me puedes preguntar por tu pelicula favorita! la que sea!");

});

bot.on('message', async (data) => {
    if (data.type !== 'message' || data.subtype == 'bot_message' || !data.text) return;

    const args = data.text.split(' ');
    const command = args.splice(1, 1)[0];
    const user_id = args.splice(0, 1)[0];
    const params = args.join(' ');

    // console.log({ command, user_id, params });

    if (command === 'movie' && params) {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?t=${params}&i=tt3896198&apikey=6a48c16d`);
            if (res.data.Response === 'False') return bot.postMessageToChannel('general', 'Movie Not found!');
            bot.postMessageToChannel('general', `${res.data.Title} : ${res.data.Poster} Duracion: ${res.data.Runtime} Fecha de lanzamiento: ${res.data.Released} Actores: ${res.data.Actors} Idioma: ${res.data.Language}`);
            // console.log(res.data);
        } catch (e) {
            console.log(e)
        }
    }
});


bot.on('error', (error) => console.log(error))
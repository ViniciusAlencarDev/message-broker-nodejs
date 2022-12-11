import { config as DotEnvConfig } from 'dotenv';
import amqp from 'amqplib/callback_api';
DotEnvConfig();

const host = process.env.MB_HOST || '';

amqp.connect(host, (error, connection) => {
    if (error) throw error;

    connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        const queue = 'MBTeste';

        channel.assertQueue(queue, {
            durable: false
        });

        // receive messages
        channel.consume(queue, msg => {
            console.log('Receive:', msg?.content.toString());
        }, {
            noAck: true
        });
    })

});

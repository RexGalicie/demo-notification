<?php

declare(strict_types=1);

use Api\Infrastructure\Model\EventDispatcher\Listener;
use Api\Infrastructure\Model\EventDispatcher\SyncEventDispatcher;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use Psr\Container\ContainerInterface;

return [
    Api\Model\EventDispatcher::class => function (ContainerInterface $container) {
        return new SyncEventDispatcher(
            $container,
            [
                // VideoModel\Entity\Video\Event\VideoCreated::class => [
                //     Listener\Video\VideoCreatedListener::class,
                // ],
            ]
        );
    },

    // Listener\Video\VideoCreatedListener::class => function (ContainerInterface $container) {
    //     return new Listener\Video\VideoCreatedListener(
    //         $container->get(AMQPStreamConnection::class)
    //     );
    // },
];

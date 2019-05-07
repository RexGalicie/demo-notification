<?php

declare(strict_types=1);

use Api\Infrastructure;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Container\ContainerInterface;

return [
    Api\Model\Flusher::class => function (ContainerInterface $container) {
        return new Api\Infrastructure\Model\Service\DoctrineFlusher(
            $container->get(EntityManagerInterface::class),
            $container->get(Api\Model\EventDispatcher::class)
        );
    },

    'config' => [
    ],
];

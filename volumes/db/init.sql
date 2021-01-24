-- Это автоматически сгенерированный скрипт
-- Потом поменяю на нормальный

START TRANSACTION;

CREATE TABLE `users`
(
    `id` int(10) UNSIGNED NOT NULL,
    `name` tinytext NOT NULL,
    `nameHash` int(10) UNSIGNED NOT NULL,
    `password` tinytext NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `nameHash` (`nameHash`);

ALTER TABLE `users`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

COMMIT;

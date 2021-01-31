CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `nameHash` int(10) UNSIGNED NOT NULL,
  `password` tinytext NOT NULL,

  `createdAt` INT UNSIGNED NOT NULL,
  `updatedAt` INT UNSIGNED NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE (`nameHash`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

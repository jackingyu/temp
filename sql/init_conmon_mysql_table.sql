CREATE SCHEMA `conmon` DEFAULT CHARACTER SET utf8 ;
CREATE TABLE `conmon`.`event` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

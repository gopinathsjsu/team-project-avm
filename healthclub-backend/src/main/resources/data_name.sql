--Gym
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ('120 E Capitol Ave', 'Milpitas',  'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ( '100 E Julian St', 'San Jose', 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ('1 E Hollywood Blvd', 'Los Angeles', 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ( 'Pier 39', 'San Francisco', 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ( '100 Seaside St', 'San Diego',  'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ('2 S Hollywood St', 'Los Angeles', 'USA', 'Celebrity Gym', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ('5678 Hollywood St', 'Los Angeles', 'USA', 'Best Celebrity Gym', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `country`, `name`, `state`)
VALUES ('300 Hollywood St', 'Los Angeles', 'USA', 'Commoner Gym', 'California') ON DUPLICATE KEY UPDATE address = address;

--Gym Schedules
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-13 13:00:00.000000', '10', '2023-05-13 12:00:00.000000', 'Tony Stark', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-14 13:00:00.000000', '40', '2023-05-14 12:00:00.000000', 'Kamala Khan', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-15 13:00:00.000000', '40', '2023-05-15 12:00:00.000000', 'Natasha Romanoff', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-16 13:00:00.000000', '40', '2023-05-16 12:00:00.000000', 'Carol Danvers', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-17 13:00:00.000000', '40', '2023-05-17 12:00:00.000000', 'Jean Grey', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-18 13:00:00.000000', '40', '2023-05-18 12:00:00.000000', 'Wanda Maximoff', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-19 13:00:00.000000', '40', '2023-05-19 12:00:00.000000', 'Wanda Maximoff', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-20 13:00:00.000000', '40', '2023-05-20 12:00:00.000000', 'Clint Barton', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-21 13:00:00.000000', '40', '2023-04-21 12:00:00.000000', 'Robert Bruce Banner', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-22 13:00:00.000000', '40', '2023-04-22 12:00:00.000000', 'Clint Barton', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-23 13:00:00.000000', '40', '2023-04-23 12:00:00.000000', 'Clint Barton', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-24 13:00:00.000000', '40', '2023-04-24 12:00:00.000000', 'TChalla', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-25 13:00:00.000000', '40', '2023-04-25 12:00:00.000000', 'Robert Bruce Banner', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-26 13:00:00.000000', '40', '2023-04-26 12:00:00.000000', 'Captain Marvel', '1');

--Schedules for Gym 2
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-26 13:00:00.000000', '40', '2023-04-26 12:00:00.000000', 'Tony Stark', '2');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-27 13:00:00.000000', '40', '2023-04-27 12:00:00.000000', 'Tony Stark', '2');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-28 13:00:00.000000', '40', '2023-04-28 12:00:00.000000', 'Tony Stark', '2');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-29 13:00:00.000000', '40', '2023-04-29 12:00:00.000000', 'Captain Marvel', '2');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-30 13:00:00.000000', '40', '2023-04-30 12:00:00.000000', 'Captain Marvel', '2');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-30 15:00:00.000000', '40', '2023-04-30 14:00:00.000000', 'Captain Marvel', '2');
--Schedules for Gym 3
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-26 13:00:00.000000', '40', '2023-04-26 12:00:00.000000', 'Carol Danvers', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-27 13:00:00.000000', '40', '2023-04-27 12:00:00.000000', 'Carol Danvers', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-28 13:00:00.000000', '40', '2023-04-28 12:00:00.000000', 'TChalla', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-29 13:00:00.000000', '40', '2023-04-29 12:00:00.000000', 'TChalla', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-30 13:00:00.000000', '40', '2023-04-30 12:00:00.000000', 'Robert Bruce Banner', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-04-30 15:00:00.000000', '40', '2023-04-30 14:00:00.000000', 'Carol Danvers', '3');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-13 13:00:00.000000', '10', '2023-05-13 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-14 13:00:00.000000', '40', '2023-05-14 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-15 13:00:00.000000', '40', '2023-05-15 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-16 13:00:00.000000', '40', '2023-05-16 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-17 13:00:00.000000', '40', '2023-05-17 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-18 13:00:00.000000', '40', '2023-05-18 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-19 13:00:00.000000', '40', '2023-05-19 12:00:00.000000', 'Natasha Romanoff', '4');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-05-20 13:00:00.000000', '40', '2023-05-20 12:00:00.000000', 'Natasha Romanoff', '4');

UPDATE gym_schedule set gym_schedule.max_occupancy = 15 where gym_schedule.gym_id = 4;
UPDATE gym_schedule set gym_schedule.max_occupancy = 10 where gym_schedule.gym_id = 1;
UPDATE gym_schedule set gym_schedule.max_occupancy = 20 where gym_schedule.gym_id = 2;
UPDATE gym_schedule set gym_schedule.max_occupancy = 25 where gym_schedule.gym_id = 3;





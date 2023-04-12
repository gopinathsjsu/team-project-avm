--Gym
INSERT INTO `healthclub`.`gym` (`address`, `city`, `coordinate`, `country`, `name`, `state`)
VALUES ('120 E Capitol Ave', 'Milpitas', ST_GeomFromText('POINT(40.71727401 -74.00898606)'), 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `coordinate`, `country`, `name`, `state`)
VALUES ( '100 E Julian St', 'San Jose', ST_GeomFromText('POINT(45.71727401 -73.00898606)'), 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `coordinate`, `country`, `name`, `state`)
VALUES ('1 E Hollywood Blvd', 'Los Angeles', ST_GeomFromText('POINT(34.1141 -118.4068)'), 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `coordinate`, `country`, `name`, `state`)
VALUES ( 'Pier 39', 'San Francisco', ST_GeomFromText('POINT(37.7558 -122.4449)'), 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;
INSERT INTO `healthclub`.`gym` (`address`, `city`, `coordinate`, `country`, `name`, `state`)
VALUES ( '100 Seaside St', 'San Diego', ST_GeomFromText('POINT(32.8313 -117.1222)'), 'USA', 'Orange Theory', 'California') ON DUPLICATE KEY UPDATE address = address;

--Gym Schedules
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-13 13:00:00.000000', '40', '2023-06-13 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-14 13:00:00.000000', '40', '2023-06-14 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-15 13:00:00.000000', '40', '2023-06-15 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-16 13:00:00.000000', '40', '2023-06-16 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-17 13:00:00.000000', '40', '2023-06-17 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-18 13:00:00.000000', '40', '2023-06-18 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-19 13:00:00.000000', '40', '2023-06-19 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-20 13:00:00.000000', '40', '2023-06-20 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-21 13:00:00.000000', '40', '2023-06-21 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-22 13:00:00.000000', '40', '2023-06-22 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-23 13:00:00.000000', '40', '2023-06-23 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-24 13:00:00.000000', '40', '2023-06-24 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-25 13:00:00.000000', '40', '2023-06-25 12:00:00.000000', 'Captain Marvel', '1');
INSERT INTO `healthclub`.`gym_schedule` ( `end_time`, `max_occupancy`, `start_time`, `trainer`, `gym_id`) VALUES ( '2023-06-26 13:00:00.000000', '40', '2023-06-26 12:00:00.000000', 'Captain Marvel', '1');



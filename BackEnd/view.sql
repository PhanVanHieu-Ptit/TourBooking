-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema managetour
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema managetour
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `managetour` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `managetour` ;
USE `managetour` ;

-- -----------------------------------------------------
-- procedure auto_update_status_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`auto_update_status_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `auto_update_status_order`(IN id int)
BEGIN
	if id=11 then
		UPDATE tourorder SET idStatus = id, cancelDate = CURDATE()
		WHERE (idStatus=8 or idStatus=10) and idTour in (select idTour from tour where DATE(startDate) <= CURDATE());
	elseif id = 12 then
		UPDATE tourorder SET idStatus = id 
		WHERE idStatus=9 and idTour in (select idTour from tour where DATE(startDate) <= CURDATE());
    elseif id = 13 then
		UPDATE tourorder SET idStatus = id 
		WHERE idStatus=12 and idTour in (select idTour from tour 
						where DATE(DATE_ADD(startDate, INTERVAL totalDay DAY)) <= CURDATE());
    end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure auto_update_status_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`auto_update_status_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `auto_update_status_tour`(IN id int)
BEGIN
	if id = 3 then
		UPDATE tour SET idStatus = id 
		WHERE idStatus=1 and DATE(startDate) <= CURDATE();
    elseif id = 4 then
		UPDATE tour SET idStatus = id 
		WHERE idStatus=3 and DATE(DATE_ADD(startDate, INTERVAL totalDay DAY)) <= CURDATE();
    end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_add_image_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_add_image_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_image_tour`( IN id int,
									IN image varchar(500))
insert into tourpicture(idTour,imageUrl) values(id,image)$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_check_tour_exist_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_check_tour_exist_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_check_tour_exist_customer`( IN p_idTour int)
select idTourOrder from tourorder where idTour=p_idTour and 
	(idStatus=9 or idStatus=10 or idStatus=12 or idStatus=13) limit 1$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_create_account
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_create_account`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_account`(
    IN uname VARCHAR(255),
    IN pass VARCHAR(255),
    IN rol VARCHAR(10))
BEGIN
    DECLARE temp VARCHAR(10) DEFAULT 'customer';
    IF rol <> '' THEN 
      SET temp = rol; 
    END IF;
    INSERT INTO account(username, password, role)
    VALUES (uname, pass, temp);
  END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_create_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_create_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_customer`( IN uname varchar(255),
									 IN mail varchar(255),
									 IN phone varchar(10),
									 IN image varchar(255),
                                     IN adress varchar(500))
insert into customer(name, email, phoneNumber,imageUrl,address) values (uname,mail,phone,image,adress)$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_create_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_create_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_order`( IN id1 int,
								  IN id2 int,
                                  IN num int,
                                  IN notes text,
                                  IN total int)
INSERT INTO tourorder SET idCustomer=id1, idTour=id2, quantity=num, note=notes, totalMoney=total$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_create_staff
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_create_staff`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_staff`(
    IN uname VARCHAR(255),
    IN mail VARCHAR(255),
    IN image text)
insert into staff(name,email,imageUrl) values (uname,mail,image)$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_delete_image_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_delete_image_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_image_tour`( IN id int)
delete from tourpicture where idTour=id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_account
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_account`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_account`( IN uname varchar(255))
select * from account where username= uname$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_all_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_all_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_order`( IN page int)
SELECT * FROM tourorder  ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_all_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_all_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_tour`(
    IN page int,
    IN status int)
begin
	if status=1 then
		SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list, q.requestCount
		 FROM tour
		 JOIN tourpicture ON tour.idTour = tourpicture.idTour
         left join (select count(*) as requestCount,idTour from tourorder where idStatus=8 or idStatus=10 group by idTour) q
         on tour.idTour = q.idTour
         where idStatus=1
		 GROUP BY tour.idTour
		 ORDER BY tour.dateCreate DESC 
		LIMIT 5 OFFSET page;
    else
		SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list, q.requestCount
		 FROM tour
		 JOIN tourpicture ON tour.idTour = tourpicture.idTour
		left join (select count(*) as requestCount,idTour from tourorder where idStatus=8 or idStatus=10 group by idTour) q
         on tour.idTour = q.idTour
		 GROUP BY tour.idTour
		 ORDER BY tour.dateCreate DESC 
		LIMIT 5 OFFSET page;
    end if;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_customer_by_email
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_customer_by_email`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_customer_by_email`( 
									 IN mail varchar(255)
									)
select * from customer where email = mail$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_customer_by_id
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_customer_by_id`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_customer_by_id`( IN id int)
SELECT * FROM `customer` where idCustomer= id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_id_tour_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_id_tour_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_id_tour_order`( IN id int)
select idTourOrder from tourorder where idTour=id LIMIT 1$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_list_staff_by_key
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_list_staff_by_key`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_list_staff_by_key`( IN noteKey varchar(255),
																		IN page int)
select staff.*, status.name as status 
from staff inner join status on staff.idStatus = status.idStatus 
where idstaff<>12 and (idstaff like noteKey or staff.name like noteKey or email like noteKey)
ORDER BY staff.name ASC
LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_by_id
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_by_id`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_by_id`( IN id int)
SELECT * FROM `tourorder` where idTourOrder= id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_by_id_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_by_id_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_by_id_tour`( IN p_idTour int,
                                        IN page int)
SELECT * FROM `tourorder` WHERE idTour = p_idTour 
ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_by_key
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_by_key`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_by_key`( IN textKey varchar(255),
									  IN page int)
SELECT *
FROM `tourorder`
WHERE idTour IN (
 SELECT idTour
 FROM `tour`
 WHERE name LIKE textKey
    OR tourIntro LIKE textKey
    OR tourDetail LIKE textKey
    OR pickUpPoint LIKE textKey
    OR tourDestination LIKE textKey)
 OR idCustomer IN (
    SELECT idCustomer
    FROM `customer`
    WHERE name LIKE textKey
        OR email LIKE textKey
        OR phoneNumber LIKE textKey
        OR address LIKE textKey)
 ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_by_name_status
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_by_name_status`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_by_name_status`( IN nameStatus varchar(255),
										IN typeStatus varchar(15),
                                        IN page int)
SELECT * FROM `tourorder` WHERE idStatus IN (SELECT idStatus FROM `status` 
											WHERE name LIKE nameStatus and type = typeStatus ) 
ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_by_status_follow_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_by_status_follow_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_by_status_follow_customer`( IN id int,
                                        IN nameStatus varchar(255),
                                        IN typeStatus varchar(15),
                                        IN page int)
SELECT `tourorder`.*
FROM `tourorder`
JOIN `status` ON `tourorder`.`idStatus` = `status`.`idStatus`
WHERE `tourorder`.`idCustomer` = id AND `status`.`name` = nameStatus AND `status`.`type` = typeStatus
ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_order_follow_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_order_follow_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_order_follow_customer`( IN id int,
                                        IN page int)
SELECT * FROM `tourorder` where idCustomer = id ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET page$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_staff_by_email
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_staff_by_email`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_staff_by_email`( IN mail varchar(255))
select * from staff  where email=mail$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_staff_by_id
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_staff_by_id`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_staff_by_id`(
    IN id int)
select staff.*, status.name as status 
from staff inner join status on staff.idStatus = status.idStatus where idstaff=id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_status_by_id
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_status_by_id`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_status_by_id`( IN id int,
								  IN typeStatus varchar(15))
SELECT idStatus, name FROM `status` where idStatus= id and type = typeStatus$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_status_by_name
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_status_by_name`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_status_by_name`( IN nameStatus varchar(255), IN typeStatus varchar(15))
SELECT idStatus FROM `status` WHERE name LIKE nameStatus and type = typeStatus$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_status_by_type
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_status_by_type`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_status_by_type`( 
								  IN typeStatus varchar(15))
SELECT name FROM `status` where type = typeStatus$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_tour_by_id
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_tour_by_id`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tour_by_id`(
    IN id int)
SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list
FROM tour
JOIN tourpicture ON tour.idTour = tourpicture.idTour
WHERE tour.idTour = id
GROUP BY tour.idTour$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_tour_by_key
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_tour_by_key`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tour_by_key`(
	IN findKey text,
    IN page int)
BEGIN
	if findKey = '' then
		SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list, q.quantity
		FROM tour
		JOIN tourpicture ON tour.idTour = tourpicture.idTour
                left join (select count(*) as quantity,idTour from tourorder where idStatus=8 or idStatus=10 group by idTour) q
         on tour.idTour = q.idTour
		GROUP BY tour.idTour
		ORDER BY tour.dateCreate DESC
		LIMIT 5 OFFSET page;
    else
		SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list,q.quantity
		FROM tour
		JOIN tourpicture ON tour.idTour = tourpicture.idTour
		left join (select count(*) as quantity,idTour from tourorder where idStatus=8 or idStatus=10 group by idTour) q
         on tour.idTour = q.idTour
		where name like findKey OR  tourIntro like findKey or pickUpPoint like findKey or tourDestination like findKey
		GROUP BY tour.idTour
		ORDER BY tour.dateCreate DESC
		LIMIT 5 OFFSET page;
    end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_tour_feauted
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_tour_feauted`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tour_feauted`(
    IN page int)
BEGIN
	SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list
	 FROM tour
	 JOIN tourpicture ON tour.idTour = tourpicture.idTour 
	WHERE featured = 1 and idStatus=1
	 GROUP BY tour.idTour
	 ORDER BY tour.dateCreate DESC 
	LIMIT 5 OFFSET page;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_tour_slots_left
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_get_tour_slots_left`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tour_slots_left`(IN tour_id INT)
BEGIN
     SELECT *
     FROM v_tour_slots_left
     WHERE idTour = tour_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_num_tour_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_num_tour_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_num_tour_order`( IN id int)
begin
	if id=-1 then
    select count(*) as number from tourorder;
    else
    select count(*) as number from tourorder where idStatus=id;
    end if;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_number_order_of_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_number_order_of_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_number_order_of_customer`( IN p_idCustomer int,
												IN p_idStatus int)
Begin
	 if p_idStatus = -1 then
		 SELECT count(*) as currentNumber FROM `tourorder` 
		 where idCustomer = p_idCustomer;
	else
		SELECT count(*) as currentNumber FROM `tourorder` 
		where idCustomer = p_idCustomer and idStatus = p_idStatus;
	end if;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_number_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_number_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_number_tour`( IN p_idStatus int)
Begin
	 if p_idStatus = 1 then
		SELECT 
			COUNT(0) AS `number`
		FROM
			`tour`
		where idStatus =1;
	else
		SELECT 
			COUNT(0) AS `number`
		FROM
			`tour`;
	end if;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_statistic_destination
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_statistic_destination`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_statistic_destination`(IN year char(4))
BEGIN
select tourDestination,sum(totalPersonByTour) as quantity from 
(select sum(quantity) as totalPersonByTour,idTour from tourOrder where idStatus =13 group by idTour) as o 
inner join 
(select idTour, tourDestination from tour where year(DATE_ADD(startDate, INTERVAL totalDay DAY))=year) as t where o.idTour = t.idTour 
group by tourDestination
order by quantity desc;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_statistic_person
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_statistic_person`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_statistic_person`(IN year char(4))
BEGIN
	select month,sum(totalPersonByTour) as totalPerson from 
(select sum(quantity) as totalPersonByTour,idTour from tourOrder where idStatus =13 group by idTour) as o 
inner join 
(select idTour,MONTH(DATE_ADD(startDate, INTERVAL totalDay DAY)) as month from tour where year(DATE_ADD(startDate, INTERVAL totalDay DAY))=year) as t where o.idTour = t.idTour 
group by month
order by month;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_statistic_revenue
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_statistic_revenue`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_statistic_revenue`(IN year char(4))
BEGIN
select month,sum(money)as totalMoney from 
(select sum(totalMoney) as money,idTour from tourOrder where idStatus =13 group by idTour) as o 
inner join 
(select idTour,MONTH(DATE_ADD(startDate, INTERVAL totalDay DAY)) as month from tour where year(DATE_ADD(startDate, INTERVAL totalDay DAY))=year) as t where o.idTour = t.idTour 
group by month
order by month;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_account
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_account`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_account`( IN uname varchar(255),
									 IN pass varchar(255))
update account set password=pass where username=uname$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_customer`( IN uname varchar(255),
									 IN phone varchar(10),
                                     IN adress varchar(500),
                                     IN mail varchar(255))
update  customer set name=uname, phoneNumber=phone, address=adress where email=mail$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_image_customer
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_image_customer`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_image_customer`( IN image varchar(255),
                                     IN mail varchar(255))
update customer set imageUrl=image where email=mail$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_image_staff
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_image_staff`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_image_staff`(
    IN image text,
    IN id int)
update staff set imageUrl=image where idStaff = id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_order`( IN id1 int,
								  IN id2 int,
                                  IN id3 int,
                                  IN num int,
                                  IN notes text,
                                  IN total int)
UPDATE tourorder SET  quantity=num, note=notes, totalMoney=total where idTourOrder=id1 and idCustomer = id2 and idTour = id3$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_staff
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_staff`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_staff`(
    IN uname VARCHAR(255),
    IN id1 int,
    IN id2 int)
update staff set name=uname,idStatus=id1 where idStaff = id2$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_status_order
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_status_order`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_status_order`( IN id1 int,
								  IN id2 int)
BEGIN
	if id1=10 || id1=11 then
		UPDATE tourorder SET  idStatus=id1 , cancelDate=NOW() where idTourOrder = id2;
	else
	 UPDATE tourorder SET  idStatus=id1  where idTourOrder = id2;
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_status_staff
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_status_staff`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_status_staff`(
    IN id1 int,
    IN id2 int)
update staff set idStatus =id1 where idStaff = id2$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_status_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_status_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_status_tour`( IN p_idTour int,
                                     IN p_idStatus int)
begin
	 if p_idStatus=2 then
     update tour set idStatus =p_idStatus, dateCancel=CURDATE() where idTour=p_idTour 
        and idStatus= 1
		and p_idStatus in (select status.idStatus from status where type = 'tour');
     elseif  p_idStatus=3 then
     update tour set idStatus =p_idStatus where idTour=p_idTour 
        and idStatus= 1
		and p_idStatus in (select status.idStatus from status where type = 'tour');
	 elseif  p_idStatus=4 then
     update tour set idStatus =p_idStatus where idTour=p_idTour 
        and idStatus= 3
		and p_idStatus in (select status.idStatus from status where type = 'tour');
     end if;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_tour
-- -----------------------------------------------------

USE `managetour`;
DROP procedure IF EXISTS `managetour`.`sp_update_tour`;

DELIMITER $$
USE `managetour`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_tour`( IN p_name varchar(255),
									IN p_startDate datetime,
                                    IN p_totalDay int,
                                    IN p_minQuantity int,
                                    IN p_maxQuantity int,
                                    IN p_normalPenaltyFee int,
                                    IN p_strictPenaltyFee int,
                                    IN p_minDate int,
                                    IN p_tourGuide tinyint(1),
                                    IN p_tourIntro varchar(500),
                                    IN p_tourDetail text,
                                    IN p_pickUpPoint  varchar(500),
                                    IN p_tourDestination  varchar(500),
                                    IN p_detailPickUpPoint  varchar(100),
                                    IN p_detailTourDestination  varchar(100),
                                    IN p_price int,
                                    IN p_featured tinyint, 
                                    IN p_idTour int)
update tour set name=p_name,
				startDate=p_startDate,
                totalDay=p_totalDay,
                minQuantity=p_minQuantity,
                maxQuantity=p_maxQuantity,
                normalPenaltyFee=p_normalPenaltyFee,
                strictPenaltyFee=p_strictPenaltyFee,
                minDate=p_minDate,
                tourGuide=p_tourGuide,
                tourIntro=p_tourIntro,
                tourDetail=p_tourDetail,
                pickUpPoint=p_pickUpPoint,
                tourDestination=p_tourDestination,
                detailPickUpPoint=p_detailPickUpPoint,
                detailTourDestination=p_detailTourDestination,
                price=p_price,
                featured=p_featured 
                where idTour=p_idTour$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

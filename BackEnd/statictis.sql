DELIMITER $$
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

DELIMITER $$
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


DELIMITER $$
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

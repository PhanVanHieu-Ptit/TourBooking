
-- lịch sử đặt của khách
alter VIEW v_orderedtour AS 
select t.idTour AS idTour,t.name AS name,t.idStatus AS idStatus,t.startDate AS startDate,t.totalDay AS totalDay,
t.minQuantity AS minQuantity,t.maxQuantity AS maxQuantity,t.normalPenaltyFee AS normalPenaltyFee,t.strictPenaltyFee AS strictPenaltyFee,
t.minDate AS minDate,t.dateCreate AS dateCreate,t.tourGuide AS tourGuide,t.tourIntro AS tourIntro,t.tourDetail AS tourDetail,
t.pickUpPoint AS pickUpPoint,t.detailPickUpPoint AS detailPickUpPoint,t.tourDestination AS tourDestination,t.detailTourDestination AS detailTourDestination,
t.price AS price,t.idStaffCreate AS idStaffCreate,t.idStaffCancel AS idStaffCancel,t.featured AS featured,o.idCustomer AS idCustomer,
o.idTourOrder AS idTourOrder,o.orderDateTime AS orderDateTime,o.quantity AS quantity,o.note AS note,o.totalMoney AS totalMoney,o.cancelDate AS cancelDate,
    st.name AS statusName from((tour t join tourorder o on((t.idTour = o.idTour))) join status st on((o.idStatus = st.idStatus)));


--dùng trong quản lý tour
select t.*,messageCount  from tour t inner join 
(select idTour, count(*) as messageCount from tourorder where idStatus=8 or idStatus=11 group by idTour) o 
on t.idTour = o.idtour 




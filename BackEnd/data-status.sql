
--
-- Đang đổ dữ liệu cho bảng `status`
--

INSERT INTO `status` (`idStatus`, `name`, `type`) VALUES
(5, 'Chờ cấp tài khoản', 'staff'),
(1, 'Chờ khởi hành ', 'tour'),
(9, 'Chờ xác nhận hủy', 'tourorder'),
(8, 'Chờ xác nhận đặt', 'tourorder'),
(14, 'Hoàn thành', 'tourorder'),
(11, 'Yêu cầu hủy', 'tourorder'),
(4, 'Đã hoàn thành', 'tour'),
(2, 'Đã hủy', 'tour'),
(12, 'Đã hủy', 'tourorder'),
(7, 'Đã khóa tài khoản', 'staff'),
(3, 'Đã khởi hành', 'tour'),
(6, 'Đang hoạt động', 'staff'),
(13, 'Đang sử dụng ', 'tourorder'),
(10, 'Đặt thành công', 'tourorder');


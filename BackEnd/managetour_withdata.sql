-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: managetour
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(255) NOT NULL COMMENT 'tên đăng nhập',
  `password` varchar(255) NOT NULL COMMENT 'mật khẩu',
  `role` varchar(10) NOT NULL DEFAULT 'customer' COMMENT 'quyền tài khoản',
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('bth@gmail.com','123','customer'),('nguyentuanH@gmai.com','$2a$10$aOrBLNhmD.N3CdN.GxvAA.hvNHTEdDncLvqr4iHwfFoOld8BMu9bK','customer'),('nguyenvana@gmail.com','$2a$10$3EV6P0syIDcgj9I8L2CRq.9BdxDPNd6ETUWfLAH4KAQgFFpPes5N6','staff'),('nguyenvanh@gmail.com','123','customer'),('ntp@gmail.com ','$2a$10$KD.NG3cy7g0a5wzB1vXs7.GlT0oOSJA1Q4EX9q/sdVmtwxot9hM/i','customer'),('phanvanhieu090201@gmail.com','$2a$10$4BC789EHlpA.uDHBwyPNFuISRAzSKmA.eJIfFKe.zeXyCN2/sAVEK','customer'),('pvb@gmail.com','123','staff'),('pvh9@gmail.com ','$2a$10$n3i31iev0S2RnxXZQnCineOExeSQ.EAGB1AFru4K8Mq8McsvGfIG.','customer'),('pvh9201@gmail.com','$2a$10$IFJLQTs0bj86ej1zcq6/b.xDwvhMuWvopXqUbYSTg0mG6IR1o/Vci','customer');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `idCustomer` int NOT NULL AUTO_INCREMENT COMMENT 'mã khách hàng',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'tên khách hàng',
  `email` varchar(255) NOT NULL COMMENT 'email phải duy nhất',
  `phoneNumber` varchar(10) NOT NULL COMMENT 'số điện thoại phải duy nhất',
  `imageUrl` varchar(255) DEFAULT NULL COMMENT 'đường dẫn ảnh đại diện',
  `address` varchar(500) NOT NULL COMMENT 'địa chỉ',
  PRIMARY KEY (`idCustomer`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `cus_acc` FOREIGN KEY (`email`) REFERENCES `account` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (20,'Phan Văn Hiểu','pvh9201@gmail.com','0123456789','https://i.pinimg.com/originals/16/7b/7e/167b7e02a4dd401750c2d3ee20782a27.jpg','Tỉnh Lào Cai'),(21,'Nguyen Van H','nguyenvanh@gmail.com','0123456789','https://i.pinimg.com/originals/16/7b/7e/167b7e02a4dd401750c2d3ee20782a27.jpg','Thủ Đức'),(23,'Bùi Tuấn Hùng','bth@gmail.com','0123456789','https://i.pinimg.com/originals/16/7b/7e/167b7e02a4dd401750c2d3ee20782a27.jpg','Thủ Đức'),(24,'Nguyen Tuan H','nguyentuanH@gmai.com','0123456789','','Thành phố Hà Nội'),(28,'Nguyễn Tuấn P','ntp@gmail.com ','0123456789','','Thành phố Hồ Chí Minh'),(29,'Nguyễn Minh Thông','pvh9@gmail.com ','0123456789','','Thành phố Hồ Chí Minh');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `idStaff` int NOT NULL AUTO_INCREMENT COMMENT 'mã nhân viên',
  `name` varchar(255) NOT NULL COMMENT 'tên nhân viên',
  `email` varchar(255) NOT NULL COMMENT 'email phải duy nhất',
  `imageUrl` text NOT NULL COMMENT 'đường dẫn ảnh đại diện',
  `idStatus` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`idStaff`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `staff_status_idx` (`idStatus`),
  CONSTRAINT `staff_acc` FOREIGN KEY (`email`) REFERENCES `account` (`username`),
  CONSTRAINT `staff_status` FOREIGN KEY (`idStatus`) REFERENCES `status` (`idStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (2,'Nguyễn Văn A','nguyenvana@gmail.com','https://e1.pxfuel.com/desktop-wallpaper/559/130/desktop-wallpaper-cute-boys-kids-cutest-boys.jpg',5),(4,'Phan Văn B','pvb@gmail.com','https://e1.pxfuel.com/desktop-wallpaper/559/130/desktop-wallpaper-cute-boys-kids-cutest-boys.jpg',5);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idStatus` int NOT NULL AUTO_INCREMENT COMMENT 'mã trạng thái',
  `name` varchar(255) NOT NULL COMMENT 'tên trạng thái phải duy nhất',
  `type` varchar(15) NOT NULL COMMENT 'loại trạng thái: tour, account, ordertour',
  PRIMARY KEY (`idStatus`),
  UNIQUE KEY `status_unique` (`name`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (5,'Chờ cấp tài khoản','staff'),(1,'Chờ khởi hành ','tour'),(8,'Chờ xác nhận đặt','tourorder'),(4,'Đã hoàn thành','tour'),(2,'Đã hủy','tour'),(11,'Đã hủy','tourorder'),(7,'Đã khóa tài khoản','staff'),(3,'Đã khởi hành','tour'),(6,'Đang hoạt động','staff'),(12,'Đang sử dụng','tourorder'),(9,'Đặt thành công','tourorder'),(13,'Hoàn thành','tourorder'),(10,'Yêu cầu hủy','tourorder');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour` (
  `idTour` int NOT NULL AUTO_INCREMENT COMMENT 'mã tour',
  `name` varchar(255) NOT NULL COMMENT 'tên tour',
  `idStatus` int NOT NULL DEFAULT '1' COMMENT 'trạng thái tour',
  `startDate` datetime NOT NULL COMMENT 'ngày bắt đầu',
  `totalDay` int NOT NULL COMMENT 'tổng ngày',
  `minQuantity` int NOT NULL DEFAULT '1' COMMENT 'số lượng tối thiểu',
  `maxQuantity` int NOT NULL DEFAULT '9999' COMMENT 'số lượng tối đa',
  `normalPenaltyFee` int NOT NULL DEFAULT '0' COMMENT 'phí phạt khi hủy liền sau khi đã xác nhận',
  `strictPenaltyFee` int NOT NULL DEFAULT '0' COMMENT 'phí phạt trong thời gian cho phép hủy',
  `minDate` int NOT NULL DEFAULT '0' COMMENT 'dùng cho penalty fee',
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ngày tạo',
  `tourGuide` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'hướng dẫn viên du lịch',
  `tourIntro` varchar(500) NOT NULL COMMENT 'giới thiệu về tour',
  `tourDetail` text NOT NULL COMMENT 'chi tiết lịch trình tour',
  `pickUpPoint` varchar(500) NOT NULL COMMENT 'điểm đón',
  `tourDestination` varchar(500) NOT NULL COMMENT 'điểm đến',
  `price` int NOT NULL COMMENT 'giá',
  `idStaffCreate` int NOT NULL COMMENT 'nhân viên tạo tour',
  `idStaffCancel` int DEFAULT NULL COMMENT 'nhân viên dừng tour',
  `featured` tinyint NOT NULL DEFAULT '0' COMMENT 'đánh dấu nổi bật',
  PRIMARY KEY (`idTour`),
  KEY `idStatus` (`idStatus`),
  KEY `idStaffCreate` (`idStaffCreate`),
  KEY `idStaffStop` (`idStaffCancel`),
  CONSTRAINT `tour_ibfk_2` FOREIGN KEY (`idStaffCreate`) REFERENCES `staff` (`idStaff`),
  CONSTRAINT `tour_ibfk_3` FOREIGN KEY (`idStaffCancel`) REFERENCES `staff` (`idStaff`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour`
--

LOCK TABLES `tour` WRITE;
/*!40000 ALTER TABLE `tour` DISABLE KEYS */;
INSERT INTO `tour` VALUES (1,'Du lịch miền tây',1,'2023-03-06 22:28:49',5,1,10,10,20,2,'2023-02-28 19:40:46',1,'Miền tây sông nước','Tham quan các địa danh nổi tiếng và thưởng thức các món ăn dân dã đậm chất miền tây sông nước','Thành phố Hồ Chí Minh','Tỉnh Tiền Giang',250000,2,2,1),(3,'Khám phá Tây Nguyên ',1,'2023-03-06 21:20:28',5,10,20,10,15,10,'2023-03-06 21:52:00',1,'Khám phá vô vàng điều bí ẩn ','Tham quan khắp các bản làng, bộ tộc từ rừng sâu thẳm đến núi cao chót vót','Thành phố Hà Nội','Tỉnh Lào Cai',2300000,2,NULL,1);
/*!40000 ALTER TABLE `tour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourorder`
--

DROP TABLE IF EXISTS `tourorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tourorder` (
  `idTourOrder` int NOT NULL AUTO_INCREMENT,
  `idCustomer` int NOT NULL COMMENT 'mã khách hàng',
  `idTour` int NOT NULL COMMENT 'mã tour',
  `orderDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'thời gian đặt',
  `quantity` int NOT NULL COMMENT 'số lượng',
  `note` text COMMENT 'ghi chú',
  `totalMoney` int NOT NULL COMMENT 'tổng tiền',
  `cancelDate` datetime DEFAULT NULL COMMENT 'ngày hủy',
  `idStatus` int NOT NULL DEFAULT '8' COMMENT 'trạng thái đơn đặt',
  PRIMARY KEY (`idTourOrder`),
  UNIQUE KEY `idCustomer_tour_date_UNIQUE` (`idCustomer`,`idTour`,`orderDateTime`),
  KEY `idStatus` (`idStatus`),
  KEY `idTour` (`idTour`),
  CONSTRAINT `tourorder_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  CONSTRAINT `tourorder_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `status` (`idStatus`),
  CONSTRAINT `tourorder_ibfk_3` FOREIGN KEY (`idTour`) REFERENCES `tour` (`idTour`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourorder`
--

LOCK TABLES `tourorder` WRITE;
/*!40000 ALTER TABLE `tourorder` DISABLE KEYS */;
INSERT INTO `tourorder` VALUES (1,20,1,'2023-02-28 19:43:13',2,NULL,500000,NULL,11),(2,20,1,'2023-02-28 20:25:49',4,NULL,100000,'2023-03-06 15:56:39',10),(3,20,1,'2023-03-01 00:00:00',2,NULL,500000,NULL,10),(4,20,1,'2023-03-03 10:44:50',2,'',500000,NULL,11),(5,20,1,'2023-03-03 10:54:14',1,'',250000,NULL,12),(8,20,1,'2023-03-06 14:52:28',3,'đón tại ngã tư Thủ Đức ',750000,NULL,13),(9,20,1,'2023-03-06 14:55:23',4,'đón chỗ cũ',1000000,NULL,8),(10,20,1,'2023-03-06 14:56:05',5,'đón tại ngã tư Thủ Đức ',1250000,NULL,9),(11,20,1,'2023-03-06 14:57:05',6,'đón tại ngã tư Thủ Đức ',1500000,NULL,10),(12,20,1,'2023-03-06 15:00:09',1,'đón tại ngã tư Thủ Đức ',250000,NULL,11),(13,20,1,'2023-03-06 15:02:10',1,'đón tại ngã tư Thủ Đức ',250000,NULL,12);
/*!40000 ALTER TABLE `tourorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourpicture`
--

DROP TABLE IF EXISTS `tourpicture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tourpicture` (
  `imgId` int NOT NULL AUTO_INCREMENT,
  `idTour` int NOT NULL COMMENT 'mã tour',
  `imageUrl` varchar(500) NOT NULL COMMENT 'đường dẫn hình ảnh của tour',
  PRIMARY KEY (`imgId`),
  UNIQUE KEY `imageUrl` (`imageUrl`,`idTour`) USING BTREE,
  KEY `tourpicture_ibfk_1` (`idTour`),
  CONSTRAINT `tourpicture_ibfk_1` FOREIGN KEY (`idTour`) REFERENCES `tour` (`idTour`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourpicture`
--

LOCK TABLES `tourpicture` WRITE;
/*!40000 ALTER TABLE `tourpicture` DISABLE KEYS */;
INSERT INTO `tourpicture` VALUES (3,1,'https://baovephapluat.vn/data/images/0/2022/05/30/dungtv/tien-giang-1.jpg?dpi=150&quality=100&w=820'),(1,1,'https://bcp.cdnchinhphu.vn/Uploaded/tranthithom/2021_11_09/dan-so-tien-giang-3.jpg'),(2,1,'https://cdn3.ivivu.com/2022/06/ti%E1%BB%81n-giang.jpg'),(4,3,'https://danviet.mediacdn.vn/2020/6/5/1-15913419719771038118165.jpg'),(5,3,'https://dulichtaynguyen.org/view/at_su-phat-trien-cua-du-lich-tay-nguyen_9fbe6b4b527afd702ee897f7a241f922.jpg'),(6,3,'https://tuyengiao.vn/Uploads/2022/9/30/22/191.jpg');
/*!40000 ALTER TABLE `tourpicture` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-07 13:37:16

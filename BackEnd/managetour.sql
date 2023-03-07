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

-- -----------------------------------------------------
-- Table `managetour`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`account` (
  `username` VARCHAR(255) NOT NULL COMMENT 'tên đăng nhập',
  `password` VARCHAR(255) NOT NULL COMMENT 'mật khẩu',
  `role` VARCHAR(10) NOT NULL DEFAULT 'customer' COMMENT 'quyền tài khoản',
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`customer` (
  `idCustomer` INT NOT NULL AUTO_INCREMENT COMMENT 'mã khách hàng',
  `name` VARCHAR(50) NOT NULL COMMENT 'tên khách hàng',
  `email` VARCHAR(50) NOT NULL COMMENT 'email phải duy nhất',
  `phoneNumber` VARCHAR(10) NOT NULL COMMENT 'số điện thoại phải duy nhất',
  `imageUrl` VARCHAR(255) NULL DEFAULT NULL COMMENT 'đường dẫn ảnh đại diện',
  `address` VARCHAR(50) NOT NULL COMMENT 'địa chỉ',
  PRIMARY KEY (`idCustomer`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`staff` (
  `idStaff` INT NOT NULL AUTO_INCREMENT COMMENT 'mã nhân viên',
  `name` VARCHAR(50) NOT NULL COMMENT 'tên nhân viên',
  `email` VARCHAR(50) NOT NULL COMMENT 'email phải duy nhất',
  `imageUrl` VARCHAR(100) NULL DEFAULT NULL COMMENT 'đường dẫn ảnh đại diện',
  `idStatus` INT NOT NULL DEFAULT '5',
  PRIMARY KEY (`idStaff`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `staff_cus`
    FOREIGN KEY (`email`)
    REFERENCES `managetour`.`account` (`username`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`status` (
  `idStatus` INT NOT NULL AUTO_INCREMENT COMMENT 'mã trạng thái',
  `name` VARCHAR(255) NOT NULL COMMENT 'tên trạng thái phải duy nhất',
  `type` VARCHAR(15) NOT NULL COMMENT 'loại trạng thái: tour, account, ordertour',
  PRIMARY KEY (`idStatus`),
  UNIQUE INDEX `status_unique` (`name` ASC, `type` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`tour` (
  `idTour` INT NOT NULL AUTO_INCREMENT COMMENT 'mã tour',
  `name` VARCHAR(50) NOT NULL COMMENT 'tên tour',
  `idStatus` INT NOT NULL DEFAULT '1' COMMENT 'trạng thái tour',
  `startDate` DATETIME NOT NULL COMMENT 'ngày bắt đầu',
  `totalDay` INT NOT NULL COMMENT 'tổng ngày',
  `minQuantity` INT NOT NULL DEFAULT '1' COMMENT 'số lượng tối thiểu',
  `maxQuantity` INT NOT NULL DEFAULT '9999' COMMENT 'số lượng tối đa',
  `normalPenaltyFee` INT NOT NULL DEFAULT '0' COMMENT 'phí phạt khi hủy liền sau khi đã xác nhận',
  `strictPenaltyFee` INT NOT NULL DEFAULT '0' COMMENT 'phí phạt trong thời gian cho phép hủy',
  `minDate` INT NOT NULL DEFAULT '0' COMMENT 'dùng cho penalty fee',
  `dateCreate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ngày tạo',
  `tourGuide` TINYINT(1) NOT NULL DEFAULT '0' COMMENT 'hướng dẫn viên du lịch',
  `tourIntro` VARCHAR(50) NOT NULL COMMENT 'giới thiệu về tour',
  `tourDetail` TEXT NOT NULL COMMENT 'chi tiết lịch trình tour',
  `pickUpPoint` VARCHAR(50) NOT NULL COMMENT 'điểm đón',
  `detailPickUpPoint` VARCHAR(100) NOT NULL,
  `tourDestination` VARCHAR(50) NOT NULL COMMENT 'điểm đến',
  `detailTourDestination` VARCHAR(100) NOT NULL,
  `price` INT NOT NULL COMMENT 'giá',
  `idStaffCreate` INT NOT NULL COMMENT 'nhân viên tạo tour',
  `idStaffCancel` INT NULL DEFAULT NULL COMMENT 'nhân viên dừng tour',
  `featured` TINYINT NULL DEFAULT '0' COMMENT 'đánh dấu nổi bật',
  PRIMARY KEY (`idTour`),
  INDEX `idStatus` (`idStatus` ASC) VISIBLE,
  INDEX `idStaffCreate` (`idStaffCreate` ASC) VISIBLE,
  INDEX `idStaffStop` (`idStaffCancel` ASC) VISIBLE,
  CONSTRAINT `tour_ibfk_2`
    FOREIGN KEY (`idStaffCreate`)
    REFERENCES `managetour`.`staff` (`idStaff`),
  CONSTRAINT `tour_ibfk_3`
    FOREIGN KEY (`idStaffCancel`)
    REFERENCES `managetour`.`staff` (`idStaff`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`tourorder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`tourorder` (
  `idTourOrder` INT NOT NULL AUTO_INCREMENT,
  `idCustomer` INT NOT NULL COMMENT 'mã khách hàng',
  `idTour` INT NOT NULL COMMENT 'mã tour',
  `orderDateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'thời gian đặt',
  `quantity` INT NOT NULL COMMENT 'số lượng',
  `note` TEXT NULL DEFAULT NULL COMMENT 'ghi chú',
  `totalMoney` INT NOT NULL COMMENT 'tổng tiền',
  `cancelDate` DATETIME NULL DEFAULT NULL COMMENT 'ngày hủy',
  `idStatus` INT NOT NULL DEFAULT '8' COMMENT 'trạng thái đơn đặt',
  PRIMARY KEY (`idTourOrder`),
  UNIQUE INDEX `idCustomer_tour_date_UNIQUE` (`idCustomer` ASC, `idTour` ASC, `orderDateTime` ASC) VISIBLE,
  INDEX `idStatus` (`idStatus` ASC) VISIBLE,
  INDEX `idTour` (`idTour` ASC) VISIBLE,
  CONSTRAINT `tourorder_ibfk_1`
    FOREIGN KEY (`idCustomer`)
    REFERENCES `managetour`.`customer` (`idCustomer`),
  CONSTRAINT `tourorder_ibfk_2`
    FOREIGN KEY (`idStatus`)
    REFERENCES `managetour`.`status` (`idStatus`),
  CONSTRAINT `tourorder_ibfk_3`
    FOREIGN KEY (`idTour`)
    REFERENCES `managetour`.`tour` (`idTour`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `managetour`.`tourpicture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managetour`.`tourpicture` (
  `imgId` INT NOT NULL AUTO_INCREMENT,
  `idTour` INT NOT NULL COMMENT 'mã tour',
  `imageUrl` VARCHAR(100) NOT NULL COMMENT 'đường dẫn hình ảnh của tour',
  PRIMARY KEY (`imgId`),
  UNIQUE INDEX `imageUrl` USING BTREE (`imageUrl`, `idTour`) VISIBLE,
  INDEX `tourpicture_ibfk_1` (`idTour` ASC) VISIBLE,
  CONSTRAINT `tourpicture_ibfk_1`
    FOREIGN KEY (`idTour`)
    REFERENCES `managetour`.`tour` (`idTour`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

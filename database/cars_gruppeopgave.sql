-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 19. 08 2019 kl. 09:23:56
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cars_gruppeopgave`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_title` varchar(128) NOT NULL,
  `brand_image` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_title`, `brand_image`) VALUES
(1, 'Audi', 'audi-logo.png'),
(2, 'Mercedes-Benz', 'mercedes-logo.png'),
(3, 'Porsche', 'Porsche-logo.png'),
(4, 'BMW', 'bmw-logo.png'),
(5, 'Volkswagen', 'Volkswagen-Logo.png');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cars`
--

CREATE TABLE `cars` (
  `cars_id` int(11) NOT NULL,
  `cars_title` varchar(64) NOT NULL,
  `cars_description` varchar(1000) NOT NULL,
  `cars_topspeed` varchar(32) NOT NULL,
  `cars_price` decimal(12,3) NOT NULL,
  `cars_brand_fk` int(11) NOT NULL,
  `cars_image` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `cars`
--

INSERT INTO `cars` (`cars_id`, `cars_title`, `cars_description`, `cars_topspeed`, `cars_price`, `cars_brand_fk`, `cars_image`) VALUES
(1, 'title 1', 'This char is amazing', '64km/t', '64.000', 1, 'audi-r8.jpg'),
(2, 'title 2', 'This char is amazing 2', '65km/t', '165.000', 1, 'audi-tt-rs.jpg'),
(3, 'title 3', 'This car is awesome 3', '64km/t', '165.000', 4, 'BMW-m3-gtr.jpg'),
(4, 'title 4', 'This car is awesome 4', '65km/t', '65.000', 4, 'bmw-m5.jpg'),
(5, 'title 5', 'This car is awesome 5', '12km/t', '1.222', 2, 'mercedes-benz-e63.jpg'),
(6, 'title 6', 'This car is awesome 6', '1km/t', '1.222', 2, 'mercedes-benz-slk55.jpg'),
(7, 'title 7', 'This car is awesome 7', '2km/t', '999999999.999', 3, 'porsche-911-gt3.jpg'),
(8, 'title 8', 'content 8', '64km/t', '1111.222', 3, 'porsche-911-turbo.jpg'),
(9, 'title 9', 'content 9', '65km/t', '65.000', 5, 'vw-beetle-rsijpg.jpg'),
(10, 'title 10', 'content 10', '12km/t', '1.222', 5, 'vw-golf-r32.jpg');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indeks for tabel `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`cars_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tilføj AUTO_INCREMENT i tabel `cars`
--
ALTER TABLE `cars`
  MODIFY `cars_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
